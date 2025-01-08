import Vector3 from "../math/Vector3.js";
import TextUtils from "../utils/TextUtils.js";
import TBNProxy from "../TBNProxy.js";
import CommandManager from "../commands/CommandManager.js";
import AxisAlignedBB from "../math/AxisAlignedBB.js";
import PlayerManager from "./PlayerManager.js";
import CheatManager from "../cheats/CheatManager.js";

class ClientPlayer {

    static instance;

    constructor(player, runtimeID) {
        ClientPlayer.instance = this;
        this.player = player;
        this.runtimeID = runtimeID;
        this.position = new Vector3(0, 0, 0);
        this.pitch = 0;
        this.yaw = 0;
        this.selectedSlot = 0;
        this.selectedItem = null;
        this.aabb = new AxisAlignedBB(this.position, 0.6, 2);
        this.inputData = {};
    }

    addDefaultAttribute(name, params) {

    }

    getAxisAlignedBB() {
        return this.aabb;
    }

    setHandItem(slot, item) {
        this.selectedSlot = slot;
        this.selectedItem = item;
    }

    setInputData(data) {
        this.inputData = data;
    }

    getInputData() {
        return this.inputData;
    }

    getSelectedSlot() {
        return this.selectedSlot;
    }

    getSelectedItem() {
        return this.selectedItem;
    }

    getPosition() {
        return this.position;
    }

    setPosition(vector3) {
        this.position = vector3;
        this.aabb = new AxisAlignedBB(this.position, 0.6, 2);
    }
    
    setRotation(pitch, yaw) {
        this.pitch = pitch;
        this.yaw = yaw;
    }

    getPitch() {
        return this.pitch;
    }

    getYaw() {
        return this.yaw;
    }

    getRuntimeID() {
        return this.runtimeID;
    }

    swingArm() {
        this.player.queue("animate", {
            action_id: "swing_arm",
            runtime_entity_id: this.runtimeID,
        });
        this.player.upstream.queue("animate", {
            action_id: "swing_arm",
            runtime_entity_id: this.runtimeID,
        });
    }

    hit(player) {
        this.player.upstream.queue("inventory_transaction", {
            transaction: {
                legacy: {
                    legacy_request_id: 0
                },
                actions: [],
                transaction_type: "item_use_on_entity",
                transaction_data: {
                    entity_runtime_id: player.getRuntimeID(),
                    action_type: "attack",
                    hotbar_slot: this.selectedSlot,
                    player_pos: this.position.toObject(),
                    click_pos: player.getPosition().toObject(),
                    held_item: this.selectedItem || { network_id: 0 },

                }
            }
        });
    }



    onSwing() {
        const reach = CheatManager.getInstance().getCheat("reach");
        if (!reach.isEnabled()) {
            return;
        }
        let currentPlayer = null;
        let currentDistance = Infinity;
        let maxDistance = reach.getSetting("distance").getValue();
        for (const player of PlayerManager.getInstance().getPlayers()) {
            const cast = AxisAlignedBB.rayCastFromHead(
                this.position,
                this.yaw,
                this.pitch,
                player.getAxisAlignedBB()
            );
            if (cast == null || cast > maxDistance || cast > currentDistance) {
                continue;
            }
            currentPlayer = player;
            currentDistance = cast;
        }
        if (currentPlayer !== null) {
            this.swingArm();
            this.hit(currentPlayer);
        }
    }

    removeEffect(id) {
        this.player.queue("mob_effect", {
            runtime_entity_id: this.runtimeID,
            event_id: "remove",
            duration: 0,
            tick: 0,
            particles: false,
            effect_id: id
        });
    }

    addEffect(id, amplifier, duration, particles = false) {
        this.player.queue("mob_effect", {
            runtime_entity_id: this.runtimeID,
            event_id: "add",
            duration: duration,
            tick: 0,
            particles: particles,
            effect_id: id
        });
    }

    onMessage(text) {
        if (text.startsWith(TBNProxy.CMD_PREFIX)) {
            const split = text.slice(1).split(" ");
            const commandManager = CommandManager.getInstance();
            const command = split[0];
            split.shift();
            if (commandManager.commandExists(command)) {
                commandManager.getCommand(command).execute(split);
                return true;
            }
        }
        return false;
    }

    sendMessage(text, type = "raw", source_name = "") {
        this.player.queue("text", {
            type: type,
            needs_translation: false,
            source_name: TextUtils.color(source_name),
            message: TextUtils.color(text),
            platform_chat_id: "",
            filtered_message: "",
            xuid: ""
        });
    }

    sendToast(title, message) {
        this.player.queue("toast_request", {
            title: TextUtils.color(title),
            message: TextUtils.color(message)
        });
    }

    transfer(address, port) {
        this.player.queue("transfer", {
            server_address: address,
            port: port,
            reload_world: false
        })
    }

    /*** @returns ClientPlayer*/
    static getInstance() {
        return ClientPlayer.instance;
    }

};

export default ClientPlayer;