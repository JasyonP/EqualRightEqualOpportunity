window.addEventListener("scroll", function() {
    let header = document.querySelector(".headering");
    if (window.scrollY > 50) { 
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lightbox").style.display = "none";

    let slideIndex = 0;
    const carousel = document.querySelector(".carousel-inner");
    const images = document.querySelectorAll(".carousel-inner img");
    const totalSlides = images.length;
    let autoSlide;

    function moveSlide(step) {
        slideIndex += step;

        if (slideIndex >= totalSlides) {
            slideIndex = 0; 
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1; 
        }

        updateSlide();
        resetAutoSlide();
    }

    function updateSlide() {
        const translateX = -slideIndex * 100 + "%";
        carousel.style.transform = "translateX(" + translateX + ")";
    }

    function startAutoSlide() {
        autoSlide = setInterval(function () {
            moveSlide(1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }


    startAutoSlide();

    document.getElementById("nextBtn").addEventListener("click", function () {
        moveSlide(1);
    });

    document.getElementById("prevBtn").addEventListener("click", function () {
        moveSlide(-1);
    });


    window.openLightbox = function (imgElement) {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");

        if (imgElement) {
            lightbox.style.display = "flex";
            lightboxImg.src = imgElement.src;
        }
    };

    window.closeLightbox = function () {
        document.getElementById("lightbox").style.display = "none";
    };
});

document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped'); 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('evaluationChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Seminar Effectiveness', 'Discussion Engagement', 'Understanding Gender Equality', 'More Interactive Suggestions'],
            datasets: [{
                data: [85, 78, 90, 70, 80],
                backgroundColor: ['#FFCFEF', '#0A97B0', '#0A5EB0', '#FDAB9E', '#C7DB9C'],
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});

function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded"); 
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (event) {
        let targetUrl = this.href;
        if (targetUrl.startsWith(window.location.origin) && !targetUrl.includes("#")) {
            event.preventDefault(); 
            document.body.style.opacity = 0; 
            setTimeout(() => {
                window.location.href = targetUrl; 
            }, 500); 
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".campaign-slide");
    let currentIndex = 0;
    let isTransitioning = false;
    let autoSlideInterval;

    function showSlide(newIndex, direction) {
        if (isTransitioning || newIndex === currentIndex) return;
        isTransitioning = true;

        let currentSlide = slides[currentIndex];
        let nextSlide = slides[newIndex];

        if (!currentSlide || !nextSlide) return;

        currentSlide.classList.add(direction === "next" ? "slide-out-left" : "slide-out-right");
        nextSlide.classList.add(direction === "next" ? "slide-in-right" : "slide-in-left", "active");

        setTimeout(() => {
            currentSlide.classList.remove("active", "slide-out-left", "slide-out-right");
            nextSlide.classList.remove("slide-in-left", "slide-in-right");
            currentIndex = newIndex;
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        let newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex, "next");
    }

    function prevSlide() {
        let newIndex = (currentIndex - 1 + slides.length) % slides.length; 
        showSlide(newIndex, "prev");
    }

    function startAutoSlide() {
        stopAutoSlide(); 
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    const prevBtn = document.querySelector(".campaign-prev");
    const nextBtn = document.querySelector(".campaign-next");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", function () {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener("click", function () {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    } else {
        console.warn("Navigation buttons not found! Check your HTML.");
    }

    const campaignBox = document.querySelector(".campaign-box");
    if (campaignBox) {
        campaignBox.addEventListener("mouseenter", stopAutoSlide);
        campaignBox.addEventListener("mouseleave", startAutoSlide);
    }

    if (slides.length > 0) {
        slides[currentIndex].classList.add("active");
        startAutoSlide();
    } else {
        console.warn("No slides found! Check your HTML.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let socialSidebar = document.querySelector(".social-sidebar");
    
    function toggleSidebar() {
        socialSidebar.style.opacity = "1";  // Show
        setTimeout(() => {
            socialSidebar.style.opacity = "0";  // Hide after 5 seconds
        }, 5000);
    }

    setInterval(() => {
        toggleSidebar(); // Show for 5 seconds
        setTimeout(() => {
            socialSidebar.style.opacity = "0";  // Hide for 3 seconds
        }, 5000); 
    }, 8000); // 5s show + 3s hide = 8s cycle

    toggleSidebar(); // Start cycle
});

document.addEventListener("DOMContentLoaded", function () {
    const smoothScrollLinks = document.querySelectorAll(".dropdown-content a");

    smoothScrollLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href").split("#")[1]; // Get the target section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault(); // Prevent default jump
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust for any fixed headers
                    behavior: "smooth" // Smooth scrolling effect
                });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".Main-Nav a, .head a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            
            // Ignore full URLs
            if (!targetId.startsWith("#")) return;

            event.preventDefault(); // Prevent default jump

            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for fixed headers
                    behavior: "smooth" // Smooth scrolling
                });

                // Update URL without breaking back button functionality
                history.pushState(null, null, targetId);
            }
        });
    });
});
