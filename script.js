document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CUSTOM CURSOR
    ========================= */

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


        document.querySelectorAll("a, button, .service-card, .client-card").forEach(item => {

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


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section-head, .service-card, .client-card, .about-content, .about-visual, .contact-inner"
    );

    revealElements.forEach(el => {
        el.classList.add("reveal");
    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));


    /* =========================
       NAV ACTIVE STATE
    ========================= */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 250;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

        });

    }


    /* =========================
       PARALLAX HERO
    ========================= */

    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual && window.innerWidth > 900) {

        document.addEventListener("mousemove", (e) => {

            const x = (window.innerWidth / 2 - e.clientX) / 80;
            const y = (window.innerHeight / 2 - e.clientY) / 80;

            heroVisual.style.transform =
                `translate3d(${x}px, ${y}px, 0)`;

        });

    }


    /* =========================
       SMOOTH ANCHOR
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});
