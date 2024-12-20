import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";

class Knockback extends CheatHandler {

    constructor() {
        super("knockback", "Change the knockback you receive.");
        this.addSetting(new CheatSetting(
            "horizontal",
            "Horizontal modifier",
            CheatSetting.TYPE_NUMBER,
            2,
            [],
            0.1,
            -5,
            5
        ));
        this.addSetting(new CheatSetting(
            "vertical",
            "Vertical modifier",
            CheatSetting.TYPE_NUMBER,
            2,
            [],
            0.1,
            -5,
            5
        ));
    }

};

export default Knockback;