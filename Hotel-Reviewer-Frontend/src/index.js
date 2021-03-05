const hotelUrl = "http://localhost:3000/hotels"


class Hotel {
    constructor(name, id, island, address, imgs, number, average_rating, reviews, users) {
        this.name = name
        this.id = id
        this.island = island
        this.address = address
        this.imgs = imgs
        this.number = number 
        this.average_rating = average_rating
        this.reviews = reviews 
        this.users = users 
    }
    
    static getHotels() {
        fetch("http://localhost:3000/hotels")
        .then(resp => resp.json())
        .then(hotels =>  hotels.forEach(hotel => Hotel.createHotelObjects(hotel)))
    }
    
    static createHotelObjects(hotel) {
        let hotelObj = new Hotel(hotel.name, hotel.id, hotel.island, hotel.address, hotel.imgs, hotel.number, hotel.average_rating, hotel.reviews, hotel.users)
        Hotel.displayHotel(hotelObj)
    }
    
    static displayHotel(hotel) {
        const body = document.querySelector("body")
        const newDiv = document.createElement("div")
        const imgArr = hotel.imgs.split(",")
        const div = document.createElement("div")
        const form = document.createElement("form")
        const input = document.createElement("input")
        const input2 = document.createElement("input")
        const submit = document.createElement("input")
        const hotelAvg = document.createElement("p")
        
        
        hotelAvg.setAttribute("class", `p${hotel.id}`)
        form.setAttribute("class", `${hotel.id}`)
        input.setAttribute("type", "number")
        input.setAttribute("hotel_id", `${hotel.id}`)
        input.setAttribute("step", "0.1")
        input.setAttribute("max", "5")
        input.setAttribute("placeholder", "Rate 1 - 5")
        input2.setAttribute("type", "text")
        input2.setAttribute("hotel_id", `${hotel.id}`)
        input2.setAttribute("placeholder", "Leave Review Here! (Optional)")
        submit.setAttribute("type", "submit")
        newDiv.setAttribute("class", `form${hotel.id}`)
        
        
        newDiv.innerHTML = `<br><h2>${hotel.name}</h2><p>Located on: ${hotel.island}</p><p>Address: ${hotel.address}</p><img src=${imgArr[0]}><img src=${imgArr[1]}><br><br>`
        hotelAvg.innerHTML= `<h3>Hotel Average Rating: ${hotel.average_rating}</h3><br>`
        newDiv.appendChild(hotelAvg)
        
        
        form.appendChild(input)
        form.appendChild(input2)
        form.appendChild(submit)
        
        form.addEventListener("submit", Review.makeReview)
        
        
        for (const review of hotel.reviews) {
            if (review.review_text != null) {
                const pageReview = document.createElement("p")
                const button = document.createElement("button")
                
                pageReview.setAttribute("class", `review_id${review.id}`)
                button.setAttribute("id", `delete${review.id}`)
                button.setAttribute("class", review.id)
                debugger
                button.setAttribute("user_id", review.user.id)
                button.innerHTML = "Delete Review"
                button.addEventListener("click", deleteReview)
                
                pageReview.innerHTML = `<h3>${review.user.username}</h3> rated this hotel ${review.rating} stars and had this to say about their stay: <br><br> ${review.review_text}<br><br>`
                pageReview.appendChild(button)
                newDiv.appendChild(pageReview)
            }
        }
        
        newDiv.appendChild(form)
        body.append(newDiv)
    }
}

class User {
    constructor(username, id){
        this.username = username 
        this.id = id
    }
    
    static getUser(e) {
        e.preventDefault() 
        const signForm = document.querySelector("form.sign-up")
        let username = document.querySelector("input#username")
        let password = document.querySelector("input#password")
        let configObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({username: username.value, password: password.value})
        }
        
        fetch("http://localhost:3000/users", configObj)
        .then(res => res.json())
        .then(data => User.createUser(data))
        .catch(error => console.log(error))
    }
    
    static createUser(user) {
        let newUser = new User(user.username, user.id) 
        newUser.displayUser()
    }
    
    static signInUser = (e) => {
        e.preventDefault() 
        const signForm = document.querySelector("form.sign-up")
        let username = document.querySelector("input#username")
        let password = document.querySelector("input#password")
        let configObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({username: username.value, password: password.value})
        }
        
        fetch("http://localhost:3000/sign-in", configObj)
        .then(res => res.json())
        .then(user => User.createUser(user))
    }
    
    displayUser() {
        
        if(this["error"]) {
            alert(this["error"])
        } else {
            const signOut = document.createElement("button")
            const main = document.querySelector("main")
            const userDiv = document.createElement("div")
            const h3 = document.createElement("h1")
            const p = document.createElement("p")
            const body = document.querySelector("body")
            
            document.querySelector(".close-button").click()
            document.querySelector("button").remove()
            
            signOut.setAttribute("id", `sign-out-${this.id}`)
            signOut.setAttribute("class", "sign-out-btn")
            p.setAttribute("style", "display: none;")
            userDiv.setAttribute("class", "user-display")
            
            p.innerHTML = this.id
            h3.innerHTML = `Welcome ${this.username}!`
            signOut.innerHTML = "Sign Out!"
            
            signOut.addEventListener("click", this.userSignOut)
            
            userDiv.appendChild(p)
            userDiv.appendChild(h3)
            userDiv.appendChild(signOut)
            
            main.appendChild(userDiv)
        }
    }
    userSignOut() {
        const configObj = {
            method: "DELETE", 
            headers: {
            "Content-type": "application/json",
            "Accept": "application/json" 
        }}
        const userDiv = document.querySelector("div.user-display")
        
        
        fetch(`http://localhost:3000/users/${this.id}`, configObj)
        
        userDiv.remove()
    
    }
    
}

class Review {
    constructor(rating, reviewText, hotelId, userId) {
        this.rating = rating 
        this.reviewText = reviewText 
        this.hotelId = hotelId 
        this.userId = userId
    }

    static makeReview(e) {
        e.preventDefault()
        const form = e.target 
        const p = document.querySelector("div.user-display p")
        if(p) {
        let newReview = new Review(form[0].value, form[1].value, form.className, p.innerHTML)
        newReview.createReview()
        }
        else{
            alert("Must be Signed in to leave review!")
        }
    }
    createReview(){
        const configObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({hotel_id: this.hotelId, rating: this.rating, user_id: this.userId, review_text: this.reviewText})
        }
        fetch('http://localhost:3000/reviews', configObj)
        .then(res => res.json())
        .then(data => updateRating(data))
    }
    

}


document.addEventListener('DOMContentLoaded', Hotel.getHotels())
document.addEventListener("DOMContentLoaded", () => {
    const signUp = document.querySelector("input.sign-up-btn")
    const signIn = document.querySelector("input.sign-in-btn")
    signUp.addEventListener("click", User.getUser)
    signIn.addEventListener("click", User.signInUser)
})


function updateRating(data) {
    if(data.error) {
        alert(data.error)
    } else {

    let newReview = new Review(data.rating, data.review_text, data.hotel.id, data.user.id)
    const formDiv = document.querySelector(`.form${newReview.hotelId}`)

    if (newReview.reviewText != null) {
        const pageReview = document.createElement("p")
        const button = document.createElement("button")
        
        button.setAttribute("id", `delete${data.id}`)
        button.setAttribute("class", data.id)
        button.setAttribute("user_id", newReview.userId)
        
        button.innerHTML = "Delete Review"
        pageReview.innerHTML = `<h3>${data.user.username}</h3> rated this hotel ${newReview.rating} stars and had this to say about their stay: <br><br> ${newReview.reviewText}<br><br>`
        
        button.addEventListener("click", deleteReview)
        pageReview.appendChild(button)
        formDiv.appendChild(pageReview)
    }
    
    getNewAverage(data.hotel)
    }
}

function getNewAverage(hotel) {
    fetch(`http://localhost:3000/hotels/${hotel.id}`)
    .then(res => res.json())
    .then(hotel => updateHotelAvg(hotel))
}
function updateHotelAvg(hotel) {
   const p = document.querySelector(`.p${hotel.id}`)
   p.innerHTML = `<h3>Hotel Average Rating: ${hotel.average_rating}</h3><br>`
}
 

function deleteReview(e) {
    const currentUser = document.querySelector("div.user-display p")
    const id = e.target.className
    const configObj = {
        method: "DELETE", 
        headers: {
        "Content-type": "application/json",
        "Accept": "application/json" 
    }}
    // debugger
    // if(currentUser === null) {
    //     alert("Must Be Signed in to delete reviews!")
    // }else if(review.user.id != currentUser.innerHTML) {
    //     alert("You can only delete reviews you've posted")
    // }else{
        debugger
        const button = document.querySelector(`button#delete${id}`)
        button.parentElement.remove()
        fetch(`http://localhost:3000/reviews/${id}`, configObj)
    }
// }
