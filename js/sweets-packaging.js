// =========================================
// PREMIUM GALLERY SCROLL ANIMATION
// =========================================

// =========================================
// GALLERY SCROLL ANIMATION
// =========================================

const galleryItems =
document.querySelectorAll(".sp-gallery-item");

const revealGallery = () => {

    galleryItems.forEach((item,index)=>{

        const top =
        item.getBoundingClientRect().top;

        if(top < window.innerHeight - 70){

            item.style.opacity = "1";

            item.style.transform =
            "translateY(0px)";

        }

    });

};

galleryItems.forEach((item,index)=>{

    item.style.opacity = "0";

    item.style.transform =
    "translateY(60px)";

    item.style.transition =
    `all .8s ease ${index * 0.08}s`;

});

window.addEventListener("scroll", revealGallery);

revealGallery();