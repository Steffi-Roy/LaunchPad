interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LLMOptions {
  temperature?: number;
  max_tokens?: number;
}

export async function chat(messages: ChatMessage[], options: LLMOptions = {}): Promise<string> {
  const baseUrl = (process.env.LLM_BASE_URL ?? 'https://openrouter.ai/api/v1').replace(/\/$/, '');
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL ?? 'mistralai/mistral-7b-instruct:free';

  if (!apiKey) throw new Error('LLM_API_KEY is not set in environment variables');

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.4,
      max_tokens: options.max_tokens ?? 1000,
    }),
    signal: AbortSignal.timeout(55000),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LLM API error ${res.status}: ${body}`);
  }

  const data = await res.json() as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message?: string };
  };

  if (data.error?.message) throw new Error(data.error.message);

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from LLM');
  return content;
}

export function parseLLMJson(text: string): unknown {
  const { jsonrepair } = require('jsonrepair') as { jsonrepair: (s: string) => string };

  // Strip markdown code fences
  let s = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();

  // Extract the first complete JSON object or array
  const start = s.search(/[{\[]/);
  if (start !== -1) {
    const opener = s[start];
    const closer = opener === '{' ? '}' : ']';
    let depth = 0;
    let end = -1;
    for (let i = start; i < s.length; i++) {
      if (s[i] === opener) depth++;
      else if (s[i] === closer) { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end !== -1) s = s.slice(start, end + 1);
  }

  // Try strict parse first, fall back to repair for malformed LLM output
  try {
    return JSON.parse(s);
  } catch {
    return JSON.parse(jsonrepair(s));
  }
}
