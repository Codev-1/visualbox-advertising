// ==========================================
// PLAIN JS GLOBAL FOOTER LOADER
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (footerPlaceholder) {
        // Fetch the plain HTML footer
        fetch('footer.html')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Footer file could not be loaded.');
                }
                return response.text();
            })
            .then(function(htmlData) {
                // Inject the plain HTML into the page
                footerPlaceholder.innerHTML = htmlData;
            })
            .catch(function(error) {
                console.error("Footer Error: ", error);
            });
    }

        const scrollTopButton = document.getElementById('vbScrollTopBtn');

    if (scrollTopButton) {
        // 1. Monitor window viewport scroll depth offset indices
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                // Reveal action button once user slides below 300px mark
                scrollTopButton.classList.add('is-visible');
            } else {
                scrollTopButton.classList.remove('is-visible');
            }
        });

        // 2. Smooth document return click event handler binding
        scrollTopButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Forces modern hardware-accelerated fluid scroll response velocity
            });
        });
    }


});