import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class Speed extends CheatHandler {

    constructor() {
        super("speed", "Give yourself the speed effect.");
        this.addSetting(new CheatSetting("modifier", "Change the modifier of the speed effect.", CheatSetting.TYPE_NUMBER, 4, [], 1, 1, 10));
    }

    whenEnable() {
        ClientPlayer.getInstance().addEffect(1, this.getSetting("modifier"), NumberUtils.MAX);
    }

    whenDisable() {
        ClientPlayer.getInstance().removeEffect(1);
    }

    tick() {}

};

export default Speed;