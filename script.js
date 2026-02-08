// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;
    const allNavLinks = document.querySelectorAll('.nav-links a');
    
    // Check if elements exist
    if (!mobileMenuBtn || !navLinks) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    console.log('Mobile menu initialized');
    
    // Toggle menu function
    function toggleMenu() {
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Open menu function
    function openMenu() {
        navLinks.classList.add('active');
        mobileMenuBtn.classList.add('active');
        if (mobileOverlay) {
            mobileOverlay.classList.add('active');
        }
        body.classList.add('menu-open');
        console.log('Menu opened');
    }
    
    // Close menu function
    function closeMenu() {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
        }
        body.classList.remove('menu-open');
        console.log('Menu closed');
    }
    
    // Mobile menu button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Touch event for better mobile support
    mobileMenuBtn.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    }, { passive: true });
    
    // Close menu when clicking on navigation links
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking on overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                closeMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Prevent body scroll when menu is open
    let scrollPosition = 0;
    const menuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (body.classList.contains('menu-open')) {
                    scrollPosition = window.pageYOffset;
                    body.style.overflow = 'hidden';
                    body.style.position = 'fixed';
                    body.style.top = `-${scrollPosition}px`;
                    body.style.width = '100%';
                } else {
                    body.style.removeProperty('overflow');
                    body.style.removeProperty('position');
                    body.style.removeProperty('top');
                    body.style.removeProperty('width');
                    window.scrollTo(0, scrollPosition);
                }
            }
        });
    });
    
    menuObserver.observe(body, {
        attributes: true
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
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

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

if (nav) {
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.boxShadow = 'none';
        } else {
            nav.style.boxShadow = '0 2px 16px rgba(45, 36, 32, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.value-card, .step, .feature-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ========================================
// FORM VALIDATION
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            
            let isValid = true;
            
            if (emailInput && !validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (passwordInput && !validatePassword(passwordInput.value)) {
                showError(passwordInput, 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (isValid) {
                showSuccess(form);
            }
        });
    });
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#d4866f';
    error.style.fontSize = '14px';
    error.style.marginTop = '8px';
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#d4866f';
}

function showSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Success! Redirecting...';
    successMessage.style.padding = '16px';
    successMessage.style.background = '#6f9d86';
    successMessage.style.color = 'white';
    successMessage.style.borderRadius = '12px';
    successMessage.style.marginTop = '16px';
    successMessage.style.textAlign = 'center';
    successMessage.style.fontWeight = '600';
    
    form.appendChild(successMessage);
    
    setTimeout(function() {
        if (form.id === 'signupForm') {
            window.location.href = 'dashboard.html';
        } else if (form.id === 'loginForm') {
            window.location.href = 'dashboard.html';
        }
    }, 1500);
}

// Clear errors on input
document.addEventListener('input', function(e) {
    if (e.target.matches('input')) {
        const formGroup = e.target.closest('.form-group');
        if (!formGroup) return;
        
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        e.target.style.borderColor = '#e3ddd6';
    }
});

// ========================================
// DASHBOARD FUNCTIONALITY
// ========================================

if (document.querySelector('.dashboard')) {
    // Sample data for dashboard
    const profileData = {
        name: 'Alex',
        age: 28,
        location: 'San Francisco, CA',
        verified: true,
        membershipTier: 'Premium',
        profileCompleteness: 85,
        matches: 12,
        conversations: 8,
        likes: 23
    };
    
    // Update profile stats
    const updateDashboardStats = function() {
        const elements = {
            matches: document.querySelector('.stat-matches .stat-number'),
            conversations: document.querySelector('.stat-conversations .stat-number'),
            likes: document.querySelector('.stat-likes .stat-number')
        };
        
        if (elements.matches) elements.matches.textContent = profileData.matches;
        if (elements.conversations) elements.conversations.textContent = profileData.conversations;
        if (elements.likes) elements.likes.textContent = profileData.likes;
    };
    
    updateDashboardStats();
    
    // Tab switching
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ========================================
// MATCH CARD INTERACTIONS
// ========================================

document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-like') || e.target.closest('.btn-like')) {
        const card = e.target.closest('.match-card');
        if (card) {
            card.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(function() {
                card.remove();
            }, 300);
        }
    }
    
    if (e.target.matches('.btn-pass') || e.target.closest('.btn-pass')) {
        const card = e.target.closest('.match-card');
        if (card) {
            card.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(function() {
                card.remove();
            }, 300);
        }
    }
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// MESSAGE SENDING
// ========================================

const messageForm = document.querySelector('.message-form');
if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = messageForm.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            addMessage(message, 'sent');
            input.value = '';
            
            // Simulate response
            setTimeout(function() {
                addMessage('Thanks for your message! This is a demo response.', 'received');
            }, 1000);
        }
    });
}

function addMessage(text, type) {
    const messagesContainer = document.querySelector('.messages-list');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = 'message message-' + type;
    messageEl.innerHTML = `
        <div class="message-bubble">
            <p>${text}</p>
            <span class="message-time">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ========================================
// PROFILE EDIT FUNCTIONALITY
// ========================================

const editButtons = document.querySelectorAll('.btn-edit-profile');
editButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        alert('Profile editing would open a modal in a full implementation');
    });
});

// ========================================
// SETTINGS TOGGLES
// ========================================

document.querySelectorAll('.toggle-switch input').forEach(function(toggle) {
    toggle.addEventListener('change', function(e) {
        console.log('Setting "' + e.target.name + '" changed to:', e.target.checked);
        // In a real app, this would save to backend
    });
});

// ========================================
// CONSOLE INFO
// ========================================

console.log('%cGenuine Dates RSA', 'color: #d4866f; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #6f9d86; font-size: 14px;');
console.log('Mobile menu: Ready');
console.log('Smooth scroll: Enabled');
console.log('Form validation: Active');

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver(function(items) {
        items.getEntries().forEach(function(entry) {
            console.log('Page load time:', entry.loadEventEnd - entry.fetchStart, 'ms');
        });
    });
    perfObserver.observe({ entryTypes: ['navigation'] });
}
