const socket = io("http://localhost:3000");

function getServers() {
    return JSON.parse(localStorage.getItem("servers")) || [];
}

function updateServerList() {
    const serverList = document.getElementById("serverList");
    serverList.innerHTML = "";
    
    getServers().forEach(server => {
        const serverItem = document.createElement("div");
        serverItem.className = "server-item";
        
        const info = document.createElement("div");
        info.className = "server-item-info";
        info.innerHTML = `
            <div class="status-indicator status-offline"></div>
            <span>${server}</span>
        `;
        
        const actions = document.createElement("div");
        actions.className = "server-item-actions";
        actions.innerHTML = `
            <button onclick="connectToServer('${server}')">Connect</button>
            <button class="secondary" onclick="removeServer('${server}')">Remove</button>
        `;
        
        serverItem.appendChild(info);
        serverItem.appendChild(actions);
        serverList.appendChild(serverItem);
    });
}

function addServer() {
    const name = document.getElementById("serverName").value;
    const ip = document.getElementById("serverIP").value;
    const port = document.getElementById("serverPort").value;
    
    if (!name || !ip || !port) return;
    
    const serverString = `${name}:${ip}:${port}`;
    const servers = getServers();
    
    if (!servers.includes(serverString)) {
        servers.push(serverString);
        localStorage.setItem("servers", JSON.stringify(servers));
        updateServerList();
        
        // Clear inputs
        document.getElementById("serverName").value = "";
        document.getElementById("serverIP").value = "";
        document.getElementById("serverPort").value = "19132";
    }
}

function removeServer(server) {
    const servers = getServers().filter(s => s !== server);
    localStorage.setItem("servers", JSON.stringify(servers));
    updateServerList();
}

function connectToServer(server) {
    const [name, ip, port] = server.split(":");
    socket.emit("proxyStart", `${ip}:${port}`);
    setProxyStatus("Connecting");
}

function setAuthInfo(link, code) {
    const authMessage = document.getElementById("authMessage");
    authMessage.style.color = "orange";
    authMessage.innerHTML = `Your Code Is: ${code}`;
    
    const openLink = document.getElementById("openLink");
    openLink.disabled = false;
    openLink.onclick = () => {
        authMessage.innerHTML = "Please wait...";
        socket.emit("openLink", `${link}?otc=${code}`);
        openLink.disabled = true;
    };
}

function endAuthInfo() {
    const authMessage = document.getElementById("authMessage");
    authMessage.style.color = "var(--success)";
    authMessage.innerHTML = "Authenticated";
    document.getElementById("openLink").style.display = "none";
}

function setProxyStatus(status, good = false) {
    const statusElement = document.getElementById("proxyStatus");
    statusElement.className = `status-indicator ${good ? 'status-online' : 'status-offline'}`;
    statusElement.innerHTML = status;
}

function setServerInfo(info) {
    document.getElementById("serverInfo").innerHTML = info;
}

// Token verification
document.getElementById("tokenInput").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        socket.emit("verify", document.getElementById("tokenInput").value);
        document.getElementById("tokenInput").value = "";
    }
});

// Socket event handlers
socket.on("connect", () => {
    document.getElementById("verification-error").style.color = "var(--success)";
    document.getElementById("verification-error").innerHTML = "Connected (BE)";
});

socket.on("verified", () => {
    document.getElementById("verification-error").style.color = "var(--success)";
    document.getElementById("verification-error").innerHTML = "Key Valid";
    document.getElementById("token").style.display = "none";
    document.getElementById("home").style.display = "flex";
    updateServerList();
});

socket.on("failedVerify", (message) => {
    document.getElementById("verification-error").style.color = "var(--danger)";
    document.getElementById("verification-error").innerHTML = message;
});

// Initialize
if (localStorage.getItem("servers") === null) {
    localStorage.setItem("servers", JSON.stringify([]));
}

// Update server info periodically
setInterval(() => {
    const servers = getServers();
    if (servers.length > 0) {
        const [name, ip, port] = servers[0].split(":");
        socket.emit("requestBedrockServerInfo", `${ip}:${port}`);
    }
}, 1250);