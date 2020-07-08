const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".portfolio img");
const original = document.querySelector(".full-img");
const caption = document.querySelector(".caption");

previews.forEach(preview => {
    preview.addEventListener("click", () => {
        modal.classList.add("open");
        original.classList.add("open");
        // dynamic change text and image
        const originalSrc = preview.getAttribute("data-original");
        original.src = `${originalSrc}`;
        const altText = preview.alt;
        caption.textContent = altText;

    })
});
modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        original.classList.remove("open");
    }
})

function init() {


    const hamburger = document.querySelector('.menu');
    const hamburgerLines = document.querySelectorAll('.menu line');
    const navOpen = document.querySelector('.nav-open');
    const daftar = document.querySelector('.daftar');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');

    const logo = document.querySelector('.logo');

    const tl = new TimelineMax({
        paused: true,
        reversed: true
    });
    tl.to(navOpen, 0.5, {
            y: 0
        })

        .fromTo(contact, 0.5, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 10
        }, '-=0.4')
        .fromTo(daftar, 0.5, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 10
        }, '-=0.4')
        .fromTo(social, 0.5, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 10
        }, '-=0.4')

        .fromTo(logo, 0.2, {
            color: "black"
        }, {
            color: 'black'
        }, '-=1')
        .fromTo(hamburgerLines, 0.2, {
            stroke: "black"
        }, {
            stroke: "black"
        }, "-=1");
    hamburger.addEventListener('click', () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };

}

init();