**LaunchPad AI**
A single-session web app that takes a GitHub repo URL and product description, then generates a personalized launch strategy — competitive analysis, positioning, channel recommendations, platform content, and a downloadable PDF brief.

**Stack**
Next.js 14 App Router + TypeScript
AI21 Labs (jamba-mini) via OpenAI-compatible API — swap any provider by changing 3 env vars
SerpAPI for competitive research (optional, degrades gracefully)
@react-pdf/renderer for PDF export


**How it works**
Step 0 — Paste a GitHub repo URL + product description
Step 1 — Competitive landscape: top competitors, weaknesses, positioning angle
Step 2 — Audience & tone: demographics, messaging tone, tagline
Step 3 — Launch strategy: prioritized channels, GitHub tips, opportunity note
Step 4 — Platform content: generate copy for Twitter, Instagram, Reddit, Discord, Hacker News (on-demand per platform)
Step 5 — Full launch brief with PDF download
