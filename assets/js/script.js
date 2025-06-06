// Mobile menu toggle functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const body = document.body;

mobileMenuBtn.addEventListener('click', function () {
    mobileMenuBtn.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when clicking on overlay
mobileMenuOverlay.addEventListener('click', function (e) {
    if (e.target === mobileMenuOverlay) {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close menu when clicking on menu links
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 1280) {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

const mobileNavItems = document.querySelectorAll('.mobile-menu-overlay *');
mobileNavItems.forEach(item => {
    item.addEventListener('click', function () {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 1280) {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Initialize Swiper with smooth text transitions
var swiper = new Swiper(".heroSlider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    speed: 800,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    on: {
        slideChange: function () {
            updateSlideText(this.realIndex);
        }
    }
});

// Function to update slide text with smooth transitions
function updateSlideText(activeIndex) {
    const allTexts = document.querySelectorAll('.slide-text');
    const currentActive = document.querySelector('.slide-text.active');
    const newActive = document.querySelector(`[data-slide="${activeIndex}"]`);

    if (currentActive && newActive && currentActive !== newActive) {
        // Remove active class from current text
        currentActive.classList.remove('active');
        
        // Add slide out animation
        currentActive.classList.add('slide-out-up');
        
        // After a short delay, show the new text
        setTimeout(() => {
            // Hide all texts
            allTexts.forEach(text => {
                text.classList.remove('active', 'slide-out-up', 'slide-out-down', 'slide-in-up', 'slide-in-down');
            });
            
            // Show new text with slide in animation
            newActive.classList.add('slide-in-down');
            
            // Make it active after animation starts
            setTimeout(() => {
                newActive.classList.remove('slide-in-down');
                newActive.classList.add('active');
            }, 50);
        }, 250);
    }
}

// Initialize first slide text
document.addEventListener('DOMContentLoaded', function() {
    const firstText = document.querySelector('[data-slide="0"]');
    if (firstText) {
        firstText.classList.add('active');
    }
});

// Image Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.img-container');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Open modal when clicking on gallery images
    galleryImages.forEach(function(container) {
        container.addEventListener('click', function() {
            const img = container.querySelector('img'); // Get the child <img>
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');

            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);

            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functions
    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking backdrop
    modalBackdrop.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevent modal from closing when clicking on the image
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

        // Statistics Counter Animation
        class StatisticsCounter {
            constructor() {
                this.counters = document.querySelectorAll('.counter-number');
                this.statisticsSection = document.getElementById('statisticsSection');
                this.hasAnimated = false;
                this.init();
            }

            init() {
                // Create intersection observer to trigger animation when section is visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.hasAnimated) {
                            this.animateSection();
                            this.hasAnimated = true;
                        }
                    });
                }, {
                    threshold: 0.3 // Trigger when 30% of the section is visible
                });

                if (this.statisticsSection) {
                    observer.observe(this.statisticsSection);
                }
            }

            animateSection() {
                // Add animation class to section
                this.statisticsSection.classList.add('animate');
                
                // Start counter animations with staggered delays
                this.counters.forEach((counter, index) => {
                    setTimeout(() => {
                        this.animateCounter(counter);
                    }, index * 200); // 200ms delay between each counter
                });
            }

            animateCounter(counter) {
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                // Add counting class for visual feedback
                counter.classList.add('counting');
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Use easeOutCubic for smooth animation
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(easeProgress * target);
                    
                    counter.textContent = currentValue + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Animation complete
                        counter.textContent = target + suffix;
                        counter.classList.remove('counting');
                        counter.classList.add('pulse');
                        
                        // Remove pulse class after animation
                        setTimeout(() => {
                            counter.classList.remove('pulse');
                        }, 600);
                    }
                };
                
                requestAnimationFrame(updateCounter);
            }
        }

        // Initialize the statistics counter when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new StatisticsCounter();
        });

        // Fallback: Initialize after a short delay if DOMContentLoaded already fired
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new StatisticsCounter();
            });
        } else {
            new StatisticsCounter();
        }
