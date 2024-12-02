class CheatHandler {

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.settings = new Map();
        this.enabled = false;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    enable() {
        this.enabled = true;
        this.whenEnable();
    }

    disable() {
        this.enabled = false;
        this.whenDisable();
    }

    isEnabled() {
        return this.enabled;
    }

    addSetting(setting) {
        this.settings.set(setting.getName(), setting);
    }

    settingExists(name) {
        return this.settings.has(name);
    }

    /**
     * @param name
     * @returns CheatSetting
     */
    getSetting(name) {
        return this.settings.get(name);
    }

    /*** @returns {CheatSetting[]}*/
    getSettings() {
        return Array.from(this.settings.values());
    }

    whenEnable() {}

    whenDisable() {}

    tick() {}

};

export default CheatHandler;