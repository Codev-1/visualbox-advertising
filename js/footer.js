/*=========================================
    VISUALBOX PREMIUM FOOTER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        SCROLL TO TOP
    ==============================*/

    const scrollBtn = document.getElementById("vbScrollTopBtn");

    if (scrollBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 300) {

                scrollBtn.classList.add("show");

            } else {

                scrollBtn.classList.remove("show");

            }

        });

        scrollBtn.addEventListener("click", function (e) {

            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /*==============================
        FOOTER REVEAL
    ==============================*/

    const footer = document.querySelector(".vb-footer");

    if (footer) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    footer.classList.add("footer-visible");

                }

            });

        }, {
            threshold: 0.15
        });

        observer.observe(footer);

    }


    /*==============================
        SOCIAL HOVER
    ==============================*/

    document.querySelectorAll(".vb-social").forEach(icon => {

        icon.addEventListener("mouseenter", () => {

            icon.style.transform =
                "translateY(-6px) scale(1.08)";

        });

        icon.addEventListener("mouseleave", () => {

            icon.style.transform =
                "";

        });

    });


    /*==============================
        VIDEO AUTOPLAY
    ==============================*/

    const footerVideo =
        document.querySelector(".vb-footer-video");

    if (footerVideo) {

        footerVideo.muted = true;

        footerVideo.playsInline = true;

        footerVideo.play().catch(() => {});

    }

});