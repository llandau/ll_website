
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
    "javascript": 
        new Page(
            "JavaScript", 
            PageSizes.Normal, 
            PageCategories.Career, 
            "Is JS a necessary evil? hmmm"
        ),
    "cpp": 
        new Page(
            "C++", 
            PageSizes.Small, 
            PageCategories.Career, 
            "Be sure to `del` a `new`"
        ),
    "zoe": 
        new Page(
            "Zoe",
            PageSizes.Large, 
            PageCategories.Personal, 
            "Zoe Lily Landau! That's my girl!"
        ),
    "eugene": 
        new Page(
            "Eugene",
            PageSizes.Small, 
            PageCategories.Personal, 
            "Living in Eugene, OR, USA"
        ),
    "harvard": 
        new Page(
            "Harvard",
            PageSizes.Small, 
            PageCategories.Personal, 
            "Master's degree from Harvard University"
        ),
    "ucsb": 
        new Page(
            "UCSB",
            PageSizes.Small, 
            PageCategories.Personal, 
            "Bachelor's degree from UCSB"
        ),
    "meditation": 
        new Page(
            "Meditation", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "Om"
        ),
    "adya": 
        new Page(
            "Adyashanti", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "Primordial Peace anyone?"
        ),
    "et": 
        new Page(
            "Ekhart Tolle", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "The time is Now!"
        ),
}
