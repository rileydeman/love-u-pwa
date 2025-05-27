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
        lineupGrid.innerHTML += '<div class="actCard" data-grid-index="' + i + '"><img class="actImg" src="' + act.img.square + '" alt=""><div class="actNameDiv"><p class="actName">' + act.name + '</p></div></div>';
    })

    setupActsClickEvents();
}

function emptyLineUp() {
    let actCards = document.getElementsByClassName("actCard");

    while (actCards.length > 0) {
        actCards[0].remove();
    }
}

function setupActsClickEvents() {
    let actCards = document.getElementsByClassName("actCard");

    for (let i = 0; i < actCards.length; i++) {
        actCards[i].addEventListener('click', function(event) {
            openModal(actCards[i].getAttribute("data-grid-index"));
        })
    }
}

// Modal controll

function openModal(gridID) {
    let data = lineUpData[gridID];
    // console.log(data);

    document.getElementById("aim-coverImg").setAttribute("src", data.img.landscape);
    document.getElementById("aim-img").setAttribute("src", data.img.square);
    document.getElementById("aim-title").innerHTML = data.name;
    document.getElementById("aim-genre").innerHTML = data.genre;
    document.getElementById("aim-descr").innerHTML = data.descr;
    document.getElementById("aim-video").setAttribute("src", data.video.embed);

    let actShowCards = document.getElementsByClassName("aim-showCard");

    while (actShowCards.length > 0) {
        actShowCards[0].remove();
    }

    if (data.timeline) {
        data.timeline.forEach((show) => {
            let showDay = show.day === "SAT" ? "Saturday" : show.day === "SUN" ? "Sunday": "";
            document.getElementById("aim-actShows-repeater").innerHTML += '<div class="aim-showCard" style="background-color: ' + show.stage.colour + ';"><p class="aim-stageName">' + show.stage.name + '</p><p class="aim-times">' + showDay + ' &nbsp;&#8226;&nbsp; ' + show.startTime.time + ' &mdash; ' + show.endTime.time + '</p></div>';
        })
    } else {
        document.getElementById("aim-actShows-repeater").innerHTML += '<div class="aim-showCard" style="background-color: var(--info);"><p class="aim-stageName" style="width: 100%;">There are Currently no Shows for this Act</p></div>';
    }

    document.getElementById("actInfoModal").style.top = 0;
}

document.getElementById("aimh-aimCloseIcon").addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("actInfoModal").style.top = "100%";
    document.getElementById("aim-main").scrollTo(0, 0);
}