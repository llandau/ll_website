
export const PageCategories = {
    Personal: "Personal",
    Spiritual: "Spiritual",
    Career: "Career",
}

export const PageSizes = {
    Small: "small",
    Normal: "normal",
    Large: "large",
}

export class Page {
    name = ""
    size = PageSizes.Normal
    category = PageCategories.Personal
    text = ""

    constructor(name, size, category, text) {
        this.name = name;
        this.size = size;
        this.category = category;
        this.text = text;
    }
}
