import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

function extractOwnerRepo(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('github.com')) return null;
    const parts = u.pathname.replace(/^\//, '').replace(/\/$/, '').split('/');
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { repoUrl: string };
    const { repoUrl } = body;

    if (!repoUrl) {
      return NextResponse.json({ error: 'repoUrl is required' }, { status: 400 });
    }

    const parsed = extractOwnerRepo(repoUrl);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
    }

    const { owner, repo } = parsed;
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'LaunchPad-AI',
    };

    if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'your_token_here') {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const readmeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers, signal: AbortSignal.timeout(30000) }
    );

    let readme = '';
    if (readmeRes.ok) {
      readme = await readmeRes.text();
      // Truncate to 4000 chars to avoid token limits
      if (readme.length > 4000) readme = readme.slice(0, 4000) + '\n...[truncated]';
    }

    return NextResponse.json({ readme, repoName: repo });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
