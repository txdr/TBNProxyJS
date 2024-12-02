import PacketHandler from "../PacketHandler.js";
import PlayerManager from "../../players/PlayerManager.js";
import ServerPlayer from "../../players/ServerPlayer.js";
import Vector3 from "../../math/Vector3.js";
import CheatManager from "../../cheats/CheatManager.js";

class AddPlayer extends PacketHandler {

    handle(params) {
        const playerManager = PlayerManager.getInstance();
        playerManager.addPlayer(new ServerPlayer(
            params.uuid,
            params.runtime_id,
            params.username,
            new Vector3(
                params.position.x,
                params.position.y,
                params.position.z,
            ),
            params.pitch,
            params.yaw
        ));
        const hitbox = CheatManager.getInstance().getCheat("hitbox");
        if (hitbox.isEnabled()) {
            playerManager.getPlayerByRuntimeID(params.runtime_id).setHitBox(
                hitbox.getSetting("width").getValue(),
                hitbox.getSetting("height").getValue(),
            );
        }
        return {cancelled: false, params: params};
    }

}

export default AddPlayer;