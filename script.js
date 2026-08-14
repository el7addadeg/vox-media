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


                    /*
                       Ignore empty "#"
                    */

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
       VOX WORK — FIXED
       Filters + YouTube Lazy Loading + Modal
    ===================================================== */

    const workCards = document.querySelectorAll(".work-card");
    const workFilters = document.querySelectorAll(".work-filter");

    const workModal = document.getElementById("workModal");
    const workModalClose = document.getElementById("workModalClose");
    const workModalBackdrop = workModal
        ? workModal.querySelector(".work-modal-backdrop")
        : null;
    const workModalVideo = workModal
        ? workModal.querySelector(".work-modal-video")
        : null;
    const workModalTitle = document.getElementById("workModalTitle");
    const workModalType = document.getElementById("workModalType");
    const workYoutubeLink = document.getElementById("workYoutubeLink");

    let activeWorkCard = null;

    /* =====================================================
       YOUTUBE THUMBNAILS
    ===================================================== */

    workCards.forEach(card => {
        const media = card.querySelector(".work-media");
        const image = media ? media.querySelector("img") : null;
        const videoId = media ? media.dataset.video : null;

        if (!image || !videoId) return;

        image.addEventListener("error", () => {
            if (!image.dataset.fallback) {
                image.dataset.fallback = "1";
                image.src = `https://i.ytimg.com/vi/${videoId}/default.jpg`;
            }
        }, { once: true });
    });

    /* =====================================================
       FILTERS
       Cards can belong to more than one category.
    ===================================================== */

    function applyWorkFilter(selected) {
        workCards.forEach(card => {
            const categories = (card.dataset.category || "")
                .split(/\s+/)
                .filter(Boolean);

            const show = selected === "all" || categories.includes(selected);

            card.classList.toggle("is-hidden", !show);
        });
    }

    workFilters.forEach(filter => {
        filter.addEventListener("click", () => {
            const selected = filter.dataset.filter || "all";

            workFilters.forEach(btn => btn.classList.remove("active"));
            filter.classList.add("active");

            applyWorkFilter(selected);
        });
    });

    /* =====================================================
       OPEN PROJECT
       Read data from the actual clicked .work-media / .work-open button.
    ===================================================== */

    function openWork(button) {
        if (!button || !workModal || !workModalVideo) return;

        const videoId = button.dataset.video;
        if (!videoId) return;

        const title = button.dataset.title || "VOX Media";
        const type = button.dataset.type || "PROJECT";
        const client = button.dataset.client || title;

        activeWorkCard = button.closest(".work-card");

        if (workModalTitle) workModalTitle.textContent = client;
        if (workModalType) workModalType.textContent = type.toUpperCase();
        if (workYoutubeLink) {
            workYoutubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        }

        /* Lazy-load YouTube ONLY after the user clicks. */
        workModalVideo.innerHTML = `
            <div class="work-video-loader" id="workVideoLoader" aria-hidden="true">
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

        workModal.classList.add("active");
        workModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("work-modal-open");
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            const iframe = workModalVideo.querySelector("iframe");
            const loader = workModalVideo.querySelector(".work-video-loader");

            if (iframe) {
                /* Hide the black loading layer as soon as YouTube finishes loading.
                   The old version left this layer above the iframe, so the video
                   could play audio while its picture stayed hidden. */
                iframe.addEventListener("load", () => {
                    if (loader) loader.remove();
                    iframe.focus({ preventScroll: true });
                }, { once: true });

                /* Fallback in case the browser has already completed the iframe load. */
                setTimeout(() => {
                    if (loader && iframe.contentWindow) loader.remove();
                }, 4500);
            }
        });
    }

    /* Click only the media/open controls — not the entire card. */
    workCards.forEach(card => {
        const media = card.querySelector(".work-media");
        const openButton = card.querySelector(".work-open");

        if (media) media.addEventListener("click", () => openWork(media));
        if (openButton) openButton.addEventListener("click", () => openWork(openButton));
    });

    /* =====================================================
       CLOSE PROJECT
    ===================================================== */

    function closeWork() {
        if (!workModal) return;

        workModal.classList.remove("active");
        workModal.setAttribute("aria-hidden", "true");

        /* Destroy iframe completely so YouTube stops immediately. */
        if (workModalVideo) workModalVideo.innerHTML = "";

        document.body.classList.remove("work-modal-open");
        document.body.style.overflow = "";
        activeWorkCard = null;
    }

    if (workModalClose) workModalClose.addEventListener("click", closeWork);
    if (workModalBackdrop) workModalBackdrop.addEventListener("click", closeWork);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && workModal && workModal.classList.contains("active")) {
            closeWork();
        }
    });

    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    workCards.forEach(card => {
        const media = card.querySelector(".work-media");
        if (!media) return;

        media.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openWork(media);
            }
        });
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

        /*
           Disable JS-heavy motion where possible.
        */

        if (partnersTrack) {

            partnersTrack.style.animationPlayState =
                "paused";

        }

    }

});

/* =====================================================
   VOX DESIGN GALLERY
   Filters + Image Lightbox
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const designCards = document.querySelectorAll(".design-card");
    const designFilters = document.querySelectorAll(".design-filter");
    const designModal = document.getElementById("designModal");
    const designModalClose = document.getElementById("designModalClose");
    const designModalBackdrop = designModal
        ? designModal.querySelector(".design-modal-backdrop")
        : null;
    const designModalImage = document.getElementById("designModalImage");
    const designModalTitle = document.getElementById("designModalTitle");
    const designModalType = document.getElementById("designModalType");

    if (!designCards.length) return;

    designFilters.forEach(filter => {
        filter.addEventListener("click", () => {
            const selected = filter.dataset.designFilter || "all";

            designFilters.forEach(btn => btn.classList.remove("active"));
            filter.classList.add("active");

            designCards.forEach(card => {
                const category = card.dataset.designCategory || "";
                card.classList.toggle(
                    "is-hidden",
                    selected !== "all" && category !== selected
                );
            });
        });
    });

    function openDesign(card) {
        if (!designModal) return;

        const image = card.dataset.image;
        const title = card.dataset.title || "VOX Design";
        const type = card.dataset.type || "DESIGN";

        if (!image) return;

        if (designModalImage) {
            designModalImage.src = image;
            designModalImage.alt = title;
        }

        if (designModalTitle) designModalTitle.textContent = title;
        if (designModalType) designModalType.textContent = type.toUpperCase();

        designModal.classList.add("active");
        designModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("work-modal-open");
        document.body.style.overflow = "hidden";
    }

    function closeDesign() {
        if (!designModal) return;

        designModal.classList.remove("active");
        designModal.setAttribute("aria-hidden", "true");

        if (designModalImage) designModalImage.src = "";

        if (!document.querySelector(".work-modal.active")) {
            document.body.classList.remove("work-modal-open");
            document.body.style.overflow = "";
        }
    }

    designCards.forEach(card => {
        card.addEventListener("click", () => openDesign(card));
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openDesign(card);
            }
        });
    });

    if (designModalClose) designModalClose.addEventListener("click", closeDesign);
    if (designModalBackdrop) designModalBackdrop.addEventListener("click", closeDesign);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && designModal?.classList.contains("active")) {
            closeDesign();
        }
    });

    document.querySelectorAll(".design-image img").forEach(img => {
        img.addEventListener("error", () => {
            img.classList.add("image-error");
            img.removeAttribute("src");
        }, { once: true });
    });
});
