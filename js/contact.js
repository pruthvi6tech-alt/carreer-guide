// JavaScript for Contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            clearErrorMessages();
            hideFormMessage();
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (in real app, this would be an API call)
                setTimeout(() => {
                    // Show success message
                    showFormMessage('Thank you for your message! We\'ll get back to you within 24-48 hours.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Track submission
                    trackFormSubmission();
                }, 2000);
            }
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error message when user starts typing
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement && this.value.trim()) {
                    errorElement.textContent = '';
                    this.classList.remove('error');
                }
            });
        });
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.contact-faq .faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                faqItem.querySelector('.faq-answer').style.padding = '0 1.5rem';
                faqItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 1.5rem 1.5rem';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Social media links tracking
    const socialLinks = document.querySelectorAll('.social-link-large, .social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('span') ? this.querySelector('span').textContent : this.href;
            trackSocialClick(platform);
        });
    });

    // Add smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize page
    initializeContactPage();
});

// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Validate name
    if (!validateField(name)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    // Validate subject
    if (!validateField(subject)) {
        isValid = false;
    }
    
    // Validate message
    if (!validateField(message)) {
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (!value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }
    
    // Additional validation based on field type
    switch (field.id) {
        case 'name':
            if (value.length < 2) {
                showError(field, errorElement, 'Name must be at least 2 characters long');
                return false;
            }
            if (value.length > 100) {
                showError(field, errorElement, 'Name must be less than 100 characters');
                return false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showError(field, errorElement, 'Message must be at least 10 characters long');
                return false;
            }
            if (value.length > 1000) {
                showError(field, errorElement, 'Message must be less than 1000 characters');
                return false;
            }
            break;
    }
    
    // Clear error if validation passes
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.classList.remove('error');
    return true;
}

// Validate email field
function validateEmail(emailField) {
    const email = emailField.value.trim();
    const errorElement = document.getElementById(emailField.id + 'Error');
    
    if (!email) {
        showError(emailField, errorElement, 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailField, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    // Clear error if validation passes
    if (errorElement) {
        errorElement.textContent = '';
    }
    emailField.classList.remove('error');
    return true;
}

// Show error message
function showError(field, errorElement, message) {
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear all error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Smooth animation
        formMessage.style.opacity = '0';
        formMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            formMessage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            formMessage.style.opacity = '1';
            formMessage.style.transform = 'translateY(0)';
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
    }
}

// Hide form message
function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.style.opacity = '0';
        formMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 300);
    }
}

// Track form submission
function trackFormSubmission() {
    // In a real application, this would send analytics data
    const formData = {
        timestamp: new Date().toISOString(),
        subject: document.getElementById('subject').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    console.log('Form submitted:', formData);
    
    // Store in localStorage for analytics
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

// Track social media clicks
function trackSocialClick(platform) {
    // In a real application, this would send analytics data
    console.log(`Social media clicked: ${platform}`);
    
    // Store in localStorage
    const socialClicks = JSON.parse(localStorage.getItem('socialClicks') || '{}');
    socialClicks[platform] = (socialClicks[platform] || 0) + 1;
    localStorage.setItem('socialClicks', JSON.stringify(socialClicks));
}

// Initialize contact page
function initializeContactPage() {
    // Add character counters for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: #666;
            margin-top: 0.5rem;
        `;
        
        messageField.parentNode.appendChild(counter);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = 1000;
            counter.textContent = `${length}/${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#ffc107';
            }
            if (length >= maxLength) {
                counter.style.color = '#dc3545';
            } else {
                counter.style.color = '#666';
            }
        });
    }
    
    // Add focus effects to form fields
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
    
    // Add animation to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            method.style.opacity = '1';
            method.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link-large');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Add CSS for form validation
const formStyles = document.createElement('style');
formStyles.textContent = `
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
    }
    
    .form-group.focused {
        transform: translateY(-2px);
    }
    
    .form-group.focused label {
        color: #667eea;
        font-weight: 700;
    }
    
    .contact-method {
        transition: all 0.3s ease;
    }
    
    .contact-method:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
    }
    
    .social-link-large {
        transition: all 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .contact-form button[type="submit"]:hover:not(:disabled) {
        animation: pulse 1s infinite;
    }
`;
document.head.appendChild(formStyles);
