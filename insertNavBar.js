const nav = document.getElementsByTagName("nav")[0];
const buttons = document.querySelectorAll("nav button");

for (let but of buttons) {
    const dropdown = but.nextElementSibling
    but.addEventListener("click", event => {
        if (dropdown.classList.contains("hidden")) {
            dropdown.classList.remove("hidden");
        } else {
            dropdown.classList.add("hidden");
        }
        event.stopPropagation();
    });
}

window.addEventListener("click", event => {
    const dropdowns = document.querySelectorAll("nav .dropdown:not(.hidden)");
    for (let drop of dropdowns) {
        drop.classList.add("hidden");
    }
})