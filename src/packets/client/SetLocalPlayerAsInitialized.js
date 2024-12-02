import ClientPlayer from "../../players/ClientPlayer.js";
import TBNProxy from "../../TBNProxy.js";
import PacketHandler from "../PacketHandler.js";

class SetLocalPlayerAsInitialized extends PacketHandler {

    handle(params) {
        new ClientPlayer(TBNProxy.getInstance().getPlayer(), params.runtime_entity_id);
        const clientPlayer = ClientPlayer.getInstance();
        clientPlayer.sendToast("&r&l&cTBN&fProxy", `&r&fVersion ${TBNProxy.CURRENT_VERSION} | &7(use ${TBNProxy.CMD_PREFIX}help)`);
        return {cancelled: false, params: params};
    }

};

export default SetLocalPlayerAsInitialized;