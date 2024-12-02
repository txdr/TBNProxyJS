import Reach from "./types/Reach.js";
import HitBox from "./types/HitBox.js";
import Speed from "./types/Speed.js";
import KillAura from "./types/KillAura.js";

class CheatManager {

    static instance;

    constructor() {
        CheatManager.instance = this;
        this.cheats = new Map();
        this.addCheat(new Reach());
        this.addCheat(new HitBox());
        this.addCheat(new Speed());
        this.addCheat(new KillAura());
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