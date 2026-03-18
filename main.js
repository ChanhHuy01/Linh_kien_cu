// ========================
// DATA
// ========================
const products = [
  {
    id: 1, name: 'Intel Core i7-10700K', cat: 'CPU',
    price: 3200000, oldPrice: 4500000, img: '🔲', badge: 'hot',
    condClass: 'great', condPct: 95,
    specs: ['8 nhân 16 luồng', '3.8GHz - 5.1GHz', 'Socket LGA1200'],
    seller: 'TechStore VN', rating: '★★★★★',
    desc: 'CPU hiệu năng cao, phù hợp cho làm việc, lập trình, gaming. Còn hoạt động ổn định.',
    condition_detail: '95% - Như mới', warranty: '6 tháng', origin: 'Intel - Mỹ', used: '3 tháng'
  },
  {
    id: 2, name: 'Kingston 16GB DDR4 3200MHz', cat: 'RAM',
    price: 780000, oldPrice: 1100000, img: '🧩', badge: 'sale',
    condClass: 'good', condPct: 85,
    specs: ['16GB DDR4', '3200MHz', 'CL16'],
    seller: 'RAM Shop HN', rating: '★★★★☆',
    desc: 'RAM tốc độ cao, tương thích rộng với nhiều mainboard. Kiểm tra đã pass memtest86.',
    condition_detail: '85% - Còn tốt', warranty: '3 tháng', origin: 'Kingston - Đài Loan', used: '8 tháng'
  },
  {
    id: 3, name: 'RTX 3060 Ti 8GB GDDR6', cat: 'GPU',
    price: 7500000, oldPrice: 11000000, img: '🖥️', badge: 'hot',
    condClass: 'great', condPct: 90,
    specs: ['8GB GDDR6', 'HDMI 2.1', 'PCIe 4.0'],
    seller: 'GPU Zone', rating: '★★★★★',
    desc: 'Card đồ họa gaming mạnh mẽ, phù hợp 1440p gaming. Không đào coin, còn bảo hành hãng.',
    condition_detail: '90% - Rất tốt', warranty: '5 tháng', origin: 'NVIDIA - Mỹ', used: '5 tháng'
  },
  {
    id: 4, name: 'ASUS ROG STRIX B550-F', cat: 'Mainboard',
    price: 2800000, oldPrice: 3900000, img: '🔌', badge: 'new',
    condClass: 'good', condPct: 88,
    specs: ['Socket AM4', 'DDR4 x4', 'PCIe 4.0'],
    seller: 'MainboardVN', rating: '★★★★☆',
    desc: 'Mainboard cao cấp dòng ROG, hỗ trợ Ryzen 5000 series. Đầy đủ phụ kiện kèm theo.',
    condition_detail: '88% - Còn tốt', warranty: '4 tháng', origin: 'ASUS - Đài Loan', used: '6 tháng'
  },
  {
    id: 5, name: 'Samsung 970 EVO 1TB NVMe', cat: 'SSD',
    price: 1200000, oldPrice: 1800000, img: '💾', badge: 'sale',
    condClass: 'good', condPct: 80,
    specs: ['1TB NVMe', 'M.2 PCIe 3.0', '3500MB/s'],
    seller: 'StoragePro', rating: '★★★★☆',
    desc: 'SSD nhanh, ổn định cho hệ điều hành và lưu trữ. Đã kiểm tra health 80%.',
    condition_detail: '80% - Dùng được', warranty: '2 tháng', origin: 'Samsung - Hàn Quốc', used: '14 tháng'
  },
  {
    id: 6, name: 'Corsair RM750x 750W', cat: 'Nguồn',
    price: 1500000, oldPrice: 2200000, img: '⚡', badge: 'new',
    condClass: 'great', condPct: 95,
    specs: ['750W 80+ Gold', 'Full Modular', 'ATX 12V'],
    seller: 'PowerVN', rating: '★★★★★',
    desc: 'Nguồn đạt chuẩn 80+ Gold, full modular. Còn bảo hành Corsair 3 năm.',
    condition_detail: '95% - Như mới', warranty: '6 tháng', origin: 'Corsair - Mỹ', used: '2 tháng'
  },
  {
    id: 7, name: 'AMD Ryzen 7 5800X', cat: 'CPU',
    price: 4200000, oldPrice: 6500000, img: '🔲', badge: 'hot',
    condClass: 'great', condPct: 92,
    specs: ['8 nhân 16 luồng', '3.8GHz - 4.7GHz', 'Socket AM4'],
    seller: 'AMD Center', rating: '★★★★★',
    desc: 'CPU AMD mạnh mẽ cho cả gaming lẫn đa nhiệm. Hiệu năng vượt trội tầm giá.',
    condition_detail: '92% - Như mới', warranty: '5 tháng', origin: 'AMD - Mỹ', used: '4 tháng'
  },
  {
    id: 8, name: 'Crucial 32GB DDR4 3600MHz', cat: 'RAM',
    price: 1400000, oldPrice: 2100000, img: '🧩', badge: 'sale',
    condClass: 'fair', condPct: 75,
    specs: ['32GB DDR4', '3600MHz', 'CL18'],
    seller: 'MemoryShop', rating: '★★★☆☆',
    desc: 'Bộ RAM 32GB cho workstation, render, lập trình. Tình trạng còn sử dụng tốt.',
    condition_detail: '75% - Bình thường', warranty: '2 tháng', origin: 'Crucial - Mỹ', used: '18 tháng'
  }
];

let cartCount = 0;

// ========================
// RENDER PRODUCTS
// ========================
function renderProducts(data) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = data.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      <span class="product-badge badge-${p.badge}">
        ${p.badge === 'hot' ? '🔥 Hot' : p.badge === 'new' ? '✨ Mới' : '🏷️ Sale'}
      </span>
      <button class="product-fav" onclick="event.stopPropagation(); toggleFav(this)">
        <i class="far fa-heart"></i>
      </button>
      <div class="product-img">
        <div style="font-size:4.5rem; z-index:1; position:relative;">${p.img}</div>
        <div class="product-img-overlay">
          <button class="quick-view-btn">Xem nhanh</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-specs">
          ${p.specs.slice(0, 2).map(s => `<span class="spec-tag">${s}</span>`).join('')}
        </div>
        <div class="product-condition">
          <div class="condition-bar">
            <div class="condition-fill ${p.condClass}" style="width:${p.condPct}%"></div>
          </div>
          <span class="condition-text">${p.condPct}%</span>
        </div>
        <div class="product-footer">
          <div>
            <div class="product-price">${p.price.toLocaleString('vi-VN')}₫</div>
            <div class="product-price-old">${p.oldPrice.toLocaleString('vi-VN')}₫</div>
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${p.name}')">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <div class="product-seller">
        <div class="seller-avatar">${p.seller[0]}</div>
        <span class="seller-name">${p.seller}</span>
        <span class="seller-rating">${p.rating}</span>
      </div>
    </div>
  `).join('');
}

// ========================
// MODAL
// ========================
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalImg').textContent   = p.img;
  document.getElementById('modalCat').textContent   = p.cat;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalPrice').textContent = p.price.toLocaleString('vi-VN') + '₫';
  document.getElementById('modalDesc').textContent  = p.desc;
  document.getElementById('modalSpecs').innerHTML = `
    <div class="modal-spec"><label>Tình trạng</label><span>${p.condition_detail}</span></div>
    <div class="modal-spec"><label>Bảo hành</label><span>${p.warranty}</span></div>
    <div class="modal-spec"><label>Xuất xứ</label><span>${p.origin}</span></div>
    <div class="modal-spec"><label>Đã sử dụng</label><span>${p.used}</span></div>
  `;
  document.getElementById('productModal').dataset.name = p.name;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCartModal() {
  const name = document.getElementById('productModal').dataset.name || 'sản phẩm';
  addToCart(name);
  closeModal();
}

function buyNow() {
  showToast('Đang chuyển đến trang thanh toán...');
  closeModal();
}

// ========================
// CART
// ========================
function addToCart(name) {
  cartCount++;
  document.getElementById('cartBadge').textContent = cartCount;
  showToast(`Đã thêm "${name.substring(0, 20)}..." vào giỏ!`);
}

function showCart() {
  showToast(`Giỏ hàng: ${cartCount} sản phẩm`);
}

// ========================
// TOAST
// ========================
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ========================
// FAVOURITE
// ========================
function toggleFav(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
  showToast(btn.classList.contains('active') ? '❤️ Đã thêm vào yêu thích!' : '💔 Đã bỏ yêu thích');
}

// ========================
// FILTER & SORT
// ========================
function setFilter(el, type) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  if (type === 'all') {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.badge === type || type === 'verified'));
  }
}

function filterCategory(cat) {
  event.preventDefault();
  const filtered = products.filter(p => p.cat === cat);
  if (filtered.length) {
    renderProducts(filtered);
    document.getElementById('productCount').textContent = `Hiển thị ${filtered.length} sản phẩm cho "${cat}"`;
  } else {
    renderProducts(products);
  }
  scrollToProducts();
}

function sortProducts(val) {
  let sorted = [...products];
  if (val === 'price-asc')  sorted.sort((a, b) => a.price - b.price);
  if (val === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  if (val === 'newest')     sorted.reverse();
  renderProducts(sorted);
}

// ========================
// SEARCH
// ========================
function handleSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  if (!q) { renderProducts(products); return; }
  const res = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
  );
  renderProducts(res.length ? res : products);
  document.getElementById('productCount').textContent = res.length
    ? `Tìm thấy ${res.length} sản phẩm cho "${q}"`
    : 'Không tìm thấy, hiển thị tất cả';
  scrollToProducts();
}

function scrollToProducts() {
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

// ========================
// COUNTDOWN
// ========================
function updateCountdown() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cdHour').textContent = String(h).padStart(2, '0');
  document.getElementById('cdMin').textContent  = String(m).padStart(2, '0');
  document.getElementById('cdSec').textContent  = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ========================
// LOADING BAR
// ========================
const lb = document.getElementById('loadingBar');
lb.style.width = '70%';
setTimeout(() => {
  lb.style.width = '100%';
  setTimeout(() => lb.style.opacity = '0', 300);
}, 400);

// ========================
// EVENT LISTENERS
// ========================
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// ========================
// INIT
// ========================
renderProducts(products);

// ========================
// AUTH STATE (login/logout)
// ========================
function checkAuthState() {
  const user = sessionStorage.getItem('currentUser');
  if (!user) return;

  const { name, email } = JSON.parse(user);
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  // Ẩn nút đăng nhập/đăng ký, hiện user menu
  document.getElementById('authButtons').style.display = 'none';
  const userMenu = document.getElementById('userMenu');
  userMenu.style.display = 'flex';

  // Set tên và avatar
  document.getElementById('userName').textContent  = displayName;
  document.getElementById('userAvatar').textContent = displayName.charAt(0).toUpperCase();
}

function logout() {
  sessionStorage.removeItem('currentUser');
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display = 'none';
  showToast('Đã đăng xuất thành công!');
}

// Chạy khi trang load
checkAuthState();