
export const PageCategories = {
    General: "General",
    Spiritual: "Spiritual",
    Career: "Career",
}

export class Page {
    id = ""
    name = ""
    weight = 50 // 0 to 100
    category = PageCategories.General
    text = ""

    constructor(name, weight, category, text) {
        this.id = name.toLowerCase()
        this.name = name;
        this.weight = weight;
        this.category = category;
        this.text = text;
    }
}
