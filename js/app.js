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
