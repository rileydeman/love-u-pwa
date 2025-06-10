let icTitles = document.getElementsByClassName("ici-title");
let icOpenCloseIcons = document.getElementsByClassName("ici-openclose-icon");
let icContents = document.getElementsByClassName("ici-content");

for (let i = 0; i < icTitles.length; i++) {
    icTitles[i].addEventListener("click", function () {
        if (!icContents[i].classList.contains("icic-open")) {
            icContents[i].classList.add("icic-open");
            icOpenCloseIcons[i].style.rotate = "45deg";
        } else {
            icContents[i].classList.remove("icic-open");
            icOpenCloseIcons[i].style.rotate = "0deg";
        }
    })
}