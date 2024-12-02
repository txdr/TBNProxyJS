import Vector3 from "../../math/Vector3.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import PacketHandler from "../PacketHandler.js";

class PlayerAuthInput extends PacketHandler {

    handle(params) {
        const clientPlayer = ClientPlayer.getInstance();
        if (!clientPlayer) {
            return {cancelled: false, params: params};
        }
        clientPlayer.setPosition(new Vector3(
            params.position.x,
            params.position.y,
            params.position.z
        ));
        clientPlayer.setInputData(params.input_data);
        clientPlayer.setRotation(params.pitch, params.yaw);
        return {cancelled: false, params: params};
    }

};

export default PlayerAuthInput;