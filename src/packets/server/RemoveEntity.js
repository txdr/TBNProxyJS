import PlayerManager from "../../players/PlayerManager.js";
import PacketHandler from "../PacketHandler.js";
import EntityManager from "../../entites/EntityManager.js";

class RemoveEntity extends PacketHandler {

    handle(params) {
        const playerManager = PlayerManager.getInstance();
        if (playerManager.doesPlayerWithRuntimeIDExist(params.entity_id_self)) {
            playerManager.removePlayer(playerManager.getPlayerByRuntimeID(params.entity_id_self));
            return {cancelled: false, params: params};
        }
        EntityManager.getInstance().removeEntity(EntityManager.getInstance().getEntity(params.entity_id_self));
        return {cancelled: false, params: params};
    }

};

export default RemoveEntity;