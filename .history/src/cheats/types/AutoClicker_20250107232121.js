import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import Vector3 from "../../math/Vector3.js";

class AutoClicker extends CheatHandler {
    constructor() {
        super("autoclicker", "Automatically clicks/breaks blocks in front of you.");
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
            "Click range",
            CheatSetting.TYPE_NUMBER,
            4,
            [],
            1,
            1,
            5
        ));
        this.tickCount = 0;
        this.initDelay = 10; // Short delay before starting
    }

    click(player) {
        try {
            // Get block position in front of player
            const pos = player.getPosition();
            const yaw = player.getYaw() * (Math.PI / 180);
            const pitch = player.getPitch() * (Math.PI / 180);
            const range = this.getSetting("range").getValue();

            // Calculate target position based on where player is looking
            const x = pos.x - Math.sin(yaw) * Math.cos(pitch) * range;
            const y = pos.y - Math.sin(pitch) * range;
            const z = pos.z + Math.cos(yaw) * Math.cos(pitch) * range;

            // Create target position
            const targetPos = new Vector3(x, y, z);
            const target = {
                getRuntimeID() { return 0; },
                getPosition() { return targetPos; }
            };

            player.hit(target);
            player.swingArm();
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