let bElements = [
    ...document.getElementsByClassName("home")[0].children,
    ...document.getElementsByClassName("footer")[0].children
];
for (const element of bElements) {
    if (element.hasAttribute("redir")) {
        element.addEventListener("click", () => {
            for (const e of bElements) {
                e.classList.add("animate__animated", "animate__fadeOut");
            }
            setTimeout(() => {
               window.location.replace(element.getAttribute("redir"));
            }, 2000);
        });
    }
}

function setTextAnimation(delay, duration, strokeWidth, timingFunction, strokeColor, repeat) {
    let paths = document.querySelectorAll("path");
    let mode=repeat?'infinite':'forwards'
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const length = path.getTotalLength();
        path.style["stroke-dashoffset"] = `${length}px`;
        path.style["stroke-dasharray"] = `${length}px`;
        path.style["stroke-width"] = `${strokeWidth}px`;
        path.style["stroke"] = `${strokeColor}`;
        path.style["animation"] = `${duration}s svg-text-anim ${mode} ${timingFunction}`;
        path.style["animation-delay"] = `${i * delay}s`;
    }
}

setTextAnimation(0.2, 3.2, 2, 'linear', '#ffffff', false);

setTimeout(() => {
    let opacity = 100;
    const fadeInterval = setInterval(() => {
        const logo = document.getElementById("logo");
        opacity -= 1.5;
        logo.style.opacity = `${opacity}%`;
        if (opacity < 0) {
            document.getElementsByClassName("loading-logo")[0].remove();
            clearInterval(fadeInterval);
            document.getElementsByClassName("home")[0].style.display = "flex";
            let timesRan = 0;
            for (const element of document.getElementsByClassName("home")[0].children) {
                timesRan += 1;
                setTimeout(() => {
                    element.style.opacity = "100%";
                    element.classList.add("animate__animated", "animate__fadeInDown");
                }, (0.25 * timesRan) * 1000);
                setTimeout(() => {
                    document.getElementsByClassName("footer")[0].style.opacity = "100%";
                    document.getElementsByClassName("footer")[0].classList.add("animate__animated", "animate__fadeIn");
                }, (0.25 * 6) * 1000);
            }
        }
    }, 10);
}, 3.6 * 1000);