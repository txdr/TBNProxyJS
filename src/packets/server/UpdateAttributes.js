import ClientPlayer from "../../players/ClientPlayer.js";
import TBNProxy from "../../TBNProxy.js";
import PacketHandler from "../PacketHandler.js";
import CheatManager from "../../cheats/CheatManager.js";

class UpdateAttributes extends PacketHandler {

    handle(params) {
        const speed = CheatManager.getInstance().getCheat("speed");
        if (speed.isEnabled()) {
            if (params.attributes > 0.11) {
                params.attributes[0].current = 0.12 + (0.04 * speed.getSetting("modifier").getValue());
            } else {
                params.attributes[0].current = 0.10 + (0.04 * speed.getSetting("modifier").getValue());
            }
            return {cancelled: false, params: params};
        }
        return {cancelled: false, params: params};
    }

};

export default UpdateAttributes;