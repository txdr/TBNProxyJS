import MenuForm from "../types/MenuForm.js";
import CheatManager from "../../cheats/CheatManager.js";
import CheatSettingsForm from "./CheatSettingsForm.js";
import TextUtils from "../../utils/TextUtils.js";

class HomeForm extends MenuForm {
    constructor() {
        super("TBNClient", "§b§lSelect a cheat to configure:");
        
        // Combat
        const combatCheats = ["reach", "hitbox", "killaura", "knockback"];
        this.addCheatsToForm(combatCheats, "§c⚔ ");
        
        // Movement
        const movementCheats = ["speed", "airjump"];
        this.addCheatsToForm(movementCheats, "§a➜ ");
        
        // Visual
        const visualCheats = ["nightvision"];
        this.addCheatsToForm(visualCheats, "§b👁 ");
        
        // Player
        const playerCheats = ["regeneration"];
        this.addCheatsToForm(playerCheats, "§d❤ ");
        
        this.addButton("§7Close Menu", "close");
    }

    addCheatsToForm(cheatNames, prefix) {
        for (const name of cheatNames) {
            const cheat = CheatManager.getInstance().getCheat(name);
            if (cheat) {
                const status = cheat.isEnabled() ? "§aEnabled" : "§cDisabled";
                this.addButton(`${prefix}${TextUtils.capitalizeFirstLetter(cheat.getName())}\n${status}`, cheat.getName());
            }
        }
    }

    handle(data) {
        if (data == null || data === "close") {
            return;
        }
        (new CheatSettingsForm(CheatManager.getInstance().getCheat(data))).send();
    }
}

export default HomeForm;