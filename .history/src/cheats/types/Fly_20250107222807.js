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
            1.0,
            [],
            0.1,
            0.1,
            5.0
        ));
    }

    tick() {
        if (!this.isEnabled()) return;

        const player = ClientPlayer.getInstance();
        const inputData = player.getInputData();
        const speed = this.getSetting("speed").getValue();

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

        // Normalize movement vector
        const length = Math.sqrt(moveX * moveX + moveY * moveY + moveZ * moveZ);
        if (length > 0) {
            moveX = (moveX / length) * speed;
            moveY = (moveY / length) * speed;
            moveZ = (moveZ / length) * speed;
        }

        // Apply movement
        const pos = player.getPosition();
        player.setPosition(new Vector3(
            pos.x + moveX,
            pos.y + moveY,
            pos.z + moveZ
        ));
    }
}

export default Fly; 