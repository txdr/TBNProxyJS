import CheatHandler from "../CheatHandler.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class InstantBreak extends CheatHandler {
    constructor() {
        super("instantbreak", "Break blocks instantly.");
    }

    tick() {
        if (!this.isEnabled()) return;

        const player = ClientPlayer.getInstance();
        if (!player) return;

        // Get player's position and looking direction
        const pos = player.getPosition();
        const yaw = player.getYaw() * (Math.PI / 180);
        const pitch = player.getPitch() * (Math.PI / 180);

        // Calculate block position in front of player
        const blockX = Math.floor(pos.x - Math.sin(yaw) * Math.cos(pitch));
        const blockY = Math.floor(pos.y - Math.sin(pitch));
        const blockZ = Math.floor(pos.z + Math.cos(yaw) * Math.cos(pitch));

        // Send break packet
        player.player.upstream.queue("player_auth_input", {
            position: pos.toObject(),
            pitch: player.getPitch(),
            yaw: player.getYaw(),
            head_yaw: player.getYaw(),
            input_data: {
                ...player.getInputData(),
                start_breaking: true,
                break_block: {
                    x: blockX,
                    y: blockY,
                    z: blockZ
                }
            }
        });

        // Visual feedback
        player.swingArm();
    }
}

export default InstantBreak; 