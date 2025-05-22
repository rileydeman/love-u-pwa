const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const userAgentData = navigator.userAgentData || {};
    let device = "Unknown Device";
    let os = "Unknown OS";
    let osVersion = "";

    const modelMatch = userAgent.match(/\((.*?)\)/);
    if (modelMatch) {
        const modelInfo = modelMatch[1].split(";").map(item => item.trim());
        for (const info of modelInfo) {
            if (/SM-|GT-|A\d+|Pixel|Nexus|iPhone|iPad|iPod/i.test(info)) {
                device = info;
                break;
            }
        }
    }

    if (/Windows NT/i.test(userAgent)) {
        os = "Windows";
        const versionMatch = userAgent.match(/Windows NT ([\d.]+)/);
        if (versionMatch) osVersion = versionMatch[1];
    } else if (/Mac OS X/i.test(userAgent)) {
        os = "MacOS";
        const versionMatch = userAgent.match(/Mac OS X ([\d_]+)/);
        if (versionMatch) osVersion = versionMatch[1].replace(/_/g, '.');
    } else if (/Android/i.test(userAgent)) {
        os = "Android";
        const versionMatch = userAgent.match(/Android ([\d.]+)/);
        if (versionMatch) osVersion = versionMatch[1];
    } else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) {
        os = "iOS";
        const versionMatch = userAgent.match(/OS ([\d_]+)/);
        if (versionMatch) osVersion = versionMatch[1].replace(/_/g, '.');
    } else if (/Linux/i.test(userAgent)) {
        os = "Linux";
    }

    const isPWA = window.matchMedia('(display-mode: standalone)').matches;

    if (isPWA) {
        if (userAgentData.platform) os = userAgentData.platform;
        if (userAgentData.platformVersion) osVersion = userAgentData.platformVersion;
        if (userAgentData.model) device = userAgentData.model;
    }

    return {
        device,
        os: `${os} ${osVersion}`,
        userAgent,
        isPWA
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const info = getDeviceInfo();

    setTimeout(() => {
    if (document.getElementById("sdi-device")) {
        document.getElementById("sdi-device").innerHTML = info.device;
    }
    if (document.getElementById("sdi-os")) {
        document.getElementById("sdi-os").innerHTML = info.os;
    }
    if (document.getElementById("sdi-runspwa")) {
        document.getElementById("sdi-runspwa").innerHTML = info.isPWA;
    }


        const settingsItemsTitles = document.getElementsByClassName("soi-title");
        const settingsItemsContents = document.getElementsByClassName("soi-content");

        for (let i = 0; i < settingsItemsTitles.length; i++) {

            settingsItemsTitles[i].addEventListener("click", function () {

                if (settingsItemsContents[i].classList.contains("soic-open")) {
                    settingsItemsContents[i].classList.remove("soic-open");

                    settingsItemsTitles[i].childNodes[3].classList.remove("up");
                    settingsItemsTitles[i].childNodes[3].classList.add("down");
                } else {
                    settingsItemsContents[i].classList.add("soic-open");

                    settingsItemsTitles[i].childNodes[3].classList.remove("down");
                    settingsItemsTitles[i].childNodes[3].classList.add("up");
                }
            });
        }


        const settingsThemeSwitchDiv = document.getElementById("s-themeSwitchDiv")

        settingsThemeSwitchDiv.addEventListener("click", changeTheme);

    }, 100);

    // console.log("User Agent:", info.userAgent);
    // console.log("Device:", info.device);
    // console.log("OS:", info.os);
    // console.log("Running as PWA:", info.isPWA);
});

let darkTheme = true;

function changeTheme() {
    let body = document.querySelector('body');
    const settingsThemeSwitch = document.getElementById("s-themeSwitch");

    if (!darkTheme) {
        body.setAttribute("data-theme", "dark");
        settingsThemeSwitch.classList.add("themeSwitchOn");
        localStorage.setItem("loveufestival-theme", "dark");

        darkTheme = !darkTheme;
    } else {
        body.setAttribute("data-theme", "light");
        settingsThemeSwitch.classList.remove("themeSwitchOn");
        localStorage.setItem("loveufestival-theme", "light");

        darkTheme = !darkTheme;
    }
}