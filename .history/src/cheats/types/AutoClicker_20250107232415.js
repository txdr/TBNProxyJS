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
        this.initDelay = 10; // Short delay before starting
    }

    click(player) {
        try {
            // Just swing arm to simulate left click
            player.swingArm();
            
            // Send animate packet to both downstream and upstream
            player.player.queue("animate", {
                action_id: "swing_arm",
                runtime_entity_id: player.getRuntimeID()
            });
            player.player.upstream.queue("animate", {
                action_id: "swing_arm",
                runtime_entity_id: player.getRuntimeID()
            });
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