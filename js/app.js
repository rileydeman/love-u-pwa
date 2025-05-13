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



let lightTheme = true;

function changeTheme() {
   let body = document.querySelector('body');
   let headerLogo = document.getElementById("h-logo");

   if (lightTheme) {
       body.setAttribute("data-theme", "dark");
       headerLogo.setAttribute("src", "/assets/img/logo-black.png");

       lightTheme = !lightTheme;
   } else {
       body.setAttribute("data-theme", "light");
       headerLogo.setAttribute("src", "/assets/img/logo-white.png");

       lightTheme = !lightTheme;
   }
}