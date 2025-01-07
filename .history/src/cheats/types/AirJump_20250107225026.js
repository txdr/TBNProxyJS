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
        this.lastJump = 0;
    }

    tick() {
        if (!this.isEnabled()) return;

        try {
            const player = ClientPlayer.getInstance();
            if (!player) return;

            const inputData = player.getInputData();
            const currentTime = Date.now();
            
            // Check if jump key was pressed and enforce a small cooldown
            if (inputData.jump_pressed_raw && currentTime - this.lastJump > 200) {
                const pos = player.getPosition();
                const height = this.getSetting("height").getValue();
                
                // Use teleport with explicit number conversions
                const newX = Number(pos.x);
                const newY = Number(pos.y) + (0.42 * Number(height));
                const newZ = Number(pos.z);
                
                player.teleport(newX, newY, newZ);
                this.lastJump = currentTime;
            }
        } catch (error) {
            console.log("[AirJump] Error in tick:", error);
        }
    }
}

export default AirJump; 