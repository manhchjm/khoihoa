// ============================================
// Mobile Navigation Toggle
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navItems = document.querySelectorAll('.nav-item.has-dropdown');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown parent on desktop
        if (link.closest('.has-dropdown') && window.innerWidth > 767) {
            e.preventDefault();
            return;
        }
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Dropdown menu handling
navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    // Desktop: hover to show dropdown
    if (window.innerWidth > 767) {
        item.addEventListener('mouseenter', () => {
            item.classList.add('dropdown-open');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('dropdown-open');
        });
    }
    
    // Mobile: click to toggle dropdown
    if (window.innerWidth <= 767) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('dropdown-open');
        });
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        navItems.forEach(item => {
            item.classList.remove('dropdown-open');
        });
    }
});

// ============================================
// Smooth Scroll Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 135; // Header (90px) + Navigation bar (45px)
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Header Scroll Effect
// ============================================

const header = document.querySelector('.header');
const navBar = document.querySelector('.navigation-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        if (header) header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2)';
        if (navBar) navBar.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
    } else {
        if (header) header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        if (navBar) navBar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ============================================
// Search Functionality
// ============================================

const searchInput = document.querySelector('.search-input');
const searchBtnSubmit = document.querySelector('.search-btn-submit');
const searchBtnAll = document.querySelector('.search-btn-all');

if (searchBtnSubmit) {
    searchBtnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const keyword = searchInput ? searchInput.value.trim() : '';
        if (keyword) {
            console.log('Searching for:', keyword);
            // Add search functionality here
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchBtnSubmit) {
                searchBtnSubmit.click();
            }
        }
    });
}

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.news-card, .sidebar-card, .training-card, .student-block, .partner-logo');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .news-card.visible,
    .sidebar-card.visible,
    .training-card.visible,
    .student-block.visible,
    .partner-logo.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// Card Hover Effects
// ============================================

document.querySelectorAll('.news-card, .sidebar-card, .training-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('visible')) return;
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('visible')) return;
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// Category Link Active State
// ============================================

document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.category-link').forEach(l => {
            l.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Add active state styles
const categoryStyle = document.createElement('style');
categoryStyle.textContent = `
    .category-link.active {
        color: var(--primary-color);
        font-weight: 600;
        padding-left: var(--spacing-sm);
    }
`;
document.head.appendChild(categoryStyle);

// ============================================
// Theme Color Switcher
// ============================================

const themeColors = {
    'default': {
        primary: '#2f69d3',
        secondary: '#1b4796',
        dark: '#1b4796',
        light: '#49566e',
        deep: '#0a285e',
        hover: '#2563c7'
    },
    'thpt': {
        primary: '#1b4796',
        secondary: '#1b4796',
        dark: '#154075',
        light: '#2d5a8a',
        deep: '#0a285e',
        hover: '#1a4285'
    },
    'thcs': {
        primary: '#49566e',
        secondary: '#49566e',
        dark: '#3d4759',
        light: '#5a677a',
        deep: '#0a285e',
        hover: '#3f4d60'
    },
    'tieu-hoc': {
        primary: '#0a285e',
        secondary: '#0a285e',
        dark: '#071d42',
        light: '#0d3268',
        deep: '#0a285e',
        hover: '#081f4a'
    }
};

function applyTheme(theme) {
    const colors = themeColors[theme] || themeColors['default'];
    const root = document.documentElement;
    
    // Update all color variables
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--primary-dark', colors.dark);
    root.style.setProperty('--primary-light', colors.light);
    root.style.setProperty('--primary-deep', colors.deep);
    root.style.setProperty('--secondary-color', colors.primary);
    root.style.setProperty('--accent-color', colors.primary);
    
    // Update legacy red variables (used in many places)
    root.style.setProperty('--red-primary', colors.primary);
    root.style.setProperty('--red-secondary', colors.dark);
    root.style.setProperty('--red-light', colors.light);
    
    // Update header and navigation bar directly
    const header = document.querySelector('.header');
    const navBar = document.querySelector('.navigation-bar');
    const mottoSection = document.querySelector('.motto-section');
    const searchBtn = document.querySelector('.search-btn-submit');
    const footerLogo = document.querySelector('.footer-logo-icon');
    const bannerImage = document.querySelector('.banner-image');
    const bannerOverlay = document.querySelector('.banner-overlay');
    
    if (header) {
        header.style.backgroundColor = colors.primary;
    }
    if (navBar) {
        navBar.style.backgroundColor = colors.dark;
    }
    if (mottoSection) {
        mottoSection.style.backgroundColor = colors.primary;
    }
    if (searchBtn) {
        searchBtn.style.backgroundColor = colors.primary;
    }
    if (footerLogo) {
        footerLogo.style.backgroundColor = colors.primary;
    }
    if (bannerImage) {
        bannerImage.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`;
    }
    if (bannerOverlay) {
        // Convert hex to rgb
        const hex = colors.primary.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        bannerOverlay.style.background = `linear-gradient(to top, rgba(${r}, ${g}, ${b}, 0.95), transparent)`;
    }
    
    // Update all nav links hover background
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = `rgba(255, 255, 255, 0.1)`;
        });
    });
    
    // Update all category titles borders
    document.querySelectorAll('.category-title').forEach(title => {
        title.style.borderBottomColor = colors.primary;
    });
    
    // Update all section titles
    document.querySelectorAll('.section-main-title').forEach(title => {
        title.style.color = colors.primary;
    });
    
    // Update logo icon color
    document.querySelectorAll('.logo-icon').forEach(icon => {
        icon.style.color = colors.primary;
    });
    
    // Update active state
    document.querySelectorAll('.theme-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.theme-link[data-theme="${theme}"]`)?.classList.add('active');
    
    // Save to localStorage
    localStorage.setItem('selectedTheme', theme);
}

// Initialize theme from localStorage or default
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    applyTheme(savedTheme);
    
    // Add click handlers
    document.querySelectorAll('.theme-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
        });
    });
});

// Add active state styles for theme links
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    .theme-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(themeStyle);
