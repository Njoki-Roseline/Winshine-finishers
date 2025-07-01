// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing slider...');
    
    try {
        console.log('Looking for slider elements...');
        // Find the slider container - try multiple selectors
        const slider = document.querySelector('.slider-container') || document.querySelector('.hero-slider');
        console.log('Slider container found:', slider);
        if (!slider) {
            throw new Error('Slider container not found. Looking for .slider-container or .hero-slider');
        }
        
        // Find slides within the slider container
        const slides = slider.querySelectorAll('.slide');
        console.log('Number of slides found:', slides.length);
        if (slides.length === 0) {
            throw new Error('No slides found inside the slider container');
        }
        
        // Find navigation elements
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.slider-nav.prev');
        const nextBtn = slider.querySelector('.slider-nav.next');
        console.log('Navigation buttons - Prev:', prevBtn, 'Next:', nextBtn);
        
        if (!prevBtn || !nextBtn) {
            console.warn('Navigation buttons not found. Make sure you have elements with classes "slider-nav prev" and "slider-nav next"');
        }
        
        console.log('Slider initialized with:', {
            slides: slides.length,
            dots: dots.length,
            prevButton: prevBtn ? 'Found' : 'Missing',
            nextButton: nextBtn ? 'Found' : 'Missing'
        });
        
        // Initialize slider with the found elements
        initSlider(slider, slides, dots, prevBtn, nextBtn);
        
    } catch (error) {
        console.error('Failed to initialize slider:', error);
    }
});

function initSlider(slider, slides, dots, prevBtn, nextBtn) {
    if (!slider || !slides || slides.length === 0) {
        console.error('Invalid slider initialization parameters');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    const slideCount = slides.length;
    let touchStartX = 0;
    let touchEndX = 0;
    let isAnimating = false;
    
    // Initialize slider
    function initSlider() {
        try {
            console.log('Initializing slider...');
            
            // Show first slide
            goToSlide(0);
            
            // Start auto slide
            startAutoSlide();
            
            // Pause auto slide on hover
            slider.addEventListener('mouseenter', pauseAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
            
            // Initialize touch events for mobile
            initTouchEvents();
            
            // Set up event listeners
            setupEventListeners();
            
            console.log('Slider initialization complete');
        } catch (error) {
            console.error('Error in slider initialization:', error);
        }
    }
    
    // Go to specific slide
    function goToSlide(n) {
        if (isAnimating) return;
        isAnimating = true;
        
        try {
            // Update current slide index
            currentSlide = (n + slideCount) % slideCount;
            
            // Update slides
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            // Update dots if they exist
            if (dots && dots.length > 0) {
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            console.log('Went to slide', currentSlide);
        } catch (error) {
            console.error('Error in goToSlide:', error);
        } finally {
            // Reset animation flag after a short delay
            setTimeout(() => {
                isAnimating = false;
            }, 50);
        }
    }
    
    // Next slide
    function nextSlide() {
        console.log('Next slide requested');
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        console.log('Previous slide requested');
        goToSlide(currentSlide - 1);
    }
    
    // Start auto slide
    function startAutoSlide() {
        try {
            // Clear any existing interval
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            // Start new interval (5 seconds)
            slideInterval = setInterval(() => {
                try {
                    nextSlide();
                } catch (error) {
                    console.error('Error in auto slide:', error);
                }
            }, 5000);
        } catch (error) {
            console.error('Error in startAutoSlide:', error);
        }
    }
    
    // Pause auto slide
    function pauseAutoSlide() {
        try {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        } catch (error) {
            console.error('Error in pauseAutoSlide:', error);
        }
    }
    
    // Handle touch events for mobile swipe
    function initTouchEvents() {
        try {
            if (!slider) return;
            
            let touchStartX = 0;
            let touchEndX = 0;
            
            const handleTouchStart = (e) => {
                touchStartX = e.changedTouches[0].screenX;
                pauseAutoSlide();
            };
            
            const handleTouchEnd = (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            };
            
            slider.addEventListener('touchstart', handleTouchStart, { passive: true });
            slider.addEventListener('touchend', handleTouchEnd, { passive: true });
            
            // Cleanup function
            return () => {
                slider.removeEventListener('touchstart', handleTouchStart);
                slider.removeEventListener('touchend', handleTouchEnd);
            };
        } catch (error) {
            console.error('Error in initTouchEvents:', error);
        }
    }
    
    // Handle swipe gesture
    function handleSwipe() {
        try {
            const SWIPE_THRESHOLD = 50; // Minimum distance to consider it a swipe
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) < SWIPE_THRESHOLD) return; // Not enough movement
            
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } catch (error) {
            console.error('Error in handleSwipe:', error);
        }
    }
    
    // Event listeners for navigation buttons
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Previous button
        if (prevBtn) {
            console.log('Previous button found');
            const handlePrevClick = (e) => {
                console.log('Previous button clicked');
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
            };
            prevBtn.removeEventListener('click', handlePrevClick); // Remove any existing listeners
            prevBtn.addEventListener('click', handlePrevClick);
        } else {
            console.warn('Previous button not found');
        }
        
        // Next button
        if (nextBtn) {
            console.log('Next button found');
            const handleNextClick = (e) => {
                console.log('Next button clicked');
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
            };
            nextBtn.removeEventListener('click', handleNextClick); // Remove any existing listeners
            nextBtn.addEventListener('click', handleNextClick);
        } else {
            console.warn('Next button not found');
        }
        
        // Keyboard navigation
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        };
        
        document.removeEventListener('keydown', handleKeyDown); // Remove any existing listeners
        document.addEventListener('keydown', handleKeyDown);
        
        // Cleanup function
        return () => {
            if (prevBtn) prevBtn.removeEventListener('click', handlePrevClick);
            if (nextBtn) nextBtn.removeEventListener('click', handleNextClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }
    
    // Initialize the slider
    initSlider();
}
