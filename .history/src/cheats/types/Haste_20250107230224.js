import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class Haste extends CheatHandler {

    constructor() {
        super("haste", "Gives you the haste effect for faster mining.");
        this.addSetting(new CheatSetting(
            "level",
            "Haste effect level (1-3). Higher levels = faster mining.",
            CheatSetting.TYPE_NUMBER,
            1,
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
        // Minecraft effects are 0-based (level 1 = amplifier 0)
        const amplifier = level - 1;
        player.addEffect(3, amplifier, NumberUtils.MAX, false); // 3 is haste effect ID
    }

    whenDisable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        player.removeEffect(3); // Remove haste effect
    }

    tick() {}
}

export default Haste; 