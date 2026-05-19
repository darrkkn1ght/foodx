// home.js — FOODX Home Screen Logic

// ── Time-based greeting ──
(function setGreeting() {
  const el = document.getElementById('greetingText');
  if (!el) return;
  const h = new Date().getHours();
  const name = 'Tolu'; // would come from user session
  let greeting;
  if (h >= 5 && h < 12) greeting = `Good morning, ${name} 👋`;
  else if (h >= 12 && h < 17) greeting = `Good afternoon, ${name} 👋`;
  else if (h >= 17 && h < 21) greeting = `Good evening, ${name} 👋`;
  else greeting = `Night mode activated, ${name} 🌙`;
  el.textContent = greeting;
})();

// ── Category Filter ──
const catChips = document.querySelectorAll('.cat-chip');
const restCards = document.querySelectorAll('.rest-card');

catChips.forEach(chip => {
  chip.addEventListener('click', () => {
    catChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const cat = chip.dataset.cat;
    restCards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = '';
        card.style.animation = 'fadeUp 0.3s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Bottom Nav ──
const navTabs = document.querySelectorAll('.bnav-tab');
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    navTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ── Topbar shrink on scroll ──
const feed = document.getElementById('feedScroll');
const topbar = document.querySelector('.topbar');

if (feed && topbar) {
  feed.addEventListener('scroll', () => {
    if (feed.scrollTop > 40) {
      topbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
    } else {
      topbar.style.boxShadow = 'none';
    }
  });
}

// ── Favourite toggle ──
document.querySelectorAll('.rest-fav').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const svg = btn.querySelector('svg path');
    const isFilled = svg.getAttribute('fill') !== 'none';
    if (isFilled) {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', '#fff');
    } else {
      svg.setAttribute('fill', '#E44D6E');
      svg.setAttribute('stroke', '#E44D6E');
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => btn.style.transform = '', 200);
    }
  });
});

// ── Floating cart tap animation ──
const cart = document.getElementById('floatingCart');
if (cart) {
  cart.addEventListener('click', () => {
    cart.style.transform = 'translateX(-50%) scale(0.95)';
    setTimeout(() => cart.style.transform = 'translateX(-50%) scale(1)', 150);
  });
}

// ── Inject fadeUp keyframe ──
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
