/**
 * Visualbox Advertising - Unified Global Navbar & Breadcrumbs Engine
 * Patched Isolation Rendering Loop
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Layout Selectors Checking Matrix
    const slides = document.querySelectorAll(".hero-slide");
    const heroContent = document.querySelector(".hero-content");

    /* ==========================================================================
       1. SYNCHRONIZED ASYNC FETCH COMPONENT PIPELINE
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
                    
                    // Initialize menu modules immediately after mounting the navbar HTML structure
                    initMobileMenu(); 
                    highlightActiveTab();
                    
                    // CRITICAL INTEGRATION: Run breadcrumbs safely after navbar placeholder is mounted
                    generateBreadcrumbs(); 
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

            // Trigger structural scroll animations once all elements sit in the DOM tree
            if (typeof initializeScrollAnimations === 'function') {
                initializeScrollAnimations();
            }

        } catch (error) {
            console.error("Component pipeline initialization failure context:", error);
            generateBreadcrumbs();
        }
    };

    /* ==========================================================================
       2. AUTOMATION MODULE DETERMINING ACTIVE LINKS HIGHLIGHTING
       ========================================================================== */
    function highlightActiveTab() {
        const currentPath = window.location.pathname.split("/").pop();
        const cleanFileTarget = currentPath === "" ? "index.html" : currentPath;
        const allNavLinks = document.querySelectorAll(".vb-menu li a");
        
        allNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === cleanFileTarget) {
                link.classList.add("active");
                
                // If the link sits inside a services dropdown menu, highlight the parent too
                if (link.closest(".vb-dropdown-menu")) {
                    const parentTrigger = link.closest(".vb-dropdown-parent")?.querySelector(".vb-dropdown-trigger");
                    if (parentTrigger) parentTrigger.classList.add("active");
                }
            }
        });
    }

    /* ==========================================================================
       3. MOBILE NAVIGATION ACCORDION DRAW SYSTEM
       ========================================================================== */
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

    /* ==========================================================================
       4. LOCAL & PRODUCTION SAFE TRANSPARENT BREADCRUMB TRAIL ENGINE
       ========================================================================== */
    function generateBreadcrumbs() {
        // Isolate filename safely to function correctly both locally and on web servers
        const fullPathString = window.location.pathname;
        const filename = fullPathString.substring(fullPathString.lastIndexOf('/') + 1);
        
        // Hide trail container if on Home page index roots
        if (filename === "" || filename === "index.html") {
            return;
        }

        // Standardize formatting text names from file segments
        let cleanLabel = filename.replace('.html', '').replace(/_/g, ' ').replace(/-/g, ' ');
        
        // Match specific dynamic exceptions mapping your files
        if (cleanLabel.toLowerCase() === 'digital marketing') cleanLabel = 'Digital Marketing';
        if (cleanLabel.toLowerCase() === 'food packaging') cleanLabel = 'Food Packaging';
        if (cleanLabel.toLowerCase() === 'rice packaging') cleanLabel = 'Rice Packaging';
        if (cleanLabel.toLowerCase() === 'pulse packaging') cleanLabel = 'Pulses Packaging';
        if (cleanLabel.toLowerCase() === 'masala packaging') cleanLabel = 'Masala Packaging';
        if (cleanLabel.toLowerCase() === 'oil packaging') cleanLabel = 'Oil Packaging';
        if (cleanLabel.toLowerCase() === 'frozen food packaging') cleanLabel = 'Frozen Food Packaging';
        if (cleanLabel.toLowerCase() === 'pharma packaging') cleanLabel = 'Pharma Packaging';
        if (cleanLabel.toLowerCase() === 'sweets packaging') cleanLabel = 'Sweets Packaging';
        if (cleanLabel.toLowerCase() === 'snacks packaging') cleanLabel = 'Snacks Packaging';
        if (cleanLabel.toLowerCase() === 'tea packaging') cleanLabel = 'Coffee / Tea Packaging';
        if (cleanLabel.toLowerCase() === 'beverages packaging') cleanLabel = 'Beverages Packaging';
        if (cleanLabel.toLowerCase() === 'incense sticks packaging') cleanLabel = 'Incense Sticks Packaging';



        // 1. Check if an old duplicate overlay instance is lingering from hot reloads and clear it
        const oldOverlay = document.querySelector(".vb-breadcrumb-global-overlay");
        if (oldOverlay) oldOverlay.remove();


        // 1. Create a fluid, detached absolute navigation mount block
        const breadcrumbWrapperNode = document.createElement("div");
        breadcrumbWrapperNode.className = "vb-breadcrumb-global-overlay";

        const breadcrumbHTML = `
            <nav class="vb-breadcrumb-nav" aria-label="Breadcrumb">
                <ul class="vb-breadcrumb-list">
                    <li class="vb-breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="vb-breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></li>
                    <li class="vb-breadcrumb-item active-node" aria-current="page">${cleanLabel}</li>
                </ul>
            </nav>
        `;

        breadcrumbWrapperNode.innerHTML = breadcrumbHTML;
        
        // 2. Inject it directly into the document root layout stream right below the header frame wrapper
        const headerElement = document.querySelector(".vb-header");
        if (headerElement) {
            headerElement.parentNode.insertBefore(breadcrumbWrapperNode, headerElement.nextSibling);
        }
    }

    // Fire unified component loader loop
    loadGlobalComponents();
});