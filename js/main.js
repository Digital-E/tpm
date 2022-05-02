document.addEventListener("DOMContentLoaded", function(event) {

/* -------------------------------------------------------------------------- */
/*                                 Menu Script                                */
/* -------------------------------------------------------------------------- */


/* --------------------------------- Marquee -------------------------------- */

let marquee = document.querySelector(".nav-marquee");
let marqueeWrapper = document.querySelector(".nav-marquee-wrapper");
let marqueeItem = document.querySelector(".nav-marquee-item");


marquee.style.width = `${marqueeItem.offsetWidth * 6}px`;
marqueeWrapper.style.left = `-${marqueeItem.offsetWidth}px`;

for(let i=0; i < 5; i++) {
    let newNode = marqueeWrapper.children[0].cloneNode(true);
    marqueeWrapper.insertBefore(newNode, marqueeWrapper.children[0]);
}


gsap.set(".nav-marquee-item", {
    x: (i) => i * marqueeItem.offsetWidth
});


gsap.to(".nav-marquee-item", {
    duration: 50,
    ease: "none",
    x: `+=${marqueeWrapper.offsetWidth}`, //move each box 500px to right
    modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % marqueeWrapper.offsetWidth) //force x value to be between 0 and 500 using modulus
    },
    repeat: -1
});

/* ---------------------------- Nav Hover Sublist --------------------------- */


let navItems = document.querySelectorAll(".nav__item");

// Check Hovered Element for .nav__submenu

function mouseEnterNavItem () {
    Array.from(this.children).forEach(item => {
        if(item.classList.contains("nav__submenu")) {
            item.classList.add("nav__sublist--show");

            this.classList.add("nav__item--submenu-open")
        }
    })
}

function mouseLeaveNavItem () {
    Array.from(this.children).forEach(item => {
        if(item.classList.contains("nav__submenu")) {
            item.classList.remove("nav__sublist--show");

            this.classList.remove("nav__item--submenu-open")
        }
    })
}

// Add mouseover Event Listener to each .nav__item

navItems.forEach(item => item.addEventListener("mouseenter", mouseEnterNavItem));

navItems.forEach(item => item.addEventListener("mouseleave", mouseLeaveNavItem));

/* -------------------------------------------------------------------------- */
/*                            Home Carousel Script                            */
/* -------------------------------------------------------------------------- */

// Init Carousel

var flkty = new Flickity( '.home-carousel', {
    // options
    cellAlign: 'left',
    contain: true,
    autoPlay: 3000,
    imagesLoaded: true,
    prevNextButtons: false,
});

/* -------------------------------------------------------------------------- */
/*                       Home Announcement Banner Script                      */
/* -------------------------------------------------------------------------- */

;(() => {
    let marquee = document.querySelector(".announcement-marquee");
    let marqueeWrapper = document.querySelector(".announcement-marquee-wrapper");
    let marqueeItem = document.querySelector(".announcement-marquee-item");


    marquee.style.width = `${marqueeItem.offsetWidth * 6}px`;
    marqueeWrapper.style.left = `-${marqueeItem.offsetWidth}px`;

    for(let i=0; i < 5; i++) {
        let newNode = marqueeWrapper.children[0].cloneNode(true);
        marqueeWrapper.insertBefore(newNode, marqueeWrapper.children[0]);
    }

    gsap.set(".announcement-marquee-item", {
        x: (i) => i * marqueeItem.offsetWidth
    });


    gsap.to(".announcement-marquee-item", {
        duration: 75,
        ease: "none",
        x: `+=${marqueeWrapper.offsetWidth}`, //move each box 500px to right
        modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % marqueeWrapper.offsetWidth) //force x value to be between 0 and 500 using modulus
        },
        repeat: -1
    });
})();

/* -------------------------------------------------------------------------- */
/*                              Home Rows Script                              */
/* -------------------------------------------------------------------------- */

let allHomeEventRows = document.querySelectorAll(".home-event-row");
let allHomeEventRowMarqueeTweens = [];

let initTitleMarquee = (item) => {
    let marquee = item.children[1].children[1].children[0];
    let marqueeWrapper = item.children[1].children[1].children[0].children[0];
    let marqueeItem = item.children[1].children[1].children[0].children[0].children[0];
    let marqueeItems = marqueeWrapper.children;

    marquee.style.width = `${marqueeItem.offsetWidth * 3}px`;
    // marqueeWrapper.style.left = `-${marqueeItem.offsetWidth}px`;  

    for(let i=0; i < 3; i++) {
        let newNode = marqueeWrapper.children[0].cloneNode(true);
        marqueeWrapper.insertBefore(newNode, marqueeWrapper.children[0]);
    }        
    
    gsap.set(marqueeItems, {
        x: (i) => i * marqueeItem.offsetWidth
    }); 

    let tween = gsap.to(marqueeItems, {
        duration: 20,
        ease: "none",
        x: `-=${marqueeWrapper.offsetWidth}`, //move each box 500px to right
        modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % -marqueeWrapper.offsetWidth) //force x value to be between 0 and 500 using modulus
        },
        repeat: -1
    });

    tween.timeScale(0.00001)
    
    allHomeEventRowMarqueeTweens.push(tween)
}

// Init Marquee on Long Titles

allHomeEventRows.forEach(item => {
    let eventRowTitleWidth = item.children[1].children[1].children[0].children[0].children[0].offsetWidth

    if(eventRowTitleWidth > window.innerWidth) {
        item.classList.add("home-event-row-marquee-active")

        initTitleMarquee(item);
    } else {
        allHomeEventRowMarqueeTweens.push(null)
    }
})

   
// Add Event Listeners to event rows with marquees

allHomeEventRows.forEach((item, index) => {
    item.addEventListener("mouseenter", (item) => {
        activateTitleMarquee(item, index)
    })

    item.addEventListener("mouseleave", (item) => {
        deactivateTitleMarquee(item, index)
    })
})


let activateTitleMarquee = (item, index) => {

    if(allHomeEventRowMarqueeTweens[index] === null) return;

    allHomeEventRowMarqueeTweens[index].timeScale(1);

    // let counter = 0;

    // let speedUpInterval = setInterval(() => {
    //     if(counter < 1) {
    //         eventRowTween.timeScale(counter)
    //         counter += 0.1;
    //     } else {
    //         eventRowTween.timeScale(1)
    //         clearInterval(speedUpInterval)
    //     }
    // },10)          
    

}

let deactivateTitleMarquee = (item, index) => {

    if(allHomeEventRowMarqueeTweens[index] === null) return;

    // let counter = 1;

    // let slowDownInterval = setInterval(() => {
    //     if(counter > 0.1) {
    //         eventRowTween.timeScale(counter)
    //         counter -= 0.1;
    //     } else {
    //         eventRowTween.timeScale(0.001)
    //         clearInterval(slowDownInterval)
    //         // eventRowTween.pause();
    //     }
    // },50)  
    
    allHomeEventRowMarqueeTweens[index].timeScale(0.001)

}    

});