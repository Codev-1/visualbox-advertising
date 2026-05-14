/* =========================================
   MOBILE MENU
========================================= */

const hamburger =
document.querySelector(".vb-hamburger");

const nav =
document.querySelector(".vb-nav");

hamburger.addEventListener("click",()=>{

    hamburger.classList.toggle("active");

    nav.classList.toggle("active");

});

/* =========================================
   HEADER SHADOW
========================================= */

window.addEventListener("scroll",()=>{

    const header =
    document.querySelector(".vb-header");

    header.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );

});