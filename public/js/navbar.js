const links = document.querySelectorAll(".link-floating-circle-navigation")

const body = document.body;
const nav_bg = document.createElement("div");
const toggle_btn = document.createElement("div");
const wrapper_floating_circle_navigation = document.querySelector(
    ".wrapper-floating-circle-navigation"
);
const link_floating_circle_navigation = document.querySelector(
    ".link-floating-circle-navigation"
);

const style = document.createElement("style");


document.head.appendChild(style);

toggle_btn.style.color = wrapper_floating_circle_navigation.dataset.color;

nav_bg.classList.add("btn-floating-circle-navigation");
toggle_btn.classList.add("btn-floating-circle-navigation");

nav_bg.id = "nav-bg";
toggle_btn.id = "toggle-btn";
toggle_btn.classList.add("difference")
for (i = 0; i < 3; i++) {
    const span = document.createElement("span");
    toggle_btn.appendChild(span);
}

body.insertBefore(toggle_btn, body.firstChild);
body.insertBefore(nav_bg, body.firstChild);

//  ==============

const elem = nav_bg,
    toggleBtn = document.querySelector("#toggle-btn"),
    elemH = elem.getBoundingClientRect().height,
    elemW = elem.getBoundingClientRect().width;



let open = false;
let scale, offsetX, offsetY;

const calculateValues = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    //const cssStyles = getComputedStyle(elem);
    //const offsetValue = Number(cssStyles.getPropertyValue('--offset-value'));
    const offsetValue = Number(
        getComputedStyle(elem).getPropertyValue("--offset-value")
    );

    //  Offsets to center the circle
    offsetX = w / 2 - elemW / 2 - offsetValue;
    offsetY = h / 2 - elemH / 2 - offsetValue;

    // Good old pythagoras
    const radius = Math.sqrt(h ** 2 + w ** 2);
    scale = radius / (elemW / 2) / 2 + 0.1; // Add '.1' to compensate for Safari sub pixel blur issue
    return scale;
};

const openMenu = () => {
    elem.style.setProperty("--translate-x", `${offsetX}px`);
    elem.style.setProperty("--translate-y", `-${offsetY}px`);
    elem.style.setProperty("--scale", scale);
};
const closeMenu = () => {
    elem.style.setProperty("--scale", 1);
    elem.style.setProperty("--translate-x", 0);
    elem.style.setProperty("--translate-y", 0);
};
const animateMenu = () => {
    open ? openMenu() : closeMenu();
};

const toggleMenu = () => {
    document.querySelector(".btn-floating-circle-navigation").classList.toggle("__nav-bg-white")
    open = !open;
    animateMenu();
    toggleBtn.classList.toggle("shown");
};

const resizeHandler = () => {
    window.requestAnimationFrame(() => {
        calculateValues();
        animateMenu();
    });
};

calculateValues();

//toggleBtn.onclick = toggleMenu;
toggleBtn.addEventListener("click", toggleMenu, false);

window.addEventListener("resize", resizeHandler, false);

links.forEach((link) => {
    link.addEventListener("click", () => {
        toggleMenu()
    })
})

