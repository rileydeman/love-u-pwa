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
        getTimetable();
    })
}

// TimeTable

let tableData;

function getTimetable() {
    // console.log(`Getting Data from: ${API_BASEURL}v1/timetable?day=${currentDay}`);

    fetch(`${API_BASEURL}v1/timetable/?day=${currentDay}`, {
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
            tableData = data.payload;
            updateTimeTable();
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}

getTimetable();

function updateTimeTable() {
    let timeTableGrid = document.getElementById("festivalGrid");

    emptyTimeTable();

    tableData.forEach((e, i) => {
        let stage = e;
        let acts = e.acts
        timeTableGrid.innerHTML += '<div class="stageName-wrapper"><p class="stageName">' + stage.stageName + '</p></div>';

        timeTableGrid.innerHTML += '<div class="timeLine">' + setupActs(acts, stage.stageColour, i) + '</div>';
    })

    setupActsClickEvents();

    function setupActs(acts, colour, stageIndex) {
        let actsHTML = "";

        acts.forEach((act, i) => {

            actsHTML += '<div class="timelineEvent" data-event-id="' + act.tableID + '" data-stage-index="' + stageIndex + '" data-timeline-index="' + i + '" style="grid-row: 1; grid-column: t-' + act.startTime.code + ' / t-' + act.endTime.code + '; background-color: ' + colour + ';">';

            actsHTML += '<div class="tle-info"><p class="tle-artist">' + act.name + '</p><p class="tle-time">' + act.startTime.time + ' &mdash; ' + act.endTime.time + '</p></div>'

            actsHTML += '</div>';
        })

        return actsHTML;
    }
}

function setupActsClickEvents() {
    let timelineEvents = document.getElementsByClassName("timelineEvent");

    for (let i = 0; i < timelineEvents.length; i++) {
        timelineEvents[i].addEventListener('click', function(event) {
            openModal(timelineEvents[i].getAttribute("data-stage-index"), timelineEvents[i].getAttribute("data-timeline-index"));
        })
    }
}

function emptyTimeTable() {
    let stageNames = document.getElementsByClassName("stageName-wrapper");
    let timeLines = document.getElementsByClassName("timeLine");

    while (stageNames.length > 0) {
        stageNames[0].remove();
    }

    while (timeLines.length > 1) {
        timeLines[1].remove();
    }
}


// Modal control
function openModal(stageIndex, timelineIndex) {
    let data = tableData[stageIndex];
    // console.log(data.acts[timelineIndex])

    document.getElementById("aim-img").setAttribute("src", data.acts[timelineIndex].img.square);
    document.getElementById("aimh-title").innerHTML = data.acts[timelineIndex].name;
    document.getElementById("aimh-genre").innerHTML = data.acts[timelineIndex].genre;
    document.getElementById("aimh-startTime").innerHTML = data.acts[timelineIndex].startTime.time;
    document.getElementById("aimh-endTime").innerHTML = data.acts[timelineIndex].endTime.time;
    document.getElementById("aimh-stage").innerHTML = data.stageName;
    document.getElementById("aim-description").innerHTML = data.acts[timelineIndex].descr;
    document.getElementById("aim-video").setAttribute("src", data.acts[timelineIndex].video.embed);

    document.getElementById("actInfoModal").style.display = "flex";
}

document.getElementById("actInfoModal").addEventListener("click", closeModal);
document.getElementById("aim-exit").addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("actInfoModal").style.display = "none";
}

document.getElementById("aim-content").addEventListener("click", (e) => {
    e.stopPropagation();
});