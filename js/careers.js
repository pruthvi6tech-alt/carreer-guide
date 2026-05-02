// JavaScript for Careers page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle (reuse from main script)
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

    // Search functionality
    const searchInput = document.getElementById('careerSearch');
    const careerCards = document.querySelectorAll('.career-card');
    const noResults = document.getElementById('noResults');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            careerCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                const matchesSearch = title.includes(searchTerm) || 
                                     description.includes(searchTerm) || 
                                     tags.some(tag => tag.includes(searchTerm));
                
                if (matchesSearch) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (noResults) {
                if (visibleCount === 0 && searchTerm !== '') {
                    noResults.style.display = 'block';
                    noResults.style.animation = 'fadeIn 0.5s ease';
                } else {
                    noResults.style.display = 'none';
                }
            }

            // Update search results count
            updateSearchResultsCount(visibleCount, searchTerm);
        });

        // Clear search on escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;

            careerCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Update filter results
            updateFilterResults(visibleCount, filter);
            
            // Clear search when filter is applied
            if (searchInput) {
                searchInput.value = '';
                if (noResults) {
                    noResults.style.display = 'none';
                }
            }
        });
    });

    // Career card hover effects
    careerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });

        // Add click analytics (optional)
        card.addEventListener('click', function() {
            const careerTitle = this.querySelector('h3').textContent;
            trackCareerClick(careerTitle);
        });
    });

    // Smooth scroll for explore buttons
    const exploreButtons = document.querySelectorAll('.learn-more');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add smooth transition effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Add keyboard navigation for filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextButton = filterButtons[index + 1];
                if (nextButton) nextButton.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevButton = filterButtons[index - 1];
                if (prevButton) prevButton.focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add search suggestions
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            showSearchSuggestions();
        });

        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                hideSearchSuggestions();
            }, 200);
        });
    }

    // Initialize page
    initializeCareersPage();
});

// Update search results count
function updateSearchResultsCount(count, searchTerm) {
    let countElement = document.getElementById('searchCount');
    
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.id = 'searchCount';
        countElement.style.cssText = `
            text-align: center;
            margin: 1rem 0;
            color: #667eea;
            font-weight: 600;
        `;
        searchInput.parentNode.insertBefore(countElement, searchInput.nextSibling);
    }

    if (searchTerm !== '') {
        countElement.textContent = `Found ${count} career${count !== 1 ? 's' : ''} for "${searchTerm}"`;
    } else {
        countElement.textContent = '';
    }
}

// Update filter results
function updateFilterResults(count, filter) {
    let filterElement = document.getElementById('filterCount');
    
    if (!filterElement) {
        filterElement = document.createElement('div');
        filterElement.id = 'filterCount';
        filterElement.style.cssText = `
            text-align: center;
            margin: 1rem 0;
            color: #667eea;
            font-weight: 600;
        `;
        const filterContainer = document.querySelector('.filter-buttons');
        filterContainer.parentNode.insertBefore(filterElement, filterContainer.nextSibling);
    }

    if (filter !== 'all') {
        filterElement.textContent = `Showing ${count} ${filter} career${count !== 1 ? 's' : ''}`;
    } else {
        filterElement.textContent = `Showing all ${count} careers`;
    }
}

// Track career clicks (analytics)
function trackCareerClick(careerTitle) {
    // In a real application, this would send data to analytics
    console.log(`Career clicked: ${careerTitle}`);
    
    // Store in localStorage for personalization
    const clickedCareers = JSON.parse(localStorage.getItem('clickedCareers') || '[]');
    if (!clickedCareers.includes(careerTitle)) {
        clickedCareers.push(careerTitle);
        localStorage.setItem('clickedCareers', JSON.stringify(clickedCareers));
    }
}

// Show search suggestions
function showSearchSuggestions() {
    const suggestions = [
        'engineering', 'medical', 'business', 'arts', 'design',
        'technology', 'software', 'healthcare', 'government', 'education'
    ];
    
    // Create suggestions dropdown
    let suggestionsList = document.getElementById('searchSuggestions');
    
    if (!suggestionsList) {
        suggestionsList = document.createElement('div');
        suggestionsList.id = 'searchSuggestions';
        suggestionsList.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e9ecef;
            border-top: none;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        `;
        
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(suggestionsList);
    }

    // Populate suggestions
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.textContent = suggestion;
        item.style.cssText = `
            padding: 10px 15px;
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
        
        item.addEventListener('click', function() {
            searchInput.value = suggestion;
            searchInput.dispatchEvent(new Event('input'));
            hideSearchSuggestions();
        });
        
        suggestionsList.appendChild(item);
    });

    suggestionsList.style.display = 'block';
}

// Hide search suggestions
function hideSearchSuggestions() {
    const suggestionsList = document.getElementById('searchSuggestions');
    if (suggestionsList) {
        suggestionsList.style.display = 'none';
    }
}

// Initialize careers page
function initializeCareersPage() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.career-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Show recently viewed careers
    showRecentlyViewed();
}

// Show recently viewed careers
function showRecentlyViewed() {
    const clickedCareers = JSON.parse(localStorage.getItem('clickedCareers') || '[]');
    
    if (clickedCareers.length > 0) {
        const recentSection = document.createElement('div');
        recentSection.className = 'recent-careers';
        recentSection.innerHTML = `
            <h3>Recently Viewed</h3>
            <div class="recent-careers-list">
                ${clickedCareers.slice(-3).map(career => 
                    `<span class="recent-career-tag">${career}</span>`
                ).join('')}
            </div>
        `;
        
        recentSection.style.cssText = `
            margin: 2rem 0;
            padding: 1.5rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.1);
        `;
        
        const careersSection = document.querySelector('.careers-section .container');
        careersSection.insertBefore(recentSection, careersSection.firstChild);
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .recent-career-tag {
        display: inline-block;
        background: #667eea;
        color: white;
        padding: 4px 12px;
        border-radius: 15px;
        margin: 0.25rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .recent-career-tag:hover {
        background: #764ba2;
    }
    
    .recent-careers-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .recent-careers h3 {
        color: #667eea;
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);
