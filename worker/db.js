import {json} from './auth.js';

export async function ensureSchema(db){
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS user_progress (user_email TEXT NOT NULL, track_id TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_email, track_id))"),
    db.prepare("CREATE TABLE IF NOT EXISTS lesson_progress (user_email TEXT NOT NULL, lesson_id TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_email, lesson_id))"),
    db.prepare("CREATE TABLE IF NOT EXISTS lesson_confidence (user_email TEXT NOT NULL, lesson_id TEXT NOT NULL, confidence INTEGER NOT NULL DEFAULT 1 CHECK(confidence BETWEEN 1 AND 4), updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_email, lesson_id))"),
    db.prepare("CREATE TABLE IF NOT EXISTS quiz_scores (user_email TEXT NOT NULL, track_id TEXT NOT NULL, score INTEGER NOT NULL DEFAULT 0, attempts INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_email, track_id))"),
    db.prepare("CREATE TABLE IF NOT EXISTS user_stats (user_email TEXT PRIMARY KEY, reviewed_count INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    db.prepare("CREATE TABLE IF NOT EXISTS app_users (email TEXT PRIMARY KEY, password_hash TEXT NOT NULL, salt TEXT NOT NULL, iterations INTEGER NOT NULL, role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user','admin')), disabled INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    db.prepare("CREATE TABLE IF NOT EXISTS app_sessions (token_hash TEXT PRIMARY KEY, user_email TEXT NOT NULL, csrf_hash TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, user_agent_hash TEXT)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_app_sessions_user ON app_sessions(user_email)"),
    db.prepare("CREATE TABLE IF NOT EXISTS app_invitations (token_hash TEXT PRIMARY KEY, email TEXT NOT NULL, created_by TEXT, expires_at INTEGER NOT NULL, used_at TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_app_invites_email ON app_invitations(email)"),
    db.prepare("CREATE TABLE IF NOT EXISTS app_rate_limits (rate_key TEXT PRIMARY KEY, attempts INTEGER NOT NULL DEFAULT 0, window_start INTEGER NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS app_audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, actor_email TEXT, action TEXT NOT NULL, ip_hash TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)")
  ]);
}

export async function readState(db,email){
  const [p,l,q,c,f]=await Promise.all([
    db.prepare('SELECT track_id,completed FROM user_progress WHERE user_email=?').bind(email).all(),
    db.prepare('SELECT lesson_id,completed FROM lesson_progress WHERE user_email=?').bind(email).all(),
    db.prepare('SELECT track_id,score FROM quiz_scores WHERE user_email=?').bind(email).all(),
    db.prepare('SELECT lesson_id,confidence FROM lesson_confidence WHERE user_email=?').bind(email).all(),
    db.prepare('SELECT reviewed_count FROM user_stats WHERE user_email=?').bind(email).first()
  ]);
  const progress={},lessons={},scores={},confidence={};
  for(const r of p.results||[])progress[r.track_id]=!!r.completed;
  for(const r of l.results||[])lessons[r.lesson_id]=!!r.completed;
  for(const r of q.results||[])scores[r.track_id]=r.score;
  for(const r of c.results||[])confidence[r.lesson_id]=r.confidence;
  return json({progress,lessons,scores,confidence,flashcards:Number(f?.reviewed_count||0)});
}

export function cleanId(v){if(typeof v!=='string')return null;const s=v.trim();return /^[a-z0-9_-]{1,64}$/i.test(s)?s:null;}
export function cleanLessonId(v){if(typeof v!=='string')return null;const s=v.trim();return /^[a-z0-9_-]+:[0-9]{1,3}$/i.test(s)?s:null;}
export async function safeJson(request){try{return await request.json();}catch{return null;}}
