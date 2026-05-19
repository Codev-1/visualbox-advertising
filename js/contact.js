document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Asynchronous Fragment Injections Logic
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('navbar-placeholder');
            if (navPlaceholder) navPlaceholder.innerHTML = data;
            if(typeof initNavbarLogic === 'function') initNavbarLogic();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) footerPlaceholder.innerHTML = data;
            if(typeof initFooterAnimations === 'function') initFooterAnimations();
        });

    // 2. GSAP Graphic Orchestrator Scroll Trigger Pipelines Setup
    gsap.registerPlugin(ScrollTrigger);

    // Initial Split Character Line Entry sequence trigger mapping hero text layers
    gsap.fromTo(".gsap-hero > *", 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.1,
            clearProps: "all"
        }
    );

    // Lateral slide engine for asymmetric info rows stacking matrix
    gsap.fromTo(".gsap-card", 
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".flex-matrix-grid",
                start: "top 85%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            clearProps: "all"
        }
    );

    // Mirror lateral cascade entry logic rendering submission cards wrapper panel
    gsap.fromTo(".gsap-form", 
        { x: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".flex-matrix-grid",
                start: "top 85%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.15,
            clearProps: "all"
        }
    );

    // General fade vertical reveal loop for map containers structural nodes
    gsap.utils.toArray('.gsap-fade-up').forEach(element => {
        gsap.fromTo(element, 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all"
            }
        );
    });

    // 3. Fluid Parallax Logic Tracker Over the Hero Background Canvas Frame
    window.addEventListener("scroll", () => {
        const scrolledOffset = window.pageYOffset;
        const parallaxBg = document.querySelector(".hero-parallax-bg");
        
        if (parallaxBg) {
            // Translate speed tracking coefficient factor constraint loop (0.4x speed mapping ratio)
            parallaxBg.style.transform = `translateY(${scrolledOffset * 0.4}px)`;
        }
    });

});