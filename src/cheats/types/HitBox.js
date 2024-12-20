import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import PlayerManager from "../../players/PlayerManager.js";
import ServerPlayer from "../../players/ServerPlayer.js";

class HitBox extends CheatHandler {

    constructor() {
        super("hitbox", "Expand other player's hitboxes.");
        this.addSetting(new CheatSetting(
            "width",
            "Width of the hitboxes.",
            CheatSetting.TYPE_NUMBER,
            0.7,
            [],
            0.01,
            0.01,
            5
        ));
        this.addSetting(new CheatSetting(
            "height",
            "Height of the hitboxes.",
            CheatSetting.TYPE_NUMBER,
            2.1,
            [],
            0.01,
            0.01,
            5
        ));
    }

    whenEnable() {
        for (const player of PlayerManager.getInstance().getPlayers()) {
            player.setHitBox(this.getSetting("width").getValue(), this.getSetting("height").getValue());
        }
    }

    whenDisable() {
        for (const player of PlayerManager.getInstance().getPlayers()) {
            player.setHitBox(ServerPlayer.DEFAULT_WIDTH, ServerPlayer.DEFAULT_HEIGHT);
        }
    }

};

export default HitBox;