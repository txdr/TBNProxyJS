import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class AutoClicker extends CheatHandler {
    constructor() {
        super("autoclicker", "Automatically clicks to attack/break.");
        this.addSetting(new CheatSetting(
            "cps",
            "Clicks per second",
            CheatSetting.TYPE_NUMBER,
            10,
            [],
            1,
            1,
            20
        ));
        this.tickCount = 0;
    }

    click(player) {
        try {
            // Always swing and send attack packet
            player.swingArm();
            player.player.upstream.queue("inventory_transaction", {
                transaction: {
                    legacy: {
                        legacy_request_id: 0
                    },
                    actions: [],
                    transaction_type: "item_use_on_entity",
                    transaction_data: {
                        entity_runtime_id: 0,
                        action_type: "attack",
                        hotbar_slot: player.getSelectedSlot(),
                        player_pos: player.getPosition().toObject(),
                        click_pos: player.getPosition().toObject(),
                        held_item: player.getSelectedItem() || { network_id: 0 }
                    }
                }
            });
        } catch (error) {
            console.log("[AutoClicker] Error clicking:", error);
        }
    }

    tick() {
        if (!this.isEnabled()) return;

        const player = ClientPlayer.getInstance();
        if (!player) return;

        // Calculate ticks between clicks based on CPS
        const ticksBetweenClicks = Math.floor(20 / this.getSetting("cps").getValue());

        // Only click on the specified delay
        this.tickCount++;
        if (this.tickCount < ticksBetweenClicks) {
            return;
        }
        this.tickCount = 0;

        this.click(player);
    }
}

export default AutoClicker; 