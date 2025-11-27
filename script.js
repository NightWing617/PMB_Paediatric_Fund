// Main JavaScript for PMB Paediatric Fund website
// Enhanced UX/UI interactions

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    animationDelay: 100,
    scrollThreshold: 0.1,
    counterSpeed: 20,
    confettiCount: 100
};

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    setupDonationButtons();
    updateProgressBar();
    setupSmoothScroll();
    setupParallax();
    setupCounterAnimations();
    setupRippleEffect();
    setupImageZoom();
    addLoadingAnimations();
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initializeAnimations() {
    const observerOptions = {
        threshold: CONFIG.scrollThreshold,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                // Stagger animations for child elements
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * CONFIG.animationDelay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(function (section) {
        observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.bg-white.rounded-xl, .bg-white.rounded-2xl').forEach(function (card, index) {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        }, index * 50);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// PARALLAX SCROLLING
// ============================================
function setupParallax() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        // Parallax for hero images
        const heroImages = document.querySelectorAll('section:first-of-type img');
        heroImages.forEach(img => {
            const speed = 0.5;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax for decorative blobs
        const blobs = document.querySelectorAll('.absolute.rounded-full');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.3;
            blob.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
        });
    });
}

// ============================================
// DONATION BUTTONS
// ============================================
function setupDonationButtons() {
    const donationButtons = document.querySelectorAll('button');
    donationButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            const amount = this.textContent.match(/R(\d+)/)?.[1];

            if (amount) {
                showConfetti(e.clientX, e.clientY);
                showDonationConfirmation(amount);
                updateProgressBar();

                // Animate button
                this.classList.add('scale-in');
                setTimeout(() => {
                    this.classList.remove('scale-in');
                }, 500);
            }
        });
    });
}

// ============================================
// CONFETTI ANIMATION
// ============================================
function showConfetti(x, y) {
    const colors = ['#F29F67', '#EBC472', '#FA9BC5', '#E92B38', '#6FA8AA'];

    for (let i = 0; i < CONFIG.confettiCount; i++) {
        createConfettiPiece(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(x, y, color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.transform = 'scale(0)';
    confetti.style.transition = 'all 0.1s ease-out';

    document.body.appendChild(confetti);

    // Animate
    setTimeout(() => {
        confetti.style.transform = 'scale(1)';
    }, 10);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 10;
    const gravity = 0.5;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    let posX = x;
    let posY = y;
    let opacity = 1;

    const animation = setInterval(() => {
        vy += gravity;
        posX += vx;
        posY += vy;
        opacity -= 0.02;

        confetti.style.left = posX + 'px';
        confetti.style.top = posY + 'px';
        confetti.style.opacity = opacity;
        confetti.style.transform = `scale(1) rotate(${posY}deg)`;

        if (opacity <= 0 || posY > window.innerHeight) {
            clearInterval(animation);
            document.body.removeChild(confetti);
        }
    }, 16);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showDonationConfirmation(amount) {
    const message = `Thank you! R${amount} will bring light to a child's bedside! 🌟`;

    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 z-50 transform translate-x-full transition-transform duration-300';
    toast.style.maxWidth = '400px';
    toast.innerHTML = `
        <div class="bg-gradient-to-r from-slate-blue to-muted-teal text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <div class="text-2xl">🎉</div>
            <div class="flex-1">
                <div class="font-bold">Donation Confirmed!</div>
                <div class="text-sm opacity-90">${message}</div>
            </div>
            <button class="text-white hover:text-mustard-gold transition-colors" onclick="this.parentElement.parentElement.remove()">
                ✕
            </button>
        </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    // Remove after delay
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentElement) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// ============================================
// PROGRESS BAR WITH ANIMATION
// ============================================
function updateProgressBar() {
    const progressBar = document.querySelector('.bg-festive-red');
    if (progressBar) {
        // Mock data - in production, fetch from API
        const currentProgress = 67; // 67 boxes donated
        const targetPercentage = (currentProgress / 150) * 100;

        // Animate the progress
        animateProgressBar(progressBar, targetPercentage);

        // Update text with counter animation
        const progressText = document.querySelector('.flex.justify-between.text-slate-blue span:last-child');
        if (progressText) {
            animateCounter(progressText, 0, currentProgress, 150);
        }
    }
}

function animateProgressBar(element, targetPercentage) {
    let currentPercentage = parseFloat(element.style.width) || 0;
    const increment = (targetPercentage - currentPercentage) / 50;

    const animation = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(animation);
        }
        element.style.width = `${currentPercentage}%`;
    }, CONFIG.counterSpeed);
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
function setupCounterAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute('data-target'));
                if (targetValue) {
                    animateSingleCounter(element, 0, targetValue);
                    observer.unobserve(element);
                }
            }
        });
    }, observerOptions);

    // Set up counters (you can add data-target attributes to elements in HTML)
    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

function animateCounter(element, start, current, total) {
    let count = start;
    const increment = current / 50;

    const counter = setInterval(() => {
        count += increment;
        if (count >= current) {
            count = current;
            clearInterval(counter);
        }
        element.textContent = `${Math.floor(count)} / ${total}`;
    }, CONFIG.counterSpeed);
}

function animateSingleCounter(element, start, target) {
    let count = start;
    const increment = target / 50;

    const counter = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(count);
    }, CONFIG.counterSpeed);
}

// ============================================
// RIPPLE EFFECT
// ============================================
function setupRippleEffect() {
    document.querySelectorAll('button, .donate-btn').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// IMAGE ZOOM ON HOVER
// ============================================
function setupImageZoom() {
    document.querySelectorAll('.masonry-grid img, section img').forEach(img => {
        img.style.transition = 'transform 0.5s ease';

        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// LOADING ANIMATIONS
// ============================================
function addLoadingAnimations() {
    // Add shimmer to cards on page load
    const cards = document.querySelectorAll('.bg-white.rounded-xl, .bg-white.rounded-2xl');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease-out';
        }, index * 100);
    });

    // Animate decorative elements
    const floatingElements = document.querySelectorAll('.absolute.rounded-full');
    floatingElements.forEach(el => {
        el.classList.add('float');
    });
}

// ============================================
// SOCIAL MEDIA SHARING
// ============================================
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Support PMB Paediatric Fund - Bringing light to hospitalized children! 🌟");

    const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        whatsapp: `https://wa.me/?text=${text} ${url}`
    };

    if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

// ============================================
// FORM VALIDATION
// ============================================
function validateDonationForm() {
    const customAmount = document.getElementById('custom-amount');
    if (customAmount) {
        const amount = parseInt(customAmount.value);
        if (amount < 150) {
            showToast('Minimum donation amount is R150 for one complete care package.', 'warning');
            return false;
        }
        return true;
    }
    return true;
}

function showToast(message, type = 'info') {
    const colors = {
        success: 'from-green-500 to-green-600',
        warning: 'from-yellow-500 to-orange-500',
        error: 'from-red-500 to-red-600',
        info: 'from-blue-500 to-blue-600'
    };

    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 z-50 transform translate-y-full transition-transform duration-300';
    toast.innerHTML = `
        <div class="bg-gradient-to-r ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg">
            ${message}
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-full');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-y-full');
        setTimeout(() => {
            if (toast.parentElement) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
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

// Export functions for use in HTML
window.PMBFund = {
    shareOnSocial,
    validateDonationForm,
    showToast
};