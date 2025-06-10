let currentDay = "SAT";

document.getElementById("daySelector").addEventListener("click", changeDay)

function changeDay () {
    if (currentDay === "SAT") {
        currentDay = "SUN";
        document.getElementById("ds-text").innerHTML = "Sunday";
    } else if (currentDay === "SUN") {
        currentDay = "SAT";
        document.getElementById("ds-text").innerHTML = "Saturday";
    }

    getTimetable();
}

setInterval(() => {
    if (localStorage.getItem("loveufestival-theme") == "dark") {
        document.getElementById("ds-icon").setAttribute("src", "assets/img/icons/replace-white.png");
    } else if (localStorage.getItem("loveufestival-theme") == "light") {
        document.getElementById("ds-icon").setAttribute("src", "assets/img/icons/replace-black.png");
    }
}, 100);

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
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}

getTimetable();

let stageModal = document.getElementById("stageInfoModal");

document.getElementById("closeModal").addEventListener("click", closeStageModal)

function openStageModal(stage) {
    document.getElementById("sim-titleDiv").setAttribute("style", `background-color: ${tableData[stage].stageColour};`);
    document.getElementById("sim-title").innerHTML = tableData[stage].stageName;
    document.getElementById("sim-details").innerHTML = tableData[stage].stageDetails;

    let sim_timeTableItems = document.getElementsByClassName("sim-timeTableItem");

    while (sim_timeTableItems.length > 0) {
        sim_timeTableItems[0].remove();
    }

    let acts = tableData[stage].acts;

    for (let i = 0; i < acts.length; i++) {
        document.getElementById("sim-timetable").innerHTML += `<div class="sim-timeTableItem" style=" ${i === 0 ? 'margin-top: 5%;' : ''}"><p class="tti-title">${acts[i].name}</p><p class="tti-time">${acts[i].startTime.time} &mdash; ${acts[i].endTime.time}</p></div>`;
    }

    stageModal.style.top = "10%";
    // console.log(tableData[stage]);
}

function closeStageModal() {
    stageModal.style.top = "100%";
}

let legendaOpen = false;

document.getElementById("legenda-title").addEventListener("click", toggleLegenda);
document.getElementById("legenda-modal").addEventListener("click", toggleLegenda);
document.getElementById("legenda-content").addEventListener("click", (e) => {
    e.stopPropagation();
});

function toggleLegenda() {
    if (legendaOpen) {
        document.getElementById("legenda-openclose-icon").style.rotate = "0deg";
        document.getElementById("legenda-modal").classList.remove("lm-open");

        legendaOpen = !legendaOpen;
    } else {
        document.getElementById("legenda-openclose-icon").style.rotate = "45deg";
        document.getElementById("legenda-modal").classList.add("lm-open");

        legendaOpen = !legendaOpen;
    }
}