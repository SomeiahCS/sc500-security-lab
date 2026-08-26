const CLOUD_SYNC_FLAG = 'sc500-cloud-sync-loaded';
const nativeSetItem = localStorage.setItem.bind(localStorage);

function parseObject(value) {
  try { return JSON.parse(value || '{}') || {}; } catch { return {}; }
}

async function postJson(path, body) {
  try {
    await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'same-origin'
    });
  } catch (error) {
    console.warn('Cloud progress sync deferred:', error);
  }
}

localStorage.setItem = function(key, value) {
  const previous = localStorage.getItem(key);
  nativeSetItem(key, value);

  if (key === 'sc500-progress-v2') {
    const before = parseObject(previous);
    const after = parseObject(value);
    const ids = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const trackId of ids) {
      if (!!before[trackId] !== !!after[trackId]) {
        postJson('/api/progress', { track_id: trackId, completed: !!after[trackId] });
      }
    }
  }

  if (key === 'sc500-scores-v2') {
    const before = parseObject(previous);
    const after = parseObject(value);
    for (const [trackId, score] of Object.entries(after)) {
      if (before[trackId] !== score) {
        postJson('/api/quiz', { track_id: trackId, score: Number(score) });
      }
    }
  }

  if (key === 'sc500-flashcards-v2') {
    const oldCount = Number(previous || 0);
    const newCount = Number(value || 0);
    const increment = newCount - oldCount;
    if (increment > 0) postJson('/api/flashcards', { increment });
  }
};

async function loadCloudState() {
  if (sessionStorage.getItem(CLOUD_SYNC_FLAG) === '1') return;

  try {
    const response = await fetch('/api/state', { credentials: 'same-origin', cache: 'no-store' });
    if (!response.ok) return;
    const cloud = await response.json();

    const localProgress = parseObject(localStorage.getItem('sc500-progress-v2'));
    const localScores = parseObject(localStorage.getItem('sc500-scores-v2'));
    const mergedProgress = { ...localProgress, ...(cloud.progress || {}) };
    const mergedScores = { ...localScores, ...(cloud.scores || {}) };
    const mergedFlash = Math.max(Number(localStorage.getItem('sc500-flashcards-v2') || 0), Number(cloud.flashcards || 0));

    const progressChanged = JSON.stringify(localProgress) !== JSON.stringify(mergedProgress);
    const scoresChanged = JSON.stringify(localScores) !== JSON.stringify(mergedScores);
    const flashChanged = Number(localStorage.getItem('sc500-flashcards-v2') || 0) !== mergedFlash;

    if (progressChanged) nativeSetItem('sc500-progress-v2', JSON.stringify(mergedProgress));
    if (scoresChanged) nativeSetItem('sc500-scores-v2', JSON.stringify(mergedScores));
    if (flashChanged) nativeSetItem('sc500-flashcards-v2', String(mergedFlash));

    sessionStorage.setItem(CLOUD_SYNC_FLAG, '1');
    if (progressChanged || scoresChanged || flashChanged) window.location.reload();
  } catch (error) {
    console.warn('Using local-only progress for now:', error);
  }
}

loadCloudState();
