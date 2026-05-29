import { NextRequest, NextResponse } from 'next/server';
import { chat, parseLLMJson } from '@/lib/llm';
import type { Demographic } from '@/context/LaunchContext';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      productDescription: string;
      positioningAngle: string;
      demographics: Demographic[];
      tone: string;
    };
    const { productDescription, positioningAngle, demographics, tone } = body;

    const selectedDemos = demographics.filter(d => d.selected).map(d => d.label).join(', ');

    const prompt = `You are a growth strategist for indie/developer products.

Product description:
${productDescription}

Positioning angle: ${positioningAngle}
Target audience: ${selectedDemos}
Messaging tone: ${tone}

Return ONLY valid JSON (no markdown, no explanation):
{"channels":[{"name":"string","icon":"string","why":"string","priority":1,"isPrimary":true}],"githubTips":["string","string","string"],"opportunityNote":"string"}

Rules:
- Up to 5 channels, sorted by priority (1 = highest)
- isPrimary true for top 3 channels only
- icon: short text label or emoji (e.g. "𝕏", "r/", "PH", "GH", "DC", "LI")
- githubTips: exactly 3 actionable tips for improving GitHub presence
- opportunityNote: 1-2 sentences about a specific untapped opportunity`;

    const text = await chat([{ role: 'user', content: prompt }], { temperature: 0.4, max_tokens: 1000 });
    const parsed = parseLLMJson(text) as { channels: unknown; githubTips: unknown; opportunityNote: unknown };

    return NextResponse.json({
      channels: parsed.channels,
      githubTips: parsed.githubTips,
      opportunityNote: parsed.opportunityNote,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
