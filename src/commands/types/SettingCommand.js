import CommandHandler from "../CommandHandler.js";
import ClientPlayer from "../../players/ClientPlayer.js";
import TBNProxy from "../../TBNProxy.js";
import CheatManager from "../../cheats/CheatManager.js";

class SettingCommand extends CommandHandler {

    constructor() {
        super("setting", "Change a setting of a cheat.", "setting (name) (settingName) (newValue)");
    }

    execute(args) {
        const clientPlayer = ClientPlayer.getInstance();
        if (args.length < 3) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cPlease provide a cheat name, setting name, and new value.");
            return;
        }
        let cheat = args[0];
        let setting = args[1];
        const value = args[2];
        const cheatManager = CheatManager.getInstance();
        if (!cheatManager.doesCheatExist(cheat)) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cThere is no cheat with that name.");
            return;
        }
        cheat = cheatManager.getCheat(cheat);
        if (!cheat.settingExists(setting)) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cThere is no setting with that name.");
            return;
        }
        setting = cheat.getSetting(setting);
        if (!setting.validate(value)) {
            clientPlayer.sendMessage(TBNProxy.CNAME + "cIncorrect value provided.");
            return;
        }
        setting.setValue(value);
        clientPlayer.sendMessage(TBNProxy.CNAME + "aSuccessfully changed value.");
    }

};

export default SettingCommand;