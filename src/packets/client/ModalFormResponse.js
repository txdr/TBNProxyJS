import PacketHandler from "../PacketHandler.js";
import FormManager from "../../forms/FormManager.js";

class ModalFormResponse extends PacketHandler {

    handle(params) {
        if (!params.has_response_data || params.data === undefined) {
            return {cancelled: false, params: params};
        }
        FormManager.getInstance().processResponse(params.form_id, params.data);
        return {cancelled: false, params: params};
    }

};

export default ModalFormResponse;