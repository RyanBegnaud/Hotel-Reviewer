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
        
        form.addEventListener("submit", createReview)
        
        
        for (const review of hotel.reviews) {
            if (review.review_text != null) {
                const pageReview = document.createElement("p")
                const button = document.createElement("button")
                
                pageReview.setAttribute("class", `review_id${review.id}`)
                button.setAttribute("id", "delete")
                button.setAttribute("class", review.id)
                button.innerHTML = "Delete Review"
                button.addEventListener("click", getReview)
                
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
        debugger
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


document.addEventListener('DOMContentLoaded', Hotel.getHotels())
document.addEventListener("DOMContentLoaded", () => {
    const signUp = document.querySelector("input.sign-up-btn")
    const signIn = document.querySelector("input.sign-in-btn")
    signUp.addEventListener("click", User.getUser)
    signIn.addEventListener("click", User.signInUser)
})




// const signInUser = (e) => {
//     e.preventDefault() 
//     const signForm = document.querySelector("form.sign-up")
//     let username = document.querySelector("input#username")
//     let password = document.querySelector("input#password")
//     let configObj = {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({username: username.value, password: password.value})
//     }

//     fetch("http://localhost:3000/sign-in", configObj)
//     .then(res => res.json())
//     .then(user => displayUser(user))
// }

// const createUser = (e) => {
//     e.preventDefault() 
//     const signForm = document.querySelector("form.sign-up")
//     let username = document.querySelector("input#username")
//     let password = document.querySelector("input#password")
//     let configObj = {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({username: username.value, password: password.value})
//     }

//     fetch("http://localhost:3000/users", configObj)
//     .then(res => res.json())
//     .then(data => displayUser(data))
//     .catch(error => console.log(error))
// }

// const displayUser = (user) => {
   
//     if(user["error"]) {
//         alert(user["error"])
//     } else {
//         const signOut = document.createElement("button")
//         const userId = user.id
//         const main = document.querySelector("main")
//         const userDiv = document.createElement("div")
//         const h3 = document.createElement("h1")
//         const p = document.createElement("p")
//         const body = document.querySelector("body")

//         document.querySelector(".close-button").click()
//         document.querySelector("button").remove()
        
//         signOut.setAttribute("id", `sign-out-${user.id}`)
//         signOut.setAttribute("class", "sign-out-btn")
//         p.setAttribute("style", "display: none;")
//         userDiv.setAttribute("class", "user-display")
        
//         p.innerHTML = userId
//         h3.innerHTML = `Welcome ${user.username}!`
//         signOut.innerHTML = "Sign Out!"

//         signOut.addEventListener("click", userSignOut)
        
//         userDiv.appendChild(p)
//         userDiv.appendChild(h3)
//         userDiv.appendChild(signOut)

//         main.appendChild(userDiv)
//     }
// }

// function getHotels(hotels) {
//     fetch("http://localhost:3000/hotels")
//     .then(resp => resp.json())
//     .then(hotels =>  hotels.forEach(hotel => createHotelObjects(hotel)))
// }

// function createHotelObjects(hotel) {
//     let hotelObj = new Hotel(hotel.name, hotel.id, hotel.island, hotel.address, hotel.imgs, hotel.number, hotel.average_rating, hotel.reviews, hotel.users)
//     makeHotel(hotelObj)
// }

// function makeHotel(hotel) {
//     const body = document.querySelector("body")
//     const newDiv = document.createElement("div")
//     const imgArr = hotel.imgs.split(",")
//     const div = document.createElement("div")
//     const form = document.createElement("form")
//     const input = document.createElement("input")
//     const input2 = document.createElement("input")
//     const submit = document.createElement("input")
//     const hotelAvg = document.createElement("p")

   
//     hotelAvg.setAttribute("class", `p${hotel.id}`)
//     form.setAttribute("class", `${hotel.id}`)
//     input.setAttribute("type", "number")
//     input.setAttribute("hotel_id", `${hotel.id}`)
//     input.setAttribute("step", "0.1")
//     input.setAttribute("max", "5")
//     input.setAttribute("placeholder", "Rate 1 - 5")
//     input2.setAttribute("type", "text")
//     input2.setAttribute("hotel_id", `${hotel.id}`)
//     input2.setAttribute("placeholder", "Leave Review Here! (Optional)")
//     submit.setAttribute("type", "submit")
//     newDiv.setAttribute("class", `form${hotel.id}`)
    
   
//     newDiv.innerHTML = `<br><h2>${hotel.name}</h2><p>Located on: ${hotel.island}</p><p>Address: ${hotel.address}</p><img src=${imgArr[0]}><img src=${imgArr[1]}><br><br>`
//     hotelAvg.innerHTML= `<h3>Hotel Average Rating: ${hotel.average_rating}</h3><br>`
//     newDiv.appendChild(hotelAvg)

    
//     form.appendChild(input)
//     form.appendChild(input2)
//     form.appendChild(submit)
    
//     form.addEventListener("submit", createReview)
    
    
//     for (const review of hotel.reviews) {
//         if (review.review_text != null) {
//             const pageReview = document.createElement("p")
//             const button = document.createElement("button")
           
//             pageReview.setAttribute("class", `review_id${review.id}`)
//             button.setAttribute("id", "delete")
//             button.setAttribute("class", review.id)
//             button.innerHTML = "Delete Review"
//             button.addEventListener("click", getReview)

//             pageReview.innerHTML = `<h3>${review.user.username}</h3> rated this hotel ${review.rating} stars and had this to say about their stay: <br><br> ${review.review_text}<br><br>`
//             pageReview.appendChild(button)
//             newDiv.appendChild(pageReview)
//         }
//     }

//     newDiv.appendChild(form)
//     body.append(newDiv)
// }


const createReview = (e) => {
    e.preventDefault()
    const form = e.target
    const input = form['0']
    const p = document.querySelector("div.user-display p")
    let reviewText = null 
    let userId = null 

    if(form['1'].value != null) {
        reviewText = form['1'].value
    }

    if(p) {
        userId = p.innerHTML
    }

    const configObj = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({hotel_id: form.className, rating: input.value, user_id: userId, review_text: reviewText})
    }
    fetch('http://localhost:3000/reviews', configObj)
    .then(res => res.json())
    .then(data => updateRating(data))
}

function updateRating(data) {
    if(data.error) {
        alert(data.error)
    } else {

    const formDiv = document.querySelector(`.form${data.hotel.id}`)

    if (data.review_text != null) {
        const pageReview = document.createElement("p")
        const button = document.createElement("button")
        
        button.setAttribute("id", `delete${data.id}`)
        button.setAttribute("class", data.id)
        
        button.innerHTML = "Delete Review"
        pageReview.innerHTML = `<h3>${data.user.username}</h3> rated this hotel ${data.rating} stars and had this to say about their stay: <br><br> ${data.review_text}<br><br>`
        
        button.addEventListener("click", getReview)
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

function getReview(e) {
    e.preventDefault()
   debugger
    const reviewId = e.target.className
    const configObj = {
        method: "DELETE", 
        headers: {
        "Content-type": "application/json",
        "Accept": "application/json" }}

    fetch(`http://localhost:3000/reviews/${reviewId}`) 
    .then(res => res.json())
    .then(review => deleteReview(review))
} 

 

function deleteReview(review) {
    const currentUser = document.querySelector("div.user-display p")
    const configObj = {
        method: "DELETE", 
        headers: {
        "Content-type": "application/json",
        "Accept": "application/json" 
    }}

    if(currentUser === null) {
        alert("Must Be Signed in to delete reviews!")
    }else if(review.user.id != currentUser.innerHTML) {
        alert("You can only delete reviews you've posted")
    }else{
        fetch(`http://localhost:3000/reviews/${review.id}`, configObj)
        const button = document.querySelector(`button#delete${review.id}`)
        button.parentElement.remove()
    }
}
