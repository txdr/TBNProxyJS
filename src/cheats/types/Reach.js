import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";

class Reach extends CheatHandler {

    constructor() {
        super("reach", "Extend your reach.");
        this.addSetting(new CheatSetting(
            "distance",
            "How far you can reach in blocks.",
            CheatSetting.TYPE_NUMBER,
            5.0
        ));
    }

};

export default Reach;