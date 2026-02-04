// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Toggle Logic
const initTheme = () => {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle Theme');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Default icon

    const navbarContent = document.getElementById('navbarContent');
    if (navbarContent) {
        navbarContent.appendChild(toggleBtn);
    }

    // Check LocalStorage or Preference
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(toggleBtn, currentTheme);

    toggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(toggleBtn, newTheme);

        // Update Navbar background immediately if scrolled
        updateNavbarBackground();
    });
};

const updateIcon = (btn, theme) => {
    if (theme === 'light') {
        btn.innerHTML = '<i class="fas fa-moon"></i>'; // Show Moon to switch to Dark
    } else {
        btn.innerHTML = '<i class="fas fa-sun"></i>'; // Show Sun to switch to Light
    }
};

// Loading Spinner
window.addEventListener('load', () => {
    initTheme(); // Initialize theme on load

    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

const updateNavbarBackground = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.padding = '10px 0';

        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(11, 15, 26, 0.98)';
        }
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.padding = '15px 0';

        // Reset to CSS handled background (which is variable based)
        // But we need to ensure the variable covers the opacity if needed.
        // The CSS defines --primary-bg.
        // Let's clear the inline style when not scrolled to let CSS take over effectively
        // OR set it to the variable color with opacity.
        // For simplicity, let's let CSS handle the top state (transparent/variable) and JS handle the scrolled state.
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(11, 15, 26, 0.95)';
        }
    }
};

window.addEventListener('scroll', updateNavbarBackground);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated Counters
const counters = document.querySelectorAll('.counter-number');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counters when in view
let countersTriggered = false;
const statsSection = document.querySelector('.section-padding.bg-dark-card'); // This selector might need adjustment if class changes
// Or better, trigger it if any counter is present
if (counters.length > 0) {
    // Find the section containing the first counter
    const section = counters[0].closest('section');
    if (section) {
        window.addEventListener('scroll', () => {
            const sectionPos = section.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos && !countersTriggered) {
                animateCounters();
                countersTriggered = true;
            }
        });
    }
}

