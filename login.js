// ========================
// TAB SWITCHING
// ========================
function switchTab(tab) {
  const indicator = document.getElementById('tabIndicator');
  const tabLogin    = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const formLogin    = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    indicator.style.left = '0%';
    showForm('formLogin');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    indicator.style.left = '50%';
    showForm('formRegister');
  }
}

function showForm(id) {
  ['formLogin', 'formRegister', 'formForgot', 'formSuccess'].forEach(f => {
    const el = document.getElementById(f);
    if (el.id === id) {
      el.classList.remove('hidden');
      // re-trigger animation
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    } else {
      el.classList.add('hidden');
    }
  });
}

function showForgot() { showForm('formForgot'); }
function showLogin()  {
  switchTab('login');
  showForm('formLogin');
}

// ========================
// ACCOUNT TYPE SELECTOR
// ========================
document.querySelectorAll('.type-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    card.querySelector('input[type="radio"]').checked = true;
  });
});

// ========================
// TOGGLE PASSWORD VISIBILITY
// ========================
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ========================
// PASSWORD STRENGTH METER
// ========================
function updateStrength() {
  const val  = document.getElementById('rgPassword').value;
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');

  let score = 0;
  if (val.length >= 8)           score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;

  const levels = [
    { pct: '0%',   color: 'transparent',    text: '',                      style: '' },
    { pct: '25%',  color: '#ef4444',         text: 'Rất yếu',               style: 'color:#ef4444' },
    { pct: '50%',  color: '#f59e0b',         text: 'Yếu',                   style: 'color:#f59e0b' },
    { pct: '75%',  color: '#00d4ff',         text: 'Trung bình',            style: 'color:#00d4ff' },
    { pct: '100%', color: '#10b981',         text: 'Mạnh 💪',               style: 'color:#10b981' },
  ];

  const level = val.length === 0 ? levels[0] : levels[score];
  fill.style.width      = level.pct;
  fill.style.background = level.color;
  label.textContent     = level.text;
  label.setAttribute('style', level.style);
}

// ========================
// LIVE EMAIL CHECK (REGISTER)
// ========================
let emailCheckTimer = null;
function checkEmailLive() {
  clearTimeout(emailCheckTimer);
  const status = document.getElementById('emailStatus');
  const val = document.getElementById('rgEmail').value;

  if (!val) { status.textContent = ''; return; }
  status.textContent = '⏳';
  status.className   = 'input-status';

  emailCheckTimer = setTimeout(() => {
    // Simulate: pretend "used@techparts.vn" is taken
    const taken = ['used@techparts.vn', 'admin@techparts.vn'];
    if (taken.includes(val.toLowerCase())) {
      status.innerHTML  = '<i class="fas fa-times-circle"></i>';
      status.className  = 'input-status fail';
      setError('rg-email-group', 'Email này đã được sử dụng');
    } else if (isValidEmail(val)) {
      status.innerHTML  = '<i class="fas fa-check-circle"></i>';
      status.className  = 'input-status ok';
      clearError('rg-email-group');
    } else {
      status.textContent = '';
    }
  }, 600);
}

// ========================
// CONFIRM PASSWORD CHECK
// ========================
function checkConfirm() {
  const pass    = document.getElementById('rgPassword').value;
  const confirm = document.getElementById('rgConfirm').value;
  const status  = document.getElementById('confirmStatus');

  if (!confirm) { status.textContent = ''; return; }

  if (pass === confirm) {
    status.innerHTML = '<i class="fas fa-check-circle"></i>';
    status.className = 'input-status ok';
    clearError('rg-confirm-group');
  } else {
    status.innerHTML = '<i class="fas fa-times-circle"></i>';
    status.className = 'input-status fail';
  }
}

// ========================
// VALIDATION HELPERS
// ========================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^(0|\+84)[3-9]\d{8}$/.test(phone.replace(/\s/g, ''));
}

function setError(groupId, msg) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.classList.add('has-error');
  const errEl = group.querySelector('.field-error') ||
                document.getElementById(groupId.replace('-group', '-error'));
  if (errEl) errEl.textContent = msg;
}

function clearError(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.classList.remove('has-error');
  const errEl = group.querySelector('.field-error') ||
                document.getElementById(groupId.replace('-group', '-error'));
  if (errEl) errEl.textContent = '';
}

// ========================
// LOGIN HANDLER
// ========================
function handleLogin() {
  let valid = true;

  const email = document.getElementById('lgEmail').value.trim();
  const pass  = document.getElementById('lgPassword').value;

  if (!email) {
    setError('lg-email-group', 'Vui lòng nhập email'); valid = false;
  } else if (!isValidEmail(email)) {
    setError('lg-email-group', 'Email không hợp lệ'); valid = false;
  }

  if (!pass) {
    setError('lg-pass-group', 'Vui lòng nhập mật khẩu'); valid = false;
  } else if (pass.length < 6) {
    setError('lg-pass-group', 'Mật khẩu ít nhất 6 ký tự'); valid = false;
  }

  if (!valid) return;

  simulateSubmit('formLogin', () => {
    // Simulate: wrong credentials check
    if (email === 'wrong@email.com') {
      setError('lg-email-group', 'Email hoặc mật khẩu không đúng');
      setError('lg-pass-group', 'Email hoặc mật khẩu không đúng');
      return false;
    }
    return true;
  }, () => {
    // Lưu thông tin user vào sessionStorage để index.html dùng
    sessionStorage.setItem('currentUser', JSON.stringify({
      email: email,
      name: email.split('@')[0],
      remember: document.getElementById('lgRemember').checked
    }));
    showSuccess('Đăng nhập thành công!', `Chào mừng trở lại, ${email.split('@')[0]}! Đang chuyển hướng...`);
  });
}

// ========================
// REGISTER HANDLER
// ========================
function handleRegister() {
  let valid = true;

  const firstName = document.getElementById('rgFirstName').value.trim();
  const lastName  = document.getElementById('rgLastName').value.trim();
  const email     = document.getElementById('rgEmail').value.trim();
  const phone     = document.getElementById('rgPhone').value.trim();
  const pass      = document.getElementById('rgPassword').value;
  const confirm   = document.getElementById('rgConfirm').value;
  const terms     = document.getElementById('rgTerms').checked;

  if (!firstName) { setError('rg-fname-group', 'Nhập họ của bạn'); valid = false; }
  if (!lastName)  { setError('rg-lname-group', 'Nhập tên của bạn'); valid = false; }

  if (!email) {
    setError('rg-email-group', 'Vui lòng nhập email'); valid = false;
  } else if (!isValidEmail(email)) {
    setError('rg-email-group', 'Email không hợp lệ'); valid = false;
  }

  if (!phone) {
    setError('rg-phone-group', 'Vui lòng nhập số điện thoại'); valid = false;
  } else if (!isValidPhone(phone)) {
    setError('rg-phone-group', 'Số điện thoại không hợp lệ (VD: 0901 234 567)'); valid = false;
  }

  if (!pass) {
    setError('rg-pass-group', 'Vui lòng nhập mật khẩu'); valid = false;
  } else if (pass.length < 8) {
    setError('rg-pass-group', 'Mật khẩu ít nhất 8 ký tự'); valid = false;
  }

  if (!confirm) {
    setError('rg-confirm-group', 'Vui lòng xác nhận mật khẩu'); valid = false;
  } else if (pass !== confirm) {
    setError('rg-confirm-group', 'Mật khẩu xác nhận không khớp'); valid = false;
  }

  if (!terms) {
    setError('rg-terms-group', 'Bạn cần đồng ý với điều khoản sử dụng'); valid = false;
    document.getElementById('rg-terms-error').textContent = 'Bạn cần đồng ý với điều khoản sử dụng';
  }

  if (!valid) return;

  simulateSubmit('formRegister', () => true, () => {
    showToast('🎉 Đăng ký thành công! Hãy đăng nhập để tiếp tục.', 'ok');
    setTimeout(() => {
      switchTab('login');
      document.getElementById('lgEmail').value = email;
      const hint = document.getElementById('registerSuccessHint');
      if (hint) hint.style.display = 'flex';
      document.getElementById('lgPassword').focus();
    }, 1400);
  });
}

// ========================
// FORGOT PASSWORD HANDLER
// ========================
function handleForgot() {
  const email = document.getElementById('fpEmail').value.trim();

  if (!email) {
    setError('fp-email-group', 'Vui lòng nhập email'); return;
  }
  if (!isValidEmail(email)) {
    setError('fp-email-group', 'Email không hợp lệ'); return;
  }

  simulateSubmit('formForgot', () => true, () => {
    showToast(`📧 Email đặt lại mật khẩu đã gửi đến ${email}`, 'ok');
    setTimeout(() => showLogin(), 2500);
  });
}

// ========================
// SOCIAL LOGIN
// ========================
function socialLogin(provider) {
  showToast(`🔗 Đang kết nối với ${provider}...`, 'ok');
  setTimeout(() => {
    showToast(`✅ Đăng nhập ${provider} thành công!`, 'ok');
    setTimeout(() => {
      showSuccess(`Đăng nhập bằng ${provider} thành công!`, 'Đang chuyển hướng về trang chủ...');
    }, 1000);
  }, 1500);
}

// ========================
// SIMULATE ASYNC SUBMIT
// ========================
function simulateSubmit(formId, validate, onSuccess) {
  const form   = document.getElementById(formId);
  const btnText   = form.querySelector('.btn-text');
  const btnLoader = form.querySelector('.btn-loader');
  const btnSubmit = form.querySelector('.btn-submit');

  // Show loading state
  btnText.style.display   = 'none';
  btnLoader.style.display = 'flex';
  btnSubmit.disabled      = true;

  setTimeout(() => {
    btnText.style.display   = 'flex';
    btnLoader.style.display = 'none';
    btnSubmit.disabled      = false;

    const result = validate();
    if (result !== false) onSuccess();
  }, 1200);
}

// ========================
// SUCCESS SCREEN
// ========================
function showSuccess(title, msg) {
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successMsg').textContent   = msg;
  showForm('formSuccess');

  // Animate progress bar
  setTimeout(() => {
    document.getElementById('successBar').style.width = '100%';
  }, 100);

  // Redirect after 3s
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 3000);
}

// ========================
// TOAST NOTIFICATION
// ========================
function showToast(msg, type = 'ok') {
  const toast   = document.getElementById('authToast');
  const icon    = document.getElementById('toastIcon');
  const msgEl   = document.getElementById('toastMsg');

  msgEl.textContent = msg;
  toast.className   = `auth-toast show ${type === 'error' ? 'error' : ''}`;
  icon.className    = `toast-icon fas ${type === 'error' ? 'fa-times-circle error' : 'fa-check-circle ok'}`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ========================
// INIT: check URL param
// ========================
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('tab') === 'register') {
  switchTab('register');
}

// ========================
// KEYBOARD SHORTCUT: Enter
// ========================
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const loginVisible    = !document.getElementById('formLogin').classList.contains('hidden');
  const registerVisible = !document.getElementById('formRegister').classList.contains('hidden');
  const forgotVisible   = !document.getElementById('formForgot').classList.contains('hidden');

  if (loginVisible)    handleLogin();
  if (registerVisible) handleRegister();
  if (forgotVisible)   handleForgot();
});