const socket = io("http://localhost:3000");

function getServers() {
    return JSON.parse(localStorage.getItem("servers"));
}

function setAuthInfo(link, code) {
    document.getElementById("authMessage").style.color = "orange";
    document.getElementById("authMessage").innerHTML = `Your Code Is: ${code}<br/>Press the button below to open the auth link.`;
    document.getElementById("openLink").disabled = false;
    document.getElementById("openLink").onclick = () => {
        document.getElementById("authMessage").innerHTML = "Please wait...";
        socket.emit("openLink", `${link}?otc=${code}`);
        document.getElementById("openLink").disabled = true;
    };
}

function endAuthInfo() {
    document.getElementById("authMessage").style.color = "green";
    document.getElementById("authMessage").innerHTML = "Authenticated";
    document.getElementById("openLink").remove();
}

function setProxyStatus(status, good = false) {
    document.getElementById("proxyStatus").style.color = good ? "green" : "red";
    document.getElementById("proxyStatus").innerHTML = "Current Status: " + status;
}

function setServerInfo(info) {
    document.getElementById("serverInfo").innerHTML = info;
}

function proxyStart() {
    socket.emit("proxyStart", getSelectedServer());
    setProxyStatus("Connecting");
}

function removeServer() {
    let newServers = [];
    for (const server of getServers()) {
        if (server === getSelectedServer()) {
            continue;
        }
        newServers.push(server);
    }
    localStorage.setItem("servers", JSON.stringify(newServers));
    updateServers();
}

function addServer(server) {
    const servers = getServers();
    servers.push(server)
    localStorage.setItem("servers", JSON.stringify(servers));
    updateServers();
}

function getSelectedServer() {
    const select = document.getElementById("serverSelect");
    return select.options[select.selectedIndex].value;
}

function updateServers() {
    document.getElementById("serverSelect").innerHTML = "";
    for (const item of getServers()) {
        const newItem = document.createElement("option");
        newItem.innerHTML = item;
        document.getElementById("serverSelect").append(newItem);
    }
}

function setVerificationMessage(message, error = true) {
    document.getElementById("verification-error").style.color = error ? "red" : "green";
    document.getElementById("verification-error").innerHTML = message;
}

document.getElementById("tokenInput").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        socket.emit("verify", document.getElementById("tokenInput").value);
        document.getElementById("tokenInput").value = "";
    }
});

document.getElementById("addServer").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (document.getElementById("addServer").value.split(":").length < 2) {
            return;
        }
        addServer(document.getElementById("addServer").value);
        document.getElementById("addServer").value = "";
    }
});

socket.on("connect", () => {
    setVerificationMessage("Connected (BE)", false);
     console.log("Socket connected.");
});

socket.on("verified", () => {
    setVerificationMessage("Key Valid", false);
    document.getElementById("token").remove();
    document.getElementById("home").style.display = "grid";
});

socket.on("failedVerify", (message) => {
    setVerificationMessage(message);
});

if (localStorage.getItem("servers") == null) {
    localStorage.setItem("servers", JSON.stringify([]));
}

setInterval(() => {
    socket.emit("requestBedrockServerInfo", getSelectedServer());
}, 1250);

socket.on("authInfo", (link, code) => {
    setProxyStatus("Authenticating")
    setAuthInfo(link, code);
});

socket.on("proxyFullyConnected", (username) => {
    endAuthInfo();
    setProxyStatus(`Connected (${username})`, true);
});

socket.on("bedrockServerInfo", (res) => {
    if (res.version == null) {
        setServerInfo("Server Offline");
        return;
    }
    setServerInfo(`Version: ${res.version}<br/>Players: ${res.currentPlayers}/${res.maxPlayers}`);
});

document.getElementById("openLink").disabled = true;

updateServers();