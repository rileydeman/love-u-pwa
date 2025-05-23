// Day Selector
let currentDay = "SAT";
const daySectorItems = document.getElementsByClassName("ds-item");

for (let i = 0; i < daySectorItems.length; i++) {
    daySectorItems[i].addEventListener("click", function() {

        for (let j = 0; j < daySectorItems.length; j++) {
            daySectorItems[j].classList.remove("dsi-selected");
        }

        daySectorItems[i].classList.add("dsi-selected");
        currentDay = daySectorItems[i].getAttribute("data-day");
    })
}

// TimeTable
const stages = [
    {
        name: "Kasteel de Haar",
        colour: "#FE0000"
    },
    {
        name: "De Dom",
        colour: "#A100FE"
    },
    {
        name: "Pyramide van Austerlitz",
        colour: "#808080"
    },
    {
        name: "Dom Under",
        colour: "#FF008A"
    },
    {
        name: "Dom Under Afterparty",
        colour: "#FF008A"
    }
    ];
