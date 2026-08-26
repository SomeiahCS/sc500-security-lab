export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    if (!ctx.access) return json({ error: 'Access authentication required' }, 401);

    const identity = await ctx.access.getIdentity();
    const email = identity?.email;
    if (!email) return json({ error: 'Authenticated identity has no email' }, 403);

    await ensureSchema(env.DB);

    if (url.pathname === '/api/me' && request.method === 'GET') {
      return json({ email, name: identity?.name || null });
    }

    if (url.pathname === '/api/state' && request.method === 'GET') {
      const [progressRows, lessonRows, quizRows, flashRow] = await Promise.all([
        env.DB.prepare('SELECT track_id, completed FROM user_progress WHERE user_email = ?').bind(email).all(),
        env.DB.prepare('SELECT lesson_id, completed FROM lesson_progress WHERE user_email = ?').bind(email).all(),
        env.DB.prepare('SELECT track_id, score FROM quiz_scores WHERE user_email = ?').bind(email).all(),
        env.DB.prepare('SELECT reviewed_count FROM user_stats WHERE user_email = ?').bind(email).first()
      ]);

      const progress = {};
      for (const row of progressRows.results || []) progress[row.track_id] = !!row.completed;
      const lessons = {};
      for (const row of lessonRows.results || []) lessons[row.lesson_id] = !!row.completed;
      const scores = {};
      for (const row of quizRows.results || []) scores[row.track_id] = row.score;

      return json({ progress, lessons, scores, flashcards: Number(flashRow?.reviewed_count || 0) });
    }

    if (url.pathname === '/api/progress' && request.method === 'POST') {
      const body = await safeJson(request);
      const trackId = cleanId(body?.track_id);
      if (!trackId) return json({ error: 'Invalid track_id' }, 400);
      await env.DB.prepare(`
        INSERT INTO user_progress (user_email, track_id, completed, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_email, track_id) DO UPDATE SET completed = excluded.completed, updated_at = CURRENT_TIMESTAMP
      `).bind(email, trackId, body?.completed === true ? 1 : 0).run();
      return json({ ok: true });
    }

    if (url.pathname === '/api/lesson' && request.method === 'POST') {
      const body = await safeJson(request);
      const lessonId = cleanLessonId(body?.lesson_id);
      if (!lessonId) return json({ error: 'Invalid lesson_id' }, 400);
      await env.DB.prepare(`
        INSERT INTO lesson_progress (user_email, lesson_id, completed, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_email, lesson_id) DO UPDATE SET completed = excluded.completed, updated_at = CURRENT_TIMESTAMP
      `).bind(email, lessonId, body?.completed === true ? 1 : 0).run();
      return json({ ok: true });
    }

    if (url.pathname === '/api/quiz' && request.method === 'POST') {
      const body = await safeJson(request);
      const trackId = cleanId(body?.track_id);
      const score = Number(body?.score);
      if (!trackId || !Number.isFinite(score) || score < 0 || score > 100) return json({ error: 'Invalid quiz payload' }, 400);
      await env.DB.prepare(`
        INSERT INTO quiz_scores (user_email, track_id, score, attempts, updated_at)
        VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(user_email, track_id) DO UPDATE SET score = excluded.score, attempts = quiz_scores.attempts + 1, updated_at = CURRENT_TIMESTAMP
      `).bind(email, trackId, Math.round(score)).run();
      return json({ ok: true });
    }

    if (url.pathname === '/api/flashcards' && request.method === 'POST') {
      const body = await safeJson(request);
      const increment = Math.max(1, Math.min(20, Number(body?.increment || 1)));
      await env.DB.prepare(`
        INSERT INTO user_stats (user_email, reviewed_count, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_email) DO UPDATE SET reviewed_count = user_stats.reviewed_count + excluded.reviewed_count, updated_at = CURRENT_TIMESTAMP
      `).bind(email, increment).run();
      return json({ ok: true });
    }

    return json({ error: 'Not found' }, 404);
  }
};

async function ensureSchema(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS user_progress (
      user_email TEXT NOT NULL,
      track_id TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_email, track_id)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS lesson_progress (
      user_email TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_email, lesson_id)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS quiz_scores (
      user_email TEXT NOT NULL,
      track_id TEXT NOT NULL,
      score INTEGER NOT NULL DEFAULT 0,
      attempts INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_email, track_id)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS user_stats (
      user_email TEXT PRIMARY KEY,
      reviewed_count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`)
  ]);
}

function cleanId(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return /^[a-z0-9_-]{1,64}$/i.test(trimmed) ? trimmed : null;
}

function cleanLessonId(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return /^[a-z0-9_-]+:[0-9]{1,3}$/i.test(trimmed) ? trimmed : null;
}

async function safeJson(request) {
  try { return await request.json(); } catch { return null; }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}
