import MenuForm from "../types/MenuForm.js";
import CheatManager from "../../cheats/CheatManager.js";
import CheatSettingsForm from "./CheatSettingsForm.js";
import TextUtils from "../../utils/TextUtils.js";

class HomeForm extends MenuForm {
    constructor() {
        super("TBNClient", "Select a cheat to configure");
        
        // Organize cheats into categories
        const categories = {
            Combat: ["reach", "hitbox", "killaura", "knockback"],
            Movement: ["speed", "airjump"],
            Visual: ["nightvision"],
            Player: ["regeneration"]
        };

        // Add cheats by category
        for (const [category, cheats] of Object.entries(categories)) {
            // Add category header as a non-clickable button
            this.addButton(`§9§l${category}`, `header_${category.toLowerCase()}`);
            
            for (const cheatName of cheats) {
                const cheat = CheatManager.getInstance().getCheat(cheatName);
                if (cheat) {
                    const status = cheat.isEnabled() ? "§a✔" : "§c✖"; // Green checkmark or red X
                    const description = cheat.getDescription() ? `\n§7${cheat.getDescription()}` : "";
                    this.addButton(
                        `  ${status} §f${TextUtils.capitalizeFirstLetter(cheat.getName())}${description}`,
                        cheat.getName()
                    );
                }
            }
            
            // Add empty button as spacer
            this.addButton("§0-", `spacer_${category.toLowerCase()}`);
        }

        this.addButton("§cClose Menu", "close");
    }

    handle(data) {
        if (data == null || data === "close" || data.startsWith("header_") || data.startsWith("spacer_")) {
            return;
        }
        (new CheatSettingsForm(CheatManager.getInstance().getCheat(data))).send();
    }
}

export default HomeForm;