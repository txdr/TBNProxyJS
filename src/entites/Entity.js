class Entity {

    constructor(unique_id, runtime_id, type, position) {
        this.unique_id = unique_id;
        this.runtime_id = runtime_id;
        this.type = type;
        this.position = position;
    }

    getUniqueID() {
        return this.unique_id;
    }

    getRuntimeID() {
        return this.runtime_id;
    }

    getType() {
        return this.type;
    }

    getPosition() {
        return this.position;
    }

    setPosition(vector) {
        this.position = vector;
    }

};

export default Entity;