const topNavBar = document.createElement("nav");
topNavBar.innerHTML = `
<a href="/" class="nav-icon">
  <img alt="Main Page" src="/general/icon.png" width="40px"> Main Page
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
      <a href="/programming/HTMLtaglog.html">HTML & CSS reference</a>
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
const navIcon = document.querySelector(".nav-icon");
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

class FooterBlock {
    constructor(name, label, imageSource, ...links) {
        // label is a formatted string.
        // A valid example is: "Powered by <0>this site</0> from <1>here</1>."
        // "this site" and "here" will be wrapped in <a> tags with hrefs
        // links[0] and links[1] respectively
        this.name = name;
        this.mainLink = links[0];
        this.imageSource = imageSource;
        let matches = label.match(/<\d+?>/g).map(str => Number(str.slice(1, -1)));
        if (matches) {
            let insertion;
            for (let match of matches) {
                insertion = new RegExp("<"+match+">(.+?)</"+match+">", "g");
                label = label.replace(insertion,
                    `<a href="${links[match]}" target="_blank">$1</a>`);
            }}
        this.label = label;
    }
    
    get HTML() {
        const element = document.createElement("div");
        element.innerHTML =
        `<a href="${this.mainLink}" target="_blank">`+
        `<img src="${this.imageSource}" alt="${this.name}" width="60px">`+
        `</a><br>${this.label}`;
        return element;
    }

    static github() {
        return new FooterBlock("GitHub",
        "This website is hosted by <0>GitHub</0> <1>Pages</1>.",
        `https://github.com/fluidicon.png`,
        `https://github.com`,
        `https://github.com/pages`)
    }
    static desmos() {
        return new FooterBlock("Desmos",
        "The graphs in this page were made in the <0>Desmos</0> <1>Graphing Calculator</1>.",
        `https://www.desmos.com/assets/img/apps/graphing/favicon.ico`,
        `https://www.desmos.com`,
        `https://www.desmos.com/calculator`)
    }
    static mathjax() {
        return new FooterBlock("MathJax",
        "The mathematics in this page are powered by <0>MathJax</0>.",
        `https://www.mathjax.org/badge/badge-square-2.png`,
        `https://www.mathjax.org`)
    }
}

function insertFooter(...blocks) {
    if (!blocks) {return;}
    const footer = document.createElement("footer");
    const width = 100/(blocks.length+1);
    for (let block of blocks) {
        if (block == "github") {block = FooterBlock.github();}
        if (block == "desmos") {block = FooterBlock.desmos();}
        if (block == "mathjax") {block = FooterBlock.mathjax();}
        if (!(block instanceof FooterBlock)) {
            throw new Error("Invalid footer block");
        }
        const element = block.HTML;
        element.style.width = width + "%";
        footer.appendChild(element);
    }
    document.body.appendChild(footer);
    responsive();
}

function responsive() {
    const footer = document.querySelector("footer");
    footer.style.width = innerWidth + "px";
    document.querySelector("main").style.minHeight = innerHeight - 60 -
        footer.offsetHeight + "px";
    let caret = '<i class="fa fa-caret-down"></i>'
    let logo = `<img alt="Main Page" src="/general/icon.png" width="40px">`
    if (window.innerWidth > 790) {
        navButtons[0].innerHTML = "Higher Mathematics " + caret;
        navButtons[1].innerHTML = "Programming & Experiments " + caret;
        navButtons[2].innerHTML = "Miscellaneous Resources " + caret;
        navIcon.innerHTML = logo + " Main Page";
    } else if (window.innerWidth > 540) {
        navButtons[0].innerHTML = "Mathematics " + caret;
        navButtons[1].innerHTML = "Programming " + caret;
        navButtons[2].innerHTML = "Resources " + caret;
        navIcon.innerHTML = logo + " Main Page";
    } else {
        navButtons[0].innerHTML = "Math"
        navButtons[1].innerHTML = "Code"
        navButtons[2].innerHTML = "Other"
        navIcon.innerHTML = logo;
    }
    // Not gonna take the time to redo this for extremally small devices
}

window.addEventListener("resize", setTimeout(responsive, 100));
window.addEventListener("load", setTimeout(responsive, 100));