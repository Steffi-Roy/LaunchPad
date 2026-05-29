import type { Competitor, Demographic, Channel, LaunchState } from '@/context/LaunchContext';

function cleanError(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback;
  // Extract human-readable message from Anthropic error JSON embedded in string
  // e.g. "401 {\"type\":\"error\",\"error\":{\"type\":\"authentication_error\",\"message\":\"invalid x-api-key\"}}"
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]) as { error?: { type?: string; message?: string } };
      if (parsed.error?.message) return parsed.error.message;
      if (parsed.error?.type) return parsed.error.type.replace(/_/g, ' ');
    }
  } catch { /* ignore */ }
  // Strip leading HTTP status code if present
  return raw.replace(/^\d{3}\s+/, '') || fallback;
}

export async function readRepo(repoUrl: string): Promise<{ readme: string; repoName: string }> {
  const res = await fetch('/api/read-repo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl }),
  });
  if (!res.ok) {
    const err = await res.json() as { error?: string };
    throw new Error(cleanError(err.error, 'Failed to read repo'));
  }
  return res.json() as Promise<{ readme: string; repoName: string }>;
}

export async function runCompetitiveAnalysis(
  productDescription: string,
  readme: string
): Promise<{ competitors: Competitor[]; positioningAngle: string }> {
  const res = await fetch('/api/competitive-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productDescription, readme }),
  });
  if (!res.ok) {
    const err = await res.json() as { error?: string };
    throw new Error(cleanError(err.error, 'Failed to run competitive analysis'));
  }
  return res.json() as Promise<{ competitors: Competitor[]; positioningAngle: string }>;
}

export async function runPositioning(
  productDescription: string,
  readme: string,
  competitors: Competitor[],
  positioningAngle: string
): Promise<{ demographics: Demographic[]; tone: string; positioningStatement: string; tagline: string }> {
  const res = await fetch('/api/positioning', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productDescription, readme, competitors, positioningAngle }),
  });
  if (!res.ok) {
    const err = await res.json() as { error?: string };
    throw new Error(cleanError(err.error, 'Failed to run positioning'));
  }
  return res.json() as Promise<{ demographics: Demographic[]; tone: string; positioningStatement: string; tagline: string }>;
}

export async function runLaunchStrategy(
  productDescription: string,
  positioningAngle: string,
  demographics: Demographic[],
  tone: string
): Promise<{ channels: Channel[]; githubTips: string[]; opportunityNote: string }> {
  const res = await fetch('/api/launch-strategy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productDescription, positioningAngle, demographics, tone }),
  });
  if (!res.ok) {
    const err = await res.json() as { error?: string };
    throw new Error(cleanError(err.error, 'Failed to run launch strategy'));
  }
  return res.json() as Promise<{ channels: Channel[]; githubTips: string[]; opportunityNote: string }>;
}

export async function generateContent(
  productDescription: string,
  positioningAngle: string,
  selectedDemographics: string[],
  tone: string,
  channels: Channel[]
): Promise<{ twitter: string; instagram: string; reddit: string; discord: string; hackernews: string }> {
  const res = await fetch('/api/generate-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productDescription, positioningAngle, selectedDemographics, tone, channels }),
  });
  if (!res.ok) {
    const err = await res.json() as { error?: string };
    throw new Error(cleanError(err.error, 'Failed to generate content'));
  }
  return res.json() as Promise<{ twitter: string; instagram: string; reddit: string; discord: string; hackernews: string }>;
}

export async function generatePDF(fullStrategy: LaunchState): Promise<Blob> {
  const res = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullStrategy }),
  });
  if (!res.ok) {
    const err = await res.json() as { error?: string };
    throw new Error(cleanError(err.error, 'Failed to generate PDF'));
  }
  return res.blob();
}
