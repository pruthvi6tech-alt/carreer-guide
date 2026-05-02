// Career Search/Filter Function
function filterCareers() {
    const searchInput = document.getElementById('careerSearch');
    const filterText = searchInput.value.toLowerCase();
    const careerCards = document.querySelectorAll('.career-card');
    
    careerCards.forEach(card => {
        const careerName = card.getAttribute('data-career').toLowerCase();
        const careerText = card.textContent.toLowerCase();
        
        if (careerName.includes(filterText) || careerText.includes(filterText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Real-time search as user types
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('careerSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterCareers);
    }
});

// Contact Form Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    
    let isValid = true;
    
    // Validate Name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate Email
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Validate Message
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contactForm').reset();
    }
    
    return false; // Prevent form submission
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});

// Add hover effects to cards dynamically
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.career-card, .skill-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Table row highlighting on comparison page
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e8f4f8';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

// Form input focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
});

// Search input clear button functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('careerSearch');
    if (searchInput) {
        // Add clear button
        const clearBtn = document.createElement('button');
        clearBtn.innerHTML = '×';
        clearBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
            display: none;
        `;
        
        // Position search container relatively
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(clearBtn);
        
        // Show/hide clear button
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearBtn.style.display = 'block';
            } else {
                clearBtn.style.display = 'none';
            }
        });
        
        // Clear search
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            this.style.display = 'none';
            filterCareers();
        });
    }
});

// Mobile menu toggle (if needed in future)
document.addEventListener('DOMContentLoaded', function() {
    // This function can be used if we add a mobile menu toggle
    function toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    }
});

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .career-card, .skill-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Utility function to check if element exists
function elementExists(id) {
    return document.getElementById(id) !== null;
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('CareerGuide website loaded successfully!');
    
    // Check if we're on the careers page
    if (elementExists('careerSearch')) {
        console.log('Career search functionality initialized');
    }
    
    // Check if we're on the contact page
    if (elementExists('contactForm')) {
        console.log('Contact form validation initialized');
    }
    
    // Check if we're on the compare page
    if (document.querySelector('.comparison-table')) {
        console.log('Comparison table functionality initialized');
    }
});
