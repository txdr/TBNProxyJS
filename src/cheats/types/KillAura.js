import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";

class KillAura extends CheatHandler {

    constructor() {
        super("killaura", "Hit players & entities around you.");
        this.addSetting(new CheatSetting(
            "maxDistance",
            "The max distance you will hit whilst killaura is enabled",
            CheatSetting.TYPE_NUMBER,
            7.0
        ));
        this.addSetting(new CheatSetting(
            "hitDelay",
            "The delay inbetween the player's hits.",
            CheatSetting.TYPE_NUMBER,
            5
        ));
        this.addSetting(new CheatSetting(
            "filter",
            "What you want to hit.",
            CheatSetting.TYPE_ENUM,
            "all",
            ["all", "players", "animals", "monsters"]
        ));
    }

    tick() {

    }

};

export default KillAura;