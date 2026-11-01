(() => {
  'use strict';
  const key = 'expensetrack_pro_v1';
  const demoKey = 'expensetrack_demo_initialized_v25';
  const today = new Date();
  const iso = (daysAgo) => { const d = new Date(today); d.setDate(d.getDate()-daysAgo); return d.toISOString().slice(0,10); };
  const samples = [
    ['income',iso(2),280000,'Services','Website consulting'],
    ['expense',iso(3),62000,'Software','Software subscription'],
    ['expense',iso(5),15000,'Transport','Local travel'],
    ['income',iso(7),125000,'Sales','Product sales'],
    ['expense',iso(9),31000,'Marketing','Campaign expenses'],
    ['expense',iso(11),48000,'Equipment','Office equipment']
  ];
  try {
    if (!sessionStorage.getItem(demoKey)) {
      localStorage.setItem(key,JSON.stringify({version:1,lang:'en',theme:'dark',currency:'EUR',records:samples.map((r,i)=>({id:'demo-'+i,type:r[0],date:r[1],amount:r[2],category:r[3],description:r[4],notes:''}))}));
      localStorage.setItem('expensetrack_pro_budgets_v2','{}');
      sessionStorage.setItem(demoKey,'1');
      location.reload();
      return;
    }
  } catch(e) { console.warn('Demo storage unavailable',e); }
  const css=document.createElement('style');css.textContent='.demo-banner{position:sticky;top:0;z-index:1000;background:#40358d;color:white;padding:11px 18px;text-align:center;font:600 13px system-ui}.demo-banner small{font-weight:400;opacity:.9}.demo-disabled{opacity:.45;cursor:not-allowed!important}';document.head.append(css);
  const banner=document.createElement('div');banner.className='demo-banner';banner.textContent='EXPENSETRACK PRO — DEMO • Sample data only • Editing, export and backup disabled';document.body.prepend(banner);
  const disableIds=['addTop','exportCsv','reportCsv','printReport','saveBudget','backupBtn','clearBtn','currency'];
  for(const id of disableIds){const el=document.getElementById(id);if(el){el.disabled=true;el.classList.add('demo-disabled');el.title='Available in the full version';}}
  const importInput=document.getElementById('importFile');if(importInput)importInput.disabled=true;
  const uploadLabel=importInput?.closest('label');if(uploadLabel){uploadLabel.classList.add('demo-disabled');uploadLabel.title='Available in the full version';}
  const table=document.getElementById('transactionsTable');if(table){const obs=new MutationObserver(()=>{table.querySelectorAll('button[data-action]').forEach(b=>{b.disabled=true;b.classList.add('demo-disabled');b.title='Available in the full version';});});obs.observe(table,{childList:true,subtree:true});}
  document.addEventListener('click',e=>{const el=e.target.closest('#addTop,#exportCsv,#reportCsv,#printReport,#saveBudget,#backupBtn,#clearBtn,#currency,button[data-action]');if(el){e.preventDefault();e.stopImmediatePropagation();}},true);
})();