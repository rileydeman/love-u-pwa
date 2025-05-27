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
        getLineUp();
    })
}

// Line Up
let lineUpData;

function getLineUp() {
    let requestUrl = `${API_BASEURL}v1/line-up/`;

    if (currentDay != "ALL") {
        requestUrl += `?day=${currentDay}`;
    }

    emptyLineUp();

    fetch(requestUrl, {
        method: "GET"
    })
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Handle the JSON data
            // console.log(data);
            lineUpData = data.payload;
            updateLineUp();
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}

getLineUp();

function updateLineUp() {
    let lineupGrid = document.getElementById("lineupGrid");

    lineUpData.forEach((act, i) => {
        lineupGrid.innerHTML += '<div class="actCard"><img class="actImg" src="' + act.img.square + '" alt=""><div class="actNameDiv"><p class="actName">' + act.name + '</p></div></div>';
    })
}

function emptyLineUp() {
    let actCards = document.getElementsByClassName("actCard");

    while (actCards.length > 0) {
        actCards[0].remove();
    }
}