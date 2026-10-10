// Mock de catálogo
const posters = (seed) => `https://picsum.photos/seed/${seed}/400/600`;
const titles = [
  'Neblina Escarlate','Horizonte Zero','Cidades Invisíveis','O Último Farol','Além da Névoa',
  'Código Noturno','Sintonia Cósmica','Fragmentos','Ecos do Amanhã','Noites de Aço',
  'Planeta Nublado','Rota 77','Marés Negras','Crônicas do Norte','Linha do Tempo'
];

function makeList(count = 12, offset = 0) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + offset,
    title: titles[(i + offset) % titles.length],
    year: 2010 + ((i + offset) % 15),
    img: posters(`p-${i + offset}`)
  }));
}

const rows = {
  popular: { el: document.getElementById('row-popular'), data: makeList(14) },
  new: { el: document.getElementById('row-new'), data: makeList(12, 20) },
  foru: { el: document.getElementById('row-foru'), data: makeList(12, 40) }
};

function renderCard(item) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <img src="${item.img}" alt="Poster de ${item.title}">
    <div class="meta">
      <div class="title">${item.title}</div>
      <div class="year">${item.year}</div>
    </div>`;
  card.tabIndex = 0;
  card.addEventListener('click', () => showToast(`Reproduzindo: ${item.title}`));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showToast(`Reproduzindo: ${item.title}`); }
  });
  return card;
}

function hydrate() {
  Object.values(rows).forEach(({ el, data }) => {
    data.forEach(item => el.appendChild(renderCard(item)));
  });
}

// Controles de scroll das linhas
function setupControls() {
  document.querySelectorAll('[data-control]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [key, dir] = btn.dataset.control.split(':');
      const row = rows[key];
      const amount = row.el.clientWidth * 0.9 * Number(dir);
      row.el.scrollBy({ left: amount, behavior: 'smooth' });
    });
  });
}

// Mini toast feedback
let toastTimer;
function showToast(text) {
  clearTimeout(toastTimer);
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
    Object.assign(t.style, {
      position: 'fixed', left: '50%', bottom: '28px', transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,.8)', color: 'white', padding: '10px 14px', borderRadius: '999px',
      boxShadow: '0 10px 20px rgba(0,0,0,.35)', zIndex: 100
    });
  }
  t.textContent = text;
  t.style.opacity = '1';
  toastTimer = setTimeout(() => { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; }, 1200);
}

// Ações Hero
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('playNow').addEventListener('click', () => showToast('Reproduzindo destaque...'));
  document.getElementById('moreInfo').addEventListener('click', () => showToast('Abrindo detalhes...'));
  hydrate();
  setupControls();
});
