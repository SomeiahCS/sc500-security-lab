import {json} from './auth.js';
import {cleanId,cleanLessonId,readState,safeJson} from './db.js';

export async function handleProgressApi(request,env,path,email){
  if(path==='/app-api/state'&&request.method==='GET') return readState(env.DB,email);

  if(path==='/app-api/progress'&&request.method==='POST'){
    const body=await safeJson(request),id=cleanId(body?.track_id);
    if(!id)return json({error:'Invalid track_id'},400);
    await env.DB.prepare("INSERT INTO user_progress(user_email,track_id,completed,updated_at) VALUES(?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(user_email,track_id) DO UPDATE SET completed=excluded.completed,updated_at=CURRENT_TIMESTAMP").bind(email,id,body?.completed===true?1:0).run();
    return json({ok:true});
  }

  if(path==='/app-api/lesson'&&request.method==='POST'){
    const body=await safeJson(request),id=cleanLessonId(body?.lesson_id);
    if(!id)return json({error:'Invalid lesson_id'},400);
    await env.DB.prepare("INSERT INTO lesson_progress(user_email,lesson_id,completed,updated_at) VALUES(?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(user_email,lesson_id) DO UPDATE SET completed=excluded.completed,updated_at=CURRENT_TIMESTAMP").bind(email,id,body?.completed===true?1:0).run();
    return json({ok:true});
  }

  if(path==='/app-api/confidence'&&request.method==='POST'){
    const body=await safeJson(request),id=cleanLessonId(body?.lesson_id),c=Number(body?.confidence);
    if(!id||!Number.isInteger(c)||c<1||c>4)return json({error:'Invalid confidence payload'},400);
    await env.DB.prepare("INSERT INTO lesson_confidence(user_email,lesson_id,confidence,updated_at) VALUES(?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(user_email,lesson_id) DO UPDATE SET confidence=excluded.confidence,updated_at=CURRENT_TIMESTAMP").bind(email,id,c).run();
    return json({ok:true});
  }

  if(path==='/app-api/quiz'&&request.method==='POST'){
    const body=await safeJson(request),id=cleanId(body?.track_id),score=Number(body?.score);
    if(!id||!Number.isFinite(score)||score<0||score>100)return json({error:'Invalid quiz payload'},400);
    await env.DB.prepare("INSERT INTO quiz_scores(user_email,track_id,score,attempts,updated_at) VALUES(?,?,?,1,CURRENT_TIMESTAMP) ON CONFLICT(user_email,track_id) DO UPDATE SET score=excluded.score,attempts=quiz_scores.attempts+1,updated_at=CURRENT_TIMESTAMP").bind(email,id,Math.round(score)).run();
    return json({ok:true});
  }

  if(path==='/app-api/flashcards'&&request.method==='POST'){
    const body=await safeJson(request),inc=Math.max(1,Math.min(20,Number(body?.increment||1)));
    await env.DB.prepare("INSERT INTO user_stats(user_email,reviewed_count,updated_at) VALUES(?,?,CURRENT_TIMESTAMP) ON CONFLICT(user_email) DO UPDATE SET reviewed_count=user_stats.reviewed_count+excluded.reviewed_count,updated_at=CURRENT_TIMESTAMP").bind(email,inc).run();
    return json({ok:true});
  }

  return null;
}
