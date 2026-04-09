/* ========================================
   PERSONAL PORTFOLIO — JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Add background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // === MOBILE NAV TOGGLE ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // === CURSOR GLOW ===
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // === STAT COUNTER ANIMATION ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                stat.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.textContent = target;
                }
            }
            requestAnimationFrame(update);
        });
    }

    // === SKILL BAR ANIMATION ===
    function animateSkillBars() {
        const fills = document.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        });
    }

    // === SCROLL REVEAL ===
    // Add reveal class to elements
    const revealTargets = document.querySelectorAll(
        '.skill-card, .project-card, .about-grid, .contact-grid, .section-header, .contact-method'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger animations for grid items
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = parent.querySelectorAll('.reveal');
                    siblings.forEach((sib, i) => {
                        sib.style.transitionDelay = (i * 0.1) + 's';
                    });
                }

                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealTargets.forEach(el => revealObserver.observe(el));

    // Stats observer
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsCounted) {
                    statsCounted = true;
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Skills observer
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // === TILT EFFECT ON SKILL CARDS ===
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === CONTACT FORM (basic demo) ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #06b6d4)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // === SMOOTH SCROLL (for browsers that need it) ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === PARALLAX on hero orbs ===
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, i) => {
            const speed = 0.1 + (i * 0.05);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

});
