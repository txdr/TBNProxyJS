import PacketHandler from "../PacketHandler.js";
import CheatManager from "../../cheats/CheatManager.js";

class SetEntityMotion extends PacketHandler {

    handle(params) {
        const cheat = CheatManager.getInstance().getCheat("knockback");
        if (cheat.isEnabled()) {
            const horizontal = cheat.getSetting("horizontal").getValue();
            const vertical = cheat.getSetting("vertical").getValue();
            params.velocity.x /= horizontal;
            params.velocity.y /= vertical;
            params.velocity.z /= horizontal;
        }
        return {cancelled: false, params: params};
    }

};

export default SetEntityMotion;