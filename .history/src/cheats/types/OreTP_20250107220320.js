import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import Vector3 from "../../math/Vector3.js";

class OreTP extends CheatHandler {

    constructor() {
        super("oretp", "Teleport to ores when mining them.");
        this.addSetting(new CheatSetting(
            "range",
            "Maximum teleport range in blocks.",
            CheatSetting.TYPE_NUMBER,
            50.0,
            [],
            1.0,
            1,
            100
        ));
        
        // List of ore block names to check for
        this.oreBlocks = [
            "minecraft:diamond_ore",
            "minecraft:iron_ore",
            "minecraft:gold_ore",
            "minecraft:emerald_ore",
            "minecraft:lapis_ore",
            "minecraft:redstone_ore",
            "minecraft:coal_ore",
            "minecraft:copper_ore",
            "minecraft:deepslate_diamond_ore",
            "minecraft:deepslate_iron_ore", 
            "minecraft:deepslate_gold_ore",
            "minecraft:deepslate_emerald_ore",
            "minecraft:deepslate_lapis_ore",
            "minecraft:deepslate_redstone_ore",
            "minecraft:deepslate_coal_ore",
            "minecraft:deepslate_copper_ore",
            "minecraft:nether_gold_ore",
            "minecraft:nether_quartz_ore",
            "minecraft:ancient_debris"
        ];
    }

    onBlockBreak(blockName, position) {
        if (!this.isEnabled()) return;
        
        // Check if broken block is an ore
        if (this.oreBlocks.includes(blockName)) {
            const player = ClientPlayer.getInstance();
            const playerPos = player.getPosition();
            
            // Check if ore is within range
            const distance = Vector3.distance(playerPos, position);
            if (distance <= this.getSetting("range").getValue()) {
                // Teleport player to ore location
                player.teleport(position.x, position.y + 1, position.z);
                player.sendMessage("&r&aTeleported to " + blockName);
            }
        }
    }
}

export default OreTP; 