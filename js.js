let fa_gear = document.querySelector(".fa-gear")
let settings_box = document.querySelector(".settings-box")
let toggle_settings = document.querySelector(".toggle-settings")


toggle_settings.addEventListener("click", () => {
    settings_box.classList.toggle("open")
    fa_gear.classList.toggle("fa-spin")
})
//

//
if(localStorage.color != null){
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color"))

    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active")
    
        if(element.dataset.color === localStorage.getItem("color")){
            element.classList.add("active")
        }
    })


}
//
// switch color
const colorsLi =document.querySelectorAll(".colors-list li")
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        localStorage.setItem("color", e.target.dataset.color)
        // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
        //     element.classList.remove("active")
        // })
        // e.target.classList.add("active")
        handelActive(e)
    })
    
})
//
let backgroundOption = true;

let backgroundinterval;
//
let backgroundLocalItem = localStorage.getItem("background-option")

if(backgroundLocalItem !== null){
    if(backgroundLocalItem === "true"){
        backgroundOption = true
    }else{
        backgroundOption = false
    }
    document.querySelectorAll(".random-background span").forEach((element) => {
        element.classList.remove("active")
    })
    if(backgroundLocalItem === "true"){
        document.querySelector(".random-background .yes").classList.add("active")

    }else{
        document.querySelector(".random-background .no").classList.add("active")
    }
}
//

// switch random background
const randomBackEl =document.querySelectorAll(".random-background span")
randomBackEl.forEach((span) => {
    span.addEventListener("click", (e) => {

        handelActive(e)

        if(e.target.dataset.background === "yes"){
            backgroundOption = true
            randomizeImgs()
            localStorage.setItem("background-option", true)
        }else{
            backgroundOption = false
            clearInterval(backgroundinterval)
            localStorage.setItem("background-option", false)
        }
    })
    
})
//
// select landing page element
let landingPage = document.querySelector(".landing-page")

// get array of images
let imgsArray = ["programming.jpg","programming2.jpg","programming3.jpg","programming4.jpg","5.jpg"]

function randomizeImgs(){
    if(backgroundOption === true){
        backgroundinterval =  setInterval(() => {
            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
            // change background image url
            landingPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNumber] +'")'
        }, 10000);
        
    }

}
randomizeImgs()
//







// skills
let ourSkills = document.querySelector(".skills")
window.onscroll = function(){
    let skillsOffsetTop = ourSkills.offsetTop

    let skillsOuterHeight = ourSkills.offsetHeight

    let windowHeight = this.innerHeight

    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress
        })
    }
    console.log(windowScrollTop)
    // console.log(windowHeight)
    // console.log(skillsOuterHeight)
    // this.console.log(skillsOffsetTop)
}


// create popup
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        //create overlay ele
        let overlay = document.createElement("div")
        overlay.className = 'popup-overlay'
        document.body.appendChild(overlay)
        // create popup box
        let popupBox = document.createElement("div")
        popupBox.className = 'popup-box'

        if(img.alt !== null){
            let imgHeading = document.createElement("h3")
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }

        // create the image
        let popupImage = document.createElement("img")

        popupImage.src = img.src

        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)



        //close span
        let closeButton = document.createElement("span")
        let closeButtonText = document.createTextNode("X")
        closeButton.appendChild(closeButtonText)
        closeButton.className = 'close-button'
        popupBox.appendChild(closeButton)
    })
})

// close popup

document.addEventListener("click", (e) => {
    if(e.target.className == "close-button"){
        e.target.parentNode.remove()

        document.querySelector(".popup-overlay").remove()
    }
})


//
// all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

// allBullets.forEach(bullet => {
//     bullet.addEventListener("click", (e) => {
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior:'smooth'
//         })
//     })
// })
//

// all links
const allLinks = document.querySelectorAll(".links a")

// allLinks.forEach(link => {
//     link.addEventListener("click", (e) => {
//         e.preventDefault()
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior:'smooth'
//         })
//     })
// })
//

function scrollToSomeWhere(element){
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
scrollToSomeWhere(allBullets)
scrollToSomeWhere(allLinks)
//

// handel active state
function handelActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active")
    })
    ev.target.classList.add("active")
}
//


// 
let bulletsSpan = document.querySelectorAll(".bullets-option span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_option")

if(bulletLocalItem != null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })

    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else{
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) =>{
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullets_option", 'block')
        }else{
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option", 'none')

        }
        handelActive(e)
    })
})
//

// Reset Button
document.querySelector(".reset-option").onclick = function(){
    localStorage.removeItem("color")
    localStorage.removeItem("background-option")
    localStorage.removeItem("bullets_option")

    window.location.reload()
}
//

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleBtn.onclick = function (e) {
    e.stopPropagation()
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}
//click anywhere 
document.addEventListener("click", e => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        // check menu is open
        if(tLinks.classList.contains("open")){
            tLinks.classList.toggle("open")
            toggleBtn.classList.toggle("menu-active")
        }
    }
})
// stopPropagation links
tLinks.onclick = function(e) {
    e.stopPropagation()
}
//


