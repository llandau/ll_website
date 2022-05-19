
export const PageCategories = {
    General: "General",
    Spiritual: "Spiritual",
    Career: "Career",
}

export class Page {
    name = ""
    weight = 50 // 0 to 100
    category = PageCategories.General
    text = ""

}
