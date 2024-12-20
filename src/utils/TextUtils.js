class TextUtils {

    static color(text) {
        return text.replaceAll("&", "§");
    }

    static capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

};

export default TextUtils;