import { Relay } from "bedrock-protocol";
import config from "../config/config.json" with { type: "json" };
import PacketManager from "./packets/PacketManager.js";
import PlayerManager from "./players/PlayerManager.js";
import CommandManager from "./commands/CommandManager.js";
import CheatManager from "./cheats/CheatManager.js";
import EntityManager from "./entites/EntityManager.js";

class TBNProxy {

    static instance;

    static CMD_PREFIX;
    
    static CURRENT_VERSION = "v1.0-BETA";

    static CNAME = "&r&cTBN&fClient &r&";

    constructor() {
        TBNProxy.instance = this;

        this.player = null;
        TBNProxy.CMD_PREFIX = config.prefix;
        this.packetManager = new PacketManager();
        new PlayerManager();
        new EntityManager();
        new CommandManager();
        this.cheatManager = new CheatManager();

        this.relay = new Relay({
            version: "1.21.42",
            host: "127.0.0.1",
            port: 19132,
            destination: {
                host: config.host,
                port: config.port
            }
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

BigInt.prototype.toJSON = function() { return this.toString() }
new TBNProxy();
export default TBNProxy;