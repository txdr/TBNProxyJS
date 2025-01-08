import ClientPlayer from "../../players/ClientPlayer.js";
import TBNProxy from "../../TBNProxy.js";
import PacketHandler from "../PacketHandler.js";

class SetLocalPlayerAsInitialized extends PacketHandler {

    handle(params) {
        new ClientPlayer(TBNProxy.getInstance().getPlayer(), params.runtime_entity_id);
        if (!TBNProxy.afterFirst) {
            TBNProxy.io.emit("proxyFullyConnected", TBNProxy.getInstance().getPlayer().profile.name);
        }
        const clientPlayer = ClientPlayer.getInstance();
        if (!TBNProxy.afterFirst) {
            clientPlayer.sendToast("&r&l&cTBN&fProxy", `&r&fVersion ${TBNProxy.CURRENT_VERSION} | &7(use ${TBNProxy.CMD_PREFIX}help for a list of commands.)`);
        } else {
            clientPlayer.sendToast("&r&l&cTBN&fProxy", `&r&fVersion ${TBNProxy.CURRENT_VERSION} | &7Transfer successful.`);
        }
        return {cancelled: false, params: params};
    }

};

export default SetLocalPlayerAsInitialized;