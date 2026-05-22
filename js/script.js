/* =========================
   HERO PARALLAX EFFECT
========================= */

window.addEventListener("mousemove",(e)=>{

    const hero = document.querySelector(".hero-section");

    let x = (window.innerWidth / 2 - e.pageX) / 90;
    let y = (window.innerHeight / 2 - e.pageY) / 90;

    hero.style.backgroundPosition =
    `${50 + x}% ${50 + y}%`;

});


/**
 * Visualbox Advertising - Master Script Orchestrator
 * Final Synchronized Pipeline Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Layout Configuration Tracking Matrix
    const slides = document.querySelectorAll(".hero-slide");
    const heroContent = document.querySelector(".hero-content");

    /* ==========================================================================
       1. SYNCHRONIZED COMPONENT INJECTION PIPELINE
       ========================================================================== */
    const loadGlobalComponents = async () => {
        try {
            // Fetch and inject Navbar component fragment
            const navResponse = await fetch('navbar.html');
            if (navResponse.ok) {
                const navData = await navResponse.text();
                const navPlaceholder = document.getElementById('navbar-placeholder');
                if (navPlaceholder) {
                    navPlaceholder.innerHTML = navData;
                    initMobileMenu(); 
                    highlightActiveTab();
                }
            }

            // Fetch and inject Footer component fragment
            const footerResponse = await fetch('footer.html');
            if (footerResponse.ok) {
                const footerData = await footerResponse.text();
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = footerData;
                }
            }

            // CRITICAL SUCCESS VALVE: Initialize all animations ONLY AFTER elements exist in the DOM
            initializeScrollAnimations();

        } catch (error) {
            console.error("Component pipeline initialization failure context:", error);
            // Fallback valve: Force load animations if files are missing or offline
            initializeScrollAnimations();
        }
    };

    function highlightActiveTab() {
        const currentPath = window.location.pathname.split("/").pop();
        const cleanFileTarget = currentPath === "" ? "index.html" : currentPath;
        const allNavLinks = document.querySelectorAll(".vb-menu li a");
        
        allNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === cleanFileTarget) {
                link.classList.add("active");
                if (link.closest(".vb-dropdown-menu")) {
                    const parentTrigger = link.closest(".vb-dropdown-parent")?.querySelector(".vb-dropdown-trigger");
                    if (parentTrigger) parentTrigger.classList.add("active");
                }
            }
        });
    }

    function initMobileMenu() {
        const hamburger = document.querySelector(".vb-hamburger");
        const navPanel = document.querySelector(".vb-nav");
        const dropdownParent = document.querySelector(".vb-dropdown-parent");
        const dropdownTrigger = document.querySelector(".vb-dropdown-trigger");

        if (hamburger && navPanel) {
            hamburger.addEventListener("click", (e) => {
                e.preventDefault();
                hamburger.classList.toggle("active");
                navPanel.classList.toggle("active");
            });

            if (dropdownTrigger && dropdownParent) {
                dropdownTrigger.addEventListener("click", function(e) {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        e.stopPropagation();
                        const dropdownMenu = dropdownParent.querySelector(".vb-dropdown-menu");
                        dropdownParent.classList.toggle("open-mobile-menu");
                        if (dropdownMenu) {
                            dropdownMenu.style.display = dropdownParent.classList.contains("open-mobile-menu") ? "block" : "none";
                        }
                    }
                });
            }

            const navLinks = document.querySelectorAll(".vb-menu > li > a:not(.vb-dropdown-trigger), .vb-dropdown-menu li a");
            navLinks.forEach(link => {
                link.addEventListener("click", () => {
                    hamburger.classList.remove("active");
                    navPanel.classList.remove("active");
                    if (dropdownParent) dropdownParent.classList.remove("open-mobile-menu");
                    const dropdownMenu = dropdownParent?.querySelector(".vb-dropdown-menu");
                    if (dropdownMenu && window.innerWidth <= 992) dropdownMenu.style.display = "none";
                });
            });
        }
    }

    // Fire component loader pipeline
    loadGlobalComponents();


    /* ==========================================================================
       2. HERO SECTION TEXT-SWAPPING PARALLAX SLIDESHOW ENGINE
       ========================================================================== */
    if (slides.length > 0 && heroContent) {
        const badgeText = document.querySelector(".hero-badge");
        const headingText = document.querySelector(".hero-content h1");
        const taglineText = document.querySelector(".hero-content h2");
        const descText = document.querySelector(".hero-content p");

        let currentSlideIndex = 0;
        const slideDuration = 4000;

        const slideData = [
            {
                badge: "PREMIUM PACKAGING & BRANDING",
                heading: "From Small Quantities <br>to Mass Production",
                tagline: "we image your imagination",
                desc: "Custom packaging and printing solutions tailored for startups, growing brands and large-scale businesses."
            },
            {
                badge: "RETAIL BRANDING",
                heading: "A Burst of Flavor <br> On Every Shelf",
                tagline: "Vibrant Spice & Tea Boxes",
                desc: "Eye-catching retail packaging that protects freshness while making your brand completely irresistible."
            },
            {
                badge: "PREMIUM PACKAGING",
                heading: "Elevate Your Senses <br> With Premium Boxes",
                tagline: "Bespoke Incense Packaging",
                desc: "Beautifully crafted boxes that capture the essence, aroma, and luxury of your premium incense products."
            },
            {
                badge: "CUSTOM PRINTING",
                heading: "Taste the Goodness <br> In Every Bite",
                tagline: "Appetizing Culinary Packaging",
                desc: "High-quality, food-safe custom printed boxes that make your ready-to-eat meals look as good as they taste."
            },
            {
                badge: "ECO-FRIENDLY KRAFT",
                heading: "Fresh Out of the Oven <br> To Your Customers",
                tagline: "Sustainable Food Cartons",
                desc: "Durable, grease-resistant, and eco-friendly packaging designed to keep your delicious food hot and fresh."
            }
        ];

        function nextSlide() {
            slides[currentSlideIndex].classList.remove("active");
            heroContent.style.opacity = "0"; 
            heroContent.style.transform = "translateY(20px)";
            
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            
            setTimeout(() => {
                if (badgeText) badgeText.innerHTML = `<span></span>${slideData[currentSlideIndex].badge}`;
                if (headingText) headingText.innerHTML = slideData[currentSlideIndex].heading;
                if (taglineText) taglineText.innerHTML = slideData[currentSlideIndex].tagline;
                if (descText) descText.innerHTML = slideData[currentSlideIndex].desc;
                
                slides[currentSlideIndex].classList.add("active");
                heroContent.style.opacity = "1";
                heroContent.style.transform = "translateY(0)";
            }, 600); 
        }

        setInterval(nextSlide, slideDuration);

        window.addEventListener("mousemove", (e) => {
            if (window.innerWidth >= 1024) {
                let x = (window.innerWidth / 2 - e.pageX) / 90;
                let y = (window.innerHeight / 2 - e.pageY) / 90;
                slides.forEach(slide => {
                    slide.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
                });
            }
        });
    }




    





    /* ==========================================================================
       3. MASTER GSAP & SCROLL TRIGGER CONTEXT PACKAGES
       ========================================================================== */
    function initializeScrollAnimations() {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
        
        // Clear conflicting instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.registerPlugin(ScrollTrigger);

        // Header Dynamic drop-shadow trigger monitoring scroll state
        const headerWrapper = document.querySelector(".vb-header");
        if (headerWrapper) {
            window.addEventListener("scroll", () => {
                headerWrapper.classList.toggle("scrolled", window.scrollY > 20);
            });
        }

        // Section A: Visualbox Print Studio Services Animations
        if (document.querySelector(".vb-services")) {
            gsap.fromTo(".vb-heading", 
                { y: 50, opacity: 0 },
                { scrollTrigger: { trigger: ".vb-services", start: "top 80%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(".vb-view-btn", 
                { x: 50, opacity: 0 },
                { scrollTrigger: { trigger: ".vb-services", start: "top 80%" }, x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );

            if (document.querySelector(".vb-slider")) {
                gsap.fromTo(".vb-card", 
                    { y: 80, opacity: 0 },
                    { scrollTrigger: { trigger: ".vb-slider", start: "top 80%" }, y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out" }
                );
            }

            if (document.querySelector(".vb-bottom-tags")) {
                gsap.fromTo(".vb-bottom-tags span", 
                    { opacity: 0, y: 30 },
                    { scrollTrigger: { trigger: ".vb-bottom-tags", start: "top 90%" }, opacity: 0.9, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }
                );
            }

            // 3D Perspective Card Tilt Transformations
            document.querySelectorAll(".vb-card").forEach(card => {
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rotateY = ((x / rect.width) - 0.5) * 10;
                    const rotateX = ((y / rect.height) - 0.5) * -10;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
                });
            });
        }

        // Section B: One Roof All Solutions Hub Animations
        if (document.querySelector(".adv-section")) {
            const advSection = document.querySelector(".adv-section");
            const advCards = document.querySelectorAll(".adv-card");

            gsap.fromTo(".adv-center-core", 
                { y: 50, scale: 0.9, opacity: 0 },
                { scrollTrigger: { trigger: ".adv-section", start: "top 75%" }, y: 0, scale: 1, opacity: 1, duration: 1, ease: "back.out(1.4)" }
            );

            gsap.fromTo(".adv-card", 
                { y: 60, opacity: 0 },
                { scrollTrigger: { trigger: ".adv-section", start: "top 60%" }, y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", clearProps: "transform" }
            );

            if (advSection && advCards.length > 0) {
                advSection.addEventListener("mousemove", (e) => {
                    if (window.innerWidth >= 1024) {
                        const rect = advSection.getBoundingClientRect();
                        const xPos = (e.clientX - rect.left - (rect.width / 2)) / 50;
                        const yPos = (e.clientY - rect.top - (rect.height / 2)) / 50;
                        advCards.forEach(card => {
                            const speed = card.getAttribute("data-speed") || 1;
                            gsap.to(card, { x: xPos * speed, y: yPos * speed, duration: 0.8, ease: "power1.out" });
                        });
                    }
                });

                advSection.addEventListener("mouseleave", () => {
                    if (window.innerWidth >= 1024) {
                        gsap.to(advCards, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
                    }
                });
            }
        }

        // Section C: Visualbox Advertising Main Column Suite
        if (document.querySelector(".vb-advertising-section")) {
            gsap.fromTo(".vb-ad-left h2", 
                { y: 60, opacity: 0 },
                { scrollTrigger: { trigger: ".vb-advertising-section", start: "top 75%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(".vb-ad-left p", 
                { y: 40, opacity: 0 },
                { scrollTrigger: { trigger: ".vb-ad-left p", start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );

            if (document.querySelector(".vb-service-grid")) {
                gsap.fromTo(".vb-service-card", 
                    { y: 50, opacity: 0 },
                    { scrollTrigger: { trigger: ".vb-service-grid", start: "top 85%" }, y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" }
                );
            }

            if (document.querySelector(".vb-main-card")) {
                gsap.fromTo(".vb-main-card", 
                    { x: 80, opacity: 0 },
                    { scrollTrigger: { trigger: ".vb-main-card", start: "top 80%" }, x: 0, opacity: 1, duration: 1, ease: "power2.out" }
                );
            }

            const leftBox = document.querySelector(".box-left");
            const rightBox = document.querySelector(".box-right");
            if (leftBox) gsap.to(leftBox, { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut" });
            if (rightBox) gsap.to(rightBox, { y: 20, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut" });
        }

        // Section D: Corporate Brand Experience Client Showcase Section
        if (document.querySelector(".vb-clients-section")) {
            gsap.fromTo(".vb-clients-top > *", 
                { y: 40, opacity: 0 },
                { scrollTrigger: { trigger: ".vb-clients-section", start: "top 80%" }, y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power2.out" }
            );

            if (document.querySelector(".vb-client-slider")) {
                gsap.fromTo(".vb-client-card", 
                    { y: 50, opacity: 0 },
                    { scrollTrigger: { trigger: ".vb-client-slider", start: "top 85%" }, y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power3.out" }
                );
            }

            const clientTrack = document.querySelector(".vb-client-track");
            if (clientTrack) {
                clientTrack.addEventListener("mouseenter", () => { clientTrack.style.animationPlayState = "paused"; });
                clientTrack.addEventListener("mouseleave", () => { clientTrack.style.animationPlayState = "running"; });
            }
        }
    }


    /* ==========================================================================
       4. INDUSTRY PACKAGING ENTRY CARDS INTERACTIVE LOGIC
       ========================================================================== */
    const pkgCards = document.querySelectorAll('.pkg-item-card');
    if (pkgCards.length > 0) {
        pkgCards.forEach((card, index) => {
            const calculatedDelay = 0.3 + (index * 0.06); 
            card.style.animation = `pkgCardEntrance 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${calculatedDelay}s`;
        });
    }


    /* ==========================================================================
       5. VANILLA RESPONSIVE GLASSMORPHISM TESTIMONIALS SLIDER
       ========================================================================== */
    const track = document.getElementById('tstSliderTrack');
    const slidesList = document.querySelectorAll('.tst-slide');
    const prevBtn = document.getElementById('tstPrevBtn');
    const nextBtn = document.getElementById('tstNextBtn');
    const dotsContainer = document.getElementById('tstDotsContainer');
    
    if (track && slidesList.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let currentIndex = 0;
        const totalSlides = slidesList.length;
        let autoPlayTimer;

        dotsContainer.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('tst-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.tst-dot');

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetAutoPlay(); });
        nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetAutoPlay(); });

        function startAutoPlay() {
            autoPlayTimer = setInterval(() => { goToSlide(currentIndex + 1); }, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        const wrapper = document.querySelector('.tst-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
            wrapper.addEventListener('mouseleave', startAutoPlay);
        }

        startAutoPlay();
    }
});


