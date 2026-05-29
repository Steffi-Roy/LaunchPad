import { NextRequest, NextResponse } from 'next/server';
import { chat, parseLLMJson } from '@/lib/llm';
import type { Competitor } from '@/context/LaunchContext';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      productDescription: string;
      readme: string;
      competitors: Competitor[];
      positioningAngle: string;
    };
    const { productDescription, readme, competitors, positioningAngle } = body;

    const competitorSummary = competitors
      .map(c => `- ${c.name}: ${c.description} (weakness: ${c.weakness})`)
      .join('\n');

    const prompt = `You are a marketing strategist for developer tools and indie products.

Product description:
${productDescription}

README excerpt:
${readme.slice(0, 800)}

Competitors:
${competitorSummary}

Positioning angle: ${positioningAngle}

Return ONLY valid JSON (no markdown, no explanation):
{"demographics":[{"label":"string","selected":true}],"tone":"string","positioningStatement":"string","tagline":"string"}

Rules:
- Include exactly 6-8 demographic options, 2-3 pre-selected based on the product
- Choose labels from: solo founders, indie hackers, design teams, remote teams, freelancers, startup CTOs, open source devs, students, developers, product managers, small business owners, content creators
- tone must be one of: raw / technical, conversational, bold, minimal, playful
- positioningStatement: 1-2 sentences max
- tagline: under 10 words`;

    const text = await chat([{ role: 'user', content: prompt }], { temperature: 0.4, max_tokens: 1000 });
    const parsed = parseLLMJson(text) as {
      demographics: unknown; tone: unknown; positioningStatement: unknown; tagline: unknown;
    };

    return NextResponse.json({
      demographics: parsed.demographics,
      tone: parsed.tone,
      positioningStatement: parsed.positioningStatement,
      tagline: parsed.tagline,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
