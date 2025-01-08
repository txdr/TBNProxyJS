import PacketHandler from "../PacketHandler.js";
import CheatManager from "../../cheats/CheatManager.js";
import Vector3 from "../../math/Vector3.js";

class InventoryTransaction extends PacketHandler {
    handle(params) {
        if (params.transaction?.transaction_type === "item_use") {
            const data = params.transaction.transaction_data;
            if (data.action_type === "break_block") {
                const position = new Vector3(
                    data.position.x,
                    data.position.y,
                    data.position.z
                );
                
                const oreTP = CheatManager.getInstance().getCheat("oretp");
                if (oreTP) {
                    oreTP.onBlockBreak(data.block_runtime_id, position);
                }
            }
        }
        return {cancelled: false, params: params};
    }
}

export default InventoryTransaction; 