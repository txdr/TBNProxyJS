import MenuForm from "../types/MenuForm.js";
import CheatManager from "../../cheats/CheatManager.js";
import CheatSettingsForm from "./CheatSettingsForm.js";
import TextUtils from "../../utils/TextUtils.js";

class CategoryForm extends MenuForm {
    constructor(title, cheats, prefix, icon) {
        super(`${icon} ${title}`, "§b§lSelect a cheat to configure:");
        this.addCheatsToForm(cheats, prefix);
        this.addButton("§7Back to Menu", "back");
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
        if (data == null || data === "back") {
            new HomeForm().send();
            return;
        }
        new CheatSettingsForm(CheatManager.getInstance().getCheat(data)).send();
    }
}

class HomeForm extends MenuForm {
    constructor() {
        super("§l§bTBNClient", "§e§lSelect a category:");
        
        this.addButton("§c⚔ Combat\n§7Reach, KillAura, etc.", "combat");
        this.addButton("§a➜ Movement\n§7Speed, AirJump, etc.", "movement");
        this.addButton("§b👁 Visual\n§7NightVision", "visual");
        this.addButton("§d❤ Player\n§7Regeneration", "player");
        this.addButton("§7Close Menu", "close");
    }

    handle(data) {
        if (data == null || data === "close") {
            return;
        }

        const categories = {
            combat: {
                title: "Combat",
                cheats: ["reach", "hitbox", "killaura", "knockback"],
                prefix: "§c⚔ ",
                icon: "⚔"
            },
            movement: {
                title: "Movement",
                cheats: ["speed", "airjump"],
                prefix: "§a➜ ",
                icon: "➜"
            },
            visual: {
                title: "Visual",
                cheats: ["nightvision"],
                prefix: "§b👁 ",
                icon: "👁"
            },
            player: {
                title: "Player",
                cheats: ["regeneration"],
                prefix: "§d❤ ",
                icon: "❤"
            }
        };

        const category = categories[data];
        if (category) {
            new CategoryForm(category.title, category.cheats, category.prefix, category.icon).send();
        }
    }
}

export default HomeForm;