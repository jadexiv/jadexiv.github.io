const pages = new Map([
    ["setup-link", "setup-body"],
    ["kugane-link", "kugane-body"],
    ["hydatos-link", "hydatos-body"],
    ["lobby-link", "lobby-body"],
    ["owain-link", "owain-body"],
    ["art-link", "art-body"],
    ["raiden-link", "raiden-body"],
    ["rooms-link", "rooms-body"],
    ["support-link", "support-body"],
    ["av-link", "av-body"],
    ["ozma-link", "ozma-body"],
]);

const discords = new Map([
    ["ea", "Eurekan Academy"],
    ["lfg", "Light Forays Group"],
]);

const runTypes = new Map([
    ["newbie", "Newbie"],
    ["flex", "Flex"],
    ["reclear", "Reclear"],
    ["reflex", "Reflex"],
    ["impromptu", "Impromptu"],
    ["other", "Other"],
]);

const parties = new Map([
    ["ea-magia1", "Magia 1"],
    ["ea-magia2", "Magia 2"],
    ["ea-magia3", "Magia 3"],
    ["ea-logos1", "Logos 1"],
    ["ea-logos2", "Logos 2"],
    ["ea-logos3", "Logos 3"],
    ["ea-support", "Support"],
    ["lfg-party1", "Party 1"],
    ["lfg-party2", "Party 2"],
    ["lfg-party3", "Party 3"],
    ["lfg-party4", "Party 4"],
    ["lfg-party5", "Party 5"],
    ["lfg-party6", "Party 6"],
    ["lfg-support", "Support"],
]);

const roles = new Map([
    ["partyleader", "Party Leader"],
    ["splithost", "Split Host"],
    ["host", "Host"],
]);

pages.forEach((value, key) => {
    document.getElementById(key).href = "javascript:void(0)";
    document.getElementById(key).onclick = function() {
        resetView();
        document.getElementById(key).classList.add("nav-current");
        document.getElementById(value).classList.remove("d-none");
        localStorage["currentpage"] = key;
    }
});

function resetView() {
    pages.forEach((value, key) => {
        document.getElementById(key).classList.remove("nav-current");
        document.getElementById(value).classList.add("d-none");
    });
}

settings = {}
settings.discord = localStorage["discord"] ? localStorage["discord"] : "ea";
settings.runType = localStorage["runType"] ? localStorage["runType"] : "newbie";
settings.party = localStorage["party"] ? localStorage["party"] : "ea-magia1";
settings.role = localStorage["role"] ? localStorage["role"] : "partyleader";

setDiscord(settings.discord);
setRunType(settings.runType);
setParty(settings.party);
setRole(settings.role);

function setDiscord(discord) {
    settings.discord = discord;
    localStorage["discord"] = discord;
    document.getElementById("discord-setting-display").innerHTML = discord;
    document.getElementById("discord-dropdown").innerHTML = discords.get(discord);
    setActiveItem(discords, "discord", discord);
    displayElements("discord", discord);
    updatePartyfinderDescription();

    if (discord == "ea" && settings.party.startsWith("lfg")) {
        setParty("ea-magia1");
    }
    
    if (discord == "lfg" && settings.party.startsWith("ea")) {
        setParty("lfg-party1");
    }
}

function setRunType(runType) {
    settings.runType = runType;
    localStorage["runType"] = runType;
    document.getElementById("runtype-setting-display").innerHTML = runTypes.get(runType);
    document.getElementById("runtype-dropdown").innerHTML = runTypes.get(runType);
    setActiveItem(runTypes, "runtype", runType);
    displayElements("runtype", runType);
    updatePartyfinderDescription();
}

function setParty(party) {
    settings.party = party;
    localStorage["party"] = party;
    document.getElementById("party-setting-display").innerHTML = parties.get(party);
    document.getElementById("ea-party-dropdown").innerHTML = parties.get(party);
    document.getElementById("lfg-party-dropdown").innerHTML = parties.get(party);
    setActiveItem(parties, "party", party);
    displayElements("party", party);
}

function setRole(role) {
    settings.role = role;
    localStorage["role"] = role;
    document.getElementById("role-setting-display").innerHTML = roles.get(role);
    document.getElementById("role-dropdown").innerHTML = roles.get(role);
    setActiveItem(roles, "role", role);
    displayElements("role", role);
}

function setActiveItem(map, category, target) {
    map.forEach((value, key) => {
        document.getElementById(`${category}-item-${key}`).classList.remove("active");
    })

    document.getElementById(`${category}-item-${target}`).classList.add("active");
}

function displayElements(category, target) {
    showElements(category, target);
    hideElements(category, target);
}

function showElements(category, target) {
    var elements = document.getElementsByClassName(`show-${category}`);
    var targetElements = document.getElementsByClassName(`show-${category}-${target}`);

    Array.prototype.forEach.call(elements, function(element) {
        console.log(element);
        console.log(target);
        element.classList.add("d-none");
    });

    Array.prototype.forEach.call(targetElements, function(element) {
        element.classList.remove("d-none");
    });
}

function hideElements(category, target) {
    var elements = document.getElementsByClassName(`hide-${category}`);
    var targetElements = document.getElementsByClassName(`hide-${category}-${target}`);

    Array.prototype.forEach.call(elements, function(element) {
        element.classList.remove("d-none");
    });

    Array.prototype.forEach.call(targetElements, function(element) {
        element.classList.add("d-none");
    });
}

function updatePartyfinderDescription() {
    if (settings.discord == "ea") {
        document.getElementById("partyfinder").innerHTML = `${parties.get(settings.party)} | BA ${runTypes.get(settings.runType)} Run - Eurekan Academy | https://discord.gg/eurekanacademy`;
    }
    else if (settings.discord == "lfg") {
        document.getElementById("partyfinder").innerHTML = `${parties.get(settings.party)} - Light Forays - ${runTypes.get(settings.runType)} Run - Voice chat and future signups: http://discord.gg/LightForays`;
    }
    
}

document.getElementById("discord-item-ea").onclick = function() { setDiscord("ea") }
document.getElementById("discord-item-lfg").onclick = function() { setDiscord("lfg") }
document.getElementById("runtype-item-newbie").onclick = function() { setRunType("newbie") }
document.getElementById("runtype-item-flex").onclick = function() { setRunType("flex") }
document.getElementById("runtype-item-reclear").onclick = function() { setRunType("reclear") }
document.getElementById("runtype-item-reflex").onclick = function() { setRunType("reflex") }
document.getElementById("runtype-item-impromptu").onclick = function() { setRunType("impromptu") }
document.getElementById("runtype-item-other").onclick = function() { setRunType("other") }
document.getElementById("party-item-ea-magia1").onclick = function() { setParty("ea-magia1") }
document.getElementById("party-item-ea-magia2").onclick = function() { setParty("ea-magia2") }
document.getElementById("party-item-ea-magia3").onclick = function() { setParty("ea-magia3") }
document.getElementById("party-item-ea-logos1").onclick = function() { setParty("ea-logos1") }
document.getElementById("party-item-ea-logos2").onclick = function() { setParty("ea-logos2") }
document.getElementById("party-item-ea-logos3").onclick = function() { setParty("ea-logos3") }
document.getElementById("party-item-ea-support").onclick = function() { setParty("ea-support") }
document.getElementById("party-item-lfg-party1").onclick = function() { setParty("lfg-party1") }
document.getElementById("party-item-lfg-party2").onclick = function() { setParty("lfg-party2") }
document.getElementById("party-item-lfg-party3").onclick = function() { setParty("lfg-party3") }
document.getElementById("party-item-lfg-party4").onclick = function() { setParty("lfg-party4") }
document.getElementById("party-item-lfg-party5").onclick = function() { setParty("lfg-party5") }
document.getElementById("party-item-lfg-party6").onclick = function() { setParty("lfg-party6") }
document.getElementById("party-item-lfg-support").onclick = function() { setParty("lfg-support") }
document.getElementById("role-item-partyleader").onclick = function() { setRole("partyleader") }
document.getElementById("role-item-splithost").onclick = function() { setRole("splithost") }
document.getElementById("role-item-host").onclick = function() { setRole("host") }

var copyElements = document.getElementsByClassName("copy-text");

Array.prototype.forEach.call(copyElements, function(element) {
    element.onclick = function() {
        navigator.clipboard.writeText(element.innerHTML);
    }
});

if (localStorage["currentpage"] != null) {
    document.getElementById(localStorage["currentpage"]).click();
}