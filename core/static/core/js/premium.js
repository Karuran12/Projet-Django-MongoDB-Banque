/**
 * ============================================
 * DJANPAY - JAVASCRIPT PREMIUM
 * Animations et interactions haut de gamme
 * © 2025 - Tous droits réservés
 * ============================================
 */

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏦 DjanPay Premium - Chargement terminé');

    // Initialiser les fonctionnalités
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initFormEnhancements();
    initTooltips();
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Animation en cascade pour les éléments enfants
                const children = entry.target.querySelectorAll('.menu-card, .stat-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                    }, 100 * index);
                });
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe "animate-on-scroll"
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignorer les liens # vides
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// EFFET PARALLAX SUBTIL
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-section, .stats-section');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// AMÉLIORATIONS DES FORMULAIRES
// ============================================
function initFormEnhancements() {
    // Labels flottants automatiques
    const inputs = document.querySelectorAll('.form-control, .form-floating input');

    inputs.forEach(input => {
        // Événement au focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        // Événement au blur
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });

        // Vérifier si l'input a déjà une valeur au chargement
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // Validation en temps réel
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });
    });

    // Force du mot de passe
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

// ============================================
// VALIDATION EMAIL
// ============================================
function validateEmail(input) {
    const email = input.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
        input.classList.add('is-invalid');
        showInputError(input, 'Adresse e-mail invalide');
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        hideInputError(input);
    }
}

// ============================================
// FORCE DU MOT DE PASSE
// ============================================
function updatePasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrengthBar');
    if (!strengthBar) return;

    let strength = 0;

    // Critères de force
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    // Appliquer la classe selon la force
    strengthBar.className = 'password-strength-bar';

    if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

// ============================================
// GESTION DES ERREURS D'INPUT
// ============================================
function showInputError(input, message) {
    let errorDiv = input.parentElement.querySelector('.input-error');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        input.parentElement.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideInputError(input) {
    const errorDiv = input.parentElement.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// ============================================
// TOOLTIPS
// ============================================
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this);
        });

        element.addEventListener('mouseleave', function() {
            hideTooltip(this);
        });
    });
}

function showTooltip(element) {
    const text = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-premium';
    tooltip.textContent = text;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

    setTimeout(() => tooltip.classList.add('show'), 10);

    element._tooltip = tooltip;
}

function hideTooltip(element) {
    if (element._tooltip) {
        element._tooltip.classList.remove('show');
        setTimeout(() => element._tooltip.remove(), 300);
        delete element._tooltip;
    }
}

// ============================================
// BURGER MENU (MOBILE)
// ============================================
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Animation des lignes du burger
        const lines = this.querySelectorAll('.burger-line');
        lines.forEach((line, index) => {
            if (this.classList.contains('active')) {
                if (index === 0) line.style.transform = 'rotate(45deg) translateY(10px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                line.style.transform = '';
                line.style.opacity = '';
            }
        });
    });

    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            burgerMenu.querySelectorAll('.burger-line').forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        });
    });
}

// ============================================
// HEADER AU SCROLL
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Masquer le header au scroll down, afficher au scroll up
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ============================================
// AUTO-HIDE ALERTS
// ============================================
document.querySelectorAll('.alert').forEach(alert => {
    // Ajouter un bouton de fermeture
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'alert-close';
    closeBtn.style.cssText = 'position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 24px; cursor: pointer; color: inherit; opacity: 0.6;';

    alert.style.position = 'relative';
    alert.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    });

    // Auto-hide après 5 secondes
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
});

// ============================================
// PERFORMANCE MONITORING (DEV ONLY)
// ============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page chargée en ${loadTime}ms`);
    });
}

// ============================================
// EXPORT POUR UTILISATION EXTERNE
// ============================================
window.DjanPay = {
    showTooltip,
    hideTooltip,
    validateEmail,
    updatePasswordStrength
};
