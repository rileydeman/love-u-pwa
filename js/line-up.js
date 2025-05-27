// Day Selector
let currentDay = "ALL";
const daySectorItems = document.getElementsByClassName("ds-item");

for (let i = 0; i < daySectorItems.length; i++) {
    daySectorItems[i].addEventListener("click", function() {

        for (let j = 0; j < daySectorItems.length; j++) {
            daySectorItems[j].classList.remove("dsi-selected");
        }

        daySectorItems[i].classList.add("dsi-selected");
        currentDay = daySectorItems[i].getAttribute("data-day");
        //getTimetable();
    })
}