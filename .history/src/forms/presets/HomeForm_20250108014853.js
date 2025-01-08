import MenuForm from "../types/MenuForm.js";
import CheatManager from "../../cheats/CheatManager.js";
import CheatSettingsForm from "./CheatSettingsForm.js";
import TextUtils from "../../utils/TextUtils.js";

class CategoryForm extends MenuForm {
    constructor(title, cheats, prefix, icon) {
        super(`§l${icon} ${title}`, "§b§lAvailable Cheats:");
        this.addCheatsToForm(cheats, prefix);
        this.addButton("§l§8« §r§7Back to Menu§l§8 »", "back");
    }

    addCheatsToForm(cheatNames, prefix) {
        for (const name of cheatNames) {
            const cheat = CheatManager.getInstance().getCheat(name);
            if (cheat) {
                const status = cheat.isEnabled() ? "§l§aENABLED" : "§l§cDISABLED";
                this.addButton(`§l${prefix}${TextUtils.capitalizeFirstLetter(cheat.getName())}\n§r${status}`, cheat.getName());
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
        super("§l§b✧ §d§lTBNClient §b§l✧", "§e§lSelect a Category:");
        
        this.addButton("§l§c⚔ COMBAT §r§7\n§l➥ §r§7Reach, KillAura, HitBox", "combat");
        this.addButton("§l§a➜ MOVEMENT §r§7\n§l➥ §r§7Speed, AirJump", "movement");
        this.addButton("§l§b👁 VISUAL §r§7\n§l➥ §r§7NightVision", "visual");
        this.addButton("§l§d❤ PLAYER §r§7\n§l➥ §r§7Regeneration", "player");
        this.addButton("§l§8« §r§7Close Menu§l§8 »", "close");
    }

    handle(data) {
        if (data == null || data === "close") {
            return;
        }

        const categories = {
            combat: {
                title: "§cCOMBAT",
                cheats: ["reach", "hitbox", "killaura", "knockback"],
                prefix: "§c⚔ ",
                icon: "⚔"
            },
            movement: {
                title: "§aMOVEMENT",
                cheats: ["speed", "airjump"],
                prefix: "§a➜ ",
                icon: "➜"
            },
            visual: {
                title: "§bVISUAL",
                cheats: ["nightvision"],
                prefix: "§b👁 ",
                icon: "👁"
            },
            player: {
                title: "§dPLAYER",
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