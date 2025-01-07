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
        addLogEntry("Opening authentication link...", "info");
    };
    addLogEntry(`Authentication required. Code: ${code}`, "info");
}

function endAuthInfo() {
    document.getElementById("authMessage").style.color = "green";
    document.getElementById("authMessage").innerHTML = "Authenticated";
    document.getElementById("openLink").remove();
    addLogEntry("Authentication successful", "success");
}

function setProxyStatus(status, good = false) {
    document.getElementById("proxyStatus").style.color = good ? "green" : "red";
    document.getElementById("proxyStatus").innerHTML = "Current Status: " + status;
    addLogEntry(`Proxy status: ${status}`, good ? "success" : "info");
}

function setServerInfo(info) {
    document.getElementById("serverInfo").innerHTML = info;
    if (info !== "Server Offline") {
        addLogEntry(`Server info updated: ${info.replace(/<br\/>/g, ' - ')}`, "info");
    }
}

function proxyStart() {
    const server = getSelectedServer();
    socket.emit("proxyStart", server);
    setProxyStatus("Connecting");
    addLogEntry(`Starting proxy connection to ${server}`, "info");
}

function removeServer() {
    const removedServer = getSelectedServer();
    let newServers = [];
    for (const server of getServers()) {
        if (server === removedServer) {
            continue;
        }
        newServers.push(server);
    }
    localStorage.setItem("servers", JSON.stringify(newServers));
    updateServers();
    addLogEntry(`Removed server: ${removedServer}`, "info");
}

function addServer(server) {
    const servers = getServers();
    servers.push(server)
    localStorage.setItem("servers", JSON.stringify(servers));
    updateServers();
    addLogEntry(`Added new server: ${server}`, "success");
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
    addLogEntry(`Server list updated. Total servers: ${getServers().length}`, "info");
}

function setVerificationMessage(message, error = true) {
    document.getElementById("verification-error").style.color = error ? "red" : "green";
    document.getElementById("verification-error").innerHTML = message;
    addLogEntry(message, error ? "error" : "success");
}

document.getElementById("tokenInput").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const token = document.getElementById("tokenInput").value;
        socket.emit("verify", token);
        document.getElementById("tokenInput").value = "";
        addLogEntry("Verifying token...", "info");
    }
});

document.getElementById("addServer").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const serverValue = document.getElementById("addServer").value;
        if (serverValue.split(":").length < 2) {
            addLogEntry("Invalid server format. Use IP:PORT", "error");
            return;
        }
        addServer(serverValue);
        document.getElementById("addServer").value = "";
    }
});

socket.on("connect", () => {
    setVerificationMessage("Connected (BE)", false);
    addLogEntry("Backend connection established", "success");
});

socket.on("verified", () => {
    setVerificationMessage("Key Valid", false);
    document.getElementById("token").remove();
    document.getElementById("home").style.display = "grid";
    addLogEntry("Token verification successful", "success");
});

socket.on("failedVerify", (message) => {
    setVerificationMessage(message);
});

if (localStorage.getItem("servers") == null) {
    localStorage.setItem("servers", JSON.stringify([]));
    addLogEntry("Initialized empty server list", "info");
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

// Clear any previous console entries
clearConsole();
// Add initial console entry
addLogEntry("TBNProxy initialized", "info");

updateServers();