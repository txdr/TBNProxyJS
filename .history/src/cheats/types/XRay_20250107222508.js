import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class XRay extends CheatHandler {

    constructor() {
        super("xray", "See valuable blocks through walls.");
        
        // Default blocks to highlight
        this.blocks = [
            "minecraft:diamond_ore",
            "minecraft:deepslate_diamond_ore",
            "minecraft:ancient_debris",
            "minecraft:emerald_ore",
            "minecraft:deepslate_emerald_ore",
            "minecraft:gold_ore",
            "minecraft:deepslate_gold_ore",
            "minecraft:iron_ore",
            "minecraft:deepslate_iron_ore",
            "minecraft:copper_ore",
            "minecraft:deepslate_copper_ore",
            "minecraft:lapis_ore",
            "minecraft:deepslate_lapis_ore",
            "minecraft:redstone_ore",
            "minecraft:deepslate_redstone_ore",
            "minecraft:nether_gold_ore",
            "minecraft:nether_quartz_ore",
            "minecraft:coal_ore",
            "minecraft:deepslate_coal_ore"
        ];

        this.addSetting(new CheatSetting(
            "opacity",
            "Opacity of non-highlighted blocks (0 = invisible, 100 = solid)",
            CheatSetting.TYPE_NUMBER,
            10,
            [],
            1,
            0,
            100
        ));

        this.addSetting(new CheatSetting(
            "range",
            "How far to check for blocks",
            CheatSetting.TYPE_NUMBER,
            32,
            [],
            1,
            8,
            64
        ));

        this.addSetting(new CheatSetting(
            "highlight_mode",
            "How to highlight blocks",
            CheatSetting.TYPE_ENUM,
            "outline",
            ["outline", "glow", "both"]
        ));
    }

    whenEnable() {
        const player = ClientPlayer.getInstance();
        // Apply night vision to see better
        player.addEffect(16, 0, 999999);
        
        // Send XRay settings to client
        player.queue("set_block_property", {
            blocks: this.blocks,
            opacity: this.getSetting("opacity").getValue() / 100,
            range: this.getSetting("range").getValue(),
            highlight_mode: this.getSetting("highlight_mode").getValue()
        });
    }

    whenDisable() {
        const player = ClientPlayer.getInstance();
        // Remove night vision
        player.removeEffect(16);
        
        // Reset block rendering
        player.queue("set_block_property", {
            blocks: [],
            opacity: 1,
            range: 0,
            highlight_mode: "none"
        });
    }

    tick() {
        // Update XRay settings if they change while enabled
        if (this.isEnabled()) {
            const player = ClientPlayer.getInstance();
            player.queue("set_block_property", {
                blocks: this.blocks,
                opacity: this.getSetting("opacity").getValue() / 100,
                range: this.getSetting("range").getValue(),
                highlight_mode: this.getSetting("highlight_mode").getValue()
            });
        }
    }
}

export default XRay; 