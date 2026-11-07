document.documentElement.classList.add('js');
/* ===== EDIT THESE ===== */
const CITIES=[['Accra','Africa/Accra'],['London','Europe/London'],['New York','America/New_York'],['Dubai','Asia/Dubai'],['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney']]; /* edit the world clock cities here */
const _d=a=>a.map(x=>atob(x)).join('');
const CONFIG={currency:'GH\u20B5',get whatsapp(){return _d(['MjMzMjA2', 'NDM0MDAx'])},get email(){return _d(['YWxvcnRp', 'cml0YUBn', 'bWFpbC5j', 'b20='])}}; /* contact details are stored encoded so bots scraping the page cannot read them */
/* ====================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const nav=$('#nav'),bg=$('#bg');
function menu(o){nav.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''}
bg.onclick=()=>menu(!nav.classList.contains('open'));
addEventListener('keydown',e=>{if(e.key==='Escape'){menu(false);cartOpen(false)}});
const page=document.body.dataset.page,here=page==='home'?'index.html':page+'.html';
$$('nav a').forEach(a=>{if(a.getAttribute('href')===here)a.setAttribute('aria-current','page')});
/* portfolio filter */
$$('.chip').forEach(c=>c.onclick=()=>{$$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));
$$('.tile').forEach(t=>t.classList.toggle('hide',c.dataset.f!=='all'&&t.dataset.c!==c.dataset.f))});
/* live blog */
const ap=$('#addp');if(ap)ap.onclick=()=>{const i=$('#np'),v=i.value.trim();if(!v)return;const d=document.createElement('div');d.className='post';
const t=document.createElement('time');t.textContent='Just now';const p=document.createElement('p');p.textContent=v;d.append(t,p);$('#posts').prepend(d);i.value=''};
/* motivations */
if($('#q')){const Q=['Begin where you are. The first stroke teaches the second.','Colour is just courage in a different shape.','A page is never empty. It is waiting for you.','Slow work is still work, and it lasts longer.','Make something small today. Let it grow tomorrow.','Your story deserves a good brush and a quiet hour.'];let qi=0;
const sq=()=>{$('#q').textContent=Q[qi++%Q.length]};sq();$('#nq').onclick=sq}
/* ai prompt spinner */
if($('#sp'))$('#sp').onclick=()=>{$('#o').textContent='Create '+$('#m').value+' inspired by '+$('#t').value+', using only deep green, warm gold and cream.'};
/* feedback -> opens the visitor's email app */
if($('#st')){let r=0;const st=$('#st');for(let i=1;i<=5;i++){const b=document.createElement('button');b.textContent='\u2605';b.setAttribute('aria-label',i+' star'+(i>1?'s':''));b.onclick=()=>{r=i;[...st.children].forEach((x,j)=>x.classList.toggle('on',j<i))};st.append(b)}
$('#send').onclick=()=>{const m=$('#msg').value.trim();if(!m){$('#msg').focus();return}
location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent('riona feedback ('+r+'/5)')+'&body='+encodeURIComponent(m+'\n\n- '+($('#n').value||'Anonymous'));
$('#fb').hidden=true;$('#ty').hidden=false}}
/* shop + order cart (saved in the visitor's browser) */
const money=n=>CONFIG.currency+' '+n.toLocaleString();
$$('.pr').forEach(e=>e.textContent=money(+e.dataset.p));
let cart=[];try{cart=JSON.parse(localStorage.getItem('riona-cart')||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem('riona-cart',JSON.stringify(cart))}catch(e){}};
const cb=document.createElement('button');cb.id='cartbtn';document.body.append(cb);
const cp=document.createElement('aside');cp.id='cart';cp.setAttribute('aria-label','Your order');
cp.innerHTML='<h2 style="font-size:1.8rem">Your order</h2><ul id="cl"></ul><p class="tot" id="ct"></p><div class="row"><button class="btn" id="wa">Order on WhatsApp</button><button class="btn o" id="cc">Close</button></div><p style="font:500 .9rem var(--sans);margin-top:14px"><button class="chip" id="cx">Clear order</button></p>';
document.body.append(cp);
function cartOpen(o){cp.classList.toggle('open',o)}
function draw(){const n=cart.reduce((a,i)=>a+i.q,0),t=cart.reduce((a,i)=>a+i.q*i.p,0);
cb.textContent='Order ('+n+')';cb.hidden=!n&&!cp.classList.contains('open')&&!$$('.add').length;
const l=$('#cl');l.textContent='';
if(!cart.length){const li=document.createElement('li');li.textContent='Nothing here yet. Add something from the shop.';l.append(li)}
cart.forEach((i,k)=>{const li=document.createElement('li'),s=document.createElement('span'),b=document.createElement('button');
s.textContent=i.q+' x '+i.n+' - '+money(i.q*i.p);b.textContent='Remove';b.onclick=()=>{i.q>1?i.q--:cart.splice(k,1);save();draw()};li.append(s,b);l.append(li)});
$('#ct').textContent='Total: '+money(t)}
$$('.add').forEach(b=>b.onclick=()=>{const n=b.dataset.n,p=+b.dataset.p,f=cart.find(i=>i.n===n);f?f.q++:cart.push({n,p,q:1});save();draw();b.textContent='Added';setTimeout(()=>b.textContent='Add to order',1100)});
cb.onclick=()=>cartOpen(true);$('#cc').onclick=()=>cartOpen(false);
$('#cx').onclick=()=>{cart=[];save();draw()};
$('#wa').onclick=()=>{if(!cart.length)return;const t=cart.reduce((a,i)=>a+i.q*i.p,0);
const m='Hello riona, I would like to order:\n'+cart.map(i=>i.q+' x '+i.n+' ('+money(i.q*i.p)+')').join('\n')+'\nTotal: '+money(t);
window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(m),'_blank','noopener')};
draw();

/* start the tagline animation when it scrolls into view */
(()=>{const t=document.querySelector('.tag');if(!t)return;
if(!('IntersectionObserver' in window)){t.classList.add('go');return}
const o=new IntersectionObserver(e=>{if(e[0].isIntersecting){t.classList.add('go');o.disconnect()}},{threshold:.35});o.observe(t)})();

/* dark / light theme */
(()=>{const b=document.getElementById('tm'),r=document.documentElement;if(!b)return;
const sync=()=>b.setAttribute('aria-label',r.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode');sync();
b.onclick=()=>{const n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('riona-theme',n)}catch(e){}sync()}})();
/* world clock: live time in the header, all cities in a panel */
(()=>{const g=document.getElementById('cg'),wb=document.getElementById('wc'),wp=document.getElementById('wp');if(!g||!wb)return;
const tf=z=>new Intl.DateTimeFormat('en-GB',{timeZone:z,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}),
df=z=>new Intl.DateTimeFormat('en-GB',{timeZone:z,weekday:'short',day:'numeric',month:'short'}),
hf=z=>new Intl.DateTimeFormat('en-GB',{timeZone:z,hour:'numeric',hour12:false});
const mine=Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';
const lf=new Intl.DateTimeFormat('en-GB',{timeZone:mine,weekday:'long',day:'numeric',month:'long',year:'numeric'}),
hm=new Intl.DateTimeFormat('en-GB',{timeZone:mine,hour:'2-digit',minute:'2-digit',hour12:false}),mt=tf(mine),md=df(mine);
const cs=CITIES.map(([n,z])=>{const d=document.createElement('div');d.className='city';
const b=document.createElement('b'),t=document.createElement('span'),dd=document.createElement('span'),i=document.createElement('i'),tx=document.createElement('span');
t.className='t';dd.className='d';b.textContent=n;dd.append(i,tx);d.append(b,t,dd);g.append(d);return{d,t,tx,tf:tf(z),df:df(z),hf:hf(z)}});
function tick(){const now=new Date();document.getElementById('ht').textContent=hm.format(now);document.getElementById('hd').textContent=md.format(now);
document.getElementById('yt').textContent=mt.format(now);document.getElementById('yd').textContent='Your time, '+lf.format(now)+' ('+mine.replace('_',' ')+')';
cs.forEach(c=>{c.t.textContent=c.tf.format(now);const h=+c.hf.format(now)%24,day=h>=6&&h<18;c.d.classList.toggle('night',!day);c.tx.textContent=c.df.format(now)+' \u00b7 '+(day?'Day':'Night')})}
tick();setInterval(tick,1000);
const close=()=>{wp.classList.remove('open');wb.setAttribute('aria-expanded','false')};
wb.onclick=e=>{e.stopPropagation();const o=!wp.classList.contains('open');wp.classList.toggle('open',o);wb.setAttribute('aria-expanded',o)};
document.addEventListener('click',e=>{if(!wp.contains(e.target))close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()})})();

/* contact buttons: the link is only built when someone clicks */
$$('[data-contact]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();
if(a.dataset.contact==='wa')window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent('Hello riona, '),'_blank','noopener,noreferrer');
else location.href='mailto:'+CONFIG.email}));

/* motto animation starts when scrolled into view */
(()=>{const t=document.querySelector('.six');if(!t)return;
if(!('IntersectionObserver' in window)){t.classList.add('go');return}
const o=new IntersectionObserver(e=>{if(e[0].isIntersecting){t.classList.add('go');o.disconnect()}},{threshold:.4});o.observe(t)})();

/* motto animation starts when scrolled into view */
(()=>{const t=document.querySelector('.motto');if(!t)return;
if(!('IntersectionObserver' in window)){t.classList.add('go');return}
const o=new IntersectionObserver(e=>{if(e[0].isIntersecting){t.classList.add('go');o.disconnect()}},{threshold:.35});o.observe(t)})();

/* reveal bank details only on request */
$$('[data-reveal]').forEach(b=>b.onclick=()=>{const t=document.getElementById(b.dataset.target);t.textContent=atob(b.dataset.reveal);t.hidden=false;b.hidden=true});
