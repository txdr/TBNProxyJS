class FormManager {

    static CURRENT_ID = 9999999;

    static instance;

    constructor() {
        FormManager.instance = this;
        this.forms = new Map();
    }

    addForm(form) {
        this.forms.set(form.getID(), form);
    }

    removeForm(form) {
        this.forms.delete(form.getID());
    }

    processResponse(id, response) {
        if (this.forms.has(id)) {
            this.forms.get(id).handle(this.forms.get(id).process(response));
        }
    }

    /**
     *
     * @returns {FormManager}
     */
    static getInstance() {
        return FormManager.instance;
    }

    static nextID() {
        FormManager.CURRENT_ID++;
        return FormManager.CURRENT_ID;
    }

};

export default FormManager;