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
            5,
            [],
            1,
            1,
            20
        ));
        this.tickCount = 0;
        this.initDelay = 20; // Wait 20 ticks before starting
        this.maxBreaksPerTick = 5; // Limit breaks per tick to prevent packet spam
    }

    breakBlock(player, x, y, z) {
        try {
            // Create a fake block entity to break
            const blockPos = new Vector3(x, y, z);
            const fakeBlock = {
                getRuntimeID() { return 0; },
                getPosition() { return blockPos; }
            };
            player.hit(fakeBlock);
            player.swingArm();
        } catch (error) {
            console.log("[Nuke] Error breaking block:", error);
        }
    }

    whenEnable() {
        this.tickCount = 0;
        this.initDelay = 20;
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

        // Only break blocks on the specified delay
        this.tickCount++;
        if (this.tickCount < this.getSetting("delay").getValue()) {
            return;
        }
        this.tickCount = 0;

        const radius = this.getSetting("radius").getValue();
        const pos = player.getPosition();

        let breaksThisTick = 0;

        // Break blocks in a sphere around the player
        for (let x = -radius; x <= radius && breaksThisTick < this.maxBreaksPerTick; x++) {
            for (let y = -radius; y <= radius && breaksThisTick < this.maxBreaksPerTick; y++) {
                for (let z = -radius; z <= radius && breaksThisTick < this.maxBreaksPerTick; z++) {
                    // Check if the point is within our sphere
                    if (x * x + y * y + z * z <= radius * radius) {
                        const blockX = Math.floor(pos.x) + x;
                        const blockY = Math.floor(pos.y) + y;
                        const blockZ = Math.floor(pos.z) + z;
                        
                        this.breakBlock(player, blockX, blockY, blockZ);
                        breaksThisTick++;
                    }
                }
            }
        }
    }
}

export default Nuke; 