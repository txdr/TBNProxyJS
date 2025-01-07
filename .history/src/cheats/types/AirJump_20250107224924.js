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
                
                // Send movement packet through player connection
                player.player.queue("move_player", {
                    runtime_id: player.getRuntimeID(),
                    position: {
                        x: Number(pos.x),
                        y: Number(pos.y + (0.42 * height)),
                        z: Number(pos.z)
                    },
                    pitch: player.getPitch(),
                    yaw: player.getYaw(),
                    head_yaw: player.getYaw(),
                    mode: "normal",
                    on_ground: false,
                    riding_runtime_id: 0,
                    tick: 0
                });
                
                this.lastJump = currentTime;
            }
        } catch (error) {
            console.log("[AirJump] Error in tick:", error);
        }
    }
}

export default AirJump; 