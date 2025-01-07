import PacketHandler from "../PacketHandler.js";

class SetBlockProperty extends PacketHandler {
    handle(params) {
        // Send block visibility and highlight settings to the client
        return {
            cancelled: false,
            params: {
                type: "set_block_property",
                blocks: params.blocks,
                opacity: params.opacity,
                range: params.range,
                highlight_mode: params.highlight_mode
            }
        };
    }
}

export default SetBlockProperty; 