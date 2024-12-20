import pkg from "electron";
const { app, BrowserWindow } = pkg;
import http from "node:http";
import { Server } from "socket.io";
import { spawn } from "child_process";
import { Worker } from "worker_threads";

const rest = () => {
    const server = http.createServer();
    const io = new Server(server);
    let gsocket = null;

    const createWindow = () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600
        })
        win.setMenu(null);
        win.setResizable(false);
        win.loadFile("./desktop-views/index.html")

        const worker = new Worker("./src/TBNProxy.js");
    };

    app.whenReady().then(() => {
        createWindow()
    });
    let mysocket = null;
    let times = 0;

    io.on("connection", (socket) => {
        if (times < 1) {
            mysocket = socket;
            times++;
        }
        gsocket = socket;
        socket.on("begin", (address) => {
            io.emit("beginProxy", address);
        });
        socket.on("proxyConnected", () => {
            io.emit("info", "Initialized contact with proxy service.");
        });
        socket.on("proxyInfo", (info) => {
           io.to(mysocket.id).emit("info", info);
        });
        socket.on("disconnect", () => {

        });
    });

    server.listen(3000);
}

rest();