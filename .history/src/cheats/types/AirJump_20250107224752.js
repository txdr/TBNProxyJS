import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class AirJump extends CheatHandler {
    constructor() {
        super("airjump", "Jump while in the air.");
        this.addSetting(new CheatSetting(
            "height",
            "Jump height multiplier",
            CheatSetting.TYPE_NUMBER,
            1.0,
            [],
            0.1,
            0.1,
            2.0
        ));
    }

    tick() {
        if (!this.isEnabled()) return;

        try {
            const player = ClientPlayer.getInstance();
            if (!player) return;

            const inputData = player.getInputData();
            
            // Check if jump key was pressed
            if (inputData.jump_pressed_raw) {
                const pos = player.getPosition();
                const height = this.getSetting("height").getValue();
                
                // Apply upward velocity by teleporting slightly up
                player.teleport(pos.x, pos.y + (0.42 * height), pos.z);
            }
        } catch (error) {
            console.log("[AirJump] Error in tick:", error);
        }
    }
}

export default AirJump; 