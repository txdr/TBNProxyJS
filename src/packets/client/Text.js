import ClientPlayer from "../../players/ClientPlayer.js";
import PacketHandler from "../PacketHandler.js";

class Text extends PacketHandler {

    handle(params) {
        return {cancelled: ClientPlayer.getInstance().onMessage(params.message), params: params};
    }

};

export default Text;