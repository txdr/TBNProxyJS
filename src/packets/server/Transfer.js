import PacketHandler from "../PacketHandler.js";
import PlayerManager from "../../players/PlayerManager.js";
import ServerPlayer from "../../players/ServerPlayer.js";
import Vector3 from "../../math/Vector3.js";
import CheatManager from "../../cheats/CheatManager.js";
import TBNProxy from "../../TBNProxy.js";

class Transfer extends PacketHandler {

    handle(params) {
        const port = TBNProxy.getInstance().newProxy(params.server_address, params.port);
        params.server_address = "127.0.0.1";
        params.port = port;
        return {cancelled: false, params: params};
    }

}

export default Transfer;