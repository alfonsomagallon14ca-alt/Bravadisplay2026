/* =====================================================
   MERACHO x BRAVA PIZZA
   Vanilla JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Smooth scroll para navegación interna.
     * Se hace mediante JS para compensar la barra sticky.
     */

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const header = document.querySelector(".site-header");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

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


    /*
     * Pausar videos cuando están fuera de pantalla.
     *
     * Esto evita consumir batería/datos innecesariamente
     * en celulares y mantiene la página ligera.
     */

    const videos = document.querySelectorAll("video");

    if ("IntersectionObserver" in window) {

        const videoObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    const video = entry.target;

                    if (entry.isIntersecting) {

                        const playPromise = video.play();

                        if (playPromise !== undefined) {
                            playPromise.catch(() => {
                                // El navegador puede bloquear autoplay.
                            });
                        }

                    } else {

                        video.pause();

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        videos.forEach((video) => {
            videoObserver.observe(video);
        });

    }

});
