// ==================== GLOBAL VARIABLES ====================
let cart = [];
let wishlist = [];
let currentSlide = 0;
let slideInterval;

// Product database
const products = [
    { id: 1, name: 'Nike Air Max 2025', price: 1299000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'sneakers', description: 'Sneakers premium dengan teknologi Air Max terbaru untuk kenyamanan maksimal.' },
    { id: 2, name: 'Adidas Ultraboost 22', price: 1499000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', category: 'sport', description: 'Sepatu running dengan teknologi Boost untuk responsivitas maksimal.' },
    { id: 3, name: 'Puma RS-X Future', price: 999000, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop', category: 'sneakers', description: 'Desain futuristik dengan kenyamanan luar biasa.' },
    { id: 4, name: 'New Balance 574 Core', price: 899000, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop', category: 'sneakers', description: 'Klasik dan timeless dengan kualitas premium.' },
    { id: 5, name: 'Reebok Classic Leather', price: 799000, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop', category: 'sneakers', description: 'Sepatu kasual dengan desain ikonik.' },
    { id: 6, name: 'Timberland Premium Boots', price: 2199000, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop', category: 'boots', description: 'Boots premium untuk petualangan Anda.' },
    { id: 7, name: 'Clarks Oxford Formal', price: 1199000, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop', category: 'formal', description: 'Sepatu formal elegan untuk acara profesional.' },
    { id: 8, name: 'Vans Old Skool Classic', price: 699000, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', category: 'sneakers', description: 'Sepatu skateboard klasik dengan gaya timeless.' }
];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
    initializeCart();
    initializeNavigation();
    initializeNewsletter();
    initializeContactForm();
    initializeSearch();
    initializeScrollToTop();
    initializeQuickView();
    loadCartFromStorage();
    loadWishlistFromStorage();
    showLoadingSpinner(false);
});

// ==================== HERO SLIDER ====================
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Event listeners for buttons
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    startAutoSlide();

    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// ==================== SHOPPING CART ====================
function initializeCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');

    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    overlay.addEventListener('click', closeCartSidebar);
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(id, name, price, image) {
    // Check if item already exists
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToStorage();
    showNotification(`${name} ditambahkan ke keranjang!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    saveCartToStorage();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang Anda kosong</p>';
        cartTotal.textContent = 'Rp 0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Rp ${formatPrice(item.price)} x ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `Rp ${formatPrice(total)}`;
    }
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function saveCartToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#f59e0b';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== NEWSLETTER FORM ====================
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterEmail.value.trim();
        
        // Email validation
        if (!validateEmail(email)) {
            showNewsletterMessage('Harap masukkan alamat email yang valid!', 'error');
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            showNewsletterMessage('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
            newsletterEmail.value = '';
        }, 500);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNewsletterMessage(message, type) {
    const newsletterMessage = document.getElementById('newsletterMessage');
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    newsletterMessage.style.display = 'block';
    
    setTimeout(() => {
        newsletterMessage.style.display = 'none';
    }, 5000);
}

// ==================== CONTACT FORM ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== SCROLL TO TOP ====================
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== PRODUCT FILTER (Optional Enhancement) ====================
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// ==================== SEARCH FUNCTIONALITY (Optional Enhancement) ====================
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase();
    
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        
        if (productName.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce scroll events
const debouncedScroll = debounce(() => {
    // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==================== CONSOLE MESSAGE ====================
console.log('%c🎉 Welcome to ShoesHub! 🎉', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with ❤️', 'color: #10b981; font-size: 14px;');

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    searchIcon.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchInput.value = '';
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
    });

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) {
            performSearch(query);
        } else {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
        }
    }, 300));

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            performSearch(query);
        }
    });
}

function performSearch(query) {
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    const searchResults = document.getElementById('searchResults');
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="scrollToProduct(${product.id})">
                <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <div class="search-result-price">Rp ${formatPrice(product.price)}</div>
                </div>
            </div>
        `).join('');
        searchResults.classList.add('active');
    } else {
        searchResults.innerHTML = '<p style="text-align: center; padding: 2rem; color: #6b7280;">Produk tidak ditemukan</p>';
        searchResults.classList.add('active');
    }
}

function scrollToProduct(productId) {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchBar.classList.remove('active');
    searchInput.value = '';
    searchResults.classList.remove('active');
    
    scrollToSection('products');
    
    setTimeout(() => {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            productCard.style.animation = 'pulse 1s ease';
        }
    }, 500);
}

// ==================== WISHLIST FUNCTIONALITY ====================
function toggleWishlist(id, name, price, image) {
    const existingItem = wishlist.find(item => item.id === id);
    
    if (existingItem) {
        wishlist = wishlist.filter(item => item.id !== id);
        showNotification(`${name} dihapus dari wishlist`, 'info');
    } else {
        wishlist.push({ id, name, price, image });
        showNotification(`${name} ditambahkan ke wishlist!`, 'success');
    }
    
    updateWishlist();
    saveWishlistToStorage();
}

function updateWishlist() {
    const wishlistCount = document.getElementById('wishlistCount');
    wishlistCount.textContent = wishlist.length;
    
    // Update button states
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        const productId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
        const isInWishlist = wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        updateWishlist();
    }
}

// ==================== QUICK VIEW MODAL ====================
function initializeQuickView() {
    const closeModal = document.getElementById('closeModal');
    const quickViewModal = document.getElementById('quickViewModal');
    const overlay = document.getElementById('overlay');

    closeModal.addEventListener('click', closeQuickView);
    
    overlay.addEventListener('click', () => {
        closeQuickView();
        closeCartSidebar();
    });
}

function quickView(id, name, price, image, description) {
    const quickViewModal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');
    const overlay = document.getElementById('overlay');
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-image">
                <img src="${image}" alt="${name}">
            </div>
            <div class="modal-info">
                <h2>${name}</h2>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span>(4.5)</span>
                </div>
                <div class="modal-price">Rp ${formatPrice(price)}</div>
                <p class="modal-description">${description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="addToCart(${id}, '${name}', ${price}, '${image}'); closeQuickView();">
                        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                    </button>
                    <button class="btn-icon btn-wishlist ${wishlist.some(item => item.id === id) ? 'active' : ''}" 
                            onclick="toggleWishlist(${id}, '${name}', ${price}, '${image}')">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    quickViewModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const quickViewModal = document.getElementById('quickViewModal');
    const overlay = document.getElementById('overlay');
    
    quickViewModal.classList.remove('active');
    
    // Only close overlay if cart is also closed
    const cartSidebar = document.getElementById('cartSidebar');
    if (!cartSidebar.classList.contains('active')) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ==================== SCROLL TO TOP ====================
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== LOADING SPINNER ====================
function showLoadingSpinner(show = true) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.add('active');
    } else {
        spinner.classList.remove('active');
    }
}

// ==================== ENHANCED NOTIFICATION ====================
