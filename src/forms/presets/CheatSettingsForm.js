import CustomForm from "../types/CustomForm.js";
import CheatSetting from "../../cheats/CheatSetting.js";
import TextUtils from "../../utils/TextUtils.js";
import TBNProxy from "../../TBNProxy.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class CheatSettingsForm extends CustomForm {

    /*** @param {CheatHandler} cheat*/
    constructor(cheat) {
        super(cheat.getName() + " Settings");
        this.cheat = cheat;
        this.row = [];
        this.addToggle("Enabled", cheat.isEnabled());
        for (const setting of cheat.getSettings()) {
            this.row.push(setting.getName());
            if (setting.getType() === CheatSetting.TYPE_STRING) {
                this.addInput(TextUtils.capitalizeFirstLetter(setting.getName()), "", setting.getValue());
            } else if (setting.getType() === CheatSetting.TYPE_NUMBER) {
                this.addSlider(TextUtils.capitalizeFirstLetter(setting.getName()), setting.getMin(), setting.getMax(), setting.getStep(), setting.getValue());
            } else if (setting.getType() === CheatSetting.TYPE_ENUM) {
                let current = 0;
                for (const e of setting.getEnums()) {
                    if (e === setting.getValue()) {
                        break;
                    }
                    current++;
                }
                this.addDropdown(TextUtils.capitalizeFirstLetter(setting.getName()), setting.getEnums(), current);
            }
        }
    }

    handle(data) {
        const enabled = data.shift();
        let index = 0;
        for (let setting of this.row) {
            setting = this.cheat.getSetting(setting)
            if (setting.getType() === CheatSetting.TYPE_ENUM) {
                setting.setValue(setting.getEnums()[data[index]]);
                index++;
                continue;
            }
            setting.setValue(data[index]);
            index++;
        }
        if (enabled == "true") {
            this.cheat.enable();
        } else {
            this.cheat.disable();
        }
        ClientPlayer.getInstance().sendMessage(TBNProxy.CNAME + "aChanged settings for &e" + this.cheat.getName() + "&a.");
    }

};

export default CheatSettingsForm;