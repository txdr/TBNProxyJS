import PacketHandler from "../PacketHandler.js";
import PlayerManager from "../../players/PlayerManager.js";
import ServerPlayer from "../../players/ServerPlayer.js";
import Vector3 from "../../math/Vector3.js";
import CheatManager from "../../cheats/CheatManager.js";

class Transfer extends PacketHandler {

    handle(params) {

        return {cancelled: false, params: params};
    }

}

export default Transfer;