
document.querySelectorAll('.crs-top,.prow-top').forEach(b=>b.addEventListener('click',()=>{const m=document.getElementById(b.getAttribute('aria-controls')); const o=m.hidden; m.hidden=!o; b.setAttribute('aria-expanded',o);}));
(function(){
  const sec=document.getElementById('courses'), cv=document.getElementById('bubbles'); if(!sec||!cv) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onScroll=()=>{const r=sec.getBoundingClientRect(); const vh=innerHeight; const p=Math.min(1,Math.max(0,(vh-r.top)/(r.height+vh))); sec.style.setProperty('--p',p.toFixed(3));};
  addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true}); onScroll();
  if(reduce) return;
  const ctx=cv.getContext('2d'); let W,H,B=[],run=false;
  const size=()=>{const d=devicePixelRatio||1; W=sec.clientWidth; H=sec.clientHeight; cv.width=W*d; cv.height=H*d; ctx.setTransform(d,0,0,d,0,0);};
  const make=()=>({x:Math.random()*W,y:H+Math.random()*H,r:1+Math.random()*3.2,v:.25+Math.random()*.6,w:Math.random()*6.28});
  size(); B=Array.from({length:Math.round(Math.min(70,W/18))},make); B.forEach(b=>b.y=Math.random()*H);
  addEventListener('resize',size);
  const tick=()=>{ if(!run) return; ctx.clearRect(0,0,W,H);
    for(const b of B){ b.y-=b.v; b.w+=.02; const x=b.x+Math.sin(b.w)*4;
      if(b.y<-10){Object.assign(b,make(),{y:H+10});}
      const a=.08+.22*(b.y/H);
      ctx.beginPath(); ctx.arc(x,b.y,b.r,0,6.283); ctx.strokeStyle=`rgba(255,255,255,${a})`; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.arc(x-b.r*.35,b.y-b.r*.35,b.r*.3,0,6.283); ctx.fillStyle=`rgba(255,255,255,${a})`; ctx.fill(); }
    requestAnimationFrame(tick); };
  new IntersectionObserver(e=>{const v=e[0].isIntersecting; if(v&&!run){run=true;requestAnimationFrame(tick);} else if(!v) run=false;}).observe(sec);
})();
(function(){const f=document.querySelector('.fab'),h=document.querySelector('.hero'); if(!f) return; const u=()=>f.classList.toggle('show', h ? h.getBoundingClientRect().bottom<0 : scrollY>300); addEventListener('scroll',u,{passive:true}); u();})();
if(document.getElementById("site-list")){
const SITES = [
  {n:"Sta. Fe", img:"sta-fe-diver-coral-patches", lvl:"First Open Water dives", g:"easy", min:5, max:10, label:"5–10 m",
   see:"Sandy bottom with seagrass and coral patches. Octopus, frogfish, moray and snake eels, crabs and shrimp.",
   know:"Little to no current and good visibility. The calmest place to learn."},
  {n:"Jacking Horse", img:"jacking-horse-cabbage-coral-siargao", lvl:"Beginners, experienced, snorkelers", g:"easy", min:5, max:15, label:"5–15 m",
   see:"Cabbage and boulder corals, stingrays, mantis shrimp, sea snakes and nudibranchs.",
   know:"Our closest site, 5 minutes by boat. Current mild to strong with the tide. Watch the surfers between dives."},
  {n:"Semibayan", page:"dive-site-semibayan.html", img:"semibayan-diver-cuttlefish", lvl:"All levels, day and night dives", g:"easy", min:2, max:15, label:"2–15 m",
   see:"Coral gardens and seagrass. Cuttlefish, octopus and stingrays, sometimes turtles, batfish and barracuda.",
   know:"3 minutes by boat from Catangnan. Not a surf break, so it stays calm on big swell days. We dive here almost every day."},
  {n:"Stimpy's", img:"anemonefish-siargao-reef", lvl:"Beginners to experienced", g:"easy", min:5, max:18, label:"5–18 m",
   see:"A coral slope with pinnacles. Triggerfish, pipefish, moray and snake eels, sometimes a cat shark.",
   know:"Right next to the famous surf break. Expect surge on big-wave days."},
  {n:"Rock Island", page:"dive-site-rock-island.html", img:"rock-island-cuttlefish-siargao", lvl:"All levels", g:"easy", min:5, max:25, open:true, label:"20 m+",
   see:"Hard corals, anemonefish, cuttlefish, scorpionfish, lionfish and stingrays.",
   know:"10 minutes by boat. Visibility often over 20 m. A mooring line runs from the boat to the reef. Diveable almost all year."},
  {n:"Anahawan Island", img:"ocean-workshop-beach-community-siargao", lvl:"Divers and snorkelers", g:"easy", req:"Full-day trip, minimum 4 divers · price on request", min:2, max:10, open:true, label:"Shallow",
   see:"A marine sanctuary with healthy table corals, reef fish and stingrays.",
   know:"A full day: 90 minutes by boat, two dives and lunch with the island community. Minimum four divers."},
  {n:"Two Towers", img:"diver-torch-crevice-siargao", lvl:"Good buoyancy needed", g:"adv", req:"Fun dive ₱5,000 · for divers with good buoyancy control", min:10, max:25, label:"10–25 m",
   see:"Giant boulders, overhangs and swim-throughs that form a maze.",
   know:"In Pilar near Magpupungko Rock Pools. Surge near the rocks."},
  {n:"Dapa Channel", img:"dapa-channel-red-sea-fan", lvl:"Experienced, drift dive", g:"adv", req:"Price on request · for experienced divers", min:10, max:30, label:"10–30 m",
   see:"Giant gorgonian sea fans, soft corals and pygmy seahorses.",
   know:"A busy boat channel, so every diver carries an SMB. 30 minutes to Dapa, then a short boat ride."},
  {n:"Blue Cathedral", page:"blue-cathedral-siargao.html", img:"blue-cathedral-cavern-divers-siargao", lvl:"Advanced, experienced", g:"adv", req:"₱6,000 · 2 dives · Advanced, recent dives, March to September", min:15, max:35, label:"To 35 m",
   see:"A 40 m long cavern with deep arches. Trevally, barracuda, eagle rays, tuna passing in the blue.",
   know:"Only on days without swell, March to September. Guests go to 35 m at most. Visibility 40 to 50 m most days. Check dive case by case."}
];
const list = document.getElementById('site-list');
const pct = m => (m/40*100).toFixed(2) + '%';
list.innerHTML = SITES.map((s,i)=>`
  <div class="site-row" data-g="${s.g}" tabindex="0" role="button" aria-expanded="false" id="site-${i}">
    <div class="site-name"><img src="img/${s.img}.jpg" alt="" loading="lazy"><div><h3>${s.n}</h3><span class="lvl">${s.lvl}</span></div></div>
    <div class="track"><span class="bar ${s.g==='adv'?'adv':''} ${s.open?'open':''}" style="left:${pct(s.min)};width:${pct(s.max-s.min)}"></span>${s.max>36 ? `<span class="bar-label" style="right:calc(${(100-s.max/40*100).toFixed(2)}% + 10px)">${s.label}</span>` : `<span class="bar-label" style="left:calc(${pct(s.max)} + 8px)">${s.label}</span>`}</div>
    <span class="tog" aria-hidden="true">+</span>
    <div class="site-detail"><figure class="site-photo"><img src="img/${s.img}.jpg" alt="${s.n}" loading="lazy"></figure><p><b>What you'll see</b>${s.see}</p><p><b>Good to know</b>${s.know}</p>${s.page ? `<p><a class="site-more" href="${s.page}">Full guide to ${s.n}</a></p>` : ''}<div class="site-cta"><a class="btn btn-wa" href="https://wa.me/639544651444?text=${encodeURIComponent("Hi OceanTribe! I'd love to dive at "+s.n+". My date: ")}" target="_blank" rel="noopener">${s.g==='adv' ? 'Ask about diving '+s.n : 'Dive '+s.n+' with us'}</a><span>${s.req || (s.g==='adv' ? '' : 'Fun dive ₱5,000 · 2 dives, gear and boat included')}</span></div></div>
  </div>`).join('');
list.addEventListener('click', e=>{ if(e.target.closest('a')) return; const r=e.target.closest('.site-row'); if(!r) return; const o=r.classList.toggle('open'); r.setAttribute('aria-expanded', o); });
list.addEventListener('keydown', e=>{ if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('site-row')){ e.preventDefault(); e.target.click(); }});
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed', x===b));
  const f=b.dataset.f; list.querySelectorAll('.site-row').forEach(r=>{ r.hidden = !(f==='all' || r.dataset.g===f); });
}));
list.querySelector('.site-row').click();

}

(function(){const h=document.querySelector(".site-head"); if(!h) return; let y=scrollY; addEventListener("scroll",()=>{const n=scrollY; if(n>140 && n>y+4) h.classList.add("compact"); else if(n<y-4 || n<140) h.classList.remove("compact"); y=n;},{passive:true});})();

if(location.hash && /^#site-\d+$/.test(location.hash)){const r=document.querySelector(location.hash); if(r){document.querySelectorAll(".site-row.open").forEach(x=>{x.classList.remove("open");x.setAttribute("aria-expanded","false")}); r.classList.add("open"); r.setAttribute("aria-expanded","true"); setTimeout(()=>r.scrollIntoView({block:"center"}),50);}}
