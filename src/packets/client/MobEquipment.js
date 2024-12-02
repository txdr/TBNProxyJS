import ClientPlayer from "../../players/ClientPlayer.js";
import PacketHandler from "../PacketHandler.js";

class MobEquipment extends PacketHandler {

    handle(params) {
        const clientPlayer = ClientPlayer.getInstance();
        if (!clientPlayer) {
            return {cancelled: false, params: params};
        }
        clientPlayer.setHandItem(params.selected_slot, params.item);
        return {cancelled: false, params: params};
    }

};

export default MobEquipment;