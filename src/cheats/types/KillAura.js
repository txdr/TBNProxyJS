import CheatHandler from "../CheatHandler.js";
import CheatSetting from "../CheatSetting.js";
import PlayerManager from "../../players/PlayerManager.js";
import EntityManager from "../../entites/EntityManager.js";
import Vector3 from "../../math/Vector3.js";
import ClientPlayer from "../../players/ClientPlayer.js";

class KillAura extends CheatHandler {

    constructor() {
        super("killaura", "Hit players & entities around you.");
        this.lastTick = 0;
        this.addSetting(new CheatSetting(
            "maxDistance",
            "The max distance you will hit whilst killaura is enabled",
            CheatSetting.TYPE_NUMBER,
            7.0,
            [],
            0.01,
            2,
            7
        ));
        this.addSetting(new CheatSetting(
            "hitDelay",
            "The delay inbetween the player's hits.",
            CheatSetting.TYPE_NUMBER,
            5,
            [],
            1,
            1,
            50
        ));
        this.addSetting(new CheatSetting(
            "filter",
            "What you want to hit.",
            CheatSetting.TYPE_ENUM,
            "all",
            ["all", "players", "animals", "monsters"]
        ));
        this.addSetting(new CheatSetting(
            "maxHit",
            "Max to hit per revolution.",
            CheatSetting.TYPE_NUMBER,
            3,
            [],
            1,
            1,
            20
        ));
    }

    tick() {
        if (this.lastTick < this.getSetting("hitDelay").getValue()) {
            this.lastTick++;
            return;
        }
        this.lastTick = 0;

        let toHit = [];
        switch(this.getSetting("filter").getValue()) {
            case "all":
                toHit = [
                    ...PlayerManager.getInstance().getPlayers(),
                    ...EntityManager.getInstance().getEntities()
                ];
                break;
            case "players":
                toHit = PlayerManager.getInstance().getPlayers()
                break;
            case "animals":
                toHit = EntityManager.getInstance().getEntitiesOfTypes([
                    "minecraft:pig"
                ]);
                break;
            case "monsters":
                toHit = EntityManager.getInstance().getEntitiesOfTypes([
                    "minecraft:zombie"
                ])
                break;
        }

        let hit = 0;
        const clientPlayer = ClientPlayer.getInstance();
        for (const thing of toHit) {
            if (Vector3.distance(thing.getPosition(), clientPlayer.getPosition()) > this.getSetting("maxDistance").getValue()) {
                continue;
            }
            hit++;
            clientPlayer.swingArm();
            clientPlayer.hit(thing);
            if (hit > this.getSetting("maxHit").getValue()) {
                break;
            }
        }
    }

};

export default KillAura;