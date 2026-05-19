document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Fetch Navbar Dynamic Partial Asynchronous Engine
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('navbar-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
                
                // CRITICAL: Initialize mobile menu logic ONLY AFTER HTML is injected!
                initMobileMenu(); 
            }
        });

    // 2. Fetch Footer Asynchronous Engine
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) footerPlaceholder.innerHTML = data;
        });

    // 3. Mobile Navigation Operational Logic Function
    function initMobileMenu() {
    const hamburger = document.querySelector(".vb-hamburger");
    const navPanel = document.querySelector(".vb-nav");
    const dropdownParent = document.querySelector(".vb-dropdown-parent");
    const dropdownTrigger = document.querySelector(".vb-dropdown-trigger");

    if (hamburger && navPanel) {
        // Toggle mobile nav panel overlay drawer frame
        hamburger.addEventListener("click", (e) => {
            e.preventDefault();
            hamburger.classList.toggle("active");
            navPanel.classList.toggle("active");
        });

        // COLLAPSIBLE MOBILE ACCORDION LOGIC FOR THE DROPDOWN
        if (dropdownTrigger && dropdownParent) {
            dropdownTrigger.addEventListener("click", function(e) {
                // Only run accordion hijack operations on mobile view ports
                if (window.innerWidth <= 992) {
                    e.preventDefault(); // Stop page from changing immediately
                    e.stopPropagation();
                    
                    const dropdownMenu = dropdownParent.querySelector(".vb-dropdown-menu");
                    dropdownParent.classList.toggle("open-mobile-menu");
                    
                    // Simple slide toggle effect using vanilla JS style alterations
                    if (dropdownParent.classList.contains("open-mobile-menu")) {
                        dropdownMenu.style.display = "block";
                    } else {
                        dropdownMenu.style.display = "none";
                    }
                }
            });
        }

        // Close entire menu drawer automatically when core non-dropdown anchors links get clicked
        const navLinks = document.querySelectorAll(".vb-menu > li > a:not(.vb-dropdown-trigger), .vb-dropdown-menu li a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navPanel.classList.remove("active");
                if(dropdownParent) dropdownParent.classList.remove("open-mobile-menu");
                const dropdownMenu = dropdownParent?.querySelector(".vb-dropdown-menu");
                if(dropdownMenu && window.innerWidth <= 992) dropdownMenu.style.display = "none";
            });
        });
    }
}

    // 4. Header Dynamic Drop Shadow Tracker on Scroll
    window.addEventListener("scroll", () => {
        const headerWrapper = document.querySelector(".vb-header");
        if (headerWrapper) {
            headerWrapper.classList.toggle("scrolled", window.scrollY > 20);
        }
    });

    // 5. GSAP Graphic Orchestrator Sequences
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".gsap-hero > *", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.1 }
    );

    gsap.fromTo(".gsap-card", 
        { x: -50, opacity: 0 },
        { scrollTrigger: { trigger: ".flex-matrix-grid", start: "top 85%" }, x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(".gsap-form", 
        { x: 50, opacity: 0 },
        { scrollTrigger: { trigger: ".flex-matrix-grid", start: "top 85%" }, x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15 }
    );
});