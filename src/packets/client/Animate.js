    import ClientPlayer from "../../players/ClientPlayer.js";
import PacketHandler from "../PacketHandler.js";

class Animate extends PacketHandler {

    handle(params) {
        const clientPlayer = ClientPlayer.getInstance();
        switch(params.action_id) {
            case "swing_arm":
                clientPlayer?.onSwing();
            break;
        }
        return {cancelled: false, params: params};
    }

};

export default Animate;