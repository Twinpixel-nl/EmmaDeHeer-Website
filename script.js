document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCTIE 1: SPOTLIGHT & ACHTERGROND IN HERO ---
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

    // --- FUNCTIE 3: ANIMATIES BIJ SCROLLEN ---
    const animatedElements = document.querySelectorAll('.fade-in');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => scrollObserver.observe(el));

    // --- FUNCTIE 4: NAVIGATIE LOGICA ---
    const navLinks = document.querySelectorAll('.glass-nav a');
    const glider = document.querySelector('.glass-glider');
    const sections = document.querySelectorAll('.content-section');
    const nav = document.querySelector('.glass-nav');

    function updateGlider(activeLink) {
        if (!activeLink || !glider) return;

        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
        
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        glider.style.width = `${linkRect.width}px`;
        glider.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    }
        // --- FUNCTIE 5: POPUP MODAL LOGICA ---
    const triggerCards = document.querySelectorAll('.card[data-target]');
    const popups = document.querySelectorAll('.popup-modal');
    const closeButtons = document.querySelectorAll('.popup-close');
    const body = document.body;

    // Functie om een popup te openen
    const openPopup = (popup) => {
        if (popup) {
            popup.classList.add('is-visible');
            body.classList.add('popup-open');
        }
    };

    // Functie om een popup te sluiten
    const closePopup = (popup) => {
        if (popup) {
            popup.classList.remove('is-visible');
            body.classList.remove('popup-open');
        }
    };

    // Event listeners voor de trigger kaarten
    triggerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Voorkom dat de pagina naar boven springt
            const targetId = card.getAttribute('data-target');
            const targetPopup = document.querySelector(targetId);
            openPopup(targetPopup);
        });
    });

    // Event listeners voor de sluitknoppen
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup-modal');
            closePopup(popup);
        });
    });

    // Event listener om te sluiten als je buiten de content klikt
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            // Sluit alleen als er direct op de donkere overlay wordt geklikt
            if (e.target === popup) {
                closePopup(popup);
            }
        });
    });

    // Event listener om te sluiten met de Escape-toets
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const visiblePopup = document.querySelector('.popup-modal.is-visible');
            closePopup(visiblePopup);
        }
    });


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => updateGlider(link), 50);
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
    }, {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));

    window.addEventListener('load', () => {
         setTimeout(() => {
            const initialActiveLink = document.querySelector('.glass-nav a[href="#home"]');
            updateGlider(initialActiveLink);
            glider.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 100);
    });

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.glass-nav a.active');
        glider.style.transition = 'none';
        updateGlider(activeLink);
        setTimeout(() => {
            glider.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 50);
    });

    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    fadeEls.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
});