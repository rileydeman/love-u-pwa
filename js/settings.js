const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const userAgentData = navigator.userAgentData || {};
    let device = "Unknown Device";
    let os = "Unknown OS";
    let osVersion = "Unknown Version";

    // Detect Device Model
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

    // Detect OS and Version
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

    // If using User Agent Data API (more accurate)
    if (userAgentData.platform) {
        os = userAgentData.platform;
        if (userAgentData.platformVersion) osVersion = userAgentData.platformVersion;
        if (userAgentData.model) device = userAgentData.model;
    }

    return {
        device,
        os: `${os} ${osVersion}`,
        userAgent,
    };
};

// Displaying on the HTML
document.getElementById("di-device").innerHTML = getDeviceInfo().device;
document.getElementById("di-os").innerHTML = getDeviceInfo().os;

// console.log("User Agent:", getDeviceInfo().userAgent);
// console.log("Device:", getDeviceInfo().device);
// console.log("OS:", getDeviceInfo().os);
