'use client';

import { useLaunch } from '@/context/LaunchContext';
import { readRepo, runCompetitiveAnalysis, runPositioning, runLaunchStrategy, generateContent } from '@/lib/api';
import { cycleMessages } from '@/lib/utils';

const NEXT_LABELS = [
  'analyze competitors',
  'define audience',
  'plan launch',
  'generate content',
  'get artifact',
  '—',
];

const LOADING_MESSAGES: Record<number, string[]> = {
  0: ['reading your repository...', 'fetching README...', 'parsing project info...'],
  1: ['scanning the web...', 'identifying competitors...', 'synthesizing landscape...'],
  2: ['defining your audience...', 'mapping positioning...', 'crafting your angle...'],
  3: ['building launch strategy...', 'prioritizing channels...', 'generating tips...'],
  4: ['writing twitter thread...', 'crafting reddit post...', 'generating platform content...'],
};

export default function WizNav() {
  const { state, dispatch } = useLaunch();
  const { currentStep } = state;

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch({ type: 'GO_STEP', payload: currentStep - 1 });
    }
  };

  const handleNext = async () => {
    if (currentStep >= 5) return;

    dispatch({ type: 'SET_ERROR', payload: null });

    // Step 0 → 1: read repo + competitive analysis
    if (currentStep === 0) {
      if (!state.productDescription.trim()) {
        dispatch({ type: 'SET_ERROR', payload: 'Please enter a product description before analyzing.' });
        return;
      }

      const setter = (msg: string) => dispatch({ type: 'SET_LOADING', payload: { loading: true, loadingMessage: msg } });
      let cleanup = cycleMessages(LOADING_MESSAGES[0], 1200, setter);

      try {
        let readme = state.readmeContent;
        let repoName = state.repoName;

        if (state.repoUrl.trim()) {
          const repoData = await readRepo(state.repoUrl);
          readme = repoData.readme;
          repoName = repoData.repoName;
          dispatch({ type: 'SET_REPO_DATA', payload: { readmeContent: readme, repoName } });
        }

        cleanup();
        cleanup = cycleMessages(LOADING_MESSAGES[1], 1200, setter);

        const { competitors, positioningAngle } = await runCompetitiveAnalysis(
          state.productDescription,
          readme
        );

        dispatch({ type: 'SET_COMPETITORS', payload: { competitors, positioningAngle } });
        dispatch({ type: 'COMPLETE_STEP', payload: 0 });
        dispatch({ type: 'GO_STEP', payload: 1 });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Analysis failed' });
      } finally {
        cleanup();
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      }
      return;
    }

    // Step 1 → 2: positioning
    if (currentStep === 1) {
      const setter = (msg: string) => dispatch({ type: 'SET_LOADING', payload: { loading: true, loadingMessage: msg } });
      const cleanup = cycleMessages(LOADING_MESSAGES[2], 1200, setter);

      try {
        const { demographics, tone, positioningStatement, tagline } = await runPositioning(
          state.productDescription,
          state.readmeContent,
          state.competitors,
          state.positioningAngle
        );
        dispatch({ type: 'SET_DEMOGRAPHICS', payload: { demographics, tone, positioningStatement, tagline } });
        dispatch({ type: 'COMPLETE_STEP', payload: 1 });
        dispatch({ type: 'GO_STEP', payload: 2 });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Positioning failed' });
      } finally {
        cleanup();
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      }
      return;
    }

    // Step 2 → 3: launch strategy
    if (currentStep === 2) {
      const setter = (msg: string) => dispatch({ type: 'SET_LOADING', payload: { loading: true, loadingMessage: msg } });
      const cleanup = cycleMessages(LOADING_MESSAGES[3], 1200, setter);

      try {
        const { channels, githubTips, opportunityNote } = await runLaunchStrategy(
          state.productDescription,
          state.positioningAngle,
          state.demographics,
          state.tone
        );
        dispatch({ type: 'SET_CHANNELS', payload: { channels, githubTips, opportunityNote } });
        dispatch({ type: 'COMPLETE_STEP', payload: 2 });
        dispatch({ type: 'GO_STEP', payload: 3 });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Strategy failed' });
      } finally {
        cleanup();
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      }
      return;
    }

    // Step 3 → 4: generate content
    if (currentStep === 3) {
      const setter = (msg: string) => dispatch({ type: 'SET_LOADING', payload: { loading: true, loadingMessage: msg } });
      const cleanup = cycleMessages(LOADING_MESSAGES[4], 1200, setter);

      try {
        const selectedDemographics = state.demographics
          .filter(d => d.selected)
          .map(d => d.label);

        const content = await generateContent(
          state.productDescription,
          state.positioningAngle,
          selectedDemographics,
          state.tone,
          state.channels
        );
        dispatch({ type: 'SET_CONTENT', payload: content });
        dispatch({ type: 'COMPLETE_STEP', payload: 3 });
        dispatch({ type: 'GO_STEP', payload: 4 });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Content generation failed' });
      } finally {
        cleanup();
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      }
      return;
    }

    // Step 4 → 5: just navigate
    if (currentStep === 4) {
      dispatch({ type: 'COMPLETE_STEP', payload: 4 });
      dispatch({ type: 'GO_STEP', payload: 5 });
      return;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        background: 'rgba(10,10,12,0.95)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px dashed var(--border)',
      }}
    >
      <button
        onClick={handleBack}
        style={{
          fontSize: '12px',
          color: 'var(--muted)',
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          letterSpacing: '1px',
          transition: 'color 0.2s',
          fontFamily: 'var(--mono)',
          cursor: 'pointer',
          visibility: currentStep === 0 ? 'hidden' : 'visible',
        }}
      >
        ← back
      </button>

      {currentStep < 5 && (
        <button
          onClick={handleNext}
          disabled={state.loading}
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            background: state.loading ? 'var(--purple2)' : 'var(--purple)',
            color: '#0a0a0c',
            border: 'none',
            padding: '11px 28px',
            letterSpacing: '-0.3px',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: state.loading ? 'wait' : 'pointer',
          }}
        >
          {state.loading ? '...' : NEXT_LABELS[currentStep]} →
        </button>
      )}
    </div>
  );
}
