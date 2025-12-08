// Mobile sidebar toggle
document.addEventListener('click',(e)=>{
  const t=e.target.closest('[data-toggle="sidebar"]');
  if(t) document.querySelector('.sidebar')?.classList.toggle('open');
});

// Tabs
document.querySelectorAll('.tabs').forEach(t=>{
  const btns=t.querySelectorAll('[data-tab]'), panes=t.querySelectorAll('.tab-panel');
  btns.forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.getAttribute('data-tab');
    btns.forEach(b=>b.classList.toggle('active',b===btn));
    panes.forEach(p=>p.classList.toggle('active',p.id===id));
  }));
});

// Modals
document.addEventListener('click',(e)=>{
  const open=e.target.closest('[data-modal-open]'), close=e.target.closest('[data-modal-close]');
  if(open) document.getElementById(open.getAttribute('data-modal-open'))?.classList.add('open');
  if(close || e.target.classList.contains('modal')) e.target.closest('.modal')?.classList.remove('open');
});

// Active nav
(function(){
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    if((path==='index.html' && href==='index.html') || href===path) a.classList.add('active');
  });
})();
