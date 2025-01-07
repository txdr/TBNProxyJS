import pkg from "electron";
const { app, BrowserWindow } = pkg;
import http from "node:http";
import { Server } from "socket.io";
import { spawn } from "child_process";
import API from "bedrock-api";
import open from "open";

const pingAPI = new API();
const server = http.createServer();
const io = new Server(server);

const child = spawn("node", ["./src/TBNProxy.js"]);
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stdout);

app.whenReady().then(() => {
    const window = new BrowserWindow({
        width: 800,
        height: 500
    });
    window.setResizable(false);
    window.setMenu(null);
    window.loadFile("./desktop-views/index.html");
});

let proxyID = -1;
io.on("connection", (socket) => {
    console.log("Received new client.");
    socket.on("verify", (token) => {
        if (token === "test") {
            io.emit("verified");
        }  else {
            io.emit("failedVerify", "Invalid token.");
        }
    });
    socket.on("authInfo", (link, code) => {
        io.emit("authInfo", link, code);
    });
    socket.on("requestBedrockServerInfo", (ip) => {
        const split = ip.split(":");
        pingAPI.ping(split[0], split[1], (err, res) => {
            io.emit("bedrockServerInfo", res);
        });
    });
    socket.on("proxyFullyConnected", (username) => {
        io.emit("proxyFullyConnected", username);
    });
    socket.on("proxyStart", (address) => {
        io.emit("beginProxy", address);
    });
    socket.on("identifyProxy", () => {
        proxyID = socket.id;
    });
    socket.on("openLink", (link) => {
        open(link);
    });
});

server.listen(3000);