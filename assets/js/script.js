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
    // autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false,
    // },
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
