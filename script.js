// ==================== SMOOTH SCROLLING ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMATED COUNTERS ==================== 
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        // Use Intersection Observer to trigger animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
};

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.experience-card, .skill-card, .testimonial-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== NAVBAR SCROLL EFFECT ==================== 
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==================== ACTIVE NAV LINK ==================== 
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-secondary)';
        link.style.textShadow = 'none';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.textShadow = '0 0 10px rgba(88, 101, 242, 0.5)';
        }
    });
});

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero::before');
    const scrollPosition = window.pageYOffset;
    
    document.querySelectorAll('section').forEach((section, index) => {
        const speed = 0.5;
        section.style.backgroundPosition = `0 ${scrollPosition * speed}px`;
    });
});

// ==================== HOVER EFFECTS FOR CARDS ==================== 
document.querySelectorAll('.experience-card, .skill-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    animateCounters();
    
    // Fade in hero content
    document.querySelectorAll('.hero-text > *, .hero-stats').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideInUp 0.8s ease ${index * 0.2}s forwards`;
    });
});

// ==================== MOBILE MENU TOGGLE ==================== 
const toggleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
};

// Add click outside to close mobile menu
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    if (!navbar.contains(e.target)) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
    }
});

// ==================== CURSOR EFFECTS (Optional) ==================== 
document.addEventListener('mousemove', (e) => {
    const cursor = e.clientX;
    const cursorY = e.clientY;
    
    // Add subtle effects if needed
    document.querySelectorAll('.stat-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = cursor - rect.left;
        const y = cursorY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.boxShadow = `
                ${(x - rect.width / 2) * 0.1}px 
                ${(y - rect.height / 2) * 0.1}px 
                30px rgba(88, 101, 242, 0.3)
            `;
        }
    });
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('Portfolio website loaded successfully! 🚀');