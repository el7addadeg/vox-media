document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileClose = document.querySelector(".mobile-close");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    }


    /* =========================
       CLOSE MOBILE MENU
       WHEN CLICKING A LINK
    ========================= */

    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });


    /* =========================
       SMOOTH SCROLL
    ========================= */

    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = 70;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(
        ".service-card, .work-card, .client-logo, .about-content, .about-image"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                this.querySelector('[name="name"]').value.trim();

            const phone =
                this.querySelector('[name="phone"]').value.trim();

            const company =
                this.querySelector('[name="company"]').value.trim();

            const message =
                this.querySelector('[name="message"]').value.trim();


            if (!name || !phone || !message) {

                alert("من فضلك املأ البيانات المطلوبة.");

                return;

            }


            const whatsappMessage =
                `مرحباً VOX Media%0A%0A` +
                `الاسم: ${encodeURIComponent(name)}%0A` +
                `الهاتف: ${encodeURIComponent(phone)}%0A` +
                `الشركة: ${encodeURIComponent(company || "غير محدد")}%0A` +
                `المشروع:%0A${encodeURIComponent(message)}`;


            const whatsappURL =
                `https://wa.me/201069952664?text=${whatsappMessage}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav a");


    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =========================
       PREVENT IMAGE DRAG
    ========================= */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener(
            "dragstart",
            event => event.preventDefault()
        );

    });

});document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileClose = document.querySelector(".mobile-close");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    }


    /* =========================
       CLOSE MOBILE MENU
       WHEN CLICKING A LINK
    ========================= */

    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });


    /* =========================
       SMOOTH SCROLL
    ========================= */

    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = 70;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(
        ".service-card, .work-card, .client-logo, .about-content, .about-image"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                this.querySelector('[name="name"]').value.trim();

            const phone =
                this.querySelector('[name="phone"]').value.trim();

            const company =
                this.querySelector('[name="company"]').value.trim();

            const message =
                this.querySelector('[name="message"]').value.trim();


            if (!name || !phone || !message) {

                alert("من فضلك املأ البيانات المطلوبة.");

                return;

            }


            const whatsappMessage =
                `مرحباً VOX Media%0A%0A` +
                `الاسم: ${encodeURIComponent(name)}%0A` +
                `الهاتف: ${encodeURIComponent(phone)}%0A` +
                `الشركة: ${encodeURIComponent(company || "غير محدد")}%0A` +
                `المشروع:%0A${encodeURIComponent(message)}`;


            const whatsappURL =
                `https://wa.me/201069952664?text=${whatsappMessage}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav a");


    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =========================
       PREVENT IMAGE DRAG
    ========================= */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener(
            "dragstart",
            event => event.preventDefault()
        );

    });

});
