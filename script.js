document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initStickyHeader();
    initDestinationHover();
    initFormValidation();
    initAnimations();
    initSearchSuggestions();
    initButtonHoverEffect();
});

// Sticky Header functionality with debounce for performance
function initStickyHeader() {
    const header = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    let lastScrollTop = 0;
    let debounceTimeout;

    window.addEventListener('scroll', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add box shadow when scrolled
            if (scrollTop > 0) {
                header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }

            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop && scrollTop > hero.offsetHeight) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        }, 50);
    });
}

// Destination card hover effects with smooth scaling and rotation
function initDestinationHover() {
    const cards = document.querySelectorAll('.destination');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05) rotate(3deg)';
            img.style.transition = 'transform 0.3s ease-in-out';
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Form validation with smooth feedback
function initFormValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'Please enter a valid email address');
            } else {
                // Simulate form submission
                emailInput.value = '';
                showSuccessMessage(this, 'Thank you for subscribing!');
            }
        });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormError(input, message) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff3b30';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    input.style.borderColor = '#ff3b30';
    input.parentElement.appendChild(errorElement);
    
    // Fade out error message after 3 seconds
    setTimeout(() => {
        errorElement.style.opacity = '0';
        setTimeout(() => errorElement.remove(), 300);
        input.style.borderColor = '';
    }, 3000);
}

function showSuccessMessage(form, message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.color = '#34c759';
    successElement.style.marginTop = '10px';
    
    form.appendChild(successElement);
    
    // Fade out success message after 3 seconds
    setTimeout(() => {
        successElement.style.opacity = '0';
        setTimeout(() => successElement.remove(), 300);
    }, 3000);
}

// Scroll animations using Intersection Observer with fade-in and slide-up effects
function initAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Search suggestions functionality
function initSearchSuggestions() {
    const searchInput = document.querySelector('.search-box input');
    const suggestionBox = document.querySelector('.search-suggestions');

    if (searchInput && suggestionBox) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            suggestionBox.innerHTML = '';
            
            if (query.length > 0) {
                // Simulated search suggestions
                const suggestions = ['Bali', 'Paris', 'Kyoto', 'Agra', 'London', 'Egypt', 'Germany']
                    .filter(place => place.toLowerCase().includes(query))
                    .map(place => `<div class="suggestion-item">${place}</div>`)
                    .join('');
                suggestionBox.innerHTML = suggestions;
                suggestionBox.style.display = 'block';
            } else {
                suggestionBox.style.display = 'none';
            }
        });

        suggestionBox.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('suggestion-item')) {
                searchInput.value = e.target.textContent;
                suggestionBox.style.display = 'none';
            }
        });
    }
}

// Hover effect for Submit Button
function initButtonHoverEffect() {
    const button = document.querySelector('.submit-button');
    
    if (button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}
