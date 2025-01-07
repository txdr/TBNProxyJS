import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class AutoBreak extends CheatHandler {
    constructor() {
        super("autobreak", "Automatically breaks blocks you look at.");
        this.addSetting(new CheatSetting(
            "delay",
            "Delay between breaks (ticks)",
            CheatSetting.TYPE_NUMBER,
            1,
            [],
            1,
            1,
            20
        ));
        this.tickCount = 0;
    }

    breakBlock(player) {
        try {
            // Visual feedback
            player.swingArm();
            
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
                        block_position: {
                            x: Math.floor(player.getPosition().x),
                            y: Math.floor(player.getPosition().y - 1),
                            z: Math.floor(player.getPosition().z)
                        },
                        face: 1,
                        hotbar_slot: player.getSelectedSlot(),
                        held_item: player.getSelectedItem() || { network_id: 0 },
                        player_position: player.getPosition().toObject(),
                        click_position: {
                            x: 0.5,
                            y: 0.5,
                            z: 0.5
                        }
                    }
                }
            });
        } catch (error) {
            console.log("[AutoBreak] Error breaking block:", error);
        }
    }

    tick() {
        if (!this.isEnabled()) return;

        const player = ClientPlayer.getInstance();
        if (!player) return;

        // Only break on the specified delay
        this.tickCount++;
        if (this.tickCount < this.getSetting("delay").getValue()) {
            return;
        }
        this.tickCount = 0;

        this.breakBlock(player);
    }
}

export default AutoBreak; 