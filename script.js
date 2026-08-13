document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const ring =
        document.querySelector(".cursor-ring");


    if (
        cursor &&
        ring &&
        window.innerWidth > 600
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            (e) => {

                mouseX = e.clientX;
                mouseY = e.clientY;

                cursor.style.left =
                    mouseX + "px";

                cursor.style.top =
                    mouseY + "px";

            }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.12;

            ringY +=
                (mouseY - ringY) * 0.12;


            ring.style.left =
                ringX + "px";

            ring.style.top =
                ringY + "px";


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        document
            .querySelectorAll(
                "a, button, .service-card, .work-card, .partner-logo"
            )
            .forEach(item => {

                item.addEventListener(
                    "mouseenter",
                    () => {

                        ring.style.width =
                            "55px";

                        ring.style.height =
                            "55px";

                    }
                );


                item.addEventListener(
                    "mouseleave",
                    () => {

                        ring.style.width =
                            "35px";

                        ring.style.height =
                            "35px";

                    }
                );

            });

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-head,
            .service-card,
            .work-card,
            .about-content,
            .about-visual,
            .contact-inner,
            .partners-head
            `
        );


    revealElements.forEach(el => {

        el.classList.add("reveal");

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(el => {

        observer.observe(el);

    });



    /* =====================================================
       NAV ACTIVE STATE
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    window.addEventListener(
        "scroll",
        () => {

            let current = "";


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 250;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) === "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }
    );



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.querySelector(
            ".menu-btn"
        );


    const nav =
        document.querySelector(
            ".nav"
        );


    if (
        menuBtn &&
        nav
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "mobile-open"
                );

            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open"
                        );

                    }
                );

            });

    }



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.innerWidth > 900
    ) {

        document.addEventListener(
            "mousemove",
            (e) => {

                const x =
                    (
                        window.innerWidth / 2 -
                        e.clientX
                    ) / 80;


                const y =
                    (
                        window.innerHeight / 2 -
                        e.clientY
                    ) / 80;


                heroVisual.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;

            }
        );

    }



    /* =====================================================
       SMOOTH ANCHOR
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(e) {

                    const target =
                        document.querySelector(
                            this.getAttribute(
                                "href"
                            )
                        );


                    if (!target) return;


                    e.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =====================================================
       WORK FILTER
    ===================================================== */

    const workFilters =
        document.querySelectorAll(
            ".work-filter"
        );


    const workCards =
        document.querySelectorAll(
            ".work-card"
        );


    if (
        workFilters.length &&
        workCards.length
    ) {

        workFilters.forEach(filter => {

            filter.addEventListener(
                "click",
                () => {

                    const category =
                        filter.getAttribute(
                            "data-filter"
                        );


                    /* Active filter */

                    workFilters.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                    filter.classList.add(
                        "active"
                    );


                    /* Filter cards */

                    workCards.forEach(card => {

                        const cardCategory =
                            card.getAttribute(
                                "data-category"
                            );


                        if (
                            category === "all" ||
                            cardCategory === category
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    });

                }
            );

        });

    }



    /* =====================================================
       PARTNERS MARQUEE PAUSE ON HOVER
    ===================================================== */

    const partnersTrack =
        document.querySelector(
            ".partners-track"
        );


    if (partnersTrack) {

        partnersTrack.addEventListener(
            "mouseenter",
            () => {

                partnersTrack.style
                    .animationPlayState =
                    "paused";

            }
        );


        partnersTrack.addEventListener(
            "mouseleave",
            () => {

                partnersTrack.style
                    .animationPlayState =
                    "running";

            }
        );

    }


});
