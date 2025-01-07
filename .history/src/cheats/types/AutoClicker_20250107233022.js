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
                player.hit(target);
                player.swingArm();
            }
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