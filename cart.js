// cart.js — FOODX Cart & Checkout Logic

const cartData = {
  zinger:     { name: 'Zinger Burger',        price: 2800, qty: 1 },
  chicken2pc: { name: '2pc Chicken & Chips',   price: 3200, qty: 2 },
  fries:      { name: 'Regular Fries',         price: 800,  qty: 1 },
};

const DELIVERY = 300;
const SERVICE  = 100;
let discount   = 0;

// ── Quantity Controls ──
document.querySelectorAll('.ci-plus').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    cartData[id].qty++;
    updateCart();
  });
});

document.querySelectorAll('.ci-minus').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    if (cartData[id].qty > 1) {
      cartData[id].qty--;
      updateCart();
    } else {
      // Remove item
      const el = document.querySelector(`.cart-item[data-id="${id}"]`);
      el.style.height = el.offsetHeight + 'px';
      el.style.overflow = 'hidden';
      el.style.transition = 'height 0.25s ease, opacity 0.25s ease, padding 0.25s ease';
      requestAnimationFrame(() => {
        el.style.height = '0';
        el.style.opacity = '0';
        el.style.padding = '0';
      });
      setTimeout(() => {
        el.remove();
        delete cartData[id];
        updateCart();
      }, 260);
    }
  });
});

function updateCart() {
  // Update quantities in DOM
  Object.keys(cartData).forEach(id => {
    const qtyEl = document.querySelector(`.ci-qty[data-id="${id}"]`);
    if (qtyEl) qtyEl.textContent = cartData[id].qty;
  });

  const subtotal = Object.values(cartData).reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + DELIVERY + SERVICE - discount;

  document.getElementById('pbSubtotal').textContent = `₦${subtotal.toLocaleString()}`;
  document.getElementById('pbTotal').textContent    = `₦${total.toLocaleString()}`;

  // Update pay button
  const payBtn = document.getElementById('payBtn');
  if (payBtn) payBtn.textContent = `Pay ₦${total.toLocaleString()}`;

  // Update checkout total
  const ckTotal = document.getElementById('ckTotal');
  if (ckTotal) ckTotal.textContent = `₦${total.toLocaleString()}`;
}

// ── Promo Code ──
const promoBtn  = document.getElementById('promoBtn');
const promoIn   = document.getElementById('promoInput');
const promoMsg  = document.getElementById('promoMsg');

if (promoBtn) {
  promoBtn.addEventListener('click', () => {
    const code = promoIn.value.trim().toUpperCase();
    if (code === 'FOODX200') {
      discount = 200;
      promoMsg.textContent = 'Code applied — you saved ₦200';
      promoMsg.className = 'promo-msg success';
      document.getElementById('pbDiscountRow').style.display = 'flex';
      document.getElementById('pbDiscount').textContent = `-₦${discount}`;
      promoIn.disabled = true;
      promoBtn.disabled = true;
      promoBtn.textContent = 'Applied';
    } else {
      promoMsg.textContent = 'That code isn\'t valid or has expired.';
      promoMsg.className = 'promo-msg error';
    }
    updateCart();
  });
}

// ── View Transitions ──
function switchView(fromId, toId) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.classList.remove('active');
  from.style.display = 'none';
  to.classList.add('active');
  to.style.display = 'flex';
}

// Cart → Checkout
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    // Transfer note
    const note = document.getElementById('orderNote').value.trim();
    if (note) {
      document.getElementById('notePreview').style.display = 'block';
      document.getElementById('noteText').textContent = `"${note}"`;
    }
    switchView('cartView', 'checkoutView');
  });
}

// Checkout → Cart (back)
const checkoutBack = document.getElementById('checkoutBack');
if (checkoutBack) {
  checkoutBack.addEventListener('click', () => {
    switchView('checkoutView', 'cartView');
  });
}

// Checkout → Success (pay)
const payBtn = document.getElementById('payBtn');
if (payBtn) {
  payBtn.addEventListener('click', () => {
    payBtn.disabled = true;
    payBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Processing...';

    setTimeout(() => {
      switchView('checkoutView', 'successView');
    }, 2000);
  });
}

// ── Order Summary Accordion ──
const summaryToggle = document.getElementById('orderSummaryToggle');
const summaryBody   = document.getElementById('orderSummaryBody');
if (summaryToggle) {
  summaryToggle.addEventListener('click', () => {
    summaryToggle.classList.toggle('open');
    summaryBody.classList.toggle('open');
  });
}

// ── Spinner CSS ──
const style = document.createElement('style');
style.textContent = `
  .spinner { animation: spin 1s linear infinite; display: inline-block; vertical-align: -4px; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

// Init totals
updateCart();
