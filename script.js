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

        const hoverElements = document.querySelectorAll(
            "a, button, .service-card, .client-card, .footer-project-btn"
        );

        hoverElements.forEach(item => {

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

    const revealElements = document.querySelectorAll(
        ".section-head, " +
        ".service-card, " +
        ".client-card, " +
        ".about-content, " +
        ".about-visual, " +
        ".contact-inner, " +
        ".footer-brand, " +
        ".footer-column, " +
        ".footer-bottom"
    );


    revealElements.forEach(el => {

        el.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });


        revealElements.forEach(el => {

            observer.observe(el);

        });

    } else {

        revealElements.forEach(el => {

            el.classList.add("visible");

        });

    }


    /* =====================================================
       NAV ACTIVE STATE
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");


    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 250;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + current) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");


    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

            menuBtn.classList.toggle("active");

        });


        /* Close menu after clicking a link */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

                menuBtn.classList.remove("active");

            });

        });

    }


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const heroVisual = document.querySelector(".hero-visual");


    if (heroVisual && window.innerWidth > 900) {

        let ticking = false;


        document.addEventListener("mousemove", (e) => {

            if (ticking) return;

            ticking = true;


            requestAnimationFrame(() => {

                const x =
                    (window.innerWidth / 2 - e.clientX) / 80;

                const y =
                    (window.innerHeight / 2 - e.clientY) / 80;


                heroVisual.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;


                ticking = false;

            });

        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const href = this.getAttribute("href");

            if (!href || href === "#") return;


            const target =
                document.querySelector(href);


            if (!target) return;


            e.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop = document.querySelector(".back-top");


    if (backTop) {

        backTop.addEventListener("click", (e) => {

            e.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /* =====================================================
       PARTNERS / LOGOS MARQUEE
       لو عندك شريط اللوجوهات المتحرك
    ===================================================== */

    const partnerTrack =
        document.querySelector(".partners-track");


    if (partnerTrack) {

        partnerTrack.addEventListener(
            "mouseenter",
            () => {

                partnerTrack.style.animationPlayState =
                    "paused";

            }
        );


        partnerTrack.addEventListener(
            "mouseleave",
            () => {

                partnerTrack.style.animationPlayState =
                    "running";

            }
        );

    }


    /* =====================================================
       PREVENT IMAGE DRAG
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("dragstart", (e) => {

            e.preventDefault();

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".header");


    if (header) {

        function updateHeader() {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }


        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );


        updateHeader();

    }


    /* =====================================================
       DISABLE PARALLAX ON RESIZE / MOBILE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth <= 900 && heroVisual) {

            heroVisual.style.transform = "none";

        }

    });


});
