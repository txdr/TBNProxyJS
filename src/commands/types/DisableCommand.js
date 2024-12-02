import CommandHandler from "../CommandHandler.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import TBNProxy from "../../TBNProxy.js";
import CheatManager from "../../cheats/CheatManager.js";

class DisableCommand extends CommandHandler {

    constructor() {
        super("disable", "Disable a cheat.", "disable (name)");
    }

    execute(args) {
        const clientPlayer = ClientPlayer.getInstance();
        if (args.length < 1) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cPlease provide the name of the cheat you would like to disable.");
            return;
        }
        const cheatManager = CheatManager.getInstance();
        const cheatName = args[0];
        if (!cheatManager.doesCheatExist(cheatName)) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cThere is no cheat with that name.");
            return;
        }
        const cheat = cheatManager.getCheat(cheatName);
        if (!cheat.isEnabled()) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cThat cheat is already disabled.");
            return;
        }
        cheat.disable();
        clientPlayer.sendMessage(TBNProxy.CNAME + `aThe cheat ${cheat.getName()} was successfully disabled.`);
    }

};

export default DisableCommand;