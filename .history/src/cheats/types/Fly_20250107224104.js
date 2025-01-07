import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import Vector3 from "../../math/Vector3.js";

class Fly extends CheatHandler {

    constructor() {
        super("fly", "Enables creative-like flight.");
        this.addSetting(new CheatSetting(
            "speed",
            "Flight speed multiplier",
            CheatSetting.TYPE_NUMBER,
            0.5,
            [],
            0.1,
            0.1,
            2.0
        ));
    }

    tick() {
        if (!this.isEnabled()) return;

        try {
            const player = ClientPlayer.getInstance();
            if (!player) {
                console.log("[Fly] Player instance is null");
                return;
            }

            const inputData = player.getInputData();
            console.log("[Fly] Input data:", JSON.stringify(inputData));

            const speed = this.getSetting("speed").getValue();
            console.log("[Fly] Current speed:", speed);

            // Calculate movement direction based on input
            let moveX = 0;
            let moveY = 0;
            let moveZ = 0;

            // Forward/backward movement
            if (inputData.forward) moveZ -= Math.cos(player.getYaw() * Math.PI / 180);
            if (inputData.forward) moveX -= Math.sin(player.getYaw() * Math.PI / 180);
            if (inputData.back) moveZ += Math.cos(player.getYaw() * Math.PI / 180);
            if (inputData.back) moveX += Math.sin(player.getYaw() * Math.PI / 180);

            // Left/right movement
            if (inputData.left) moveZ -= Math.cos((player.getYaw() + 90) * Math.PI / 180);
            if (inputData.left) moveX -= Math.sin((player.getYaw() + 90) * Math.PI / 180);
            if (inputData.right) moveZ += Math.cos((player.getYaw() + 90) * Math.PI / 180);
            if (inputData.right) moveX += Math.sin((player.getYaw() + 90) * Math.PI / 180);

            // Up/down movement
            if (inputData.jump) moveY += 1;
            if (inputData.sneak) moveY -= 1;

            console.log("[Fly] Raw movement:", {moveX, moveY, moveZ});

            // Normalize movement vector and apply speed
            const length = Math.sqrt(moveX * moveX + moveY * moveY + moveZ * moveZ);
            if (length > 0) {
                moveX = (moveX / length) * speed;
                moveY = (moveY / length) * speed;
                moveZ = (moveZ / length) * speed;
            }

            console.log("[Fly] Normalized movement:", {moveX, moveY, moveZ});

            // Apply movement
            const pos = player.getPosition();
            console.log("[Fly] Current position:", pos);

            const newX = pos.x + moveX;
            const newY = pos.y + moveY;
            const newZ = pos.z + moveZ;

            console.log("[Fly] New position:", {newX, newY, newZ});

            try {
                player.teleport(newX, newY, newZ);
                console.log("[Fly] Teleport successful");
            } catch (e) {
                console.log("[Fly] Teleport error:", e);
            }

        } catch (error) {
            console.log("[Fly] Error in tick:", error);
        }
    }
}

export default Fly; 