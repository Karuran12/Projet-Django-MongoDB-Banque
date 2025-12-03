/**
 * ═══════════════════════════════════════════════════════════
 * DASHBOARD ULTRA PREMIUM - Chart.js Integration
 * ═══════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════
// Configuration globale
// ═══════════════════════════════════════════════════════════

const COLORS = {
    gold: '#D4AF37',
    goldLight: '#F4E5A9',
    goldDark: '#B8941F',
    primary: '#0A0E27',
    slate: '#1E293B',
    slateLight: '#334155',
    blue: '#3B82F6',
    blueLight: '#60A5FA',
    green: '#10B981',
    greenLight: '#34D399',
    red: '#EF4444',
    redLight: '#F87171',
    white: '#F8F9FA',
    gray: '#94A3B8'
};

const CHART_DEFAULTS = {
    font: {
        family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        size: 12
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                color: COLORS.white,
                font: {
                    size: 13,
                    weight: '500'
                },
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(10, 14, 39, 0.95)',
            titleColor: COLORS.gold,
            bodyColor: COLORS.white,
            borderColor: COLORS.gold,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            titleFont: {
                size: 14,
                weight: 'bold'
            },
            bodyFont: {
                size: 13
            },
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(212, 175, 55, 0.05)',
                drawBorder: false
            },
            ticks: {
                color: COLORS.gray,
                font: {
                    size: 11,
                    weight: '500'
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(212, 175, 55, 0.08)',
                drawBorder: false
            },
            ticks: {
                color: COLORS.gray,
                font: {
                    size: 11,
                    weight: '500'
                },
                callback: function(value) {
                    return new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(value);
                }
            },
            beginAtZero: true
        }
    }
};

// ═══════════════════════════════════════════════════════════
// Graphique 1 : Évolution mensuelle (Line Chart)
// ═══════════════════════════════════════════════════════════

function createMonthlyChart() {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;

    // Extraire les données depuis monthlyData (passé depuis Django)
    const labels = monthlyData.map(d => d.month);
    const sentData = monthlyData.map(d => d.sent);
    const receivedData = monthlyData.map(d => d.received);

    // Créer le dégradé pour les dépenses
    const gradientSent = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradientSent.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
    gradientSent.addColorStop(1, 'rgba(239, 68, 68, 0.01)');

    // Créer le dégradé pour les revenus
    const gradientReceived = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradientReceived.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
    gradientReceived.addColorStop(1, 'rgba(16, 185, 129, 0.01)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Dépenses',
                    data: sentData,
                    borderColor: COLORS.red,
                    backgroundColor: gradientSent,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: COLORS.red,
                    pointBorderColor: COLORS.primary,
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: COLORS.redLight,
                    pointHoverBorderColor: COLORS.white,
                    pointHoverBorderWidth: 3
                },
                {
                    label: 'Revenus',
                    data: receivedData,
                    borderColor: COLORS.green,
                    backgroundColor: gradientReceived,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: COLORS.green,
                    pointBorderColor: COLORS.primary,
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: COLORS.greenLight,
                    pointHoverBorderColor: COLORS.white,
                    pointHoverBorderWidth: 3
                }
            ]
        },
        options: {
            ...CHART_DEFAULTS,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                ...CHART_DEFAULTS.plugins,
                title: {
                    display: false
                }
            },
            scales: {
                ...CHART_DEFAULTS.scales,
                y: {
                    ...CHART_DEFAULTS.scales.y,
                    stacked: false
                }
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════
// Graphique 2 : Dépenses vs Revenus (Doughnut Chart)
// ═══════════════════════════════════════════════════════════

function createBalanceChart() {
    const ctx = document.getElementById('balanceChart');
    if (!ctx) return;

    // Calculer le total des dépenses et revenus
    const totalSent = monthlyData.reduce((sum, d) => sum + d.sent, 0);
    const totalReceived = monthlyData.reduce((sum, d) => sum + d.received, 0);

    // Créer des dégradés pour le doughnut
    const gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, COLORS.red);
    gradient1.addColorStop(1, COLORS.redLight);

    const gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, COLORS.green);
    gradient2.addColorStop(1, COLORS.greenLight);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dépenses totales', 'Revenus totaux'],
            datasets: [{
                data: [totalSent, totalReceived],
                backgroundColor: [
                    gradient1,
                    gradient2
                ],
                borderColor: [COLORS.primary, COLORS.primary],
                borderWidth: 3,
                hoverOffset: 15,
                hoverBorderColor: COLORS.gold,
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            cutout: '65%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: COLORS.white,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const formattedValue = new Intl.NumberFormat('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(value);
                                return {
                                    text: `${label}: ${formattedValue}`,
                                    fillStyle: i === 0 ? COLORS.red : COLORS.green,
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                    }
                },
                tooltip: {
                    ...CHART_DEFAULTS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            const formattedValue = new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(value);
                            return `${label}: ${formattedValue} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════
// Animations au chargement
// ═══════════════════════════════════════════════════════════

function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// ═══════════════════════════════════════════════════════════
// Animation des valeurs (count-up effect)
// ═══════════════════════════════════════════════════════════

function animateValue(element, start, end, duration) {
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }

        // Format en fonction du contenu
        if (element.textContent.includes('€')) {
            element.textContent = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(current);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

function animateStatValues() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(element => {
        const text = element.textContent.trim();
        const numberMatch = text.match(/[\d\s]+[,.]?\d*/);
        if (numberMatch) {
            const valueStr = numberMatch[0].replace(/\s/g, '').replace(',', '.');
            const value = parseFloat(valueStr);
            if (!isNaN(value)) {
                animateValue(element, 0, value, 1500);
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════
// Animation de la progress bar
// ═══════════════════════════════════════════════════════════

function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;

    const targetWidth = progressFill.style.width;
    progressFill.style.width = '0%';

    setTimeout(() => {
        progressFill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        progressFill.style.width = targetWidth;
    }, 500);
}

// ═══════════════════════════════════════════════════════════
// Effet de survol sur les cartes de transaction
// ═══════════════════════════════════════════════════════════

function initTransactionHover() {
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
        });
    });
}

// ═══════════════════════════════════════════════════════════
// Effet de survol sur les action cards
// ═══════════════════════════════════════════════════════════

function initActionCardEffects() {
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ═══════════════════════════════════════════════════════════
// Refresh automatique des données (optionnel)
// ═══════════════════════════════════════════════════════════

function setupAutoRefresh() {
    // Optionnel : refresh toutes les 5 minutes
    // setInterval(() => {
    //     location.reload();
    // }, 300000);

    // Afficher un indicateur de "dernière mise à jour"
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    console.log(`📊 Dashboard chargé à ${timeString}`);
}

// ═══════════════════════════════════════════════════════════
// Gestion du sélecteur de période
// ═══════════════════════════════════════════════════════════

function initPeriodSelector() {
    const periodSelect = document.getElementById('chart1-period');
    if (!periodSelect) return;

    periodSelect.addEventListener('change', function() {
        toast.info(`Période changée: ${this.value} mois`);
        // Dans une vraie application, on rechargerait les données ici
        // Pour l'instant, c'est juste visuel
    });
}

// ═══════════════════════════════════════════════════════════
// Initialisation
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du dashboard ultra-premium...');

    // Vérifier que Chart.js est chargé
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js n\'est pas chargé !');
        return;
    }

    // Vérifier que monthlyData existe
    if (typeof monthlyData === 'undefined') {
        console.error('❌ monthlyData n\'est pas défini !');
        return;
    }

    console.log('📊 Données mensuelles:', monthlyData);

    // Initialiser les graphiques
    setTimeout(() => {
        createMonthlyChart();
        createBalanceChart();
        console.log('✅ Graphiques créés avec succès');
    }, 300);

    // Lancer les animations
    setTimeout(() => {
        animateStats();
        animateStatValues();
        animateProgressBar();
        initTransactionHover();
        initActionCardEffects();
        initPeriodSelector();
        setupAutoRefresh();
    }, 500);

    // Afficher un message de bienvenue
    setTimeout(() => {
        toast.success('🎉 Dashboard chargé avec succès !');
    }, 1000);

    console.log('✨ Dashboard ultra-premium initialisé !');
});

// ═══════════════════════════════════════════════════════════
// Export pour utilisation externe (optionnel)
// ═══════════════════════════════════════════════════════════

window.dashboardCharts = {
    refresh: function() {
        location.reload();
    },
    exportData: function() {
        return {
            monthlyData: monthlyData,
            timestamp: new Date().toISOString()
        };
    }
};
