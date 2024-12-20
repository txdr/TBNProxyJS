import CommandHandler from "../CommandHandler.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import TBNProxy from "../../TBNProxy.js";
import CheatManager from "../../cheats/CheatManager.js";

class CheatInfoCommand extends CommandHandler {

    constructor() {
        super("cheatinfo", "Get info on a cheat.", "cheatinfo (cheat)");
    }

    execute(args) {
        const clientPlayer = ClientPlayer.getInstance();
        const cheatManager = CheatManager.getInstance();
        if (args.length < 1 || !cheatManager.doesCheatExist(args[0])) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cThere is no cheat with that name.");
            return;
        }
        const cheat = cheatManager.getCheat(args[0]);
        clientPlayer.sendMessage([
            `&c${cheat.getName()} &fInfo`,
            `&fdesc: &c${cheat.getDescription()}`,
            `&fSettings:`,
            ...cheat.getSettings().map((value, index) => {
                return [
                    `&7${index + 1}. &f${value.getName()}`,
                    `&7 - &fdesc: &c${value.getDescription()}`,
                    `&7 - &fCurrent Value: &c${value.getValue()}`
                ].join("\n");
            })
        ].join("\n"));
    }

};

export default CheatInfoCommand;