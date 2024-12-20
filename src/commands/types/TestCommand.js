import CommandHandler from "../CommandHandler.js";

class TestCommand extends CommandHandler {

    constructor() {
        super("test", "No description.", "test");
    }

    execute(args) {

    }

};

export default TestCommand;