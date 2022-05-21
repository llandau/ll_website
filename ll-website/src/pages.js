
import {Page, PageCategories, PageSizes} from "./page.js"

export const pages = {
    "java": 
        new Page(
            "Java", 
            PageSizes.Normal, 
            PageCategories.Career, 
            "My first love – as far as programming languages go"
        ),
    "php": 
        new Page(
            "PHP", 
            PageSizes.Large, 
            PageCategories.Career, 
            "LAMP stack anyone...?"
        ),
    "python": 
        new Page(
            "Python", 
            PageSizes.Normal, 
            PageCategories.Career, 
            "Nobody expects the Spanish Inquisition!"
        ),
    "cpp": 
        new Page(
            "C++", 
            PageSizes.Small, 
            PageCategories.Career, 
            "Be sure to `del` a `new`"
        ),
}
