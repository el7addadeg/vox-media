document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");

    if (cursor && ring && window.innerWidth > 600) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";

        });

        function animateCursor() {

            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            ring.style.left = ringX + "px";
            ring.style.top = ringY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();

        /* Cursor Hover */

        document
            .querySelectorAll(
                "a, button, .service-card, .work-card, .partner-logo"
            )
            .forEach(item => {

                item.addEventListener("mouseenter", () => {

                    ring.style.width = "55px";
                    ring.style.height = "55px";

                });

                item.addEventListener("mouseleave", () => {

                    ring.style.width = "35px";
                    ring.style.height = "35px";

                });

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

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

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

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 250;

            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });


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

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle(
                "mobile-open"
            );

        });

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

                    const href =
                        this.getAttribute("href");

                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }

                    const target =
                        document.querySelector(
                            href
                        );

                    if (!target) {

                        return;

                    }

                    e.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",
                        block: "start"

                    });

                }
            );

        });


    /* =====================================================
       PARTNERS MARQUEE
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
       Filters + YouTube Lazy Loading + Modal
    ===================================================== */

    const workCards =
        document.querySelectorAll(
            ".work-card"
        );

    const workFilters =
        document.querySelectorAll(
            ".work-filter"
        );

    const workModal =
        document.getElementById(
            "workModal"
        );

    const workModalClose =
        document.getElementById(
            "workModalClose"
        );

    const workModalBackdrop =
        workModal
            ? workModal.querySelector(
                ".work-modal-backdrop"
            )
            : null;

    const workModalVideo =
        workModal
            ? workModal.querySelector(
                ".work-modal-video"
            )
            : null;

    const workModalTitle =
        document.getElementById(
            "workModalTitle"
        );

    const workModalType =
        document.getElementById(
            "workModalType"
        );

    const workYoutubeLink =
        document.getElementById(
            "workYoutubeLink"
        );


    /* =====================================================
       YOUTUBE THUMBNAILS
    ===================================================== */

    workCards.forEach(card => {

        const media =
            card.querySelector(
                ".work-media"
            );

        const image =
            media
                ? media.querySelector("img")
                : null;

        const videoId =
            media
                ? media.dataset.video
                : null;

        if (!image || !videoId) return;

        image.addEventListener(
            "error",
            () => {

                if (!image.dataset.fallback) {

                    image.dataset.fallback = "1";

                    image.src =
                        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                }

            },
            {
                once: true
            }
        );

    });


    /* =====================================================
       WORK FILTERS
       Cards can belong to more than one category
    ===================================================== */

    function applyWorkFilter(selected) {

        workCards.forEach(card => {

            const categories =
                (
                    card.dataset.category || ""
                )
                    .split(/\s+/)
                    .filter(Boolean);

            const show =
                selected === "all" ||
                categories.includes(selected);

            card.classList.toggle(
                "is-hidden",
                !show
            );

        });

    }


    workFilters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const selected =
                    filter.dataset.filter ||
                    "all";

                workFilters.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });

                filter.classList.add(
                    "active"
                );

                applyWorkFilter(
                    selected
                );

            }
        );

    });


    /* =====================================================
       OPEN PROJECT
       YouTube is loaded ONLY after clicking
    ===================================================== */

    function openWork(button) {

        if (
            !button ||
            !workModal ||
            !workModalVideo
        ) {

            return;

        }

        const videoId =
            button.dataset.video;

        if (!videoId) return;

        const title =
            button.dataset.title ||
            "VOX Media";

        const type =
            button.dataset.type ||
            "PROJECT";

        const client =
            button.dataset.client ||
            title;


        if (workModalTitle) {

            workModalTitle.textContent =
                client;

        }


        if (workModalType) {

            workModalType.textContent =
                type.toUpperCase();

        }


        if (workYoutubeLink) {

            workYoutubeLink.href =
                `https://www.youtube.com/watch?v=${videoId}`;

        }


        /* =================================================
           LAZY LOAD YOUTUBE
        ================================================= */

        workModalVideo.innerHTML = `

            <div
                class="work-video-loader"
                id="workVideoLoader"
                aria-hidden="true"
            >
                <span></span>
            </div>

            <iframe
                src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="${String(title).replace(/"/g, "&quot;")}"
                loading="eager"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin">
            </iframe>

        `;


        /* =================================================
           OPEN MODAL
        ================================================= */

        workModal.classList.add(
            "active"
        );

        workModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "work-modal-open"
        );

        document.body.style.overflow =
            "hidden";


        /* Focus iframe */

        requestAnimationFrame(() => {

            const iframe =
                workModalVideo.querySelector(
                    "iframe"
                );

            if (iframe) {

                iframe.focus({
                    preventScroll: true
                });

            }

        });

    }


    /* =====================================================
       PROJECT CLICK EVENTS
    ===================================================== */

    workCards.forEach(card => {

        const media =
            card.querySelector(
                ".work-media"
            );

        const openButton =
            card.querySelector(
                ".work-open"
            );


        /* Click thumbnail */

        if (media) {

            media.addEventListener(
                "click",
                () => {

                    openWork(
                        media
                    );

                }
            );

        }


        /* Click arrow/button */

        if (openButton) {

            openButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    openWork(
                        openButton
                    );

                }
            );

        }

    });


    /* =====================================================
       CLOSE PROJECT
    ===================================================== */

    function closeWork() {

        if (!workModal) return;


        workModal.classList.remove(
            "active"
        );

        workModal.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
           Destroy iframe completely
           so YouTube stops immediately.
        */

        if (workModalVideo) {

            workModalVideo.innerHTML =
                "";

        }


        document.body.classList.remove(
            "work-modal-open"
        );

        document.body.style.overflow =
            "";

    }


    /* Close button */

    if (workModalClose) {

        workModalClose.addEventListener(
            "click",
            closeWork
        );

    }


    /* Close backdrop */

    if (workModalBackdrop) {

        workModalBackdrop.addEventListener(
            "click",
            closeWork
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                workModal &&
                workModal.classList.contains(
                    "active"
                )
            ) {

                closeWork();

            }

        }
    );


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    workCards.forEach(card => {

        const media =
            card.querySelector(
                ".work-media"
            );

        if (!media) return;


        media.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openWork(
                        media
                    );

                }

            }
        );

    });


    /* =====================================================
       IMAGE ERROR PROTECTION
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        if (partnersTrack) {

            partnersTrack.style.animationPlayState =
                "paused";

        }

    }

});
