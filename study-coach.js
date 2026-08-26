(function initStudyCoach(){
  const studio=document.getElementById('lessonStudio');
  if(!studio)return;
  const CONF_KEY='sc500-confidence-v1';
  const HUNT_KEY='sc500-misconfig-hunts-v1';
  const SPRINT_KEY='sc500-sprint-v1';
  const FOCUS_KEY='sc500-focus-mode-v1';
  const nativeSetItem=localStorage.setItem.bind(localStorage);
  let rendering=false;
  let huntIndex=0;
  let sprintIndex=0;

  function parse(key){try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{return {}}}
  function currentTrack(){return typeof getTrack==='function'?getTrack(state.currentTrackId):null}
  function currentLesson(){const ls=typeof getLessons==='function'?getLessons():[];return ls[state.lessonIndex]||null}
  function currentLessonKey(){return `${state.currentTrackId}:${state.lessonIndex}`}
  function confidence(){return parse(CONF_KEY)}
  function hunts(){return parse(HUNT_KEY)}
  function sprint(){return parse(SPRINT_KEY)}

  function weakestLessons(){
    const c=confidence();
    const entries=[];
    Object.entries(LESSONS||{}).forEach(([trackId,lessons])=>lessons.forEach((lesson,i)=>{
      const key=`${trackId}:${i}`;
      const value=Number(c[key]||0);
      if(value<3) entries.push({trackId,i,title:lesson.title,value});
    }));
    return entries.slice(0,6);
  }

  function renderCoach(){
    if(rendering)return;
    rendering=true;
    const track=currentTrack(),lesson=currentLesson();
    if(!track||!lesson){rendering=false;return}
    let host=studio.querySelector('.study-coach');
    if(!host){host=document.createElement('section');host.className='study-coach';studio.appendChild(host)}
    const c=confidence()[currentLessonKey()]||0;
    const weak=weakestLessons();
    const huntSet=buildHunts(track,lesson);
    huntIndex=Math.min(huntIndex,huntSet.length-1);
    const hunt=huntSet[huntIndex];
    host.innerHTML=`
      <div class="coach-head">
        <div><p class="eyebrow">Study coach</p><h3>Turn understanding into recall</h3><p class="subtext">These activities target the mistakes that usually cost marks in scenario questions.</p></div>
        <button id="focusToggle" class="ghost">${document.body.classList.contains('focus-mode')?'Exit focus':'Focus mode'}</button>
      </div>

      <div class="coach-grid">
        <article class="coach-card">
          <p class="eyebrow">Confidence</p><h4>How well can you explain this?</h4>
          <div class="confidence-row">${[1,2,3,4].map(n=>`<button data-confidence="${n}" class="confidence-btn ${c===n?'active':''}">${['Need review','Recognize it','Can explain','Can teach'][n-1]}</button>`).join('')}</div>
          <p class="coach-note">Low-confidence lessons are automatically surfaced for revision.</p>
        </article>

        <article class="coach-card">
          <p class="eyebrow">Control compare</p><h4>${track.traps[0][0]}</h4>
          <div class="compare-box"><div><span>A</span><strong>${track.traps[0][0].split(' vs ')[0]||track.concepts[0][0]}</strong></div><div><span>B</span><strong>${track.traps[0][0].split(' vs ')[1]||track.concepts[1]?.[0]||track.title}</strong></div></div>
          <p>${track.traps[0][1]}</p>
          <button id="swapCompare" class="ghost">Say the difference out loud</button>
        </article>
      </div>

      <article class="coach-card hunt-card">
        <div class="coach-head slim"><div><p class="eyebrow">Find the misconfiguration</p><h4>${hunt.prompt}</h4></div><span class="pill">Challenge ${huntIndex+1}/${huntSet.length}</span></div>
        <div class="misconfig-grid">${hunt.options.map((o,i)=>`<button data-hunt="${i}" class="misconfig-option"><span>${o.label}</span><strong>${o.value}</strong></button>`).join('')}</div>
        <div id="huntFeedback" class="coach-feedback" hidden></div>
        <div class="actions"><button id="nextHunt" class="secondary">Next challenge</button></div>
      </article>

      <article class="coach-card">
        <div class="coach-head slim"><div><p class="eyebrow">60-second recall</p><h4>Explain without looking</h4></div><span id="recallTimer" class="pill">60s</span></div>
        <p>Explain <strong>${lesson.title}</strong>, where it lives in Azure, one common misconfiguration, and how you would verify it.</p>
        <div class="actions"><button id="startRecall">Start timer</button><button id="showRecall" class="secondary">Show checklist</button></div>
        <div id="recallChecklist" class="coach-feedback" hidden>✓ What it does &nbsp; ✓ When to use it &nbsp; ✓ Where it is configured &nbsp; ✓ One attack path &nbsp; ✓ One verification method</div>
      </article>

      <article class="coach-card">
        <div class="coach-head slim"><div><p class="eyebrow">Weak-area review</p><h4>Next best lessons</h4></div><span class="pill">Adaptive</span></div>
        <div class="weak-list">${weak.length?weak.map(w=>`<button class="weak-item" data-track="${w.trackId}" data-lesson="${w.i}"><strong>${getTrack(w.trackId).title}</strong><span>${w.title} · ${w.value?['','Need review','Recognize it'][w.value]:'Not rated'}</span></button>`).join(''):'<p class="subtext">Rate lessons to build a revision queue.</p>'}</div>
      </article>

      <article class="coach-card sprint-card">
        <div class="coach-head slim"><div><p class="eyebrow">Exam sprint</p><h4>Five rapid decisions</h4></div><span class="pill">2–3 min</span></div>
        <div id="sprintBox"></div>
        <div class="actions"><button id="startSprint">Start / restart sprint</button></div>
      </article>`;

    bindCoach(track,lesson,huntSet,hunt);
    rendering=false;
  }

  function buildHunts(track,lesson){
    const base=[
      {prompt:`Which setting creates the biggest risk around ${lesson.title}?`,options:[
        {label:'A',value:'Broad access with little verification',bad:true,why:'Overly broad access increases blast radius and weakens accountability.'},
        {label:'B',value:'Least privilege + monitoring',bad:false,why:'This is the safer baseline.'},
        {label:'C',value:'Scoped access + explicit ownership',bad:false,why:'This improves governance and control.'}
      ]},
      {prompt:`Which design choice should trigger a security review?`,options:[
        {label:'A',value:`${track.title} reachable more broadly than required`,bad:true,why:'Unnecessary exposure increases attack surface.'},
        {label:'B',value:'Private or restricted path where practical',bad:false,why:'Reduced exposure is usually preferable.'},
        {label:'C',value:'Logging enabled for verification',bad:false,why:'Monitoring helps detect misuse and validate controls.'}
      ]},
      {prompt:'Which operational habit is weakest?',options:[
        {label:'A',value:'Enable a control and never verify logs/effective configuration',bad:true,why:'A control that is not verified can silently fail or be bypassed.'},
        {label:'B',value:'Test safely, then enforce',bad:false,why:'Controlled rollout reduces accidental outages.'},
        {label:'C',value:'Review permissions and exceptions regularly',bad:false,why:'Periodic review limits privilege creep.'}
      ]}
    ];
    return base;
  }

  function bindCoach(track,lesson,huntSet,hunt){
    studio.querySelectorAll('[data-confidence]').forEach(b=>b.addEventListener('click',()=>{
      const obj=confidence();obj[currentLessonKey()]=Number(b.dataset.confidence);nativeSetItem(CONF_KEY,JSON.stringify(obj));renderCoach();
    }));
    const focus=document.getElementById('focusToggle');if(focus)focus.addEventListener('click',()=>{document.body.classList.toggle('focus-mode');nativeSetItem(FOCUS_KEY,document.body.classList.contains('focus-mode')?'1':'0');renderCoach()});
    studio.querySelectorAll('[data-hunt]').forEach(b=>b.addEventListener('click',()=>{
      const idx=Number(b.dataset.hunt);const selected=hunt.options[idx];const feedback=document.getElementById('huntFeedback');
      studio.querySelectorAll('[data-hunt]').forEach((x,i)=>{x.disabled=true;if(hunt.options[i].bad)x.classList.add('wrong');else if(i===idx)x.classList.add('correct')});
      feedback.hidden=false;feedback.innerHTML=`<strong>${selected.bad?'Correct — risky configuration found.':'Safer choice.'}</strong> ${selected.why}`;
      const h=hunts();h[currentLessonKey()]=(h[currentLessonKey()]||0)+1;nativeSetItem(HUNT_KEY,JSON.stringify(h));
      localStorage.setItem('sc500-checks-v3',Number(localStorage.getItem('sc500-checks-v3')||0)+1);
      if(typeof updateStats==='function')updateStats();
    }));
    const next=document.getElementById('nextHunt');if(next)next.addEventListener('click',()=>{huntIndex=(huntIndex+1)%huntSet.length;renderCoach()});
    const checklist=document.getElementById('showRecall');if(checklist)checklist.addEventListener('click',()=>document.getElementById('recallChecklist').hidden=false);
    const start=document.getElementById('startRecall');if(start)start.addEventListener('click',()=>startTimer());
    studio.querySelectorAll('.weak-item').forEach(b=>b.addEventListener('click',()=>{
      state.currentTrackId=b.dataset.track;state.lessonIndex=Number(b.dataset.lesson);localStorage.setItem('sc500-current-track',state.currentTrackId);localStorage.setItem('sc500-current-lesson',String(state.lessonIndex));renderAll();setTimeout(()=>studio.scrollIntoView({behavior:'smooth',block:'start'}),50);
    }));
    const sprintBtn=document.getElementById('startSprint');if(sprintBtn)sprintBtn.addEventListener('click',()=>{sprintIndex=0;renderSprint()});
    const say=document.getElementById('swapCompare');if(say)say.addEventListener('click',()=>{say.textContent='Now give one example for each ✓';say.disabled=true});
  }

  function startTimer(){
    let left=60;const out=document.getElementById('recallTimer'),btn=document.getElementById('startRecall');if(!out||!btn)return;btn.disabled=true;out.textContent='60s';
    const timer=setInterval(()=>{left--;out.textContent=`${left}s`;if(left<=0){clearInterval(timer);out.textContent='Done';btn.disabled=false;document.getElementById('recallChecklist').hidden=false}},1000);
  }

  function sprintQuestions(){
    const all=[];
    TRACKS.forEach(t=>{
      (LESSONS[t.id]||[]).forEach((l,i)=>all.push({track:t,q:l.check.q,o:l.check.o,a:l.check.a,w:l.check.w}));
      all.push({track:t,q:t.quiz.q,o:t.quiz.options,a:t.quiz.answer,w:t.quiz.why});
    });
    const start=Math.abs(hashCode(currentLessonKey()))%all.length;
    return Array.from({length:5},(_,i)=>all[(start+i*7)%all.length]);
  }
  function hashCode(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)|0;return h}
  function renderSprint(){
    const box=document.getElementById('sprintBox');if(!box)return;const qs=sprintQuestions();const q=qs[sprintIndex];
    box.innerHTML=`<p class="small-note">Question ${sprintIndex+1}/5 · ${q.track.title}</p><h4>${q.q}</h4><div>${q.o.map((o,i)=>`<button class="sprint-option" data-sprint="${i}">${o}</button>`).join('')}</div><div id="sprintFeedback" class="coach-feedback" hidden></div>`;
    box.querySelectorAll('[data-sprint]').forEach(b=>b.addEventListener('click',()=>{
      const choice=Number(b.dataset.sprint),correct=choice===q.a,fb=document.getElementById('sprintFeedback');
      box.querySelectorAll('[data-sprint]').forEach((x,i)=>{x.disabled=true;if(i===q.a)x.classList.add('correct');if(i===choice&&i!==q.a)x.classList.add('wrong')});
      fb.hidden=false;fb.innerHTML=`<strong>${correct?'Correct.':'Not quite.'}</strong> ${q.w}`;
      const s=sprint();s.attempts=(s.attempts||0)+1;s.correct=(s.correct||0)+(correct?1:0);nativeSetItem(SPRINT_KEY,JSON.stringify(s));
      setTimeout(()=>{if(sprintIndex<4){sprintIndex++;renderSprint()}else{const acc=Math.round((s.correct||0)/(s.attempts||1)*100);box.innerHTML=`<div class="sprint-result"><strong>Sprint complete</strong><span>${acc}% lifetime sprint accuracy</span></div>`}},900);
    }));
  }

  if(localStorage.getItem(FOCUS_KEY)==='1')document.body.classList.add('focus-mode');
  const observer=new MutationObserver(()=>{if(!rendering)queueMicrotask(renderCoach)});
  observer.observe(studio,{childList:true,subtree:false});
  queueMicrotask(renderCoach);
})();
