// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
                observer.unobserve(entry.target); // Only animate once
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-card, .feature-item, .stat-item, .contact-item');
    const statsSection = document.querySelector('.stats-section');
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Button Click Effects
document.addEventListener('DOMContentLoaded', function() {
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
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

// Contact Form Handling - REMOVED (Easter Egg Focus)

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4ecdc4, #45b7aa)' : 
                     type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 
                     'linear-gradient(45deg, #7b68ee, #6a5acd)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
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

// Add some fun Easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.konamiProgress = window.konamiProgress || 0;
    
    if (e.keyCode === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            activateKonamiEasterEgg();
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});

function activateKonamiEasterEgg() {
    // Create the easter egg overlay
    const easterEgg = document.createElement('div');
    easterEgg.className = 'konami-activated';
    
    easterEgg.innerHTML = `
        <div class="konami-content">
            <h1 class="konami-title">🎮 KONAMI CODE ACTIVATED! 🎮</h1>
            <p class="konami-subtitle">You've unlocked the legendary gamer status!</p>
            <div class="konami-effects">
                <div class="effect-item">
                    <i class="fas fa-crown effect-icon"></i>
                    <span>Gaming Royalty</span>
                </div>
                <div class="effect-item">
                    <i class="fas fa-magic effect-icon"></i>
                    <span>Ultimate Power</span>
                </div>
                <div class="effect-item">
                    <i class="fas fa-trophy effect-icon"></i>
                    <span>Achievement Unlocked</span>
                </div>
            </div>
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">🔥 You're absolutely legendary! No cap! 🔥</p>
            <p style="opacity: 0.8;">This Easter egg is more fire than a dragon's mixtape!</p>
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
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0xmAaEz2M0/LWeAQIF6rF8+KSQQEO8');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore errors if audio fails
    } catch (e) {}
    
    // Apply rainbow effect to entire page
    document.body.style.animation = 'rainbow 3s linear infinite';
    
    // Show notification
    showNotification('🎮 KONAMI CODE MASTERED! You\'re the ultimate gaming legend! 🏆', 'success');
    
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
    let sparkleTimeout;
    
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

// Random encouraging messages for scroll
let lastScrollMessage = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const messages = [
        "Keep scrolling, bestie! This content is absolutely fire! 🔥",
        "Scrolling like a pro! Your mouse wheel game is strong! 💪",
        "You're vibing with our content - that's totally rad! ✨",
        "Smooth scrolling, dude! You've got the magic touch! 🎯"
    ];
    
    if (scrollPercent > 25 && scrollPercent < 30 && Date.now() - lastScrollMessage > 10000) {
        showNotification(messages[Math.floor(Math.random() * messages.length)], 'info');
        lastScrollMessage = Date.now();
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    // Hide any loading screen if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Show a welcome message
    setTimeout(() => {
        showNotification('Welcome to Blank Your Game! Prepare for some totally radical fun! 🎮', 'success');
    }, 1000);
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
const throttledParallax = throttle(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16); // ~60fps

window.removeEventListener('scroll', function() {}); // Remove previous listener
window.addEventListener('scroll', throttledParallax);
