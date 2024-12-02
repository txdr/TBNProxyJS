class EntityManager {

    static instance;

    constructor() {
        EntityManager.instance = this;
        this.entities = new Map();
    }

    addEntity(entity) {
        this.entities.set(entity.getRuntimeID(), entity);
    }

    getEntities() {
        return Array.from(this.entities.values());
    }

    getEntitiesOfTypes(types) {
        const entities = [];
        for (const type of types) {
            entities.push(...this.getEntitiesOfType(type));
        }
        return entities;
    }

    getEntitiesOfType(type) {
        const entities = [];
        for (const entity of this.getEntities()) {
            if (entity.getType() === type) {
                entities.push(entity);
            }
        }
        return entities;
    }

    removeEntity(entity) {
        if (!entity || !this.entities.has(entity.getRuntimeID())) {
            return;
        }
        this.entities.delete(entity.getRuntimeID());
    }

    getEntity(runtimeID) {
        return this.entities.get(runtimeID);
    }

    /**
     *
     * @returns {EntityManager}
     */
    static getInstance() {
        return EntityManager.instance;
    }

};

export default EntityManager;