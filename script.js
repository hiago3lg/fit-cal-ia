// Basic interactions: year, contact fallback, mobile nav, languages, and currency conversion with live rates
document.getElementById('year').textContent = new Date().getFullYear();

function handleSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent('Contato via site: ' + name);
  const body = encodeURIComponent('Nome: ' + name + '\nE-mail: ' + email + '\n\n' + message);
  window.location.href = 'mailto:contato@fitcalia.com?subject='+subject+'&body='+body;
}

// Mobile nav toggle
const btn = document.querySelector('.nav-toggle');
btn && btn.addEventListener('click', ()=>{
  const nav = document.querySelector('.main-nav');
  if(!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.gap = '12px';
});

// Prices (base in BRL)
const pricesBRL = { basic:29, pro:59, premium:129 };

// Fetch live rates from exchangerate.host
async function fetchRates(){
  try{
    const res = await fetch('https://api.exchangerate.host/latest?base=BRL');
    const data = await res.json();
    return data.rates || { USD:0.18, EUR:0.16, BRL:1 };
  }catch(e){
    console.warn('Erro ao obter taxas reais, usando fallback.', e);
    return { USD:0.18, EUR:0.16, BRL:1 };
  }
}

function detectCurrency(){
  const lang = navigator.language || navigator.userLanguage || 'pt';
  if(lang.startsWith('pt')) return 'BRL';
  if(lang.startsWith('en')) return 'USD';
  if(lang.startsWith('es')) return 'USD';
  return 'USD';
}

function formatCurrency(value, cur){
  try{
    return new Intl.NumberFormat(undefined, { style:'currency', currency:cur }).format(value);
  }catch(e){
    return cur + ' ' + value.toFixed(2);
  }
}

async function updatePrices(){
  const rates = await fetchRates();
  const cur = detectCurrency();
  const rate = rates[cur] || 1;

  document.getElementById('price-basic').textContent = formatCurrency(pricesBRL.basic * rate, cur);
  document.getElementById('price-pro').textContent = formatCurrency(pricesBRL.pro * rate, cur);
  document.getElementById('price-premium').textContent = formatCurrency(pricesBRL.premium * rate, cur);
}

setTimeout(updatePrices, 150);

// Translations (simple)
const translations = {
  pt:{ hero_title:'Alcance seus objetivos com a Fit Cal IA', hero_sub:'Conteúdo inteligente sobre calorias, perda de peso rápida e dicas práticas para transformar seu corpo.', planos_title:'Planos & Assinaturas' },
  en:{ hero_title:'Reach your goals with Fit Cal IA', hero_sub:'Smart content about calories, fast weight loss and practical tips to transform your body.', planos_title:'Plans & Subscriptions' },
  es:{ hero_title:'Alcanza tus objetivos con Fit Cal IA', hero_sub:'Contenido inteligente sobre calorías, pérdida de peso rápida y consejos prácticos para transformar tu cuerpo.', planos_title:'Planes y Suscripciones' }
};

const langSwitcher = document.getElementById('langSwitcher');
langSwitcher && langSwitcher.addEventListener('change', ()=> applyLang(langSwitcher.value));

function applyLang(lang){
  const t = translations[lang];
  if(!t) return;
  document.getElementById('hero-title').textContent = t.hero_title;
  document.getElementById('hero-sub').textContent = t.hero_sub;
  const planos = document.getElementById('planos-title');
  if(planos) planos.textContent = t.planos_title;
}

// Preselect language based on browser
(function(){
  const lang = (navigator.language||navigator.userLanguage||'pt').slice(0,2);
  if(['pt','en','es'].includes(lang)) langSwitcher.value = lang;
  applyLang(langSwitcher.value);
})();

