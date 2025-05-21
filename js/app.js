fetch('core/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));

fetch('core/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));

fetch('core/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav').innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));


let darkTheme = true;

function changeTheme() {
   let body = document.querySelector('body');

   if (!darkTheme) {
       body.setAttribute("data-theme", "dark");

       darkTheme = !darkTheme;
   } else {
       body.setAttribute("data-theme", "light");

       darkTheme = !darkTheme;
   }
}

function getURI() {
    const path = window.location.pathname;
    if (path === "/" || path === "") {
        return "HOME";
    }
    return path.split('/').filter(Boolean).join('/').toUpperCase();
}

setInterval(() => {
    document.getElementById("h-title").innerHTML = `${getURI()}`;
}, 1);


// Settings toggle
const settingsAside = document.getElementById("settings");
let settingsOpen = false;
fetch('core/settings.html')
    .then(response => response.text())
    .then(data => {
        settingsAside.innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));

function toggleSettings() {
    if (settingsOpen) {
        settingsAside.style.top = "100%";
        settingsOpen = !settingsOpen;
    } else {
        settingsAside.style.top = 0;
        settingsOpen = !settingsOpen;
    }

}

setTimeout(() => {
    const settingsIcon = document.getElementById("h-settingsIcon");
    const closeIcon = document.getElementById("sh-settingsIcon");

    settingsIcon.addEventListener("click", toggleSettings);
    closeIcon.addEventListener("click", toggleSettings);
}, 100)