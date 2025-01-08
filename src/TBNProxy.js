import { Relay } from "bedrock-protocol";
import config from "../config/config.json" with { type: "json" };
import PacketManager from "./packets/PacketManager.js";
import PlayerManager from "./players/PlayerManager.js";
import CommandManager from "./commands/CommandManager.js";
import CheatManager from "./cheats/CheatManager.js";
import EntityManager from "./entites/EntityManager.js";
import FormManager from "./forms/FormManager.js";
import { connect } from "socket.io-client";

class TBNProxy {

    static instance;

    static CMD_PREFIX;
    
    static CURRENT_VERSION = "v1.0-BETA";

    static CNAME = "&r&cTBN&fClient &r&";

    static io = null;

    static afterFirst = false;

    constructor(io, address, port = 19132, afterFirst = false) {
        TBNProxy.io = io;
        TBNProxy.instance = this;
        TBNProxy.afterFirst = afterFirst;

        this.player = null;
        this.port = port;
        TBNProxy.CMD_PREFIX = config.prefix;
        this.packetManager = new PacketManager();
        new PlayerManager();
        new EntityManager();
        new CommandManager();
        new FormManager();
        this.cheatManager = new CheatManager();

        const split = address.split(":");
        this.relay = new Relay({
            version: "1.21.50",
            host: "127.0.0.1",
            port: port,
            destination: {
                host: split[0],
                port: parseInt(split[1])
            },
            onMsaCode: (data, client) => {
                io.emit("authInfo", data.verification_uri, data.user_code);
            },
        });
        this.relay.listen();

        this.relay.on("connect", (player) => {
            this.player = player;

            // server -> client
            player.on("clientbound", ({name, params}, des) => {
                const handled = this.packetManager.handlePacket(name, params, PacketManager.TO_CLIENT);
                des.canceled = true;
                if (handled.cancelled) {
                    return;
                }
                player.queue(name, handled.params);
            });

            // client -> server
            player.on("serverbound", ({name, params}, des) => {
                const handled = this.packetManager.handlePacket(name, params, PacketManager.TO_SERVER);
                des.canceled = true;
                if (handled.cancelled) {
                    return;
                }
                player.upstream.queue(name, handled.params);
            });
        })

        setInterval(() => {
            for (const cheat of this.cheatManager.getCheats()) {
                if (!cheat.isEnabled()) {
                    continue;
                }
                cheat.tick();
            }
        }, (1000 / 50));
    }

    /*** @returns TBNProxy*/
    static getInstance() {
        return TBNProxy.instance;
    }

    getPlayer() {
        return this.player;
    }

    newProxy(address, port) {
        this.port += 2;
        setTimeout(() => {
            new TBNProxy(TBNProxy.io, `${address}:${port}`, this.port, true);
            this.relay.close();
        }, 2000);
        return this.port;
    }

};

BigInt.prototype.toJSON = function() { return this.toString() };

function start() {
    const socket = connect("http://localhost:3000");
    socket.on("connect", () => {
        socket.emit("identifyProxy");
    });
    socket.on("beginProxy", (address) => {
        new TBNProxy(socket, address);
    });
}

start();

export default TBNProxy;


















