const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const userAgentData = navigator.userAgentData || {};
    let device = "Unknown Device";
    let os = "Unknown OS";
    let osVersion = "Unknown Version";

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
    if (document.getElementById("di-device")) {
        document.getElementById("di-device").innerHTML = info.device;
    }
    if (document.getElementById("di-os")) {
        document.getElementById("di-os").innerHTML = info.os;
    }
    if (document.getElementById("di-runspwa")) {
        document.getElementById("di-runspwa").innerHTML = info.isPWA;
    }

    console.log("User Agent:", info.userAgent);
    console.log("Device:", info.device);
    console.log("OS:", info.os);
    console.log("Running as PWA:", info.isPWA);
});