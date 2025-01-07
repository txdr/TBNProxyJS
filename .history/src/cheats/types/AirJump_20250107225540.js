import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class AirJump extends CheatHandler {
    constructor() {
        super("airjump", "Gives you jump boost effect.");
        this.addSetting(new CheatSetting(
            "level",
            "Jump boost level",
            CheatSetting.TYPE_NUMBER,
            1,
            [],
            1,
            1,
            10
        ));
    }

    whenEnable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        const level = this.getSetting("level").getValue();
        player.addEffect(8, NumberUtils.MAX, level - 1, false); // 8 is jump boost effect ID
    }

    whenDisable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        player.removeEffect(8); // Remove jump boost effect
    }

    tick() {}
}

export default AirJump; 