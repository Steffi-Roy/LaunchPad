import { NextRequest, NextResponse } from 'next/server';
import { chat, parseLLMJson } from '@/lib/llm';
import type { Channel } from '@/context/LaunchContext';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      productDescription: string;
      positioningAngle: string;
      selectedDemographics: string[];
      tone: string;
      channels: Channel[];
    };
    const { productDescription, positioningAngle, selectedDemographics, tone, channels } = body;

    const channelNames = channels.map(c => c.name).join(', ');

    const prompt = `You are a copywriter for developer/indie products who creates platform-native content.

Product description:
${productDescription}

Positioning angle: ${positioningAngle}
Target audience: ${selectedDemographics.join(', ')}
Tone: ${tone}
Primary channels: ${channelNames}

Generate platform-native post copy with these rules:
- twitter: 3-5 tweets separated by \\n\\n, hashtags at end of last tweet, build-in-public tone
- instagram: casual, emoji-friendly, CTA at end, 150-200 words
- reddit: first line is "Show r/SideProject: [title]", then blank line, then honest post asking for feedback
- discord: casual, community-first, link placeholder at end, under 100 words
- hackernews: first line is "Show HN: [title]", then blank line, then technical explanation, minimal hype

Return ONLY valid JSON (no markdown, no explanation):
{"twitter":"string","instagram":"string","reddit":"string","discord":"string","hackernews":"string"}`;

    const text = await chat([{ role: 'user', content: prompt }], { temperature: 0.8, max_tokens: 1200 });
    const parsed = parseLLMJson(text) as {
      twitter: string; instagram: string; reddit: string; discord: string; hackernews: string;
    };

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
