import PacketHandler from "../PacketHandler.js";
import HomeForm from "../../forms/presets/HomeForm.js";

class CommandRequest extends PacketHandler {

    handle(params) {
        if (params.command === "/tbnui") {
            (new HomeForm()).send();
            return {cancelled: true, params: params};
        }
        return {cancelled: false, params: params};
    }

};

export default CommandRequest;