import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class AirJump extends CheatHandler {
    constructor() {
        super("airjump", "Gives you jump boost effect.");
        this.addSetting(new CheatSetting(
            "level",
            "Jump boost level (1-3). Higher levels = higher jumps.",
            CheatSetting.TYPE_NUMBER,
            2,
            [],
            1,
            1,
            3
        ));
    }

    whenEnable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        const level = this.getSetting("level").getValue();
        const amplifier = (level * 2) - 1;
        player.addEffect(8, amplifier, NumberUtils.MAX, false); 
    }

    whenDisable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        player.removeEffect(8); 
    }

    tick() {}
}

export default AirJump; 