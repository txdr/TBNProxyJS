import HelpCommand from "./types/HelpCommand.js";
import EnableCommand from "./types/EnableCommand.js";
import DisableCommand from "./types/DisableCommand.js";
import SettingCommand from "./types/SettingCommand.js";

class CommandManager {

    static instance;

    constructor() {
        CommandManager.instance = this;
        this.commands = new Map();
        this.addCommand(new HelpCommand());
        this.addCommand(new EnableCommand());
        this.addCommand(new DisableCommand());
        this.addCommand(new SettingCommand());
    }

    /*** @returns {CommandHandler[]}*/
    getCommands() {
        return Array.from(this.commands.values());
    }

    addCommand(command) {
        this.commands.set(command.getName(), command);
    }

    commandExists(command) {
        return this.commands.has(command);
    }

    getCommand(command) {
        return this.commands.get(command);
    }

    /*** @returns CommandManager*/
    static getInstance() {
        return CommandManager.instance;
    }

};

export default CommandManager;