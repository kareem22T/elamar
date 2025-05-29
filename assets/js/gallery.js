// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all gallery images
    const galleryImages = document.querySelectorAll(".gallery-wrapper .img img");
    let currentIndex = 0;
    let imagesArray = Array.from(galleryImages);

    // Create lightbox HTML structure
    const lightboxHTML = `
        <div id="lightbox" class="lightbox" style="direction: ltr;">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#10094;</button>
                <div class="lightbox-content">
                    <img src="/placeholder.svg" alt="Lightbox image" class="lightbox-image">
                </div>
                <button class="lightbox-nav lightbox-next" aria-label="Next">&#10095;</button>
                <div class="lightbox-counter">1 / ${galleryImages.length}</div>
            </div>
        </div>
    `;

    // Insert lightbox into the body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // Get lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');

    // Add click event to each gallery image
    galleryImages.forEach(function(image, index) {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Open lightbox function
    function openLightbox(index) {

        currentIndex = index;
        lightboxImage.src = imagesArray[index].src;
        lightboxImage.alt = imagesArray[index].alt || 'Gallery image ' + (index + 1);
        updateCounter();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on lightbox for keyboard navigation
        lightbox.focus();
        
    }

    // Close lightbox function
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        lightboxImage.src = imagesArray[currentIndex].src;
        lightboxImage.alt = imagesArray[currentIndex].alt || 'Gallery image ' + (currentIndex + 1);
        updateCounter();
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        lightboxImage.src = imagesArray[currentIndex].src;
        lightboxImage.alt = imagesArray[currentIndex].alt || 'Gallery image ' + (currentIndex + 1);
        updateCounter();
    }

    // Update counter display
    function updateCounter() {
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + imagesArray.length;
    }

    // Event listeners for lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });

    // Prevent closing when clicking on the image
    lightboxImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display !== 'block') return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left - next image
            } else {
                prevImage(); // Swipe right - previous image
            }
        }
    }
});