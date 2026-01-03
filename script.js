const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Dropdown mobile toggle
const dropdowns = document.querySelectorAll('.nav-links li');
dropdowns.forEach(li => {
    const a = li.querySelector('a');
    const ul = li.querySelector('ul');
    if (ul) {
        a.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                li.classList.toggle('active');
            }
        });
    }
});
