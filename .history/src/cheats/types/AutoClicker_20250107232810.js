import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import PlayerManager from "../../players/PlayerManager.js";
import Vector3 from "../../math/Vector3.js";

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
        this.addSetting(new CheatSetting(
            "range",
            "Attack range",
            CheatSetting.TYPE_NUMBER,
            4,
            [],
            1,
            1,
            6
        ));
        this.tickCount = 0;
        this.initDelay = 10; // Short delay before starting
    }

    click(player) {
        try {
            // Find closest player to attack
            const pos = player.getPosition();
            const range = this.getSetting("range").getValue();
            let target = null;
            let closest = range;

            // Check all players in range
            for (const otherPlayer of PlayerManager.getInstance().getPlayers()) {
                const dist = Vector3.distance(pos, otherPlayer.getPosition());
                if (dist < closest) {
                    closest = dist;
                    target = otherPlayer;
                }
            }

            // If we found a target, attack it
            if (target) {
                player.player.upstream.queue("inventory_transaction", {
                    transaction: {
                        legacy: {
                            legacy_request_id: 0
                        },
                        actions: [],
                        transaction_type: "item_use_on_entity",
                        transaction_data: {
                            entity_runtime_id: target.getRuntimeID(),
                            action_type: "attack",
                            hotbar_slot: player.getSelectedSlot(),
                            player_pos: pos.toObject(),
                            click_pos: target.getPosition().toObject(),
                            held_item: player.getSelectedItem() || { network_id: 0 }
                        }
                    }
                });
                player.swingArm();
            }
        } catch (error) {
            console.log("[AutoClicker] Error clicking:", error);
        }
    }

    whenEnable() {
        this.tickCount = 0;
        this.initDelay = 10;
    }

    tick() {
        if (!this.isEnabled()) return;

        const player = ClientPlayer.getInstance();
        if (!player) return;

        // Wait for init delay
        if (this.initDelay > 0) {
            this.initDelay--;
            return;
        }

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