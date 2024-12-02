class PlayerManager {

    static instance;

    constructor() {
        PlayerManager.instance = this;
        this.players = new Map();
        this.usernameToRuntimeID = new Map();
    }

    addPlayer(player) {
        this.players.set(player.getRuntimeID(), player);
        this.usernameToRuntimeID.set(player.getUsername(), player.getRuntimeID());
    }

    removePlayerByRuntimeID(runtimeID) {
        this.removePlayer(this.players.get(runtimeID));
    } 

    removePlayer(player) {
        if (!player || !player.getUsername()) {
            return;
        }
        this.usernameToRuntimeID.delete(player.getUsername());
        this.players.delete(player.getRuntimeID());
    }
    
    getPlayerByRuntimeID(runtimeID) {
        return this.players.get(runtimeID);
    }

    doesPlayerWithUsernameExist(username) {
        return this.usernameToRuntimeID.has(username);
    }

    getPlayerByUsername(username) {
        return this.players.get(this.usernameToRuntimeID.get(username));
    }

    doesPlayerWithRuntimeIDExist(runtime_Id) {
        return this.players.has(runtime_Id);
    }

    /*** @returns {ServerPlayer[]}*/
    getPlayers() {
        return Array.from(this.players.values());
    }

    /*** @returns PlayerManager*/
    static getInstance() {
        return PlayerManager.instance;
    }

};

export default PlayerManager;