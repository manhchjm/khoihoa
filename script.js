/* =============================================
   3DS MECHANICAL - script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ===== HERO SLIDER ===== */
    const wrapper = document.getElementById('slidesWrapper');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let autoSlideTimer;
    const totalSlides = 3;

    function goToSlide(index) {
        current = (index + totalSlides) % totalSlides;
        wrapper.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(() => goToSlide(current + 1), 5000);
    }

    function resetTimer() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    document.getElementById('nextBtn')?.addEventListener('click', () => { goToSlide(current + 1); resetTimer(); });
    document.getElementById('prevBtn')?.addEventListener('click', () => { goToSlide(current - 1); resetTimer(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetTimer();
        });
    });

    // Touch/swipe support
    let touchStartX = 0;
    const sliderEl = document.querySelector('.hero-slider');
    if (sliderEl) {
        sliderEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        sliderEl.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { goToSlide(diff > 0 ? current + 1 : current - 1); resetTimer(); }
        });
    }

    startAutoSlide();

    /* ===== STICKY HEADER ===== */
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    /* ===== BACK TO TOP ===== */
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ===== MOBILE MENU ===== */
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    menuBtn?.addEventListener('click', () => {
        nav?.classList.toggle('open');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.classList.toggle('fa-bars');
        if (icon) icon.classList.toggle('fa-times');
    });

    /* ===== SMOOTH SCROLL for anchor links ===== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                nav?.classList.remove('open');
            }
        });
    });

    /* ===== SEARCH INPUT ===== */
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) alert(`Đang tìm kiếm: "${query}"`);
        }
    });

    /* ===== CONTACT FORM ===== */
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Đã gửi thành công!';
        btn.style.background = '#28a745';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const revealEls = document.querySelectorAll(
        '.product-card, .commitment-item, .project-card, .news-card, .stat-item, .about-grid, .contact-grid'
    );
    revealEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
        observer.observe(el);
    });

    // Add revealed styles dynamically
    const style = document.createElement('style');
    style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    /* ===== COUNTER ANIMATION for stats ===== */
    const statNumbers = document.querySelectorAll('.stat-item strong');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const text = el.textContent.trim();
            const num = parseInt(text);
            const suffix = text.replace(/[0-9]/g, '');
            if (isNaN(num)) return;
            let start = 0;
            const duration = 1500;
            const step = duration / 60;
            const increment = num / (duration / step);
            const timer = setInterval(() => {
                start = Math.min(start + increment, num);
                el.textContent = Math.floor(start) + suffix;
                if (start >= num) { el.textContent = num + suffix; clearInterval(timer); }
            }, step);
            statsObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    /* ===== DROPDOWN KEYBOARD SUPPORT ===== */
    document.querySelectorAll('.has-dropdown').forEach(item => {
        const link = item.querySelector('.nav-link');
        link?.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.querySelector('.dropdown')?.classList.toggle('open');
            }
        });
    });

});
