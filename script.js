 // Make toggleCornices globally available

// Category Filtering
function filterProducts(category) {
    const items = document.querySelectorAll('.image-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
}

// Tab click handlers are now in the DOMContentLoaded event

// Initialize with all products visible
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cornices toggle
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const additionalCornices = document.getElementById('additional-cornices');
    
    // Hide additional cornices by default (handled in HTML now)
    
    // Add visual feedback on hover
    if (seeMoreBtn) {
        seeMoreBtn.style.cursor = 'pointer';
        seeMoreBtn.style.transition = 'all 0.2s ease';
        
        seeMoreBtn.addEventListener('mouseenter', () => {
            seeMoreBtn.style.opacity = '0.9';
            seeMoreBtn.style.transform = 'translateY(-1px)';
        });
        
        seeMoreBtn.addEventListener('mouseleave', () => {
            seeMoreBtn.style.opacity = '1';
            seeMoreBtn.style.transform = 'translateY(0)';
        });
    }
    
    // Initialize with all products
    filterProducts('all');
    
    // Add click event listeners to tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            filterProducts(tab.dataset.category);
        });
    });
});

// Next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Product Details Functionality
function showProductDetails(productName, description) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${productName}</h2>
            <p>${description}</p>
            <div class="modal-actions">
                <button class="btn btn-primary">Add to Cart</button>
                <button class="btn btn-secondary close-modal-btn">Close</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };
    
    // Add event listeners for closing modal
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    
    // Close when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Add click event listeners to all product buttons
// Animate product cards on page load
function animateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    // First, make sure all cards are hidden initially
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Then animate them in sequence
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        }, index * 100); // 100ms delay between each card
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight * 0.8) &&
        rect.bottom >= 0
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        if (isInViewport(card) && !card.classList.contains('visible')) {
            card.classList.add('visible');
        }
    });
}

// Initialize animations when elements come into view
function initScrollAnimations() {
    // Create intersection observer for service cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when the animation triggers
    });

    // Observe all service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        // Set animation delay based on position
        card.style.setProperty('--animation-order', index);
        observer.observe(card);
    });

    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Also check when the page loads
    window.addEventListener('load', () => {
        setTimeout(handleScrollAnimations, 500);
    });
    
    // Check again after a short delay to catch any lazy-loaded content
    setTimeout(handleScrollAnimations, 1000);
}

// Wait for everything to be loaded
window.addEventListener('load', () => {
    // Initialize animations with a small delay
    setTimeout(() => {
        animateProductCards();
        initScrollAnimations();
    }, 500); // Slight delay to ensure everything is ready
    
    // Initialize cornices toggle button
    const seeMoreBtn = document.querySelector('.see-more-btn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', toggleCornices);
    }
    
    const productButtons = document.querySelectorAll('.product-card .btn');
    
    productButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            showProductDetails(productName, description);
        });
    });
});

// Initialize slider on page load
window.addEventListener('load', initSlider);

// Sticky Header - Modified to always keep header visible
const header = document.querySelector('.main-header');
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Remove any scroll-related classes that might be added by other scripts
if (header) header.classList.remove('scroll-up', 'scroll-down');

// Function to ensure nav links are always visible on desktop
function ensureNavLinksVisible() {
    if (window.innerWidth > 1024) { // Desktop view
        navLinks.style.display = 'flex';
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
        navLinks.style.maxHeight = 'none';
        navLinks.style.position = 'relative';
    } else {
        // Reset for mobile
        if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
            navLinks.style.opacity = '0';
            navLinks.style.maxHeight = '0';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.opacity = '1';
            navLinks.style.visibility = 'visible';
            navLinks.style.maxHeight = '500px';
        }
    }
}

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    ensureNavLinksVisible();
});

// Keep the header always visible and ensure nav links are visible
window.addEventListener('scroll', () => {
    // Ensure header stays at the top
    header.style.transform = 'translateY(0)';
    
    // Ensure nav links remain visible on desktop
    if (window.innerWidth > 1024) {
        ensureNavLinksVisible();
    }
});

// Handle window resize
window.addEventListener('resize', ensureNavLinksVisible);

// Initial check
ensureNavLinksVisible();

// Back to Top Button
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '&uarr;';
document.body.appendChild(backToTopBtn);

// Initialize cornices toggle on window load
window.addEventListener('load', () => {
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const additionalCornices = document.getElementById('additional-cornices');
    
    // Hide additional cornices by default if they exist
    if (additionalCornices) {
        additionalCornices.style.display = 'none';
    }
    
    // If seeMoreBtn exists but doesn't have a click handler yet, add one
    if (seeMoreBtn && !seeMoreBtn.hasAttribute('data-initialized')) {
        seeMoreBtn.setAttribute('data-initialized', 'true');
        seeMoreBtn.addEventListener('click', toggleCornices);
    }
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navMenuItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navMenuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Product Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Function to filter products by category
    function filterProducts(category) {
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter products
            filterProducts(this.dataset.category);
        });
    });

    // Initialize with all products visible
    if (typeof filterProducts === 'function') {
        filterProducts('all');
    }
});

// Initialize AOS (Animate On Scroll) if you want to add animations
// Make sure to include AOS CSS and JS in your HTML
// https://michalsnik.github.io/aos/
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}
