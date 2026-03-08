// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Language Toggle
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you can add language switching logic
        const language = button.textContent;
        console.log(`Language switched to: ${language}`);
    });
});

// Smooth Scrolling for Navigation Links
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

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Add to cart animation
        this.textContent = 'Added to Cart!';
        this.style.background = '#28a745';
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '#2c5530';
        }, 2000);
        
        console.log(`Added to cart: ${productName} - ${productPrice}`);
    });
});

// Shop Now Button Functionality
const shopNowButtons = document.querySelectorAll('.shop-btn, .cta-btn');

shopNowButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Scroll to shop section or show shop modal
        const shopSection = document.querySelector('#shop') || document.querySelector('.bestsellers');
        if (shopSection) {
            shopSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2c5530;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Product Card Hover Effects
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Category Card Interactions
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        console.log(`Category selected: ${categoryName}`);
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 150);
    });
});

// Artisan Card Interactions
const artisanCards = document.querySelectorAll('.artisan-card');

artisanCards.forEach(card => {
    card.addEventListener('click', function() {
        const artisanName = this.querySelector('h3').textContent;
        const artisanCraft = this.querySelector('.craft').textContent;
        
        showNotification(`Learn more about ${artisanName} - ${artisanCraft}`);
    });
});

// Story Card Interactions
const storyCards = document.querySelectorAll('.story-card');

storyCards.forEach(card => {
    card.addEventListener('click', function() {
        const storyTitle = this.querySelector('h3').textContent;
        console.log(`Story clicked: ${storyTitle}`);
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Lazy Loading for Images
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    imageObserver.observe(img);
});

// Search Functionality (if needed)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'search-input';
    
    // Add search styles
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-input {
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            border-radius: 25px;
            margin-left: 1rem;
            font-size: 0.9rem;
        }
        .search-input:focus {
            outline: none;
            border-color: #2c5530;
        }
    `;
    document.head.appendChild(searchStyles);
    
    // Add search to navbar if needed
    // document.querySelector('.nav-container').appendChild(searchInput);
}

// Initialize search (commented out for now)
// initializeSearch();

// Form Validation (for contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#2c5530';
        }
    });
    
    return isValid;
}

// Contact Form Handler
const contactForms = document.querySelectorAll('form');

contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            showNotification('Message sent successfully!');
            this.reset();
        } else {
            showNotification('Please fill in all required fields.');
        }
    });
});

// Newsletter Subscription
function subscribeNewsletter(email) {
    // Simulate API call
    console.log(`Newsletter subscription for: ${email}`);
    showNotification('Thank you for subscribing to our newsletter!');
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', function() {
    console.log('Santiniketan Artcraft website loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler); 