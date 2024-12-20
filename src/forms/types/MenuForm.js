import Form from "./Form.js";

class MenuForm extends Form {

    constructor(title, content) {
        super();
        this.data["title"] = title;
        this.data["content"] = content;
        this.data["buttons"] = [];
        this.labels = new Map();
    }

    process(response) {
        if (response == null) {
            return null;
        }
        return this.labels.get(parseInt(response.replace("\n", ""))) ?? null;
    }

    addButton(text, label) {
        this.data["buttons"].push({"text": text});
        this.labels.set(this.data["buttons"].length - 1, label);
    }

};

export default MenuForm;