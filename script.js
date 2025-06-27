// PASTE THIS ENTIRE BLOCK INTO script.js, REPLACING THE EXISTING ONE

document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCTION 1: SPOTLIGHT & ACHTERGROND IN HERO ---
    const heroSection = document.querySelector('.hero');
    const spotlight = document.querySelector('.background-spotlight');
    if (heroSection && spotlight) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.setProperty('--mouse-x', x + 'px');
            spotlight.style.setProperty('--mouse-y', y + 'px');
            spotlight.style.opacity = 1;
        });
        heroSection.addEventListener('mouseleave', () => {
            spotlight.style.opacity = 0;
        });
    }

    // --- FUNCTIE 2: ANIMATIES BIJ LADEN VAN DE PAGINA ---
    const heroTitleSpans = document.querySelectorAll('.hero-title span');
    heroTitleSpans.forEach((span, index) => {
        const delay = 700 + (index * 50);
        setTimeout(() => {
            span.style.animationDelay = `${index * 50}ms`;
        }, 500);
    });

    // --- FUNCTIE 3: ANIMATIES BIJ SCROLLEN (FADE-IN) ---
    const animatedElements = document.querySelectorAll('.fade-in');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => scrollObserver.observe(el));
    
    // --- FUNCTIE 4: ACHTERGRONDLIJNEN ANIMEREN ---
    const animatedBackgrounds = document.querySelectorAll('.section-background-lines');
    if (animatedBackgrounds.length > 0) {
        const backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-drawing');
                    backgroundObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        animatedBackgrounds.forEach(bg => backgroundObserver.observe(bg));
    }

    // --- FUNCTIE 5: DESKTOP NAVIGATIE LOGICA ---
    const navLinks = document.querySelectorAll('.glass-nav a');
    const glider = document.querySelector('.glass-glider');
    const sections = document.querySelectorAll('.content-section');
    const nav = document.querySelector('.glass-nav');

    function updateGlider(activeLink) {
        if (!activeLink || !glider || !nav) return;
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        glider.style.width = `${linkRect.width}px`;
        glider.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    }

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Give a slight delay for scroll to start before updating glider
                    setTimeout(() => updateGlider(link), 100);
                }
            });
        });

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeLink = document.querySelector(`.glass-nav a[href="#${entry.target.id}"]`);
                    updateGlider(activeLink);
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
        sections.forEach(section => navObserver.observe(section));

        window.addEventListener('load', () => {
            setTimeout(() => {
                const initialActiveLink = document.querySelector('.glass-nav a[href="#home"]');
                updateGlider(initialActiveLink);
                if (glider) {
                   glider.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                }
            }, 100);
        });

        window.addEventListener('resize', () => {
            const activeLink = document.querySelector('.glass-nav a.active');
            if (glider) glider.style.transition = 'none';
            updateGlider(activeLink);
            setTimeout(() => {
                if (glider) glider.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            }, 50);
        });
    }

    // --- FUNCTIE 6: POPUP MODAL LOGICA ---
    const triggerCards = document.querySelectorAll('.card[data-target]');
    const popups = document.querySelectorAll('.popup-modal');
    const closeButtons = document.querySelectorAll('.popup-close');
    const body = document.body;

    const openPopup = (popup) => {
        if (popup) {
            popup.classList.add('is-visible');
            body.classList.add('popup-open');
        }
    };

    const closePopup = (popup) => {
        if (popup) {
            popup.classList.remove('is-visible');
            body.classList.remove('popup-open');
        }
    };

    triggerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = card.getAttribute('data-target');
            const targetPopup = document.querySelector(targetId);
            openPopup(targetPopup);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup-modal');
            closePopup(popup);
        });
    });

    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup(popup);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const visiblePopup = document.querySelector('.popup-modal.is-visible');
            closePopup(visiblePopup);
        }
    });

    // --- FUNCTIE 7: MOBIEL HAMBURGER MENU ---
    const hamburgerBtn = document.querySelector('.hamburger-menu-button');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    if (hamburgerBtn && mobileOverlay) {
        const toggleMenu = () => {
            hamburgerBtn.classList.toggle('is-active');
            mobileOverlay.classList.toggle('is-open');
            body.classList.toggle('popup-open');
        };
        hamburgerBtn.addEventListener('click', toggleMenu);
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileOverlay.classList.contains('is-open')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- FUNCTIE 8: TIMELINE ACTIEVE STAAT BIJ SCROLLEN ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
        timelineItems.forEach(item => timelineObserver.observe(item));
    }
});