document.addEventListener("DOMContentLoaded", function(event) {

/* -------------------------------------------------------------------------- */
/*                             Intro Sticky Script                            */
/* -------------------------------------------------------------------------- */

let introStickyHeight = null;

let scrollAnimation = null;

let hasTriggeredRemoveTopMargin = false;

let hasFinishedScrolling = false;

if(document.querySelector(".home-page") && window.innerWidth > 767) {

    let setMarginTop = () => {
        if(!hasFinishedScrolling) {
            introStickyHeight = document.querySelector(".intro-sticky").offsetHeight;
            document.querySelector(".home-page-content").style.marginTop = `${introStickyHeight}px`;
        }
    }


    if(!hasFinishedScrolling) {
        setMarginTop();
    }

    let setNavToFixed = () => {
        document.querySelector(".nav").style.position = "fixed";
        hasFinishedScrolling = true;
    }


    window.addEventListener("resize", () => {
        setMarginTop();
    })

    window.addEventListener("wheel", () => {
        scrollAnimation !== null && scrollAnimation.kill();
        hasFinishedScrolling = true;
    })

    setTimeout(() => {
        scrollAnimation = gsap.to(window, {scrollTo: window.innerHeight, duration: 4, ease: "expo.inOut"})
    }, 4000)

    window.addEventListener("scroll", () => {
        if(window.scrollY >= window.innerHeight && !hasTriggeredRemoveTopMargin) {
            let navHeight = document.querySelector(".nav").getBoundingClientRect().height;
            document.querySelector(".home-page-content").style.marginTop = 0;
            document.querySelector(".home-carousel-container").style.marginTop = `${navHeight}px`;
            window.scrollTo({ top: - window.innerHeight, behavior: "auto" });
            setNavToFixed();
            hasTriggeredRemoveTopMargin = true;
        }
    })

    window.addEventListener("resize", () => {
        let navHeight = document.querySelector(".nav").getBoundingClientRect().height;
        document.querySelector(".home-carousel-container").style.marginTop = `${navHeight}px`;
    })

}


/* -------------------------------------------------------------------------- */
/*                                 Menu Script                                */
/* -------------------------------------------------------------------------- */


/* --------------------------------- Marquee -------------------------------- */

if(document.querySelector(".nav")) {
    setTimeout(() => {
        let marquee;
        let marqueeWrapper;
        let marqueeItem;

        let animation;

        let initMarquee = (init) => {
            marquee = document.querySelector(".nav-marquee");
            marqueeWrapper = document.querySelector(".nav-marquee-wrapper");
            marqueeItem = document.querySelector(".nav-marquee-item");
    
            marquee.style.width = `${marqueeItem.offsetWidth * 6}px`;
            marqueeWrapper.style.left = `-${marqueeItem.offsetWidth}px`;
    

            if(init) {
                for(let i=0; i < 5; i++) {
                    let newNode = marqueeWrapper.children[0].cloneNode(true);
                    marqueeWrapper.insertBefore(newNode, marqueeWrapper.children[0]);
                }
            }
    
                animation = gsap.set(".nav-marquee-item", {
                    x: (i) => i * marqueeItem.offsetWidth
                });
    
                animation = gsap.to(".nav-marquee-item", {
                    duration: 50,
                    ease: "none",
                    x: `+=${marqueeWrapper.offsetWidth}`, //move each box 500px to right
                    modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % marqueeWrapper.offsetWidth) //force x value to be between 0 and 500 using modulus
                    },
                    repeat: -1
            });
        }

        initMarquee(true);

        let destroyMarquee = () => {
            animation.kill();
            gsap.set(".nav-marquee-item", {
                clearProps: "all"
            });
            marquee.style.width = "initial";
            marqueeWrapper.style.left = "initial";

            animation = null;
        }

        let resizeMarquee = () => {
            destroyMarquee();
            initMarquee(false);
        }

        window.addEventListener("resize", () => resizeMarquee())
    }, 500)

    /* ---------------------------- Nav Hover Sublist --------------------------- */


    let navItems = document.querySelectorAll(".nav__item");

    // Check Hovered Element for .nav__submenu

    function mouseEnterNavItem () {
        if(this.classList.contains("nav__has-submenu")) {
            if(this.classList.contains("nav__item--submenu-open")) {
                this.classList.remove("nav__item--submenu-open")
                this.children[1].classList.remove("nav__sublist--show")
            } else {
                this.classList.add("nav__item--submenu-open")
                this.children[1].classList.add("nav__sublist--show")
            }
        }
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

    if(window.innerWidth > 1150) {
        navItems.forEach(item => item.addEventListener("mouseenter", mouseEnterNavItem));

        navItems.forEach(item => item.addEventListener("mouseleave", mouseLeaveNavItem));
    } else {
        navItems.forEach(item => item.addEventListener("click", mouseEnterNavItem));
    }

    // Mobile Open Menu

    let toggleMobileMenu = () => {
        if(document.querySelector(".nav").classList.contains("nav--open")) {
            document.querySelector(".nav").classList.remove("nav--open")
        } else {
            document.querySelector(".nav").classList.add("nav--open")
        }
    }

    document.querySelector(".nav-mobile-burger").addEventListener("click", toggleMobileMenu);
}

/* -------------------------------------------------------------------------- */
/*                            All Carousels Script                            */
/* -------------------------------------------------------------------------- */

// Init Carousel

var flkty = new Flickity( '.carousel', {
    // options
    cellAlign: 'left',
    contain: true,
    setGallerySize: false,
    autoPlay: 3000,
    imagesLoaded: true,
    prevNextButtons: false,
});

/* -------------------------------------------------------------------------- */
/*                            Home Calendar Script                            */
/* -------------------------------------------------------------------------- */

// Duplicate Dates

if(document.querySelector("body").classList.contains("home-page")) {
    let homeCalendarDays = 31;
    let homeCalendarColRight = document.querySelector(".home-calendar__col-right")

    for(let i=2; i < homeCalendarDays + 1; i++) {
        let newHomeCalendarDayNode = homeCalendarColRight.children[0].cloneNode(true);
        if(i % 3 === 0) {
            newHomeCalendarDayNode.classList.add("home-calendar__day--has-event")
        }

        newHomeCalendarDayNode.children[0].innerText = i;

        newHomeCalendarDayNode.HTML = newHomeCalendarDayNode;
        homeCalendarColRight.appendChild(newHomeCalendarDayNode, homeCalendarColRight.children[0]);
    }

    document.querySelector(".home-calendar__col-right").children

    // Show Modal if Date Hovered

    let allHomeCalendarDays = document.querySelector(".home-calendar__col-right").children;

    let toggleModalVisible = (item) => {
        if(item.classList.contains("home-calendar__day--has-event")) {
            if(item.classList.contains("home-calendar__modal--show")) {
            item.classList.remove("home-calendar__modal--show")
            } else {
                item.classList.add("home-calendar__modal--show")
            }
        }
    }

    Array.from(allHomeCalendarDays).forEach(item => {
        item.addEventListener("mouseenter", () => toggleModalVisible(item));
        item.addEventListener("mouseleave", () => toggleModalVisible(item));
    })
}

/* -------------------------------------------------------------------------- */
/*                       Home Announcement Banner Script                      */
/* -------------------------------------------------------------------------- */

;(() => {
    setTimeout(() => {

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
            x: (i) => i * marqueeItem.offsetWidth + 30
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
    }, 500);
})();

/* -------------------------------------------------------------------------- */
/*                              Home Rows Script                              */
/* -------------------------------------------------------------------------- */

let allHomeEventRows = document.querySelectorAll(".home-event-row");
let allHomeEventRowMarqueeTweens = [];
let tween = null;
let allHomeEventRowsHasTriggeredOnce = false


    let initTitleMarquees = (resize) => {


            allHomeEventRowMarqueeTweens = [];

            if(tween) {
                tween.kill();
            }
            tween = null;


            // if(window.innerWidth > 768) {
            
            let initTitleMarquee = (item) => {
                let marquee = item.children[1].children[1].children[0];
                let marqueeWrapper = item.children[1].children[1].children[0].children[0];
                let marqueeItem = item.children[1].children[1].children[0].children[0].children[0];
                let marqueeItems = marqueeWrapper.children;
            
                if(!item.classList.contains("home-event-row-marquee-active")) {
                    marquee.style.width = `${marqueeItem.offsetWidth * 3}px`;
                    // marqueeWrapper.style.left = `-${marqueeItem.offsetWidth}px`;  
                
                    for(let i=0; i < 3; i++) {
                        let newNode = marqueeWrapper.children[0].cloneNode(true);
                        marqueeWrapper.insertBefore(newNode, marqueeWrapper.children[0]);
                    }      
                }  
                
                gsap.set(marqueeItems, {
                    x: (i) => i * marqueeItem.offsetWidth
                }); 
            
                tween = gsap.to(marqueeItems, {
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

                allHomeEventRowsHasTriggeredOnce = true
            }    
        
        
            let removeAllEventRows = (item) => {
                let marquee = item.children[1].children[1].children[0];
                let marqueeWrapper = item.children[1].children[1].children[0].children[0];
                let marqueeItems = marqueeWrapper.children;

                marquee.style.width = "100%";

                Array.from(marqueeItems).forEach((item, index) => {
                    if(index > 0) {
                        item.remove()
                    }
                })   
            }
        
        
            // Init Marquee on Long Titles
        
            allHomeEventRows.forEach(item => {
                let eventRowTitleWidth = item.children[1].children[1].children[0].children[0].children[0].offsetWidth
        
                if(eventRowTitleWidth > window.innerWidth && window.innerWidth > 768) {
                    initTitleMarquee(item);
                    item.classList.add("home-event-row-marquee-active")
                } else {
                    allHomeEventRowMarqueeTweens.push(null)
                    item.classList.remove("home-event-row-marquee-active")
                    removeAllEventRows(item);
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
                
            }
        
            let deactivateTitleMarquee = (item, index) => {
        
                if(allHomeEventRowMarqueeTweens[index] === null) return;
                
                allHomeEventRowMarqueeTweens[index].timeScale(0.001)
        
            }  
        // }
    }  

initTitleMarquees();

window.addEventListener("resize", () => initTitleMarquees(true))

if(document.querySelector("body").classList.contains("show-page")) {


    /* -------------------------------------------------------------------------- */
    /*                                 Pictograms                                 */
    /* -------------------------------------------------------------------------- */

    let allShowPictograms = document.querySelectorAll(".show-pictogram");

    let togglePictogramLabelVisibility = (item, action) => {

        if(action === "show") {
            item.target.children[1].classList.add("show-pictogram__label--show")
        } else {
            item.target.children[1].classList.remove("show-pictogram__label--show")
        }
    }

    let closePictogramLabels = () => {
        allShowPictograms.forEach(item => item.children[1].classList.remove("show-pictogram__label--show"))
    }

    allShowPictograms.forEach(item => item.addEventListener("mouseenter", (item) => togglePictogramLabelVisibility(item, "show")))

    allShowPictograms.forEach(item => item.addEventListener("mouseleave", (item) => togglePictogramLabelVisibility(item, "hide")))

    window.addEventListener("scroll", () => {
        closePictogramLabels();
    })



    /* -------------------------------------------------------------------------- */
    /*                          Biography Truncate Script                         */
    /* -------------------------------------------------------------------------- */

    let allBiographyTruncates = [];
    let allBiographies = document.querySelector(".show-biographies")?.children;

    let toggleTruncatedBiographyElement = (index) => {
        
        if(allBiographyTruncates[index].isOpen) {
            allBiographyTruncates[index].el.truncateContent();
            allBiographyTruncates[index].isOpen = false;
            document.querySelector(".show-biographies").children[index].classList.remove("biography-is-open");
        } else {
            allBiographyTruncates[index].el.expandContent();
            allBiographyTruncates[index].isOpen = true;
            document.querySelector(".show-biographies").children[index].classList.add("biography-is-open");
        }
    }

    if(allBiographies !== undefined) {
        Array.from(allBiographies).forEach((item, index) => {

            let truncateElement = new Cuttr(allBiographies[index].children[0], {
                //options here
                truncate: 'words',
                length: 50
            });
        
            let truncateElementObject =  {
                el: truncateElement,
                isOpen: false
            }
        
            allBiographyTruncates.push(truncateElementObject);
        
            item.children[1].addEventListener("click", () => toggleTruncatedBiographyElement(index));
        })
    }

    /* -------------------------------------------------------------------------- */
    /*                        Distribution Truncate Script                        */
    /* -------------------------------------------------------------------------- */

    let allDistributionTruncates = [];

    let allDistribution = document.querySelector(".distribution-tile")?.children;

    let toggleTruncatedDistributionElement = (index) => {
        if(allDistributionTruncates[index].isOpen) {
            allDistributionTruncates[index].el.truncateContent();
            allDistributionTruncates[index].isOpen = false;
            document.querySelector(".distribution-tile").children[index].classList.remove("distribution-is-open");
        } else {
            allDistributionTruncates[index].el.expandContent();
            allDistributionTruncates[index].isOpen = true;
            document.querySelector(".distribution-tile").children[index].classList.add("distribution-is-open");
        }

    }

    if(allDistribution !== undefined) {
        Array.from(allDistribution).forEach((item, index) => {

            let truncateElement = new Cuttr(allDistribution[index].children[0], {
                //options here
                truncate: 'words',
                length: 150
            });

            let truncateElementObject =  {
                el: truncateElement,
                isOpen: false
            }

            allDistributionTruncates.push(truncateElementObject);

            item.children[1].addEventListener("click", () => toggleTruncatedDistributionElement(index));
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                               Season Filters                               */
/* -------------------------------------------------------------------------- */

if(document.querySelector("body").classList.contains("season-page")) {

    let seasonFilters = document.querySelector(".season-filters");

    let removeAllActiveFilters = () => {
        Array.from(seasonFilters.children).forEach(item => item.classList.remove("season-filter--active"))
    }
    
    let toggleSelectedFilter = (item) => {
        if(item.classList.contains("season-filter--active")) {
            return;
        } else {
            removeAllActiveFilters();
            item.classList.add("season-filter--active")
        }
    }
    
    Array.from(seasonFilters.children).forEach(item => item.addEventListener("click", () => toggleSelectedFilter(item)))

}

});