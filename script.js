/**
 * Blank Your Game - 2026 Refresh
 * Interactive JavaScript for One-Page Experience
 * Easter Eggs Preserved!
 */

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initButtons();
    showWelcomeMessage();
});

// ========================================
// Theme Toggle (Light/Dark Mode)
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeColorMeta = document.getElementById('themeColorMeta');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateThemeColor(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            updateThemeColor(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    function updateThemeColor(theme) {
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa');
        }
    }
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
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

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// ========================================
// Intersection Observer Animations
// ========================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .stat-item, .social-card');
    const statsSection = document.querySelector('.stats-section');
    
    animatedElements.forEach(el => observer.observe(el));
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers with commas for large numbers
            if (target >= 1000) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = Math.floor(current);
            }
            
            // Add percentage sign for the satisfaction stat
            if (counter.getAttribute('data-target') === '99') {
                counter.textContent += '%';
            }
        }, 16);
    });
}

// ========================================
// Button Click Effects
// ========================================
function initButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    const bgColors = {
        success: 'linear-gradient(45deg, #4ecdc4, #45b7aa)',
        error: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
        info: 'linear-gradient(45deg, #7b68ee, #6a5acd)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColors[type] || bgColors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        font-family: 'Space Grotesk', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    const closeNotification = () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
    
    // Hover effect for close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
}

// ========================================
// Welcome Message
// ========================================
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('Slay bestie! Welcome to Blank Your Game 💅✨', 'success');
    }, 1500);
}

// ========================================
// EASTER EGGS - Konami Code
// ========================================
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiProgress = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiCode.length) {
            activateKonamiEasterEgg();
            konamiProgress = 0;
        }
    } else {
        konamiProgress = 0;
    }
});

function activateKonamiEasterEgg() {
    // Create the easter egg overlay
    const easterEgg = document.createElement('div');
    easterEgg.className = 'konami-activated';
    
    easterEgg.innerHTML = `
        <div class="konami-content">
            <h1 class="konami-title">🎮 NO CAP, YOU DID THAT! 🎮</h1>
            <p class="konami-subtitle">It's giving... legendary gamer status 👑</p>
            <div class="konami-effects">
                <div class="effect-item">
                    <i class="fas fa-crown effect-icon"></i>
                    <span>Main Character</span>
                </div>
                <div class="effect-item">
                    <i class="fas fa-magic effect-icon"></i>
                    <span>Understood the Assignment</span>
                </div>
                <div class="effect-item">
                    <i class="fas fa-trophy effect-icon"></i>
                    <span>Ate and Left No Crumbs</span>
                </div>
            </div>
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">🔥 You're literally iconic, no cap! 🔥</p>
            <p style="opacity: 0.8;">This achievement? It's giving everything ✨</p>
        </div>
        <div class="floating-emojis"></div>
    `;
    
    document.body.appendChild(easterEgg);
    
    // Add floating emojis
    const emojis = ['🎮', '🔥', '⭐', '🚀', '💫', '🎯', '👑', '🏆', '🎊', '✨'];
    const emojiContainer = easterEgg.querySelector('.floating-emojis');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 3 + 2) + 's';
            emoji.style.animationDelay = Math.random() * 2 + 's';
            emojiContainer.appendChild(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 5000);
        }, i * 200);
    }
    
    // Play achievement sound (if available)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0xmAaEz2M0/LWeAQIF6rF8+KSQQEO8');
        audio.volume = 0.3;
        audio.play().catch(() => {});
    } catch (e) {}
    
    // Apply rainbow effect to entire page
    document.body.style.animation = 'rainbow 3s linear infinite';
    
    // Show notification
    showNotification('🎮 SLAY! You understood the assignment bestie! 👑 No cap, you\'re iconic!', 'success');
    
    // Remove easter egg after 8 seconds
    setTimeout(() => {
        easterEgg.style.opacity = '0';
        easterEgg.style.transform = 'scale(0.8)';
        easterEgg.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            if (easterEgg.parentNode) {
                easterEgg.parentNode.removeChild(easterEgg);
            }
            document.body.style.animation = '';
        }, 500);
    }, 8000);
    
    // Add temporary sparkle cursor effect
    addSparkleEffect();
}

function addSparkleEffect() {
    const createSparkle = (e) => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: 1rem;
            z-index: 99999;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    };
    
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle-fade {
            0% { 
                opacity: 1; 
                transform: translateY(0px) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-20px) scale(0.5); 
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    document.addEventListener('mousemove', createSparkle);
    
    // Remove sparkle effect after 10 seconds
    setTimeout(() => {
        document.removeEventListener('mousemove', createSparkle);
        if (sparkleStyle.parentNode) {
            sparkleStyle.parentNode.removeChild(sparkleStyle);
        }
    }, 10000);
}

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ========================================
// Secret Console Message (Easter Egg)
// ========================================
console.log('%c🎮 BLANK YOUR GAME 🎮', 'font-size: 24px; font-weight: bold; color: #ff6b6b; text-shadow: 2px 2px #4ecdc4;');
console.log('%cLooking for secrets? IYKYK... ↑↑↓↓←→←→BA 👀', 'font-size: 14px; color: #4ecdc4;');
console.log('%cNo cap, follow us for the vibes bestie! ✨', 'font-size: 12px; color: #7b68ee;');

// ========================================
// Utility Functions
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// Social Link Tracking (Optional)
// ========================================
document.querySelectorAll('.social-card, .hero-social .social-link, .footer-links a').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.getAttribute('aria-label') || 'Social Link';
        console.log(`User clicked: ${platform}`);
        // You could integrate analytics here
    });
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ========================================
// Preloader Handler
// ========================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});
