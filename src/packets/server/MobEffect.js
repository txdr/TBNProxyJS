import CheatManager from "../../cheats/CheatManager.js";
import PacketHandler from "../PacketHandler.js";

class MobEffect extends PacketHandler {

    handle(params) {
        const cheatManager = CheatManager.getInstance();
        switch(params.effect_id) {
            case 1:
                if (!cheatManager.getCheat("speed").isEnabled()) {
                    break;
                }
                return {cancelled: true, params: params};
        }
        return {cancelled: false, params: params};
    }

};

export default MobEffect;