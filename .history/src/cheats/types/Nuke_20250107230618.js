import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import Vector3 from "../../math/Vector3.js";

class Nuke extends CheatHandler {
    constructor() {
        super("nuke", "Break blocks in an area around you.");
        this.addSetting(new CheatSetting(
            "radius",
            "Break radius around player",
            CheatSetting.TYPE_NUMBER,
            3,
            [],
            1,
            1,
            5
        ));
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

    tick() {
        if (!this.isEnabled()) return;

        const player = ClientPlayer.getInstance();
        if (!player) return;

        // Only break blocks on the specified delay
        this.tickCount++;
        if (this.tickCount < this.getSetting("delay").getValue()) {
            return;
        }
        this.tickCount = 0;

        const radius = this.getSetting("radius").getValue();
        const pos = player.getPosition();

        // Break blocks in a sphere around the player
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                for (let z = -radius; z <= radius; z++) {
                    // Check if the point is within our sphere
                    if (x * x + y * y + z * z <= radius * radius) {
                        const blockX = Math.floor(pos.x) + x;
                        const blockY = Math.floor(pos.y) + y;
                        const blockZ = Math.floor(pos.z) + z;
                        
                        // Send block break packet
                        player.player.queue("inventory_transaction", {
                            transaction: {
                                legacy: {
                                    legacy_request_id: 0
                                },
                                transaction_type: "item_use",
                                actions: [],
                                transaction_data: {
                                    action_type: "break_block",
                                    block_position: {
                                        x: blockX,
                                        y: blockY,
                                        z: blockZ
                                    },
                                    face: 1,
                                    hotbar_slot: player.getSelectedSlot(),
                                    held_item: player.getSelectedItem() || { network_id: 0 },
                                    player_pos: pos.toObject(),
                                    click_pos: {
                                        x: 0.5,
                                        y: 0.5,
                                        z: 0.5
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
    }
}

export default Nuke; 