// auth.js
// Navigation stack
const stepHistory = ['step-welcome'];
let currentStep = 'step-welcome';

function goToStep(stepId, isBack = false) {
  const currentEl = document.getElementById(currentStep);
  const nextEl = document.getElementById(stepId);
  
  if (!nextEl) return;

  if (isBack) {
    stepHistory.pop();
    currentEl.classList.remove('active', 'slide-in-left', 'slide-in-right');
    currentEl.classList.add('slide-out-right');
    
    nextEl.classList.remove('slide-out-left', 'slide-out-right');
    nextEl.classList.add('active', 'slide-in-left');
  } else {
    stepHistory.push(stepId);
    currentEl.classList.remove('active', 'slide-in-left', 'slide-in-right');
    currentEl.classList.add('slide-out-left');
    
    nextEl.classList.remove('slide-out-left', 'slide-out-right');
    nextEl.classList.add('active'); // slideInRight is default animation on .auth-step
    // re-trigger animation
    nextEl.style.animation = 'none';
    nextEl.offsetHeight; /* trigger reflow */
    nextEl.style.animation = null;
  }
  
  currentStep = stepId;
  
  if (stepId === 'step-phone') {
    setTimeout(() => {
      document.getElementById('phoneInputAuth').focus();
    }, 300);
  }
  
  if (stepId === 'step-otp') {
    startResendTimer();
    setTimeout(() => {
      document.querySelector('.otp-input[data-index="0"]').focus();
    }, 300);
  }
}

function goBack() {
  if (stepHistory.length > 1) {
    const prevStep = stepHistory[stepHistory.length - 2];
    goToStep(prevStep, true);
  }
}

// Phone Input Formatting & Validation
const phoneInput = document.getElementById('phoneInputAuth');
const btnSendCode = document.getElementById('btnSendCode');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    // Only allow numbers
    let val = e.target.value.replace(/\D/g, '');
    
    // Auto-format like 803 123 4567
    let formatted = val;
    if (val.length > 3) {
      formatted = val.slice(0, 3) + ' ' + val.slice(3);
    }
    if (val.length > 6) {
      formatted = formatted.slice(0, 7) + ' ' + val.slice(6);
    }
    
    e.target.value = formatted;
    
    // Enable button if valid length (10 or 11 digits in Nigeria)
    if (val.length >= 10) {
      btnSendCode.removeAttribute('disabled');
    } else {
      btnSendCode.setAttribute('disabled', 'true');
    }
  });
}

function submitPhone() {
  const phone = phoneInput.value;
  document.getElementById('displayPhone').innerText = '+234 ' + phone;
  
  // Simulate loading
  btnSendCode.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
  btnSendCode.disabled = true;
  
  setTimeout(() => {
    btnSendCode.innerHTML = 'Continue';
    btnSendCode.disabled = false;
    goToStep('step-otp');
  }, 1000);
}

// OTP Input Logic
const otpInputs = document.querySelectorAll('.otp-input');
const btnVerify = document.getElementById('btnVerify');

otpInputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    if (e.target.value) {
      e.target.classList.add('filled');
      if (index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      } else {
        // Last input filled, enable verify button
        checkOTPComplete();
      }
    } else {
      e.target.classList.remove('filled');
      btnVerify.setAttribute('disabled', 'true');
    }
    
    // Auto-submit if all filled (optional)
    if (index === otpInputs.length - 1 && e.target.value) {
      setTimeout(verifyOTP, 300);
    }
  });
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpInputs[index - 1].focus();
      otpInputs[index - 1].value = '';
      otpInputs[index - 1].classList.remove('filled');
      btnVerify.setAttribute('disabled', 'true');
    }
  });
});

function checkOTPComplete() {
  let complete = true;
  otpInputs.forEach(input => {
    if (!input.value) complete = false;
  });
  if (complete) {
    btnVerify.removeAttribute('disabled');
  }
}

function verifyOTP() {
  // Simulate checking OTP
  let otp = '';
  otpInputs.forEach(i => otp += i.value);
  
  btnVerify.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
  btnVerify.disabled = true;
  
  setTimeout(() => {
    if (otp === '123456') { // Mock success condition
      btnVerify.innerHTML = 'Success!';
      btnVerify.style.backgroundColor = 'var(--green-primary)';
      btnVerify.style.color = '#fff';
      
      // Mocking next step (in a real app, goes to home)
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    } else {
      // Mock error
      otpInputs.forEach(input => {
        input.classList.add('error');
      });
      setTimeout(() => {
        otpInputs.forEach(input => {
          input.classList.remove('error');
          input.value = '';
          input.classList.remove('filled');
        });
        otpInputs[0].focus();
      }, 500);
      btnVerify.innerHTML = 'Verify';
      btnVerify.disabled = true;
    }
  }, 1500);
}

// Timer for Resend
let timerInterval;
function startResendTimer() {
  clearInterval(timerInterval);
  let time = 45;
  const resendTimerEl = document.getElementById('resendTimer');
  const resendTextEl = document.querySelector('.resend-text');
  
  resendTextEl.innerHTML = `Didn't get it? Resend in <span id="resendTimer">0:45</span>`;
  
  timerInterval = setInterval(() => {
    time--;
    const el = document.getElementById('resendTimer');
    if (el) {
      el.innerText = `0:${time < 10 ? '0' + time : time}`;
    }
    if (time <= 0) {
      clearInterval(timerInterval);
      resendTextEl.innerHTML = `<a href="#" class="auth-link" style="padding:0; margin:0; text-align: left;" onclick="resendCode()">Resend Code</a>`;
    }
  }, 1000);
}

function resendCode() {
  startResendTimer();
  // Simulate resend
  const btn = document.querySelector('.resend-text a');
  if (btn) {
      btn.innerText = 'Sent!';
      setTimeout(() => startResendTimer(), 1000);
  }
}

// CSS for spin animation
const style = document.createElement('style');
style.textContent = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
