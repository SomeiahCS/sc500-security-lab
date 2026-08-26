const TRACKS = [
  ...window.SC500_TRACKS_1,
  ...window.SC500_TRACKS_2,
  ...window.SC500_TRACKS_3,
  ...window.SC500_TRACKS_4
];
const MODES = {
  beginner: {
    title: "Beginner",
    description: "Use simple mental models first, then add Microsoft cloud security controls.",
    field: "beginner"
  },
  exam: {
    title: "SC-500 Exam",
    description: "Focus on Microsoft wording, control selection and common exam traps.",
    field: "exam"
  },
  engineer: {
    title: "Security Engineer",
    description: "Focus on attack paths, operational use, telemetry and implementation choices.",
    field: "engineer"
  }
};

let state = {
  mode: "beginner",
  currentTrackId: localStorage.getItem("sc500-current-track") || "entra",
  flashIndex: 0,
  filtered: TRACKS
};

const progress = JSON.parse(localStorage.getItem("sc500-progress-v2") || "{}");
const scores = JSON.parse(localStorage.getItem("sc500-scores-v2") || "{}");
const flashCount = Number(localStorage.getItem("sc500-flashcards-v2") || 0);

const el = {
  trackList: document.getElementById("trackList"),
  trackDetail: document.getElementById("trackDetail"),
  flashcard: document.getElementById("flashcard"),
  flashFront: document.getElementById("flashFront"),
  flashBack: document.getElementById("flashBack"),
  flashcardTag: document.getElementById("flashcardTag"),
  revealFlash: document.getElementById("revealFlash"),
  nextFlash: document.getElementById("nextFlash"),
  quizBox: document.getElementById("quizBox"),
  trackSearch: document.getElementById("trackSearch"),
  modeButtons: document.querySelectorAll(".mode"),
  modeDescription: document.getElementById("modeDescription"),
  readinessValue: document.getElementById("readinessValue"),
  readinessRing: document.getElementById("readinessRing"),
  tracksDone: document.getElementById("tracksDone"),
  quizAverage: document.getElementById("quizAverage"),
  conceptCount: document.getElementById("conceptCount"),
  flashcardsSeen: document.getElementById("flashcardsSeen"),
  lessonsDone: document.getElementById("lessonsDone"),
  todayFocus: document.getElementById("todayFocus"),
  todaySummary: document.getElementById("todaySummary"),
  jumpToTrack: document.getElementById("jumpToTrack")
};

function getTrack(id){
  return TRACKS.find(t => t.id === id) || TRACKS[0];
}

function trackCompleted(id){
  return !!progress[id];
}

function saveProgress(){
  localStorage.setItem("sc500-progress-v2", JSON.stringify(progress));
}
function saveScores(){
  localStorage.setItem("sc500-scores-v2", JSON.stringify(scores));
}

function averageScore(){
  const vals = Object.values(scores);
  if(!vals.length) return 0;
  return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
}

function completedCount(){
  return Object.values(progress).filter(Boolean).length;
}

function updateStats(){
  const done = completedCount();
  const readiness = Math.round((done / TRACKS.length) * 100);
  el.readinessValue.textContent = `${readiness}%`;
  el.readinessRing.style.background = `conic-gradient(var(--accent) 0 ${readiness}%, #dbe6fb ${readiness}% 100%)`;
  el.tracksDone.textContent = done;
  el.quizAverage.textContent = `${averageScore()}%`;
  el.flashcardsSeen.textContent = localStorage.getItem("sc500-flashcards-v2") || "0";
  el.lessonsDone.textContent = done;
  el.conceptCount.textContent = TRACKS.length;
  const current = getTrack(state.currentTrackId);
  el.todayFocus.textContent = current.title;
  el.todaySummary.textContent = current.summary;
}

function renderTrackList(){
  el.trackList.innerHTML = "";
  state.filtered.forEach(track => {
    const btn = document.createElement("button");
    btn.className = `track-item ${track.id === state.currentTrackId ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="title">${track.number}. ${track.title}</span>
      <span class="mini">${track.area}</span>
      <span class="status">${trackCompleted(track.id) ? 'Completed' : 'Ready to study'}</span>
    `;
    btn.addEventListener("click", () => {
      state.currentTrackId = track.id;
      state.flashIndex = 0;
      localStorage.setItem("sc500-current-track", track.id);
      renderAll();
    });
    el.trackList.appendChild(btn);
  });
}

function renderTrackDetail(){
  const track = getTrack(state.currentTrackId);
  const modeField = MODES[state.mode].field;
  const isDone = trackCompleted(track.id);
  const percent = isDone ? 100 : 0;
  el.trackDetail.innerHTML = `
    <div class="track-header">
      <div>
        <p class="eyebrow">Track ${track.number}</p>
        <h2>${track.title}</h2>
        <p class="subtext">${track.summary}</p>
        <span class="pill">${track.area}</span>
      </div>
      <div>
        <div class="pill">Mode: ${MODES[state.mode].title}</div>
      </div>
    </div>

    <div class="progress-line"><span style="width:${percent}%"></span></div>
    <div class="track-actions">
      <button id="markComplete">${isDone ? 'Completed' : 'Mark track complete'}</button>
      <button class="ghost" id="resetTrack">Reset track</button>
    </div>

    <div class="grid-two">
      <div class="callout">
        <strong>Mental model</strong>
        <p>${track.mentalModel}</p>
      </div>
      <div class="callout">
        <strong>Why it matters</strong>
        <p>${track.why}</p>
      </div>
    </div>

    <div class="callout" style="margin-top:18px;">
      <strong>${MODES[state.mode].title} explanation</strong>
      <p>${track[modeField]}</p>
    </div>

    <div class="diagram">
      <div class="section-head slim">
        <div>
          <p class="eyebrow">Visual path</p>
          <h3>${track.title} flow</h3>
        </div>
      </div>
      <div class="diagram-flow">
        ${track.diagram.map((node, idx) => `<div class="node ${idx === 1 || idx === 2 ? 'emph' : ''}">${node}</div>${idx < track.diagram.length - 1 ? '<div class="arrow">→</div>' : ''}`).join('')}
      </div>
    </div>

    <div class="section-head" style="margin-top:18px;">
      <div>
        <p class="eyebrow">Core concepts</p>
        <h3>What to understand</h3>
      </div>
    </div>
    <div class="concept-list">
      ${track.concepts.map(([title, text]) => `<div class="concept"><h4>${title}</h4><p>${text}</p></div>`).join('')}
    </div>

    <div class="section-head" style="margin-top:18px;">
      <div>
        <p class="eyebrow">Exam traps</p>
        <h3>Do not confuse these</h3>
      </div>
    </div>
    <div class="exam-traps">
      ${track.traps.map(([a,b]) => `<div class="trap"><strong>${a}</strong><span>${b}</span></div>`).join('')}
    </div>

    <p class="small-note" style="margin-top:18px;">This study content is original and summarized to help you learn the official SC-500 objective areas faster.</p>
  `;

  document.getElementById("markComplete").addEventListener("click", () => {
    progress[track.id] = true;
    saveProgress();
    updateStats();
    renderTrackList();
    renderTrackDetail();
  });
  document.getElementById("resetTrack").addEventListener("click", () => {
    delete progress[track.id];
    delete scores[track.id];
    saveProgress();
    saveScores();
    updateStats();
    renderTrackList();
    renderTrackDetail();
    renderQuiz();
  });
}

function currentFlashcards(){
  return getTrack(state.currentTrackId).flashcards;
}

function renderFlash(hidden = true){
  const deck = currentFlashcards();
  const card = deck[state.flashIndex % deck.length];
  el.flashFront.textContent = card[0];
  el.flashBack.textContent = card[1];
  el.flashBack.hidden = hidden;
  el.flashcardTag.textContent = getTrack(state.currentTrackId).title;
}

function revealFlash(){
  el.flashBack.hidden = false;
  const total = Number(localStorage.getItem("sc500-flashcards-v2") || 0) + 1;
  localStorage.setItem("sc500-flashcards-v2", total);
  updateStats();
}

function renderQuiz(){
  const track = getTrack(state.currentTrackId);
  const quiz = track.quiz;
  el.quizBox.innerHTML = `<h3>${quiz.q}</h3>`;
  quiz.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", ()=>answerQuiz(idx));
    el.quizBox.appendChild(btn);
  });
}

function answerQuiz(choice){
  const track = getTrack(state.currentTrackId);
  const quiz = track.quiz;
  const buttons = [...el.quizBox.querySelectorAll(".quiz-option")];
  buttons.forEach((btn, idx)=>{
    btn.disabled = true;
    if(idx === quiz.answer) btn.classList.add("correct");
    if(idx === choice && idx !== quiz.answer) btn.classList.add("wrong");
  });
  const score = choice === quiz.answer ? 100 : 0;
  scores[track.id] = score;
  saveScores();
  updateStats();
  const p = document.createElement("p");
  p.className = "feedback";
  p.innerHTML = `${choice === quiz.answer ? '<strong>Correct.</strong>' : '<strong>Not quite.</strong>'} ${quiz.why}`;
  el.quizBox.appendChild(p);
}

function bindEvents(){
  el.revealFlash.addEventListener("click", revealFlash);
  el.flashcard.addEventListener("click", revealFlash);
  el.flashcard.addEventListener("keydown", e => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      revealFlash();
    }
  });
  el.nextFlash.addEventListener("click", ()=>{
    state.flashIndex += 1;
    renderFlash(true);
  });
  el.trackSearch.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    state.filtered = !q ? TRACKS : TRACKS.filter(track => {
      const hay = [track.title, track.summary, track.area, ...track.concepts.map(c=>c[0] + ' ' + c[1])].join(' ').toLowerCase();
      return hay.includes(q);
    });
    if(!state.filtered.some(t => t.id === state.currentTrackId) && state.filtered.length){
      state.currentTrackId = state.filtered[0].id;
    }
    renderAll();
  });
  el.modeButtons.forEach(btn => btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    el.modeButtons.forEach(b => b.classList.toggle("active", b === btn));
    el.modeDescription.textContent = MODES[state.mode].description;
    renderTrackDetail();
  }));
  el.jumpToTrack.addEventListener("click", () => {
    document.getElementById("trackDetail").scrollIntoView({behavior:"smooth", block:"start"});
  });
}

function renderAll(){
  renderTrackList();
  renderTrackDetail();
  renderFlash(true);
  renderQuiz();
  updateStats();
}

bindEvents();
renderAll();
