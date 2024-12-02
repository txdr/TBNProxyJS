class CheatSetting {

    static TYPE_STRING = 0;
    static TYPE_ENUM = 1;
    static TYPE_NUMBER = 2;

    constructor(name, description, type, defaultValue, enums = []) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.value = defaultValue;
        this.enums = enums;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getType() {
        return this.type;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    validate(input) {
        switch(this.type) {
            case CheatSetting.TYPE_STRING:
                return true;
                break;
            case CheatSetting.TYPE_ENUM:
                return this.enums.includes(input);
                break;
            case CheatSetting.TYPE_NUMBER:
                return !isNaN(input);
                break;
        }
        return false;
    }

};

export default CheatSetting;