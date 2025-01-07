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
        player.player.upstream.queue("inventory_transaction", {
            transaction: {
                legacy: {
                    legacy_request_id: 0
                },
                actions: [],
                transaction_type: "item_use",
                transaction_data: {
                    action_type: "break_block",
                    position: {
                        x: blockX,
                        y: blockY,
                        z: blockZ
                    },
                    face: 1,
                    hotbar_slot: player.getSelectedSlot(),
                    held_item: player.getSelectedItem() || { network_id: 0 },
                    player_pos: pos,
                    click_pos: {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5
                    }
                }
            }
        });

        // Visual feedback
        player.swingArm();
    }
}

export default InstantBreak; 