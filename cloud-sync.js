const CLOUD_SYNC_FLAG = 'sc500-cloud-sync-loaded';
const nativeSetItem = localStorage.setItem.bind(localStorage);

function parseObject(value) {
  try { return JSON.parse(value || '{}') || {}; } catch { return {}; }
}

async function postJson(path, body) {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-csrf-token': window.SC500_AUTH?.csrfToken?.() || '' },
      body: JSON.stringify(body),
      credentials: 'same-origin'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    console.warn('Cloud progress sync deferred:', error);
  }
}

localStorage.setItem = function(key, value) {
  const previous = localStorage.getItem(key);
  nativeSetItem(key, value);

  if (key === 'sc500-progress-v3') {
    const before = parseObject(previous);
    const after = parseObject(value);
    const ids = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const trackId of ids) if (!!before[trackId] !== !!after[trackId]) postJson('/app-api/progress', { track_id: trackId, completed: !!after[trackId] });
  }

  if (key === 'sc500-lessons-v3') {
    const before = parseObject(previous);
    const after = parseObject(value);
    const ids = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const lessonId of ids) if (!!before[lessonId] !== !!after[lessonId]) postJson('/app-api/lesson', { lesson_id: lessonId, completed: !!after[lessonId] });
  }

  if (key === 'sc500-confidence-v1') {
    const before = parseObject(previous);
    const after = parseObject(value);
    for (const [lessonId, confidence] of Object.entries(after)) {
      if (before[lessonId] !== confidence) postJson('/app-api/confidence', { lesson_id: lessonId, confidence: Number(confidence) });
    }
  }

  if (key === 'sc500-scores-v3') {
    const before = parseObject(previous);
    const after = parseObject(value);
    for (const [trackId, score] of Object.entries(after)) if (before[trackId] !== score) postJson('/app-api/quiz', { track_id: trackId, score: Number(score) });
  }

  if (key === 'sc500-flashcards-v3') {
    const increment = Number(value || 0) - Number(previous || 0);
    if (increment > 0) postJson('/app-api/flashcards', { increment });
  }
};

async function loadCloudState() {
  if (sessionStorage.getItem(CLOUD_SYNC_FLAG) === '1') return;
  try {
    const response = await fetch('/app-api/state', { credentials: 'same-origin', cache: 'no-store' });
    if (!response.ok) return;
    const cloud = await response.json();
    const localProgress = parseObject(localStorage.getItem('sc500-progress-v3'));
    const localLessons = parseObject(localStorage.getItem('sc500-lessons-v3'));
    const localScores = parseObject(localStorage.getItem('sc500-scores-v3'));
    const localConfidence = parseObject(localStorage.getItem('sc500-confidence-v1'));
    const mergedProgress = { ...localProgress, ...(cloud.progress || {}) };
    const mergedLessons = { ...localLessons, ...(cloud.lessons || {}) };
    const mergedScores = { ...localScores, ...(cloud.scores || {}) };
    const mergedConfidence = { ...localConfidence, ...(cloud.confidence || {}) };
    const mergedFlash = Math.max(Number(localStorage.getItem('sc500-flashcards-v3') || 0), Number(cloud.flashcards || 0));
    const changed = JSON.stringify(localProgress)!==JSON.stringify(mergedProgress) || JSON.stringify(localLessons)!==JSON.stringify(mergedLessons) || JSON.stringify(localScores)!==JSON.stringify(mergedScores) || JSON.stringify(localConfidence)!==JSON.stringify(mergedConfidence) || Number(localStorage.getItem('sc500-flashcards-v3')||0)!==mergedFlash;
    nativeSetItem('sc500-progress-v3', JSON.stringify(mergedProgress));
    nativeSetItem('sc500-lessons-v3', JSON.stringify(mergedLessons));
    nativeSetItem('sc500-scores-v3', JSON.stringify(mergedScores));
    nativeSetItem('sc500-confidence-v1', JSON.stringify(mergedConfidence));
    nativeSetItem('sc500-flashcards-v3', String(mergedFlash));
    sessionStorage.setItem(CLOUD_SYNC_FLAG, '1');
    if (changed) window.location.reload();
  } catch (error) {
    console.warn('Using local-only progress for now:', error);
  }
}

loadCloudState();
