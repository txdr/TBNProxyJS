class PacketHelper {

    static createSpeedAttributePacket(
        runtimeID,
        current
    ) {
        return {
            runtime_entity_id: runtimeID,
            tick: 0,
            attributes: [
                {
                    min: 0,
                    max: 340282346638528859811704183484516925440,
                    default_min: 0,
                    default_max: 340282346638528859811704183484516925440,
                    default: 0.10000000149011612,
                    name: "minecraft:movement",
                    modifiers: [],
                    current: current
                }
            ]
        }
    }

};

export default PacketHelper;