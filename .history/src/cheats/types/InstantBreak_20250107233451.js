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

        // Send instant break packet
        player.player.upstream.queue("inventory_transaction", {
            transaction: {
                legacy: {
                    legacy_request_id: 0
                },
                actions: [],
                transaction_type: "item_use",
                transaction_data: {
                    action_type: "break_block",
                    position: player.getPosition().toObject(),
                    face: 1,
                    hotbar_slot: player.getSelectedSlot(),
                    held_item: player.getSelectedItem() || { network_id: 0 },
                    player_pos: player.getPosition().toObject(),
                    click_pos: {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5
                    },
                    block_runtime_id: 0
                }
            }
        });
    }
}

export default InstantBreak; 