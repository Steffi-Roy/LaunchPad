'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Competitor {
  name: string;
  description: string;
  weakness: string;
}

export interface Demographic {
  label: string;
  selected: boolean;
}

export interface Channel {
  name: string;
  icon: string;
  why: string;
  priority: number;
  isPrimary: boolean;
}

export interface LaunchState {
  // Step 0 inputs
  repoUrl: string;
  productDescription: string;
  readmeContent: string;
  repoName: string;

  // Step 1
  competitors: Competitor[];
  positioningAngle: string;

  // Step 2
  demographics: Demographic[];
  tone: string;
  positioningStatement: string;
  tagline: string;

  // Step 3
  channels: Channel[];
  githubTips: string[];
  opportunityNote: string;

  // Step 4
  content: {
    twitter: string;
    instagram: string;
    reddit: string;
    discord: string;
    hackernews: string;
  };

  // Loading/error
  loading: boolean;
  loadingMessage: string;
  error: string | null;
  currentStep: number;
  completedSteps: number[];
}

const initialState: LaunchState = {
  repoUrl: '',
  productDescription: '',
  readmeContent: '',
  repoName: '',
  competitors: [],
  positioningAngle: '',
  demographics: [],
  tone: 'raw / technical',
  positioningStatement: '',
  tagline: '',
  channels: [],
  githubTips: [],
  opportunityNote: '',
  content: {
    twitter: '',
    instagram: '',
    reddit: '',
    discord: '',
    hackernews: '',
  },
  loading: false,
  loadingMessage: '',
  error: null,
  currentStep: 0,
  completedSteps: [],
};

type Action =
  | { type: 'SET_INPUT'; payload: { repoUrl?: string; productDescription?: string } }
  | { type: 'SET_REPO_DATA'; payload: { readmeContent: string; repoName: string } }
  | { type: 'SET_COMPETITORS'; payload: { competitors: Competitor[]; positioningAngle: string } }
  | { type: 'SET_POSITIONING_ANGLE'; payload: string }
  | { type: 'SET_DEMOGRAPHICS'; payload: { demographics: Demographic[]; tone: string; positioningStatement: string; tagline: string } }
  | { type: 'TOGGLE_DEMOGRAPHIC'; payload: string }
  | { type: 'SET_TONE'; payload: string }
  | { type: 'SET_POSITIONING'; payload: { positioningStatement: string; tagline: string } }
  | { type: 'SET_CHANNELS'; payload: { channels: Channel[]; githubTips: string[]; opportunityNote: string } }
  | { type: 'SET_CONTENT'; payload: LaunchState['content'] }
  | { type: 'SET_LOADING'; payload: { loading: boolean; loadingMessage?: string } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'GO_STEP'; payload: number }
  | { type: 'COMPLETE_STEP'; payload: number }
  | { type: 'RESET' };

function reducer(state: LaunchState, action: Action): LaunchState {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, ...action.payload };
    case 'SET_REPO_DATA':
      return { ...state, ...action.payload };
    case 'SET_COMPETITORS':
      return {
        ...state,
        competitors: Array.isArray(action.payload.competitors) ? action.payload.competitors : state.competitors,
        positioningAngle: action.payload.positioningAngle ?? state.positioningAngle,
      };
    case 'SET_POSITIONING_ANGLE':
      return { ...state, positioningAngle: action.payload };
    case 'SET_DEMOGRAPHICS':
      return { ...state, ...action.payload };
    case 'TOGGLE_DEMOGRAPHIC':
      return {
        ...state,
        demographics: state.demographics.map(d =>
          d.label === action.payload ? { ...d, selected: !d.selected } : d
        ),
      };
    case 'SET_TONE':
      return { ...state, tone: action.payload };
    case 'SET_POSITIONING':
      return { ...state, ...action.payload };
    case 'SET_CHANNELS':
      return { ...state, ...action.payload };
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
        loadingMessage: action.payload.loadingMessage ?? state.loadingMessage,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'GO_STEP':
      return { ...state, currentStep: action.payload };
    case 'COMPLETE_STEP':
      return {
        ...state,
        completedSteps: state.completedSteps.includes(action.payload)
          ? state.completedSteps
          : [...state.completedSteps, action.payload],
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface LaunchContextValue {
  state: LaunchState;
  dispatch: React.Dispatch<Action>;
}

const LaunchContext = createContext<LaunchContextValue | null>(null);

export function LaunchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LaunchContext.Provider value={{ state, dispatch }}>
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunch() {
  const ctx = useContext(LaunchContext);
  if (!ctx) throw new Error('useLaunch must be used inside LaunchProvider');
  return ctx;
}
