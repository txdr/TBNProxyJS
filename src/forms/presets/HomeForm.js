import MenuForm from "../types/MenuForm.js";
import CheatManager from "../../cheats/CheatManager.js";
import CheatSettingsForm from "./CheatSettingsForm.js";
import TextUtils from "../../utils/TextUtils.js";

class HomeForm extends MenuForm {

    constructor() {
        super("TBNClient", "Select a menu to open.");
        for (const cheat of CheatManager.getInstance().getCheats()) {
            this.addButton(`${TextUtils.capitalizeFirstLetter(cheat.getName())}\n${cheat.isEnabled() ? "Enabled" : "Disabled"}`, cheat.getName());
        }
        this.addButton("Close", "close");
    }

    handle(data) {
        if (data == null || data === "close") {
            return;
        }
        (new CheatSettingsForm(CheatManager.getInstance().getCheat(data))).send();
    }

};

export default HomeForm;