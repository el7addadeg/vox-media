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

        document.querySelectorAll("a, button, .service-card, .work-card, .partner-logo, .design-card").forEach(item => {
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
        `.section-head, .service-card, .work-card, .about-content, .about-visual, .contact-inner, .partners-head`
    );

    revealElements.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));

    /* =====================================================
       HEADER & NAV ACTIVE STATE
    ===================================================== */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

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

    /* =====================================================
       FULL-SCREEN MOBILE MENU INTERACTION
    ===================================================== */
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("mobile-open");
            menuBtn.classList.toggle("is-active", isOpen);
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("mobile-open");
                menuBtn.classList.remove("is-active");
                document.body.style.overflow = "";
            });
        });
    }

    /* =====================================================
       SMOOTH ANCHOR
    ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* =====================================================
       PARTNERS MARQUEE
    ===================================================== */
    const partnersTrack = document.querySelector(".partners-track");
    if (partnersTrack) {
        partnersTrack.addEventListener("mouseenter", () => {
            partnersTrack.style.animationPlayState = "paused";
        });
        partnersTrack.addEventListener("mouseleave", () => {
            partnersTrack.style.animationPlayState = "running";
        });
    }

    /* =====================================================
       VOX WORK — ULTRA-FAST YOUTUBE MODAL
    ===================================================== */
    const workCards = document.querySelectorAll(".work-card");
    const workFilters = document.querySelectorAll(".work-filter");
    const workModal = document.getElementById("workModal");
    const workModalClose = document.getElementById("workModalClose");
    const workModalBackdrop = workModal ? workModal.querySelector(".work-modal-backdrop") : null;
    const workModalVideo = workModal ? workModal.querySelector(".work-modal-video") : null;
    const workModalTitle = document.getElementById("workModalTitle");
    const workModalType = document.getElementById("workModalType");
    const workYoutubeLink = document.getElementById("workYoutubeLink");

    /* Thumbnails Optimization */
    workCards.forEach(card => {
        const media = card.querySelector(".work-media");
        const image = media ? media.querySelector("img") : null;
        const videoId = media ? media.dataset.video : null;

        if (!image || !videoId) return;

        if (!image.dataset.thumbReady) {
            image.dataset.thumbReady = "1";
            image.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }

        image.addEventListener("error", () => {
            image.src = `https://i.ytimg.com/vi/${videoId}/default.jpg`;
        }, { once: true });
    });

    /* Work Filters */
    function applyWorkFilter(selected) {
        workCards.forEach(card => {
            const categories = (card.dataset.category || "").split(/\s+/).filter(Boolean);
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

    /* Open Video Modal */
    function openWork(button) {
        if (!button || !workModal || !workModalVideo) return;

        const videoId = button.dataset.video;
        if (!videoId) return;

        const title = button.dataset.title || "VOX Media";
        const type = button.dataset.type || "PROJECT";
        const client = button.dataset.client || title;

        if (workModalTitle) workModalTitle.textContent = client;
        if (workModalType) workModalType.textContent = type.toUpperCase();
        if (workYoutubeLink) {
            workYoutubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        }

        /* Cleanest YouTube player parameters */
        workModalVideo.innerHTML = `
            <div class="work-video-loader" id="workVideoLoader" aria-hidden="true">
                <span></span>
            </div>
            <iframe
                src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
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

        const iframe = workModalVideo.querySelector("iframe");
        const loader = workModalVideo.querySelector(".work-video-loader");
        if (iframe) {
            iframe.addEventListener("load", () => {
                if (loader) loader.remove();
                iframe.focus({ preventScroll: true });
            }, { once: true });

            setTimeout(() => {
                if (loader) loader.remove();
            }, 3000);
        }
    }

    /* Close Video Modal */
    function closeWork() {
        if (!workModal) return;
        workModal.classList.remove("active");
        workModal.setAttribute("aria-hidden", "true");

        if (workModalVideo) workModalVideo.innerHTML = "";

        document.body.classList.remove("work-modal-open");
        document.body.style.overflow = "";
    }

    workCards.forEach(card => {
        const media = card.querySelector(".work-media");
        const openButton = card.querySelector(".work-open");
        if (media) media.addEventListener("click", () => openWork(media));
        if (openButton) openButton.addEventListener("click", () => openWork(openButton));
    });

    if (workModalClose) workModalClose.addEventListener("click", closeWork);
    if (workModalBackdrop) workModalBackdrop.addEventListener("click", closeWork);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && workModal && workModal.classList.contains("active")) {
            closeWork();
        }
    });

});

/* =====================================================
   DESIGN GALLERY LIGHTBOX
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const designCards = document.querySelectorAll(".design-card");
    const designFilters = document.querySelectorAll(".design-filter");
    const designModal = document.getElementById("designModal");
    const designModalClose = document.getElementById("designModalClose");
    const designModalBackdrop = designModal ? designModal.querySelector(".design-modal-backdrop") : null;
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
                card.classList.toggle("is-hidden", selected !== "all" && category !== selected);
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

        if (!document.querySelector(".work-modal.active") && !document.querySelector(".quote-modal.active")) {
            document.body.classList.remove("work-modal-open");
            document.body.style.overflow = "";
        }
    }

    designCards.forEach(card => {
        card.addEventListener("click", () => openDesign(card));
    });

    if (designModalClose) designModalClose.addEventListener("click", closeDesign);
    if (designModalBackdrop) designModalBackdrop.addEventListener("click", closeDesign);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && designModal && designModal.classList.contains("active")) {
            closeDesign();
        }
    });
});

/* =====================================================
   INTERACTIVE QUOTE MODAL ENGINE
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const quoteModal = document.getElementById("quoteModal");
    const quoteModalClose = document.getElementById("quoteModalClose");
    const quoteModalBackdrop = document.getElementById("quoteModalBackdrop");
    const quoteForm = document.getElementById("quoteForm");

    if (!quoteModal) return;

    // Open Quote Modal from any trigger button
    document.querySelectorAll('.header-cta, .open-quote-modal, .footer-cta-btn').forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openQuoteModal();
        });
    });

    function openQuoteModal() {
        quoteModal.classList.add("active");
        quoteModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeQuoteModal() {
        quoteModal.classList.remove("active");
        quoteModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (quoteModalClose) quoteModalClose.addEventListener("click", closeQuoteModal);
    if (quoteModalBackdrop) quoteModalBackdrop.addEventListener("click", closeQuoteModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && quoteModal.classList.contains("active")) {
            closeQuoteModal();
        }
    });

    // Step Navigation
    const steps = quoteModal.querySelectorAll(".quote-step");
    
    quoteModal.querySelectorAll(".next-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const nextStep = btn.dataset.next;
            steps.forEach(s => s.classList.remove("active"));
            quoteModal.querySelector(`.quote-step[data-step="${nextStep}"]`).classList.add("active");
        });
    });

    quoteModal.querySelectorAll(".prev-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const prevStep = btn.dataset.prev;
            steps.forEach(s => s.classList.remove("active"));
            quoteModal.querySelector(`.quote-step[data-step="${prevStep}"]`).classList.add("active");
        });
    });

    // Handle Form Submit to WhatsApp
    if (quoteForm) {
        quoteForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const selectedServices = Array.from(quoteForm.querySelectorAll('input[name="services"]:checked'))
                .map(cb => "• " + cb.value)
                .join("\n");

            const budget = quoteForm.querySelector('input[name="budget"]:checked')?.value || "غير محدد";
            const goal = document.getElementById("projectGoal").value.trim() || "لم يتم التحديد";
            const name = document.getElementById("clientName").value.trim();
            const brand = document.getElementById("brandName").value.trim() || "غير محدد";
            const phone = document.getElementById("clientPhone").value.trim();

            if (!name || !phone) {
                alert("يرجى إدخال الاسم ورقم الهاتف.");
                return;
            }

            const message = `👋 مرحباً VOX Media، أرغب في طلب عرض سعر لمشروع جديد:\n\n` +
                `👤 *الاسم:* ${name}\n` +
                `🏢 *البراند / النشاط:* ${brand}\n` +
                `📞 *رقم التواصل:* ${phone}\n\n` +
                `🎯 *الخدمات المطلوبة:*\n${selectedServices || "• لم يتم تحديد خدمة بعينها"}\n\n` +
                `💰 *الميزانية المقترحة:* ${budget}\n` +
                `📝 *تفاصيل الفكرة:* ${goal}`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/201069952664?text=${encodedMessage}`;

            window.open(whatsappUrl, "_blank");
            closeQuoteModal();
            quoteForm.reset();
            steps.forEach(s => s.classList.remove("active"));
            quoteModal.querySelector(`.quote-step[data-step="1"]`).classList.add("active");
        });
    }
});

/* =====================================================
   FLOATING WHATSAPP VISIBILITY ON SCROLL
===================================================== */
window.addEventListener("scroll", () => {
    const floatingBtn = document.querySelector(".floating-whatsapp");
    if (!floatingBtn) return;

    if (window.scrollY > 250) {
        floatingBtn.classList.add("visible");
    } else {
        floatingBtn.classList.remove("visible");
    }
});
/* =====================================================
   ANIMATED NUMBER COUNTERS (INTERSECTION OBSERVER)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const statElements = document.querySelectorAll(".stat-number[data-target]");
    if (!statElements.length) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || "";
                const duration = 1800; // مدة الحركة بالمللي ثانية
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // حركة انسيابية EaseOutQuad
                    const easeProgress = 1 - (1 - progress) * (1 - progress);
                    const currentCount = Math.floor(easeProgress * target);

                    el.textContent = currentCount + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target + suffix;
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(el); // يشغل العد مرة واحدة فقط
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => counterObserver.observe(el));
});
/* =====================================================
   FAQ ACCORDION
===================================================== */
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const parent = question.parentElement;
        
        // إغلاق أي عنصر مفتوح (اختياري)
        document.querySelectorAll(".faq-item").forEach(item => {
            if (item !== parent) item.classList.remove("active");
        });

        parent.classList.toggle("active");
    });
});
