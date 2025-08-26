const nav = document.getElementsByTagName("nav")[0];
const buttons = document.querySelectorAll("nav button");
const openDropdowns = () => document.querySelectorAll("nav .dropdown:not(.hidden)");

for (let but of buttons) {
    const toggled = but.nextElementSibling
    but.addEventListener("click", event => {
        if (toggled.classList.contains("hidden")) {
            for (let drop of openDropdowns()) {
                drop.classList.add("hidden");
            }
            toggled.classList.remove("hidden");
        } else {
            toggled.classList.add("hidden");
        }
        event.stopPropagation();
    });
}

window.addEventListener("click", () => {
    for (let drop of openDropdowns()) {
        drop.classList.add("hidden");
    }
});