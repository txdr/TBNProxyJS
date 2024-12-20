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

    constructor(io, address) {
        TBNProxy.io = io;
        TBNProxy.instance = this;

        this.player = null;
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
            port: 19132,
            destination: {
                host: split[0],
                port: parseInt(split[1])
            },
            onMsaCode: (data, client) => {
                io.emit("proxyInfo", `Please verify @ <a href=\"${data.verification_uri}?otc=${data.user_code}\">${data.verification_uri}?otc=${data.user_code}</ahref>`);
                client.queue("disconnect", {
                    reason: "disconnected",
                    hide_disconnect_reason: false,
                    message: `Please sign in via microsoft.`
                });
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

        console.log(`TBNProxy is running.\nHost: 127.0.0.1:19132\nDestination: ${config.host}:${config.port}`);
    }

    /*** @returns TBNProxy*/
    static getInstance() {
        return TBNProxy.instance;
    }

    getPlayer() {
        return this.player;
    }


};

BigInt.prototype.toJSON = function() { return this.toString() };

function start() {
    const socket = connect("http://localhost:3000");
    socket.on("connect", () => {
        console.log("TBNClient socket connected.");
        socket.emit("proxyConnected");
    });
    socket.on("beginProxy", (address) => {
        new TBNProxy(socket, address);
    });
}
start();

export default TBNProxy;

