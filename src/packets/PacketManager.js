import Animate from "./client/Animate.js";
import MobEquipment from "./client/MobEquipment.js";
import PlayerAuthInput from "./client/PlayerAuthInput.js";
import SetLocalPlayerAsInitialized from "./client/SetLocalPlayerAsInitialized.js";
import AddPlayer from "./server/AddPlayer.js";
import MoveEntity from "./server/MoveEntity.js";
import Text from "./client/Text.js";
import RemoveEntity from "./server/RemoveEntity.js";
import UpdateAttributes from "./server/UpdateAttributes.js";
import MobEffect from "./server/MobEffect.js";
import AddEntity from "./server/AddEntity.js";
import SetEntityMotion from "./server/SetEntityMotion.js";
import CommandRequest from "./client/CommandRequest.js";
import ModalFormResponse from "./client/ModalFormResponse.js";
import Transfer from "./server/Transfer.js";

class PacketManager {

    static TO_SERVER = 0;
    static TO_CLIENT = 1;

    constructor() {
        this.clientboundHandlers = new Map();
        this.clientboundHandlers.set("add_player", new AddPlayer());
        this.clientboundHandlers.set("move_entity", new MoveEntity());
        this.clientboundHandlers.set("remove_entity", new RemoveEntity());
        this.clientboundHandlers.set("update_attributes", new UpdateAttributes());
        this.clientboundHandlers.set("mob_effect", new MobEffect());
        this.clientboundHandlers.set("add_entity", new AddEntity());
        this.clientboundHandlers.set("set_entity_motion", new SetEntityMotion());
        this.clientboundHandlers.set("transfer", new Transfer());

        this.serverboundHandlers = new Map();
        this.serverboundHandlers.set("set_local_player_as_initialized", new SetLocalPlayerAsInitialized());
        this.serverboundHandlers.set("player_auth_input", new PlayerAuthInput());
        this.serverboundHandlers.set("mob_equipment", new MobEquipment());
        this.serverboundHandlers.set("animate", new Animate());
        this.serverboundHandlers.set("text", new Text());
        this.serverboundHandlers.set("command_request", new CommandRequest());
        this.serverboundHandlers.set("modal_form_response", new ModalFormResponse());
    }

    handlePacket(name, params, type) {
        if (type === PacketManager.TO_SERVER) {
            if (!this.serverboundHandlers.has(name)) {
                return {cancelled: false, params: params};
            }
            return this.serverboundHandlers.get(name).handle(params);
        }
        if (!this.clientboundHandlers.has(name)) {
            return {cancelled: false, params: params};
        }
        return this.clientboundHandlers.get(name).handle(params);
    }
    
};

export default PacketManager;