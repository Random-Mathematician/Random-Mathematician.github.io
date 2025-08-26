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

function responsiveButtons() {
    let caret = '<i class="fa fa-caret-down"></i>'
    if (window.innerWidth > 800) {
        buttons[0].innerHTML = "Higher Mathematics " + caret;
        buttons[1].innerHTML = "Programming & Experiments " + caret;
        buttons[2].innerHTML = "Miscellaneous Resources " + caret;
    } else if (window.innerWidth > 550) {
        buttons[0].innerHTML = "Mathematics " + caret;
        buttons[1].innerHTML = "Programming " + caret;
        buttons[2].innerHTML = "Resources " + caret;
    } else {
        buttons[0].innerHTML = "Math"
        buttons[1].innerHTML = "Code"
        buttons[2].innerHTML = "Other"
    }
}

responsiveButtons()
window.addEventListener("resize", responsiveButtons)