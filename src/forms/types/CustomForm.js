import Form from "./Form.js";

class CustomForm extends Form {

    constructor(title) {
        super();
        this.data["type"] = "custom_form";
        this.data["title"] = title;
        this.data["content"] = [];
    }

    addLabel(text) {
        this.data["content"].push({
            "type": "label",
            "text": text
        });
    }

    addToggle(text, defaultValue = false) {
        this.data["content"].push({
            "type": "toggle",
            "text": text,
            "default": defaultValue
        });
    }

    addSlider(text, min, max, step, defaultValue) {
        this.data["content"].push({
            "type": "slider",
            "text": text,
            "min": min,
            "max": max,
            "step": step,
            "default": defaultValue
        });
    }

    addDropdown(text, options, defaultValue = 0) {
        this.data["content"].push({
            "type": "dropdown",
            "text": text,
            "options": options,
            "default": defaultValue
        });
    }

    addInput(text, placeholder, defaultValue) {
        this.data["content"].push({
            "type": "input",
            "text": text,
            "placeholder": placeholder,
            "default": defaultValue
        });
    }

    process(response) {
        response = response.replace("\n", "");
        response = response.replaceAll("[", "");
        response = response.replaceAll("]", "");
        response = response.split(",");
        let newResponse = [];
        for (const part of response) {
            if (isNaN(part)) {
                newResponse.push(part);
                continue;
            }
            newResponse.push(parseFloat(part));
        }
        return newResponse;
    }

};

export default CustomForm;