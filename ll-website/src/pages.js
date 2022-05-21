
import {Page, PageCategories} from "./page.js"

export const pages = {
    "java": 
        new Page(
            "Java", 
            70, 
            PageCategories.Career, 
            "My first love – as far as programming languages go"
        ),
    "php": 
        new Page(
            "PHP", 
            70, 
            PageCategories.Career, 
            "LAMP stack anyone...?"
        ),
    "python": 
        new Page(
            "Python", 
            70, 
            PageCategories.Career, 
            "Nobody expects the Spanish Inquisition!"
        ),
}
