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

    /* =====================================================
   VOX WORK
   FILTERS + YOUTUBE LAZY MODAL
===================================================== */

const workCards = document.querySelectorAll(".work-card");
const workFilters = document.querySelectorAll(".work-filter");

const videoModal = document.getElementById("videoModal");
const videoModalClose = document.getElementById("videoModalClose");
const videoModalBackdrop = document.querySelector(".video-modal-backdrop");

const youtubeContainer =
    document.getElementById("youtubeContainer");

const modalTitle =
    document.getElementById("modalTitle");

const modalService =
    document.getElementById("modalService");


/* =====================================================
   YOUTUBE THUMBNAIL FALLBACK
===================================================== */

workCards.forEach(card => {

    const videoId = card.dataset.youtube;
    const thumbnail = card.querySelector(".work-thumbnail");

    if (!videoId || !thumbnail) return;

    /*
       لو maxresdefault مش موجود،
       استخدم hqdefault تلقائياً.
    */

    thumbnail.addEventListener("error", () => {

        thumbnail.src =
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    }, {
        once: true
    });

});


/* =====================================================
   FILTERS
===================================================== */

workFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        const selected =
            filter.dataset.filter;


        /* ACTIVE BUTTON */

        workFilters.forEach(btn => {

            btn.classList.remove("active");

        });

        filter.classList.add("active");


        /* FILTER CARDS */

        workCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                selected === "all" ||
                category === selected
            ) {

                card.classList.remove("is-hidden");

                requestAnimationFrame(() => {

                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";

                });

            } else {

                card.style.opacity = "0";
                card.style.transform = "translateY(15px)";

                setTimeout(() => {

                    card.classList.add("is-hidden");

                }, 250);

            }

        });

    });

});


/* =====================================================
   OPEN VIDEO MODAL
===================================================== */

function openVideo(card) {

    const videoId =
        card.dataset.youtube;

    const title =
        card.dataset.title || "VOX Media";

    const service =
        card.dataset.service || "VIDEO";


    if (!videoId) return;


    /* UPDATE MODAL TEXT */

    modalTitle.textContent = title;

    modalService.textContent =
        service.toUpperCase();


    /*
       IMPORTANT:
       YouTube iframe is created ONLY NOW.

       This means the page does NOT load
       YouTube players for every card.
    */

    youtubeContainer.innerHTML = `

        <iframe
            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
            title="${title}"
            loading="eager"
            allow="
                autoplay;
                encrypted-media;
                picture-in-picture;
                fullscreen
            "
            allowfullscreen>
        </iframe>

    `;


    /* SHOW MODAL */

    videoModal.classList.add("active");

    videoModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /* LOCK PAGE SCROLL */

    document.body.style.overflow = "hidden";

}


/* =====================================================
   CARD CLICK
===================================================== */

workCards.forEach(card => {

    card.addEventListener("click", () => {

        openVideo(card);

    });

});


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeVideo() {

    videoModal.classList.remove("active");

    videoModal.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
       Destroy iframe completely.

       This stops YouTube playback
       and releases resources.
    */

    youtubeContainer.innerHTML = "";


    /* RESTORE SCROLL */

    document.body.style.overflow = "";

}


/* CLOSE BUTTON */

if (videoModalClose) {

    videoModalClose.addEventListener(
        "click",
        closeVideo
    );

}


/* BACKDROP CLICK */

if (videoModalBackdrop) {

    videoModalBackdrop.addEventListener(
        "click",
        closeVideo
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        videoModal.classList.contains("active")
    ) {

        closeVideo();

    }

});

});
