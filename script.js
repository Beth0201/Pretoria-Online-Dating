// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const body = document.body;

if (mobileMenuBtn && navLinks) {
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking on a link
    const allNavLinks = navLinks.querySelectorAll('a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
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
}

function openMenu() {
    navLinks.classList.add('active');
    mobileMenuBtn.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    body.style.overflow = ''; // Restore scrolling
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
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

// Form validation (for signup/login pages)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Handle form submissions
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
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
                // In a real app, this would submit to a backend
                showSuccess(form);
            }
        });
    });
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
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
    
    setTimeout(() => {
        if (form.id === 'signupForm') {
            window.location.href = 'dashboard.html';
        } else if (form.id === 'loginForm') {
            window.location.href = 'dashboard.html';
        }
    }, 1500);
}

// Clear errors on input
document.addEventListener('input', (e) => {
    if (e.target.matches('input')) {
        const formGroup = e.target.closest('.form-group');
        const error = formGroup?.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        e.target.style.borderColor = '#e3ddd6';
    }
});

// Dashboard functionality
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
    const updateDashboardStats = () => {
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
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Match card interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-like') || e.target.closest('.btn-like')) {
        const card = e.target.closest('.match-card');
        card.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            card.remove();
        }, 300);
    }
    
    if (e.target.matches('.btn-pass') || e.target.closest('.btn-pass')) {
        const card = e.target.closest('.match-card');
        card.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            card.remove();
        }, 300);
    }
});

// Message sending
const messageForm = document.querySelector('.message-form');
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = messageForm.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            addMessage(message, 'sent');
            input.value = '';
            
            // Simulate response
            setTimeout(() => {
                addMessage('Thanks for your message! This is a demo response.', 'received');
            }, 1000);
        }
    });
}

function addMessage(text, type) {
    const messagesContainer = document.querySelector('.messages-list');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <div class="message-bubble">
            <p>${text}</p>
            <span class="message-time">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Profile edit functionality
const editButtons = document.querySelectorAll('.btn-edit-profile');
editButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Profile editing would open a modal in a full implementation');
    });
});

// Settings toggles
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        console.log(`Setting "${e.target.name}" changed to:`, e.target.checked);
        // In a real app, this would save to backend
    });
});

console.log('Genuine Dating Platform - Loaded');
