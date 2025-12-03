/**
 * ============================================
 * 🏛️ BANQUE PRIVÉE ULTRA-PREMIUM V2.0
 * JavaScript Dernière Génération 2025
 * Fonctionnalités interactives avancées
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // 1. CONFIGURATION & CONSTANTES
    // ============================================

    const CONFIG = {
        TOAST_DURATION: 4000,
        SCROLL_OFFSET: 80,
        RIPPLE_DURATION: 600,
        ANIMATION_DELAY: 100,
        DEBOUNCE_DELAY: 250
    };

    // ============================================
    // 2. SYSTÈME DE NOTIFICATIONS TOAST
    // ============================================

    class ToastManager {
        constructor() {
            this.container = this.createContainer();
            this.toasts = [];
        }

        createContainer() {
            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.style.cssText = `
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1700;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 400px;
                `;
                document.body.appendChild(container);
            }
            return container;
        }

        show(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            const icons = {
                success: '✓',
                error: '✗',
                warning: '⚠',
                info: 'ℹ'
            };

            toast.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-size: 1.5rem;">${icons[type] || icons.info}</span>
                    <p style="margin: 0; flex: 1;">${message}</p>
                    <button onclick="this.parentElement.parentElement.remove()"
                            style="background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;">
                        ×
                    </button>
                </div>
            `;

            this.container.appendChild(toast);
            this.toasts.push(toast);

            // Auto-remove after duration
            setTimeout(() => {
                toast.style.animation = 'toastSlideOut 0.5s ease-out forwards';
                setTimeout(() => {
                    toast.remove();
                    this.toasts = this.toasts.filter(t => t !== toast);
                }, 500);
            }, duration);

            return toast;
        }

        success(message) {
            return this.show(message, 'success');
        }

        error(message) {
            return this.show(message, 'error');
        }

        warning(message) {
            return this.show(message, 'warning');
        }

        info(message) {
            return this.show(message, 'info');
        }
    }

    // Ajouter animation CSS pour toast slideOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastSlideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);

    window.toast = new ToastManager();

    // ============================================
    // 3. RIPPLE EFFECT SUR LES BOUTONS
    // ============================================

    function createRipple(event) {
        const button = event.currentTarget;

        // Créer l'effet ripple
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');

        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation ${CONFIG.RIPPLE_DURATION}ms ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Supprimer les anciens ripples
        const existingRipple = button.getElementsByClassName('ripple')[0];
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        // Supprimer après l'animation
        setTimeout(() => ripple.remove(), CONFIG.RIPPLE_DURATION);
    }

    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .action-btn');
        buttons.forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.addEventListener('click', createRipple);
        });
    }

    // ============================================
    // 4. SMOOTH SCROLLING
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - CONFIG.SCROLL_OFFSET;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // 5. SIDEBAR MOBILE TOGGLE
    // ============================================

    function initSidebarToggle() {
        // Créer le bouton hamburger si nécessaire
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        let menuBtn = document.getElementById('mobile-menu-btn');

        if (!menuBtn && window.innerWidth <= 968) {
            menuBtn = document.createElement('button');
            menuBtn.id = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1300;
                background: linear-gradient(135deg, var(--gold-800), var(--gold-700));
                color: var(--primary-900);
                border: none;
                border-radius: 8px;
                width: 48px;
                height: 48px;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: var(--shadow-gold);
                transition: all 0.3s ease;
            `;

            document.body.appendChild(menuBtn);

            menuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                menuBtn.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
            });

            // Fermer au clic en dehors
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && e.target !== menuBtn) {
                    sidebar.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                }
            });
        }

        // Gérer le responsive
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 968) {
                sidebar.classList.remove('active');
                if (menuBtn) menuBtn.style.display = 'none';
            } else {
                if (menuBtn) menuBtn.style.display = 'block';
            }
        }, CONFIG.DEBOUNCE_DELAY));
    }

    // ============================================
    // 6. VALIDATION DE FORMULAIRES
    // ============================================

    function initFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateInput(this);
                });

                input.addEventListener('input', function() {
                    if (this.classList.contains('error-input')) {
                        validateInput(this);
                    }
                });
            });

            form.addEventListener('submit', function(e) {
                let isValid = true;

                inputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    toast.error('Veuillez corriger les erreurs dans le formulaire');

                    // Focus sur le premier champ invalide
                    const firstError = form.querySelector('.error-input');
                    if (firstError) {
                        firstError.focus();
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Supprimer les anciennes erreurs
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        input.classList.remove('error-input');

        // Required check
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Adresse email invalide';
            }
        }

        // Number validation
        if (input.type === 'number' && value) {
            const numValue = parseFloat(value);
            const min = input.getAttribute('min');
            const max = input.getAttribute('max');

            if (min && numValue < parseFloat(min)) {
                isValid = false;
                errorMessage = `La valeur doit être supérieure ou égale à ${min}`;
            }

            if (max && numValue > parseFloat(max)) {
                isValid = false;
                errorMessage = `La valeur doit être inférieure ou égale à ${max}`;
            }
        }

        // Afficher l'erreur si invalide
        if (!isValid) {
            input.classList.add('error-input');

            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: var(--error-light);
                font-size: 0.85rem;
                margin-top: 0.5rem;
                animation: slideIn 0.3s ease;
            `;
            errorDiv.textContent = errorMessage;
            input.parentElement.appendChild(errorDiv);
        }

        // Ajouter style pour error-input
        if (!document.getElementById('validation-styles')) {
            const validationStyle = document.createElement('style');
            validationStyle.id = 'validation-styles';
            validationStyle.textContent = `
                .error-input {
                    border-color: var(--error) !important;
                    background: rgba(239, 68, 68, 0.1) !important;
                }
            `;
            document.head.appendChild(validationStyle);
        }

        return isValid;
    }

    // ============================================
    // 7. DARK MODE TOGGLE
    // ============================================

    function initDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');

        // Créer le toggle si pas déjà présent
        if (!darkModeToggle) {
            const toggle = document.createElement('button');
            toggle.id = 'dark-mode-toggle';
            toggle.innerHTML = '🌙';
            toggle.className = 'dark-mode-toggle';
            toggle.setAttribute('aria-label', 'Toggle dark mode');
            document.body.appendChild(toggle);

            toggle.addEventListener('click', toggleDarkMode);
        }

        // Charger la préférence sauvegardée
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (darkModeToggle) darkModeToggle.innerHTML = '☀️';
        }
    }

    function toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('darkMode', newTheme === 'dark' ? 'enabled' : 'disabled');

        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        }

        toast.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
    }

    // ============================================
    // 8. ANIMATIONS AU SCROLL (AOS-like)
    // ============================================

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observer les éléments avec data-aos
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Style pour les éléments animés
        const aosStyle = document.createElement('style');
        aosStyle.textContent = `
            .aos-animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(aosStyle);
    }

    // ============================================
    // 9. LOADING STATES
    // ============================================

    function setLoading(element, isLoading) {
        if (isLoading) {
            element.classList.add('loading');
            element.disabled = true;
            element.dataset.originalText = element.textContent;
            element.textContent = 'Chargement...';
        } else {
            element.classList.remove('loading');
            element.disabled = false;
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
            }
        }
    }

    // Export pour utilisation globale
    window.setLoading = setLoading;

    // ============================================
    // 10. CONFIRM DIALOGS PREMIUM
    // ============================================

    function confirmDialog(message, onConfirm, onCancel) {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <h3 style="margin-bottom: 1.5rem; font-size: 1.5rem;">Confirmation</h3>
            <p style="margin-bottom: 2rem; color: var(--neutral-200);">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button class="btn-secondary" id="cancel-btn">Annuler</button>
                <button class="btn-danger" id="confirm-btn">Confirmer</button>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);

        // Event listeners
        const confirmBtn = modal.querySelector('#confirm-btn');
        const cancelBtn = modal.querySelector('#cancel-btn');

        function closeModal() {
            backdrop.style.animation = 'fadeOut 0.3s ease';
            modal.style.animation = 'modalZoomOut 0.3s ease';

            setTimeout(() => {
                backdrop.remove();
                modal.remove();
            }, 300);
        }

        confirmBtn.addEventListener('click', () => {
            closeModal();
            if (onConfirm) onConfirm();
        });

        cancelBtn.addEventListener('click', () => {
            closeModal();
            if (onCancel) onCancel();
        });

        backdrop.addEventListener('click', () => {
            closeModal();
            if (onCancel) onCancel();
        });

        // Ajouter animations
        const confirmStyle = document.createElement('style');
        confirmStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            @keyframes modalZoomOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(confirmStyle);
    }

    window.confirmDialog = confirmDialog;

    // ============================================
    // 11. COPY TO CLIPBOARD
    // ============================================

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copié dans le presse-papier !');
        }).catch(() => {
            toast.error('Erreur lors de la copie');
        });
    }

    window.copyToClipboard = copyToClipboard;

    // ============================================
    // 12. AUTO-SAVE FORM (LocalStorage)
    // ============================================

    function initAutoSave() {
        const forms = document.querySelectorAll('[data-autosave]');

        forms.forEach(form => {
            const formId = form.id || 'autosave-form';

            // Charger les données sauvegardées
            const savedData = localStorage.getItem(`autosave-${formId}`);
            if (savedData) {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(name => {
                    const input = form.querySelector(`[name="${name}"]`);
                    if (input) input.value = data[name];
                });
                toast.info('Formulaire restauré automatiquement');
            }

            // Sauvegarder à chaque changement
            form.addEventListener('input', debounce(() => {
                const formData = new FormData(form);
                const data = {};
                for (let [name, value] of formData.entries()) {
                    data[name] = value;
                }
                localStorage.setItem(`autosave-${formId}`, JSON.stringify(data));
            }, 1000));

            // Effacer après soumission réussie
            form.addEventListener('submit', () => {
                setTimeout(() => {
                    localStorage.removeItem(`autosave-${formId}`);
                }, 1000);
            });
        });
    }

    // ============================================
    // 13. UTILITIES
    // ============================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    window.debounce = debounce;
    window.throttle = throttle;

    // ============================================
    // 14. FORMATAGE DES MONTANTS
    // ============================================

    function formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    window.formatCurrency = formatCurrency;

    // ============================================
    // 15. PROTECTION CONTRE LES DOUBLES CLICS
    // ============================================

    function initDoubleClickPrevention() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitBtn = this.querySelector('[type="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    setLoading(submitBtn, true);

                    // Réactiver après 3 secondes en cas d'échec
                    setTimeout(() => {
                        setLoading(submitBtn, false);
                    }, 3000);
                }
            });
        });
    }

    // ============================================
    // 16. GESTION DES MESSAGES DJANGO
    // ============================================

    function initDjangoMessages() {
        // Convertir les messages Django en toasts
        const djangoMessages = document.querySelectorAll('.messages .message');
        djangoMessages.forEach(msg => {
            const type = msg.classList.contains('success') ? 'success' :
                        msg.classList.contains('error') ? 'error' :
                        msg.classList.contains('warning') ? 'warning' : 'info';

            toast.show(msg.textContent, type);
            msg.style.display = 'none';
        });
    }

    // ============================================
    // 17. INITIALISATION GLOBALE
    // ============================================

    function init() {
        console.log('🏛️ Banque Privée Ultra-Premium V2.0 - Initialized');

        // Initialiser tous les modules
        initRippleEffect();
        initSmoothScroll();
        initSidebarToggle();
        initFormValidation();
        initDarkMode();
        initScrollAnimations();
        initAutoSave();
        initDoubleClickPrevention();
        initDjangoMessages();

        // Ajouter data-aos aux éléments automatiquement
        document.querySelectorAll('.info-card, .card, .quick-action').forEach(el => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', 'fade-up');
            }
        });

        // Log performance
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
        });
    }

    // Lancer au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // 18. EXPORT GLOBAL
    // ============================================

    window.BankApp = {
        toast,
        confirmDialog,
        copyToClipboard,
        setLoading,
        formatCurrency,
        debounce,
        throttle
    };

})();

/**
 * ============================================
 * FIN DU FICHIER
 * © Banque Privée Ultra-Premium 2025
 * ============================================
 */
