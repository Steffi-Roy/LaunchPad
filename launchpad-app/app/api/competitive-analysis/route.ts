import { NextRequest, NextResponse } from 'next/server';
import { chat, parseLLMJson } from '@/lib/llm';

export const maxDuration = 60;

async function searchSerpAPI(query: string): Promise<string> {
  const key = process.env.SERP_API_KEY;
  if (!key || key === 'your_key_here') return '';
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${key}&num=5`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return '';
    const data = await res.json() as { organic_results?: Array<{ title?: string; snippet?: string }> };
    return (data.organic_results ?? []).slice(0, 5)
      .map(r => `${r.title ?? ''}: ${r.snippet ?? ''}`)
      .join('\n');
  } catch {
    return '';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { productDescription: string; readme: string };
    const { productDescription, readme } = body;

    const keywords = productDescription.slice(0, 100);
    const [search1, search2] = await Promise.all([
      searchSerpAPI(`alternatives to ${keywords}`),
      searchSerpAPI(`similar tools ${keywords}`),
    ]);
    const searchContext = [search1, search2].filter(Boolean).join('\n\n');

    const prompt = searchContext
      ? `You are a startup market researcher. Given this product description and web search results, identify the top 3 competitors.

Product description:
${productDescription}

README excerpt:
${readme.slice(0, 1000)}

Web search results:
${searchContext}

Return ONLY valid JSON (no markdown, no explanation):
{"competitors":[{"name":"string","description":"string","weakness":"string"}],"positioningAngle":"string"}`
      : `You are a startup market researcher. Given this product description, identify the top 3 likely competitors and a unique positioning angle.

Product description:
${productDescription}

README excerpt:
${readme.slice(0, 1000)}

Return ONLY valid JSON (no markdown, no explanation):
{"competitors":[{"name":"string","description":"string","weakness":"string"}],"positioningAngle":"string"}`;

    const text = await chat([{ role: 'user', content: prompt }], { temperature: 0.3, max_tokens: 1000 });
    const parsed = parseLLMJson(text) as Record<string, unknown>;

    // Normalise key casing — some models return "Competitors" or other variants
    const competitors = parsed.competitors ?? parsed.Competitors ?? [];
    const positioningAngle = parsed.positioningAngle ?? parsed.positioning_angle ?? parsed.angle ?? '';

    if (!Array.isArray(competitors)) throw new Error('LLM returned unexpected format for competitors');

    return NextResponse.json({ competitors, positioningAngle });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
