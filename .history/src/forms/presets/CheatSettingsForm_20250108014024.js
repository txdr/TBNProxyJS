import CustomForm from "../types/CustomForm.js";
import CheatSetting from "../../cheats/CheatSetting.js";
import TextUtils from "../../utils/TextUtils.js";
import TBNProxy from "../../TBNProxy.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class CheatSettingsForm extends CustomForm {
    constructor(cheat) {
        super(`§l§b${cheat.getName()} Settings`);
        this.cheat = cheat;
        this.row = [];

        // Add description if available
        if (cheat.getDescription()) {
            this.addLabel(`§7${cheat.getDescription()}\n`);
        }

        // Add enable/disable toggle with colored status
        const status = cheat.isEnabled() ? "§aEnabled" : "§cDisabled";
        this.addToggle(`${status} §f- Toggle ${cheat.getName()}`, cheat.isEnabled());

        // Add separator
        if (cheat.getSettings().length > 0) {
            this.addLabel("\n§l§bSettings");
        }

        // Add settings with improved formatting
        for (const setting of cheat.getSettings()) {
            this.row.push(setting.getName());
            const settingName = TextUtils.capitalizeFirstLetter(setting.getName());
            
            if (setting.getType() === CheatSetting.TYPE_STRING) {
                this.addInput(`§f${settingName}`, setting.getDescription() || "", setting.getValue());
            } 
            else if (setting.getType() === CheatSetting.TYPE_NUMBER) {
                const range = `§7(${setting.getMin()}-${setting.getMax()})`;
                this.addSlider(`§f${settingName} ${range}`, setting.getMin(), setting.getMax(), setting.getStep(), setting.getValue());
            } 
            else if (setting.getType() === CheatSetting.TYPE_ENUM) {
                let current = setting.getEnums().indexOf(setting.getValue());
                this.addDropdown(`§f${settingName}`, setting.getEnums(), current);
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
            } else {
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
            `${TBNProxy.CNAME}§aUpdated settings for §e${this.cheat.getName()}§a.`
        );
    }
}

export default CheatSettingsForm;