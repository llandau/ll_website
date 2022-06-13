
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
            PageSizes.Small, 
            PageCategories.Career, 
            "Is JS a necessary evil? hmmm"
        ),
    "cpp": 
        new Page(
            "C++", 
            PageSizes.Small, 
            PageCategories.Career, 
            "Make sure to `delete` `new` objects"
        ),
    "zoe": 
        new Page(
            "Zoe",
            PageSizes.Large, 
            PageCategories.Personal, 
            "Zoe, that's my girl! <a href=\"https://photos.app.goo.gl/7rYqEcnj6FUokD2F6\">Photos!</a>"
        ),
    "eugene": 
        new Page(
            "Eugene",
            PageSizes.Small, 
            PageCategories.Personal, 
            "Living in <a href=\"https://www.google.com/maps/place/Eugene,+OR/@44.060644,-123.1925906,12z/\">Eugene, OR, USA</a>"
        ),
    "harvard": 
        new Page(
            "Harvard",
            PageSizes.Small, 
            PageCategories.Personal, 
            "Master's degree from <a href=\"https://extension.harvard.edu/\">Harvard University Extension School</a>"
        ),
    "ucsb": 
        new Page(
            "UCSB",
            PageSizes.Small, 
            PageCategories.Personal, 
            "Bachelor's degree from <a href=\"https://www.ucsb.edu/\">UCSB</a>"
        ),
    "dzogchen": 
        new Page(
            "Dzogchen", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "<a href=\"https://wisdomexperience.org/courses/intro-dzogchen/\">The Great Perfection</a> in Tibetan Buddhism"
        ),
    "adya": 
        new Page(
            "Adyashanti", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "<a href=\"https://adyashanti.opengatesangha.org/\">Primordial Peace</a> anyone?"
        ),
    "et": 
        new Page(
            "Ekhart Tolle", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "<a href=\"https://eckharttolle.com/\">ET phone home.</a> The time is Now!"
        ),
    "tm": 
        new Page(
            "TM", 
            PageSizes.Small, 
            PageCategories.Spiritual, 
            "<a href=\"https://www.tm.org/\">TM</a>: what Jerry Seinfeld, Ellen DeGeneres, Tom Brady, Clint Eastwood, The Beatles, Deepak Chopra and Howard Stern have in common."
        ),
}

