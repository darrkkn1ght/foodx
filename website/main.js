document.addEventListener('DOMContentLoaded', () => {
  /* ========== NAVBAR SCROLL EFFECT ========== */
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ========== MOBILE MENU TOGGLE ========== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Simple animation for hamburger icon
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ========== PHONE MOCKUP TILT ON MOUSE MOVE ========== */
  const phoneMockup = document.querySelector('.phone-mockup');
  
  if (phoneMockup && window.innerWidth >= 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 30;
      const y = (window.innerHeight / 2 - e.clientY) / 30;
      phoneMockup.style.transform = `translateY(-7px) rotateX(${y}deg) rotateY(${-x}deg)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      phoneMockup.style.transform = '';
    });
  }

  /* ========== FLOATING SHAPES GENERATOR ========== */
  const shapesContainer = document.getElementById('floatingShapes');
  
  if (shapesContainer) {
    const shapeTypes = ['shape-orb', 'shape-ring', 'shape-spark'];
    
    // Generate 15 random abstract shapes
    for (let i = 0; i < 15; i++) {
      const shape = document.createElement('div');
      const shapeClass = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.className = `floating-shape ${shapeClass}`;
      
      // Randomize position, size, duration and delay
      const left = Math.random() * 100;
      const size = 10 + Math.random() * 60; // 10px to 70px
      const duration = 20 + Math.random() * 25; // 20-45s
      const delay = Math.random() * 20; // 0-20s
      
      shape.style.left = `${left}%`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.animationDuration = `${duration}s`;
      shape.style.animationDelay = `-${delay}s`;
      
      shapesContainer.appendChild(shape);
    }
  }

  /* ========== COUNTUP ANIMATION ========== */
  const countElements = document.querySelectorAll('.hero-stat-number[data-count]');
  
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = target > 100 ? 2000 : 1500; // 2s for big numbers, 1.5s for small
    const startTime = performance.now();
    
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * target);
      
      el.innerText = current + (target >= 5 ? '+' : '');
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target + (target >= 200 ? '' : '+');
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  /* ========== STREAK COUNTUP ========== */
  const streakCountEl = document.querySelector('.streak-count');
  let streakCounted = false;
  
  const animateStreakCount = () => {
    if (streakCounted || !streakCountEl) return;
    streakCounted = true;
    const target = 14;
    const duration = 1200;
    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      streakCountEl.innerText = current;
      if (progress < 1) requestAnimationFrame(update);
      else streakCountEl.innerText = target;
    };
    
    requestAnimationFrame(update);
  };

  /* ========== SCROLL ANIMATIONS (INTERSECTION OBSERVER) ========== */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger count animation if it's the stats container
        if (entry.target.classList.contains('hero-stats')) {
          countElements.forEach(el => animateCount(el));
        }
        
        // Trigger streak countup when feature card enters viewport
        if (entry.target.id === 'featureStreaks') {
          animateStreakCount();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animation targets
  document.querySelectorAll('.animate-on-scroll, .fade-up, .fade-left, .fade-right, .notif-animate').forEach(el => {
    observer.observe(el);
  });

  /* ========== WAITLIST FORM HANDLING ========== */
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistSuccess = document.getElementById('waitlistSuccess');
  const phoneInput = document.getElementById('phoneInput');
  const submitBtn = document.getElementById('waitlistSubmit');

  if (waitlistForm && waitlistSuccess && phoneInput) {
    // Restrict input to numbers only
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const phone = phoneInput.value;
      
      // Basic validation for Nigerian phone numbers (should be 10 or 11 digits depending on format)
      if (phone.length < 10) {
        alert("Please enter a valid phone number");
        return;
      }

      // Simulate API call
      submitBtn.innerHTML = '<span>Saving...</span>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Hide form, show success message
        waitlistForm.style.display = 'none';
        waitlistSuccess.classList.add('show');
        
        // Hide the conversion triggers above form
        const counter = document.querySelector('.waitlist-counter');
        const spotsWrap = document.querySelector('.spots-bar-wrap');
        const spotsLabel = document.querySelector('.spots-label');
        const countdown = document.querySelector('.countdown-wrap');
        if (counter) counter.style.display = 'none';
        if (spotsWrap) spotsWrap.style.display = 'none';
        if (spotsLabel) spotsLabel.style.display = 'none';
        if (countdown) countdown.style.display = 'none';
      }, 1000);
    });
  }

  /* ========== LIVE WAITLIST COUNTER ========== */
  let waitlistLiveCount = 247;
  const waitlistCountEl = document.getElementById('waitlistCount');
  
  if (waitlistCountEl) {
    setInterval(() => {
      const shouldIncrement = Math.random() > 0.6;
      if (shouldIncrement) {
        waitlistLiveCount += Math.floor(Math.random() * 3) + 1;
        waitlistCountEl.textContent = waitlistLiveCount;
      }
    }, 4000);
  }

  /* ========== COUNTDOWN TIMER ========== */
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 45);

  function updateCountdown() {
    const now = new Date();
    const diff = launchDate - now;
    if (diff <= 0) return;
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMins');
    const sEl = document.getElementById('cdSecs');
    
    if (dEl) dEl.textContent = String(d).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ========== FAQ ACCORDION ========== */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      
      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      
      // If it wasn't open, open it
      if (!isOpen) item.classList.add('open');
    });
  });
});

/* ========== THEME TOGGLE ========== */
(function() {
  const toggleBtn = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('themeIconMoon');
  const sunIcon = document.getElementById('themeIconSun');
  const html = document.documentElement;

  if (!toggleBtn || !moonIcon || !sunIcon) return;

  // Restore saved preference or respect system
  const saved = localStorage.getItem('foodx-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  if (initial === 'light') {
    html.setAttribute('data-theme', 'light');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
      localStorage.setItem('foodx-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
      localStorage.setItem('foodx-theme', 'light');
    }
  });
})();
