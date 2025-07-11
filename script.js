document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Contact form dummy handler
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for your message! We'll get back to you soon.");
            this.reset();
        });
    }

    // Hamburger Menu Animation
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        hamburger.classList.toggle("open"); // Toggle a class for animation
    });

    // Close nav links when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            hamburger.classList.remove('open'); // Also close hamburger animation
        });
    });

    // Animation on Scroll Logic (Intersection Observer)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ensure we don't apply 'in-view' to hero section elements
                if (entry.target.closest('#home')) {
                    // Do nothing for elements inside #home
                    observer.unobserve(entry.target); // Still unobserve if it's already visible
                    return;
                }

                entry.target.classList.add('in-view');
                
                // Calculate and set delay for staggered animations
                if (entry.target.classList.contains('anim-slide-up') ||
                    entry.target.classList.contains('anim-fade-up') ||
                    entry.target.classList.contains('anim-fade-in') ||
                    entry.target.classList.contains('anim-slide-left') ||
                    entry.target.classList.contains('anim-slide-right')) {
                    
                    let parentGrid = entry.target.closest('.skills-grid') ||
                                     entry.target.closest('.projects-grid') ||
                                     entry.target.closest('.certifications-grid') ||
                                     entry.target.closest('.education-section') ||
                                     entry.target.closest('.experience-section') ||
                                     entry.target.closest('.contact-section');

                    if (parentGrid) {
                        const children = Array.from(parentGrid.children).filter(child => 
                            child.classList.contains('anim-slide-up') ||
                            child.classList.contains('anim-fade-up') ||
                            child.classList.contains('anim-fade-in') ||
                            child.classList.contains('anim-slide-left') ||
                            child.classList.contains('anim-slide-right')
                        );
                        const index = children.indexOf(entry.target);

                        let delay = 0;
                        if (parentGrid.classList.contains('skills-grid') && window.innerWidth <= 768) {
                            // For skills grid on mobile, apply delay to pairs
                            delay = Math.floor(index / 2) * 0.2; // 0.2s delay for each pair
                        } else {
                            // For all other grids/sections, apply sequential delay
                            delay = index * 0.1;
                        }
                        
                        entry.target.style.setProperty('--delay', `${delay}s`);
                    }
                }
                observer.unobserve(entry.target); // Unobserve once animated
            }
        });
    }, observerOptions);

    // Observe elements you want to animate
    document.querySelectorAll('.anim-slide-up, .anim-fade-up, .anim-fade-in, .anim-slide-left, .anim-slide-right').forEach(element => {
        // Exclude elements within the #home section from being observed
        if (!element.closest('#home')) {
            observer.observe(element);
        }
    });
});