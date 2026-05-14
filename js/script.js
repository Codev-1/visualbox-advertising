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