// restaurant.js — FOODX Restaurant Detail

const cart = [];

// ── Menu Tab Switching ──
const tabs = document.querySelectorAll('.mtab');
const sections = document.querySelectorAll('.menu-section');
const menuScroll = document.getElementById('menuScroll');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const target = tab.dataset.section;
    const section = document.querySelector(`.menu-section[data-section="${target}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll spy — highlight tab based on scroll position
if (menuScroll) {
  menuScroll.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - menuScroll.offsetTop - 60;
      if (menuScroll.scrollTop >= top) {
        current = sec.dataset.section;
      }
    });
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.section === current);
    });
  });
}

// ── Add to Cart ──
const cartBar = document.getElementById('cartBar');
const cbCount = document.getElementById('cbCount');
const cbTotal = document.getElementById('cbTotal');

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.dataset.name;
    const price = parseInt(item.dataset.price);
    
    // Check if already in cart
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    
    // Visual feedback on the + button
    const addBtn = item.querySelector('.mi-add');
    addBtn.style.transform = 'scale(1.3)';
    addBtn.style.background = 'var(--green-light)';
    setTimeout(() => {
      addBtn.style.transform = '';
      addBtn.style.background = '';
    }, 200);
    
    // Ripple on item row
    item.style.background = 'rgba(26,122,60,0.08)';
    setTimeout(() => item.style.background = '', 300);
    
    updateCartBar();
  });
});

function updateCartBar() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  
  if (totalItems > 0) {
    cartBar.style.display = 'flex';
    cbCount.textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
    cbTotal.textContent = `₦${totalPrice.toLocaleString()}`;
  } else {
    cartBar.style.display = 'none';
  }
}

// ── Save/Favourite Toggle ──
const saveBtn = document.getElementById('saveBtn');
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const path = saveBtn.querySelector('svg path');
    const isSaved = path.getAttribute('fill') !== 'none';
    if (isSaved) {
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#fff');
    } else {
      path.setAttribute('fill', '#E44D6E');
      path.setAttribute('stroke', '#E44D6E');
      saveBtn.style.transform = 'scale(1.2)';
      setTimeout(() => saveBtn.style.transform = '', 200);
    }
  });
}

// ── Share ──
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Chicken Republic on FOODX',
        text: 'Check out this restaurant on FOODX',
        url: window.location.href
      });
    }
  });
}
