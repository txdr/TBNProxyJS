import Reach from "./types/Reach.js";
import HitBox from "./types/HitBox.js";
import Speed from "./types/Speed.js";
import KillAura from "./types/KillAura.js";
import Knockback from "./types/Knockback.js";
import OreTP from "./types/OreTP.js";
import InstantBreak from "./types/InstantBreak.js";
import NightVision from "./types/NightVision.js";
import AirJump from "./types/AirJump.js";
import Regeneration from "./types/Regeneration.js";
import AutoClicker from "./types/AutoClicker.js";

class CheatManager {

    static instance;

    constructor() {
        CheatManager.instance = this;
        this.cheats = new Map();
        this.addCheat(new Reach());
        this.addCheat(new HitBox());
        this.addCheat(new Speed());
        this.addCheat(new KillAura());
        this.addCheat(new Knockback());
        this.addCheat(new OreTP());
        this.addCheat(new InstantBreak());
        this.addCheat(new NightVision());
        this.addCheat(new AirJump());
        this.addCheat(new Regeneration());
        this.addCheat(new AutoClicker());
    }

    addCheat(cheat) {
        this.cheats.set(cheat.getName(), cheat);
    }

    doesCheatExist(name) {
        return this.cheats.has(name);
    }

    /*** @returns {CheatHandler[]}*/
    getCheats() {
        return Array.from(this.cheats.values());

    }

    /**
     * @param name
     * @returns CheatHandler
     */
    getCheat(name) {
        return this.cheats.get(name);
    }

    /*** @returns CheatManager*/
    static getInstance() {
        return CheatManager.instance;
    }

};

export default CheatManager;