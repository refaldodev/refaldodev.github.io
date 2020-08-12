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

// testimonials
const testimonialsSlide = document.querySelector('.testimonials-slide');
const testimonialsImages = document.querySelectorAll('.testimonials-slide img');

// buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// counter
let counter = 1;
const size = testimonialsImages[0].clientWidth;
testimonialsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// button listeners

nextBtn.addEventListener('click', () => {
    if (counter >= testimonialsImages.length - 1) return;
    testimonialsSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    testimonialsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    testimonialsSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    testimonialsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

testimonialsSlide.addEventListener('transitioned', () => {
    console.log(testimonialsImages[counter]);
    if (testimonialsImages[counter].id === 'lastClone') {
        testimonialsSlide.style.transition = "none";
        counter = testimonialsImages.length - 2;
        testimonialsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    }
    if (testimonialsImages[counter].id === 'firstClone') {
        testimonialsSlide.style.transition = "none";
        counter = testimonialsImages.length - counter;
        testimonialsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    }
});
























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