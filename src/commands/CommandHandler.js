class CommandHandler {

    constructor(name, description, usage) {
        this.name = name;
        this.description = description;
        this.usage = usage;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getUsage() {
        return this.usage;
    }

    execute(args) {}

};

export default CommandHandler;