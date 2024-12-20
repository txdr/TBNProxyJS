class CheatSetting {

    static TYPE_STRING = 0;
    static TYPE_ENUM = 1;
    static TYPE_NUMBER = 2;

    constructor(name, description, type, defaultValue, enums = [], step = 0, min = 0, max = 0) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.value = defaultValue;
        this.enums = enums;
        this.step = step;
        this.min = min;
        this.max = max;
    }

    getEnums() {
        return this.enums;
    }

    getStep() {
        return this.step;
    }

    getMin() {
        return this.min;
    }

    getMax() {
        return this.max;
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