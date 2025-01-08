import CustomForm from "../types/CustomForm.js";
import CheatSetting from "../../cheats/CheatSetting.js";
import TextUtils from "../../utils/TextUtils.js";
import TBNProxy from "../../TBNProxy.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class CheatSettingsForm extends CustomForm {
    constructor(cheat) {
        super(TextUtils.capitalizeFirstLetter(cheat.getName()) + " Settings");
        this.cheat = cheat;
        this.row = [];

        // Add description if available
        if (cheat.getDescription()) {
            this.addLabel(cheat.getDescription() + "\n");
        }

        // Add enable/disable toggle
        this.addToggle("Enabled", cheat.isEnabled());

        // Add settings
        for (const setting of cheat.getSettings()) {
            this.row.push(setting.getName());
            const settingName = TextUtils.capitalizeFirstLetter(setting.getName());
            
            if (setting.getType() === CheatSetting.TYPE_STRING) {
                this.addInput(settingName, setting.getDescription() || "", setting.getValue());
            } 
            else if (setting.getType() === CheatSetting.TYPE_NUMBER) {
                const min = Number(setting.getMin());
                const max = Number(setting.getMax());
                const step = Number(setting.getStep());
                const value = Number(setting.getValue());
                this.addSlider(settingName, min, max, step, value);
            } 
            else if (setting.getType() === CheatSetting.TYPE_ENUM) {
                let current = setting.getEnums().indexOf(setting.getValue());
                this.addDropdown(settingName, setting.getEnums(), current);
            }
        }
    }

    handle(data) {
        const enabled = data.shift();
        let index = 0;
        
        // Update settings
        for (let setting of this.row) {
            setting = this.cheat.getSetting(setting);
            if (setting.getType() === CheatSetting.TYPE_ENUM) {
                setting.setValue(setting.getEnums()[data[index]]);
            } 
            else if (setting.getType() === CheatSetting.TYPE_NUMBER) {
                setting.setValue(Number(data[index]));
            }
            else {
                setting.setValue(data[index]);
            }
            index++;
        }

        // Handle enable/disable state
        if (enabled === "true" && !this.cheat.isEnabled()) {
            this.cheat.enable();
        } else if (enabled !== "true" && this.cheat.isEnabled()) {
            this.cheat.disable();
        } else if (enabled === "true" && this.cheat.isEnabled()) {
            this.cheat.disable();
            this.cheat.enable();
        }

        // Send confirmation message
        ClientPlayer.getInstance().sendMessage(
            `${TBNProxy.CNAME}Updated settings for ${this.cheat.getName()}.`
        );
    }
}

export default CheatSettingsForm;