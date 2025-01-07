import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class AirJump extends CheatHandler {
    constructor() {
        super("airjump", "Gives you jump boost effect.");
        this.addSetting(new CheatSetting(
            "level",
            "Jump boost level (1-10). Higher levels = higher jumps.",
            CheatSetting.TYPE_NUMBER,
            3,
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
        // In Minecraft, effect amplifier is 0-based (level 1 = amplifier 0)
        // We also multiply the level to make the effect more noticeable
        const amplifier = (level * 2) - 1;
        player.addEffect(8, amplifier, NumberUtils.MAX, false); // 8 is jump boost effect ID
    }

    whenDisable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        player.removeEffect(8); // Remove jump boost effect
    }

    tick() {}
}

export default AirJump; 