// Cyber Snake & Ladder – Multi-Level Game Engine
(function(){
window.CyberArcadeGames = window.CyberArcadeGames || {};
const LEVELS = window.SL_LEVELS || [];
let LVL, canvas, ctx, p1=1, p2=1, turn='p1', dice=0, anim=false, over=false, score=0, qIdx=0, usedQ=[];
let mode = 'solo';
let answerStreak = 0;
let longestStreak = 0;
const MISSION_MIN_QUESTIONS = 12;
const CELL=60, BOARD=10, W=600;

function startLevel(lvl, selectedMode){
  mode = selectedMode || mode || 'solo';
  LVL=lvl; p1=1; p2=1; turn='p1'; dice=0; anim=false; over=false; score=0; qIdx=0; usedQ=[]; answerStreak=0; longestStreak=0;
  const container=document.getElementById('gameContainer');
  container.innerHTML=buildUI();
  canvas=document.getElementById('slCanvas');
  if(!canvas)return;
  ctx=canvas.getContext('2d');
  canvas.width=W; canvas.height=W;
  draw(); updateHUD();
  document.getElementById('slRollBtn').onclick=roll;
}

function pos2xy(n){
  const r=Math.floor((100-n)/BOARD), c=(100-n)%BOARD;
  const ac=r%2===0?c:BOARD-1-c;
  return {x:ac*CELL+CELL/2, y:r*CELL+CELL/2};
}

function draw(){
  if(!ctx)return;
  ctx.fillStyle=LVL.boardBg; ctx.fillRect(0,0,W,W);
  // Grid
  ctx.strokeStyle=LVL.gridColor; ctx.lineWidth=1.5;
  for(let i=0;i<=BOARD;i++){
    ctx.beginPath();ctx.moveTo(i*CELL,0);ctx.lineTo(i*CELL,W);ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,i*CELL);ctx.lineTo(W,i*CELL);ctx.stroke();
  }
  // Cell numbers + highlight specials
  let num=100;
  for(let r=0;r<BOARD;r++){
    for(let c=0;c<BOARD;c++){
      const ac=r%2===0?c:BOARD-1-c;
      const x=ac*CELL, y=r*CELL;
      if(LVL.snakes[num]){ctx.fillStyle='rgba(255,71,87,0.12)';ctx.fillRect(x,y,CELL,CELL);}
      if(LVL.ladders[num]){ctx.fillStyle='rgba(46,213,115,0.12)';ctx.fillRect(x,y,CELL,CELL);}
      ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='bold 11px Inter,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(num,x+CELL/2,y+CELL/2);
      num--;
    }
  }
  // Snakes
  Object.entries(LVL.snakes).forEach(([h,t])=>{
    const hp=pos2xy(+h),tp=pos2xy(t);
    ctx.strokeStyle=LVL.snakeColor;ctx.lineWidth=5;ctx.shadowColor=LVL.snakeColor;ctx.shadowBlur=8;
    ctx.beginPath();ctx.moveTo(hp.x,hp.y);
    ctx.bezierCurveTo(hp.x+30,hp.y-40,tp.x-30,tp.y+40,tp.x,tp.y);ctx.stroke();
    ctx.shadowBlur=0;
    ctx.fillStyle=LVL.snakeColor;ctx.beginPath();ctx.arc(hp.x,hp.y,6,0,Math.PI*2);ctx.fill();
    ctx.font='14px serif';ctx.fillText('🐍',hp.x-7,hp.y+5);
  });
  // Ladders
  Object.entries(LVL.ladders).forEach(([b,t])=>{
    const bp=pos2xy(+b),tp=pos2xy(t);
    ctx.strokeStyle=LVL.ladderColor;ctx.lineWidth=4;ctx.shadowColor=LVL.ladderColor;ctx.shadowBlur=6;
    const dx=8;
    ctx.beginPath();ctx.moveTo(bp.x-dx,bp.y);ctx.lineTo(tp.x-dx,tp.y);ctx.stroke();
    ctx.beginPath();ctx.moveTo(bp.x+dx,bp.y);ctx.lineTo(tp.x+dx,tp.y);ctx.stroke();
    for(let i=1;i<5;i++){
      const r=i/5;
      ctx.beginPath();
      ctx.moveTo(bp.x-dx+(tp.x-bp.x)*r,bp.y+(tp.y-bp.y)*r);
      ctx.lineTo(bp.x+dx+(tp.x-bp.x)*r,bp.y+(tp.y-bp.y)*r);
      ctx.stroke();
    }
    ctx.shadowBlur=0;
    ctx.font='14px serif';ctx.fillText('🪜',bp.x-7,bp.y+5);
  });
  // Players
  drawPlayer(p1,'#3b82f6','P1',0);
  drawPlayer(p2,'#ef4444','P2',p1===p2?14:0);
}

function drawPlayer(pos,color,label,offset){
  const p=pos2xy(pos);
  ctx.shadowColor=color;ctx.shadowBlur=15;
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x+offset,p.y,14,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle='#fff';ctx.font='bold 10px Inter,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(label,p.x+offset,p.y);
}

function updateHUD(){
  const el=id=>document.getElementById(id);
  if(el('slP1pos'))el('slP1pos').textContent=p1;
  if(el('slP2pos'))el('slP2pos').textContent=p2;
  if(el('slScore'))el('slScore').textContent=score;
  if(el('slStreak'))el('slStreak').textContent=`x${answerStreak}`;
  if(el('slMission')){
    const qDone = Math.min(qIdx, LVL.questions.length);
    const qPart = `${qDone}/${MISSION_MIN_QUESTIONS} mission Qs`;
    const boardPart = `${Math.max(p1,p2)}/100 tiles`;
    el('slMission').textContent=`${qPart} • ${boardPart}`;
  }
  if(el('slTurn')){
    if(mode === 'solo'){
      el('slTurn').textContent=turn==='p1'?'🧠 Your Turn':'🤖 Threat Bot Turn';
      el('slTurn').style.color=turn==='p1'?'#3b82f6':'#ef4444';
    } else {
      el('slTurn').textContent=turn==='p1'?'🔵 Player 1\'s Turn':'🔴 Player 2\'s Turn';
      el('slTurn').style.color=turn==='p1'?'#3b82f6':'#ef4444';
    }
  }
  if(el('slDice'))el('slDice').textContent=dice||'🎲';
  if(el('slRollBtn')){el('slRollBtn').disabled=anim||over;el('slRollBtn').style.opacity=anim||over?'0.4':'1';}
  if(el('slQcount'))el('slQcount').textContent=`${qIdx}/${LVL.questions.length}`;
}

function roll(){
  if(anim||over)return;
  anim=true;
  let count=0;
  const iv=setInterval(()=>{
    dice=Math.floor(Math.random()*6)+1;
    const el=document.getElementById('slDice');
    if(el)el.textContent=['⚀','⚁','⚂','⚃','⚄','⚅'][dice-1];
    if(++count>=12){clearInterval(iv);movePlayer();}
  },80);
}

function movePlayer(){
  const cur=turn==='p1'?p1:p2;
  const target=Math.min(cur+dice,100);
  animateMove(cur,target,()=>{
    if(turn==='p1')p1=target;else p2=target;
    draw();updateHUD();
    if(target===100){win();return;}
    if(LVL.snakes[target])showQuestion('snake',target);
    else if(LVL.ladders[target])showQuestion('ladder',target);
    else{
      anim=false;
      turn=turn==='p1'?'p2':'p1';
      updateHUD();
      maybeRunBotTurn();
    }
  });
}

function maybeRunBotTurn(){
  if(over || anim || mode !== 'solo' || turn !== 'p2') return;
  const btn = document.getElementById('slRollBtn');
  if(btn) btn.disabled = true;
  setTimeout(()=>{ if(!over && !anim && turn==='p2') roll(); }, 800);
}

function animateMove(from,to,cb){
  const start=pos2xy(from),end=pos2xy(to);
  const dur=500,t0=Date.now();
  function frame(){
    const p=Math.min((Date.now()-t0)/dur,1);
    const ease=1-Math.pow(1-p,3);
    const cx=start.x+(end.x-start.x)*ease, cy=start.y+(end.y-start.y)*ease;
    draw();
    ctx.shadowColor=turn==='p1'?'#3b82f6':'#ef4444';ctx.shadowBlur=20;
    ctx.fillStyle=turn==='p1'?'#3b82f6':'#ef4444';
    ctx.beginPath();ctx.arc(cx,cy,16,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='bold 11px Inter';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(turn==='p1'?'P1':'P2',cx,cy);
    if(p<1)requestAnimationFrame(frame);else cb();
  }
  frame();
}

function nextQuestion(){
  if(usedQ.length>=LVL.questions.length)usedQ=[];
  let idx;
  do{idx=Math.floor(Math.random()*LVL.questions.length);}while(usedQ.includes(idx));
  usedQ.push(idx);
  qIdx=Math.min(qIdx+1,LVL.questions.length);
  return LVL.questions[idx];
}

function showQuestion(type,pos){
  const q=nextQuestion();
  const isSnake=type==='snake';
  const color=isSnake?'#ff4757':'#2ed573';
  const emoji=isSnake?'🐍':'🪜';
  const title=isSnake?'Snake Attack!':'Ladder Boost!';
  const subtitle=isSnake?'Answer correctly to avoid sliding down!':'Answer correctly to climb up!';
  const modal=document.createElement('div');
  modal.id='slModal';
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:3000;display:flex;align-items:center;justify-content:center;padding:1rem;animation:slFadeIn .3s;';
  modal.innerHTML=`<div style="background:linear-gradient(135deg,#111827,#1e293b);border:2px solid ${color};border-radius:20px;padding:2rem;max-width:550px;width:100%;box-shadow:0 20px 60px ${color}44;">
    <div style="text-align:center;margin-bottom:1.5rem;">
      <div style="font-size:3rem;margin-bottom:.5rem;">${emoji}</div>
      <h2 style="color:${color};font-size:1.5rem;margin-bottom:.3rem;">${title}</h2>
      <p style="color:#94a3b8;font-size:.9rem;">${subtitle}</p>
    </div>
    <div style="background:rgba(0,0,0,.3);padding:1.25rem;border-radius:12px;margin-bottom:1.25rem;">
      <h3 style="color:#fff;font-size:1rem;margin-bottom:1rem;line-height:1.5;">${q.q}</h3>
      <div style="display:grid;gap:.6rem;" id="slOpts">
        ${q.o.map((o,i)=>`<button class="sl-opt" data-i="${i}" style="padding:.75rem 1rem;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.15);border-radius:10px;color:#fff;font-size:.9rem;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit;">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}
      </div>
    </div>
    <div id="slFeedback" style="display:none;text-align:center;padding:1rem;border-radius:10px;"></div>
  </div>`;
  document.body.appendChild(modal);
  modal.querySelectorAll('.sl-opt').forEach(btn=>{
    btn.onmouseenter=()=>{btn.style.borderColor=color;btn.style.background='rgba(255,255,255,.1)';};
    btn.onmouseleave=()=>{btn.style.borderColor='rgba(255,255,255,.15)';btn.style.background='rgba(255,255,255,.05)';};
    btn.onclick=()=>handleAnswer(+btn.dataset.i===q.c,type,pos,q.e,modal);
  });
}

function handleAnswer(correct,type,pos,explanation,modal){
  modal.querySelectorAll('.sl-opt').forEach(b=>{b.style.pointerEvents='none';b.style.opacity='.5';});
  const fb=modal.querySelector('#slFeedback');
  fb.style.display='block';
  fb.style.background=correct?'rgba(46,213,115,.15)':'rgba(255,71,87,.15)';
  fb.style.border=`1px solid ${correct?'#2ed573':'#ff4757'}`;
  if(correct){
    answerStreak+=1;
    longestStreak=Math.max(longestStreak, answerStreak);
    const basePoints = type==='snake'?50:100;
    const comboBonus = Math.min(50, answerStreak * 10);
    score += basePoints + comboBonus;
    if(type==='ladder'){if(turn==='p1')p1=LVL.ladders[pos];else p2=LVL.ladders[pos];}
    fb.innerHTML=`<div style="font-size:2rem;margin-bottom:.5rem;">✅</div><h3 style="color:#2ed573;margin-bottom:.5rem;">${type==='snake'?'Safe! You avoided the snake!':'Climbing up the ladder!'}</h3><p style="color:#94a3b8;font-size:.85rem;">${explanation}</p><p style="color:#fbbf24;margin-top:.5rem;">+${basePoints} points • Combo +${comboBonus} (x${answerStreak})</p>`;
  }else{
    answerStreak = 0;
    score=Math.max(0,score-25);
    if(type==='snake'){if(turn==='p1')p1=LVL.snakes[pos];else p2=LVL.snakes[pos];}
    fb.innerHTML=`<div style="font-size:2rem;margin-bottom:.5rem;">❌</div><h3 style="color:#ff4757;margin-bottom:.5rem;">${type==='snake'?'Oops! You slide down!':'Cannot climb — wrong answer!'}</h3><p style="color:#94a3b8;font-size:.85rem;">${explanation}</p>`;
  }
  fb.innerHTML+=`<button id="slContBtn" style="margin-top:1rem;padding:.6rem 2rem;background:linear-gradient(135deg,${LVL.color},#0080ff);border:none;border-radius:50px;color:#fff;font-weight:600;cursor:pointer;font-family:inherit;">Continue</button>`;
  document.getElementById('slContBtn').onclick=()=>{
    modal.remove();draw();updateHUD();anim=false;turn=turn==='p1'?'p2':'p1';updateHUD();maybeRunBotTurn();
  };
}

function win(){
  over=true;anim=false;
  const winner = mode==='solo' ? (turn==='p1'?'You 🧠':'Threat Bot 🤖') : (turn==='p1'?'Player 1 🔵':'Player 2 🔴');
  const missionComplete = qIdx >= MISSION_MIN_QUESTIONS;
  const badge = score >= 900 ? '🏅 Elite Defender' : score >= 600 ? '🥈 Secure Strategist' : '🥉 Rising Protector';
  const nextLvl=LEVELS.find(l=>l.id===LVL.id+1);
  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:3000;display:flex;align-items:center;justify-content:center;padding:1rem;';
  modal.innerHTML=`<div style="background:linear-gradient(135deg,#111827,#1e293b);border:2px solid ${LVL.color};border-radius:20px;padding:2.5rem;max-width:500px;width:100%;text-align:center;box-shadow:0 20px 60px ${LVL.color}44;">
    <div style="font-size:4rem;margin-bottom:1rem;">🏆</div>
    <h2 style="color:${LVL.color};font-size:2rem;margin-bottom:.5rem;">${winner} Wins!</h2>
    <p style="color:#94a3b8;margin-bottom:.5rem;">Level ${LVL.id}: ${LVL.name} Complete!</p>
    <p style="color:${missionComplete?'#22c55e':'#f59e0b'};margin-bottom:.2rem;font-size:.9rem;">Mission ${missionComplete?'Complete':'Partial'}: ${qIdx}/${MISSION_MIN_QUESTIONS} required challenge questions</p>
    <p style="color:#e2e8f0;font-size:.9rem;">Badge Earned: ${badge}</p>
    <div style="display:flex;justify-content:center;gap:2rem;margin:1.5rem 0;">
      <div><div style="color:${LVL.color};font-size:1.5rem;font-weight:700;">${score}</div><div style="color:#64748b;font-size:.8rem;">Score</div></div>
      <div><div style="color:${LVL.color};font-size:1.5rem;font-weight:700;">${qIdx}</div><div style="color:#64748b;font-size:.8rem;">Questions</div></div>
      <div><div style="color:${LVL.color};font-size:1.5rem;font-weight:700;">x${longestStreak}</div><div style="color:#64748b;font-size:.8rem;">Best Streak</div></div>
    </div>
    <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
      <button onclick="document.querySelector('#slModal2')?.remove();this.closest('div[style]').parentElement.remove();window._slStart(${LVL.id})" style="padding:.7rem 1.5rem;background:linear-gradient(135deg,${LVL.color},#0080ff);border:none;border-radius:50px;color:#fff;font-weight:600;cursor:pointer;font-family:inherit;">Replay Level</button>
      ${nextLvl?`<button onclick="this.closest('div[style]').parentElement.remove();window._slStart(${nextLvl.id})" style="padding:.7rem 1.5rem;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:50px;color:#fff;font-weight:600;cursor:pointer;font-family:inherit;">Next Level ➡️</button>`:'<div style="color:#fbbf24;font-size:.9rem;margin-top:.5rem;">🎉 All levels complete!</div>'}
    </div>
  </div>`;
  document.body.appendChild(modal);
  if(typeof addPoints==='function')addPoints(score);
  if(typeof submitGameResult === 'function') submitGameResult('snake-ladder', score, Math.max(300, qIdx * 45));
  if(typeof addAchievement==='function')addAchievement('sl-lvl-'+LVL.id,'Level '+LVL.id+' Champion','Completed Snake & Ladder Level '+LVL.id);
}

window._slStart=function(lvlId){startLevel(LEVELS.find(l=>l.id===lvlId)||LEVELS[0], mode);};

function buildUI(){
  return `<div style="max-width:1100px;margin:0 auto;padding:.5rem;">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;background:${LVL.bg};border:1px solid ${LVL.color}33;border-radius:12px;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem;">
    <div style="display:flex;align-items:center;gap:.75rem;">
      <span style="font-size:1.5rem;">${LVL.icon}</span>
      <div><h2 style="color:${LVL.color};font-size:1.1rem;margin:0;">${LVL.name}</h2><small style="color:#64748b;">${LVL.subtitle}</small></div>
    </div>
    <div style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:center;">
      <div style="text-align:center;"><div style="color:#3b82f6;font-weight:700;" id="slP1pos">1</div><small style="color:#64748b;">P1</small></div>
      <div style="text-align:center;"><div style="color:#ef4444;font-weight:700;" id="slP2pos">1</div><small style="color:#64748b;">P2</small></div>
      <div style="text-align:center;"><div style="color:#fbbf24;font-weight:700;" id="slScore">0</div><small style="color:#64748b;">Score</small></div>
      <div style="text-align:center;"><div style="color:#22c55e;font-weight:700;" id="slStreak">x0</div><small style="color:#64748b;">Combo</small></div>
      <div style="text-align:center;"><div style="color:#94a3b8;font-weight:600;" id="slQcount">0/${LVL.questions.length}</div><small style="color:#64748b;">Questions</small></div>
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;background:${LVL.bg};border:1px solid ${LVL.color}33;border-radius:12px;padding:.55rem .9rem;margin-bottom:.75rem;">
    <small id="slMission" style="color:#cbd5e1;">0/${MISSION_MIN_QUESTIONS} mission Qs • 1/100 tiles</small>
    <small style="color:#94a3b8;">Mode: <span style="color:${LVL.color};font-weight:700;">${mode==='solo'?'Solo vs Threat Bot':'Duel (2 Players)'}</span></small>
  </div>
  <div style="display:grid;grid-template-columns:1fr auto;gap:.75rem;align-items:start;">
    <div style="display:flex;justify-content:center;"><canvas id="slCanvas" style="border:2px solid ${LVL.color}33;border-radius:12px;display:block;max-width:100%;"></canvas></div>
    <div style="width:180px;display:flex;flex-direction:column;gap:.75rem;">
      <div style="background:${LVL.bg};border:1px solid ${LVL.color}33;border-radius:12px;padding:1rem;text-align:center;">
        <div id="slTurn" style="color:#3b82f6;font-weight:600;font-size:.85rem;margin-bottom:.75rem;">🔵 Player 1's Turn</div>
        <div id="slDice" style="font-size:2.5rem;margin-bottom:.75rem;">🎲</div>
        <button id="slRollBtn" style="width:100%;padding:.65rem;background:linear-gradient(135deg,${LVL.color},#0080ff);border:none;border-radius:50px;color:#fff;font-weight:700;cursor:pointer;font-size:.9rem;font-family:inherit;transition:all .2s;">Roll Dice</button>
      </div>
      <div style="background:${LVL.bg};border:1px solid ${LVL.color}33;border-radius:12px;padding:.75rem;font-size:.75rem;color:#94a3b8;line-height:1.6;">
        <div style="font-weight:600;color:${LVL.color};margin-bottom:.4rem;">How to Play</div>
        <div>🐍 Snake = Answer to avoid sliding</div>
        <div>🪜 Ladder = Answer to climb up</div>
        <div>🎯 Reach 100 to win!</div>
        <div>⭐ ${LVL.questions.length} awareness questions</div>
      </div>
      <div style="background:${LVL.bg};border:1px solid ${LVL.color}33;border-radius:12px;padding:.75rem;">
        <div style="font-weight:600;color:${LVL.color};font-size:.75rem;margin-bottom:.4rem;">All Levels</div>
        ${LEVELS.map(l=>`<button onclick="window._slStart(${l.id})" style="display:block;width:100%;padding:.4rem;margin-bottom:.3rem;background:${l.id===LVL.id?l.color+'22':'transparent'};border:1px solid ${l.id===LVL.id?l.color:l.color+'33'};border-radius:6px;color:${l.color};font-size:.75rem;cursor:pointer;text-align:left;font-family:inherit;">${l.icon} ${l.name}</button>`).join('')}
      </div>
    </div>
  </div></div>`;
}

// Register with game system - show level selector
function showLevelSelect(){
  const container=document.getElementById('gameContainer');
  container.innerHTML=`<div style="max-width:800px;margin:0 auto;padding:2rem;text-align:center;">
    <h2 style="color:#00d4ff;font-size:1.8rem;margin-bottom:.5rem;">🎲 Cyber Snake & Ladder</h2>
    <p style="color:#94a3b8;margin-bottom:1rem;">Choose your level. Each board has unique questions and challenges!</p>
    <div style="display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap;margin-bottom:1.5rem;">
      <button id="slModeSolo" style="padding:.55rem 1rem;border-radius:999px;border:1px solid #00d4ff;background:rgba(0,212,255,0.15);color:#00d4ff;cursor:pointer;font-weight:600;">🧠 Solo vs Threat Bot</button>
      <button id="slModeDuel" style="padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#cbd5e1;cursor:pointer;font-weight:600;">👥 Duel (2 Players)</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem;">
      ${LEVELS.map(l=>`<div onclick="window._slStart(${l.id})" style="background:${l.bg};border:2px solid ${l.color}33;border-radius:16px;padding:1.75rem;cursor:pointer;transition:all .3s;text-align:center;" onmouseenter="this.style.borderColor='${l.color}';this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 40px ${l.color}22';" onmouseleave="this.style.borderColor='${l.color}33';this.style.transform='none';this.style.boxShadow='none';">
        <div style="font-size:3rem;margin-bottom:.75rem;">${l.icon}</div>
        <h3 style="color:${l.color};font-size:1.2rem;margin-bottom:.25rem;">Level ${l.id}: ${l.name}</h3>
        <p style="color:#64748b;font-size:.85rem;margin-bottom:.75rem;">${l.subtitle}</p>
        <div style="display:flex;justify-content:center;gap:1rem;">
          <span style="color:#94a3b8;font-size:.75rem;">📝 ${l.questions.length} Questions</span>
          <span style="color:#94a3b8;font-size:.75rem;">🐍 ${Object.keys(l.snakes).length} Snakes</span>
        </div>
        <button style="margin-top:1rem;padding:.5rem 1.5rem;background:linear-gradient(135deg,${l.color},#0080ff);border:none;border-radius:50px;color:#fff;font-weight:600;cursor:pointer;font-size:.85rem;font-family:inherit;">Play →</button>
      </div>`).join('')}
    </div>
  </div>`;
  const soloBtn = document.getElementById('slModeSolo');
  const duelBtn = document.getElementById('slModeDuel');
  function paintMode(){
    if(!soloBtn || !duelBtn) return;
    const solo = mode === 'solo';
    soloBtn.style.background = solo ? 'rgba(0,212,255,0.15)' : 'transparent';
    soloBtn.style.borderColor = solo ? '#00d4ff' : 'rgba(255,255,255,0.2)';
    soloBtn.style.color = solo ? '#00d4ff' : '#cbd5e1';
    duelBtn.style.background = !solo ? 'rgba(239,68,68,0.18)' : 'transparent';
    duelBtn.style.borderColor = !solo ? '#ef4444' : 'rgba(255,255,255,0.2)';
    duelBtn.style.color = !solo ? '#ef4444' : '#cbd5e1';
  }
  if(soloBtn) soloBtn.onclick = function(){ mode='solo'; paintMode(); };
  if(duelBtn) duelBtn.onclick = function(){ mode='duel'; paintMode(); };
  paintMode();
}

window.CyberArcadeGames['snake-ladder']={
  title:'Cyber Snake & Ladder',
  content:'<div id="slLevelSelect"></div>',
  init:showLevelSelect
};
})();
