const mainTitle = document.getElementById("MainTitle"),
    SCHEDULE = {
        Element: document.getElementById("SCHEDULE"),
        NAVELEMENT: document.getElementsByClassName("SCHEDULE-NAV-ELEMENT"),
        LIST: document.getElementsByClassName("SCHEDULE-LIST"),
        shown: false,
    },
    counters = {
        elements: document.querySelectorAll(".counting-Number span"),
        counts: [3, 10, 20],
        state: [0, 0, 0],
        time: 2000,
        counted: false,
        Plus: [false, true, true],
        startCounting: function () {
            this.intervals = this.counts.map((elm) => this.time / elm);
            this.timers = [];
            for (let i = 0; i < this.elements.length; i++) {
                const elm = this.elements[i];
                this.timers[i] = setInterval(() => {
                    if (this.state[i] >= this.counts[i]) clearInterval(this.timers[i]);
                    else {
                        this.state[i]++;

                        elm.innerHTML = (this.state[i] < 10 ? "0" : "") + this.state[i];
                    }
                }, this.intervals[i]);
            }
        },
    },
    NewsLetter = {
        element: document.querySelector(".email input"),
        btn: document.querySelector(".email .btn"),
    },
    REGISTRATIONS = {
        btns: document.querySelectorAll('[href="#REGISTRATIONS"]'),
        register: document.querySelector("#REGISTER"),
        modal: document.getElementById("REGISTRATIONS"),
        form: document.querySelectorAll("#REGISTRATIONS form [name]"),
        close: document.querySelector("#REGISTRATIONS .close"),
        data: {},
    },
    Notification = {
        element: document.querySelector(".Notification"),
        text: document.querySelector(".Notification h4"),
    },
    navbar = document.getElementsByClassName("navbar")[0],
    scroll = document.getElementsByClassName("scroll")[0],
    Menu = document.getElementsByClassName("Menu")[0],
    navigation = document.getElementsByClassName("navigation")[0],
    links = document.querySelectorAll(".navigation a");
links.forEach((elm) => {
    elm.onclick = function () {
        navigation.classList.remove("show");
    };
});
Menu.onclick = function () {
    navigation.classList.toggle("show");
};
REGISTRATIONS.close.onclick = function () {
    REGISTRATIONS.modal.classList.remove("open");
};
function Req(url, data) {
    let reqResolve,
        doneResolve,
        doneReject,
        p = {
            req: new Promise((res) => {
                reqResolve = res;
            }),
            done: new Promise((res, rej) => {
                doneResolve = res;
                doneReject = rej;
            }),
        };
    $.ajax({
        type: "POST",
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
        .done((data) => {
            Notification.text.innerHTML = data;
            Notification.element.classList.remove("error");
            Notification.element.classList.add("open");
            reqResolve();
            setTimeout(() => {
                Notification.element.classList.remove("open");
                Notification.element.classList.remove("error");
                doneResolve();
            }, 4000);
        })
        .fail((error) => {
            Notification.text.innerHTML = error.responseText;
            Notification.element.classList.add("error");
            Notification.element.classList.add("open");
            reqResolve();
            setTimeout(() => {
                Notification.element.classList.remove("open");
                Notification.element.classList.remove("error");
                doneReject();
            }, 4000);
        });
    return p;
}
NewsLetter.btn.onclick = function News() {
    Req("/api/email", { email: NewsLetter.element.value });
};
REGISTRATIONS.register.onclick = function Register() {
    for (let i = 0; i < REGISTRATIONS.form.length; i++) {
        REGISTRATIONS.data[REGISTRATIONS.form[i].name] = REGISTRATIONS.form[i].value;
    }
    let { done } = Req("/api/participate", REGISTRATIONS.data);
    done.then(() => {
        REGISTRATIONS.modal.classList.remove("open");
    }).catch(console.error);
};
function RegisterOpen() {
    REGISTRATIONS.modal.classList.add("open");
}
for (let i = 0; i < REGISTRATIONS.btns.length; i++) {
    const btn = REGISTRATIONS.btns[i];
    btn.onclick = RegisterOpen;
}
for (let i = 0; i < SCHEDULE.NAVELEMENT.length; i++) {
    const element = SCHEDULE.NAVELEMENT[i];
    element.onclick = function () {
        for (let j = 0; j < SCHEDULE.LIST.length; j++) SCHEDULE.LIST[j].classList.remove("SHOW");
        for (let j = 0; j < SCHEDULE.NAVELEMENT.length; j++)
            SCHEDULE.NAVELEMENT[j].classList.remove("SHOW");
        SCHEDULE.LIST[i].classList.add("SHOW");
        SCHEDULE.NAVELEMENT[i].classList.add("SHOW");
    };
}
$(document).ready(function () {
    $(".owl-carousel1").owlCarousel({
        loop: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: false,
                pullDrag: false,
                touchDrag: false,
                mouseDrag: false,
            },
            600: {
                items: 2,
                nav: true,
                loop: true,
                pullDrag: true,
                touchDrag: true,
                mouseDrag: true,
            },
            800: {
                items: 3,
                nav: true,
                loop: true,
                pullDrag: true,
                touchDrag: true,
                mouseDrag: true,
            },
            1000: {
                items: 4,
                nav: true,
                loop: true,
                pullDrag: true,
                touchDrag: true,
                mouseDrag: true,
            },
        },
    });
    $(".owl-carousel3").owlCarousel({
        loop: true,
        dots: false,
        responsiveClass: true,
        nav: true,
        pullDrag: true,
        touchDrag: true,
        mouseDrag: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: false,
                pullDrag: false,
                touchDrag: false,
                mouseDrag: false,
            },
            600: {
                items: 2,
                nav: true,
                pullDrag: true,
                touchDrag: true,
                mouseDrag: true,
            },
            1100: {
                items: 3,
                nav: true,
                pullDrag: true,
                touchDrag: true,
                mouseDrag: true,
            },
        },
    });
    $(".owl-carousel2").owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        autoplay: true,
        autoplayTimeout: 1500,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
            },
            600: {
                items: 4,
            },
            800: {
                items: 6,
            },
            1000: {
                items: 7,
            },
        },
    });
});

function handelNavbar() {
    //handle Navbar
    if (mainTitle.getBoundingClientRect().top < 0) {
        navbar.classList.add("NoTransparent");
        scroll.classList.add("show");
    } else {
        navbar.classList.remove("NoTransparent");
        scroll.classList.remove("show");
    }
    // SCHEDULE animation
    if (
        !SCHEDULE.shown &&
        SCHEDULE.Element &&
        SCHEDULE.Element.getBoundingClientRect().top < window.innerHeight / 4
    ) {
        SCHEDULE.LIST[0].classList.add("SHOW");
        SCHEDULE.shown = true;
    }
    if (
        !counters.counted &&
        counters.elements[0].getBoundingClientRect().top < (window.innerHeight * 3) / 4
    ) {
        counters.counted = true;
        counters.startCounting();
    }
    console.log();
}
handelNavbar();
document.onscroll = handelNavbar;
