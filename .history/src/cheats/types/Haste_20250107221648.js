import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class Haste extends CheatHandler {

    constructor() {
        super("haste", "Gives you the haste effect for faster mining.");
        this.addSetting(new CheatSetting(
            "level",
            "Haste effect level (1-10). Higher levels = faster mining.",
            CheatSetting.TYPE_NUMBER,
            1,
            [],
            1,
            1,
            10
        ));
    }

    whenEnable() {
        const level = this.getSetting("level").getValue();
        ClientPlayer.getInstance().addEffect(3, level - 1, NumberUtils.MAX);
    }

    whenDisable() {
        ClientPlayer.getInstance().removeEffect(3);
    }

    tick() {}
}

export default Haste; 