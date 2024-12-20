import FormManager from "../FormManager.js";
import TBNProxy from "../../TBNProxy.js";

class Form {

    constructor() {
        this.id = FormManager.nextID();
        FormManager.getInstance().addForm(this);
        this.data = {};
        this.data["type"] = "form";
    }

    getID() {
        return this.id;
    }

    send() {
        TBNProxy.getInstance().getPlayer().queue("modal_form_request", {
            "form_id": this.getID(),
            "data": JSON.stringify(this.data)
        });
    }

    getData() {
        return this.data;
    }

    // data will be different depending on the type of form.
    handle(data) {}

    process(response) {

    }

};

export default Form;