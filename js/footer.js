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
});