import CheatHandler from "../CheatHandler.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class NightVision extends CheatHandler {

    constructor() {
        super("nightvision", "Gives you night vision to see in the dark.");
    }

    whenEnable() {
        // Effect ID 16 is Night Vision
        ClientPlayer.getInstance().addEffect(16, 0, NumberUtils.MAX);
    }

    whenDisable() {
        ClientPlayer.getInstance().removeEffect(16);
    }

    tick() {}
}

export default NightVision; 