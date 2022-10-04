window.onload = function () {
    let navList = document.querySelector(".nav-list");
    let items = document.querySelectorAll(".nav-list__item");
    let line = document.querySelector(".line");
    let progressBar = document.querySelector(".progress-bar");
    let nav = document.querySelector(".nav");
    let img = document.querySelector(".img");
    let navHeight = document.querySelector(".nav-list").offsetHeight;
    let temp = document.querySelector(".temp");

    function debounce(func, wait, immediate) {
        var timeout;

        return function executedFunction() {
            var context = this;
            var args = arguments;

            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            var callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };

    window.addEventListener("scroll", debounce(function () {
        if (window.pageYOffset >= navHeight) {
            nav.classList.add("fixed");
            img.style.marginTop = navHeight + "px";
        } else {
            nav.classList.remove("fixed");
            img.style.marginTop = "0";

        }
    }, 100));

    window.addEventListener("scroll", function () {

        let scrollTop = window.pageYOffset;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        let widthProgress = scrollTop / (scrollHeight - clientHeight) * 100;
        progressBar.style.width = `${widthProgress}%`;

    });
    items.forEach(item => {
        item.onclick = function () {
            item.scrollIntoView({
                behavior: "smooth",
                inline: "center"
            })
            line.style.width = this.offsetWidth + "px";
            line.style.left = this.offsetLeft + "px";
        }
    })
    document.documentElement.onclick = function (e) {
        if (!e.target.matches(".nav-list__item")) {
            line.style.width = 0;
        }
    }
    // navList.onwheel = function (e) { 
    //     this.scrollIntoView({
    //         behavior: 'smooth'
    //     });
    //     console.log(this.scrollLeft);
    //     delta = e.deltaY;
    //     this.scrollLeft += delta;
    // }

    // navList.addEventListener("wheel", function (e) {
    //     this.scrollLeft += e.deltaY;
    //     mouseController.wheel(event);
    //     e.preventDefault();
    // });

    // this.scrollLeft += e.deltaY;
    navList.addEventListener("wheel", function (e) {
        this.scrollLeft += e.deltaY;
        e.preventDefault();
    });
    navList.addEventListener("touchmove", function (e) {
        this.scrollLeft += e.deltaY;
    });



}

