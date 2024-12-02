import CommandHandler from "../CommandHandler.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import CommandManager from "../CommandManager.js";

class HelpCommand extends CommandHandler {

    constructor() {
        super("help", "View a list of all commands & their usages.", "help");
    }

    execute(args) {
        ClientPlayer.getInstance().sendMessage("&r&cTBN&fClient Help\n" +
            CommandManager.getInstance().getCommands().map(
                (value, index) => `&r&7${index + 1}. &f${value.getName()}&7: ${value.getDescription()}`
            ).join("\n")
        );
    }

};

export default HelpCommand;