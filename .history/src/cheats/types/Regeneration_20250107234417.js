import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import NumberUtils from "../../utils/NumberUtils.js";

class Regeneration extends CheatHandler {
    constructor() {
        super("regeneration", "Gives you regeneration effect to heal over time.");
        this.addSetting(new CheatSetting(
            "level",
            "Regeneration level (1-3). Higher levels = faster healing.",
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
        const amplifier = level - 1;
        player.addEffect(10, amplifier, NumberUtils.MAX, false); 
    }

    whenDisable() {
        const player = ClientPlayer.getInstance();
        if (!player) return;
        
        player.removeEffect(10); // Remove regeneration effect
    }

    tick() {}
}

export default Regeneration; 