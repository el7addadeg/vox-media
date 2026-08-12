document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');if(menu)menu.addEventListener('click',()=>{nav.classList.toggle('open')});
const leadForm=document.getElementById('leadForm');
if(leadForm) leadForm.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(leadForm);
  const msg=`مرحبًا VOX Media، أريد بدء مشروع.%0A%0Aالاسم: ${encodeURIComponent(d.get('name'))}%0Aالشركة: ${encodeURIComponent(d.get('company'))}%0Aالخدمة: ${encodeURIComponent(d.get('service'))}%0Aالميزانية: ${encodeURIComponent(d.get('budget'))}%0Aالتفاصيل: ${encodeURIComponent(d.get('details'))}`;
  window.open('https://wa.me/201069952664?text='+msg,'_blank');
});
