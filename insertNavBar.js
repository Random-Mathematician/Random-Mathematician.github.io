const topNavBar = document.createElement("nav");
topNavBar.innerHTML = `
<a href="index.html" class="nav-icon">
  <img alt="Main Page" src="icon.png" width="40px"> Main Page
</a>
<div class="nav-buttons">
  <div>
    <button>Higher Mathematics <i class="fa fa-caret-down"></i></button>
    <div class="dropdown hidden">
      <a href="#">Nothing here yet...</a>
    </div>
  </div>
  <div>
    <button>Programming &amp; Experiments <i class="fa fa-caret-down"></i></button>
    <div class="dropdown hidden">
      <a href="HTMLtaglog.html">HTML & CSS reference</a>
    </div>
  </div>
  <div>
    <button>Miscellaneous Resources <i class="fa fa-caret-down"></i></button>
    <div class="dropdown hidden">
      <a href="#">Nothing here yet...</a>
    </div>
  </div>
</div>`;
document.body.prepend(topNavBar);
const navButtons = document.querySelectorAll("nav button");
const openDropdowns = () => document.querySelectorAll("nav .dropdown:not(.hidden)");

for (let but of navButtons) {
    const toggled = but.nextElementSibling;
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
        navButtons[0].innerHTML = "Higher Mathematics " + caret;
        navButtons[1].innerHTML = "Programming & Experiments " + caret;
        navButtons[2].innerHTML = "Miscellaneous Resources " + caret;
    } else if (window.innerWidth > 550) {
        navButtons[0].innerHTML = "Mathematics " + caret;
        navButtons[1].innerHTML = "Programming " + caret;
        navButtons[2].innerHTML = "Resources " + caret;
    } else {
        navButtons[0].innerHTML = "Math"
        navButtons[1].innerHTML = "Code"
        navButtons[2].innerHTML = "Other"
    }
    // Not gonna take the time to redo this for extremally small devices
}

responsiveButtons()
window.addEventListener("resize", responsiveButtons)