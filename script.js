// ========== HERO SLIDER ==========
(function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let current = 0;
    let autoTimer;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        autoTimer = setInterval(() => {
            showSlide(current + 1);
        }, 4500);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(current - 1);
            resetAuto();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(current + 1);
            resetAuto();
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetAuto();
        });
    });

    startAuto();

    // Touch/swipe support
    const sliderEl = document.querySelector('.hero-slider');
    if (sliderEl) {
        let startX = 0;
        sliderEl.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        sliderEl.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                showSlide(diff > 0 ? current + 1 : current - 1);
                resetAuto();
            }
        }, { passive: true });
    }
})();

// ========== MOBILE NAV TOGGLE ==========
(function () {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            const icon = toggle.querySelector('i');
            if (menu.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Dropdown on mobile
    document.querySelectorAll('.nav-item.has-dropdown .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                link.closest('.nav-item').classList.toggle('open-sub');
            }
        });
    });
})();

// ========== BACK TO TOP ==========
(function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ========== STICKY HEADER SHADOW ==========
(function () {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
        }
    }, { passive: true });
})();

// ========== FEATURED PRODUCTS SLIDER (left/right) ==========
(function () {
    const grid = document.getElementById('featured-grid');
    const prevBtn = document.getElementById('feat-prev');
    const nextBtn = document.getElementById('feat-next');
    if (!grid || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const cardWidth = 220;

    nextBtn.addEventListener('click', () => {
        scrollAmount += cardWidth;
        grid.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount = Math.max(0, scrollAmount - cardWidth);
        grid.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
})();

// ========== SEARCH ON ENTER ==========
(function () {
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');
    if (!input || !btn) return;

    function doSearch() {
        const q = input.value.trim();
        if (q) {
            // In production, navigate to search results
            // window.location.href = `/search?q=${encodeURIComponent(q)}`;
            alert('Tìm kiếm: ' + q);
        }
    }

    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch();
    });
})();

// ========== PRODUCT CARD HOVER ANIMATION (scroll-triggered) ==========
(function () {
    const cards = document.querySelectorAll('.product-card');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
        observer.observe(card);
    });
})();

// ========== LANGUAGE FLAG TOGGLE ==========
(function () {
    const flags = document.querySelectorAll('.flag-btn');
    flags.forEach(flag => {
        flag.addEventListener('click', (e) => {
            e.preventDefault();
            flags.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
        });
    });
})();
