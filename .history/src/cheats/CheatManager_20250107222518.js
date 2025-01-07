import Reach from "./types/Reach.js";
import HitBox from "./types/HitBox.js";
import Speed from "./types/Speed.js";
import KillAura from "./types/KillAura.js";
import Knockback from "./types/Knockback.js";
import OreTP from "./types/OreTP.js";
import Haste from "./types/Haste.js";
import NightVision from "./types/NightVision.js";
import XRay from "./types/XRay.js";

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
        this.addCheat(new Haste());
        this.addCheat(new NightVision());
        this.addCheat(new XRay());
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