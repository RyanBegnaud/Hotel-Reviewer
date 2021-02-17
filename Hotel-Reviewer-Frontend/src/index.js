const hotelUrl = "http://localhost:3000/hotels"
const proxyurl = "https://cors-anywhere.herokuapp.com/";

document.addEventListener('DOMContentLoaded', getHotels())

// document.addEventListener("DOMContentLoaded", () =>{
//     const signIn = document.querySelector("button.btnIn")
//     signIn.addEventListener("click", () => addListeners())
// })

document.addEventListener("DOMContentLoaded", () => {
    const signForm = document.querySelector("form.sign-up")
    signForm.addEventListener("submit", createUser)
})


const createUser = (e) => {
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
    .then(data => {
        displayUser(data)
    }
    )
}

const displayUser = (user) => {
    const userId = user.id
    const main = document.querySelector("main")
    const userDiv = document.createElement("div")
    const h3 = document.createElement("h1")
    const p = document.createElement("p")

    document.querySelector(".close-button").click()
    document.querySelector("button").remove()

    p.setAttribute("style", "display: none;")
    p.innerHTML = userId
    userDiv.setAttribute("class", "user-display")
    h3.innerHTML = `Welcome ${user.username}!`
    userDiv.appendChild(p)
    userDiv.appendChild(h3)

    main.appendChild(userDiv)
}

function getHotels(hotels) {
    fetch("http://localhost:3000/hotels")
    .then(resp => resp.json())
    .then(hotels =>  hotels.forEach(hotel => makeHotel(hotel)))
}

function makeHotel(hotel) {
    const body = document.querySelector("body")
    const newDiv = document.createElement("div")
    const ratingDiv = document.createElement("div")
    const imgArr = hotel.imgs.split(",")
    const div = document.createElement("div")
    const form = document.createElement("form")
    const input = document.createElement("input")
    const input2 = document.createElement("input")
    const submit = document.createElement("input")

    
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
    ratingDiv.setAttribute("class", "hotel_rating")
    newDiv.setAttribute("class", "review")
    
    ratingDiv.innerHTML = `Hotel Rating: ${hotel.average_rating}<br><br>`
    newDiv.innerHTML = `<br><h2>${hotel.name}</h2><p>Located on: ${hotel.island}</p><p>Address: ${hotel.address}</p><img src=${imgArr[0]}><img src=${imgArr[1]}><br><br>`
    
    for (const review in hotel.reviews) {
        if (review.review_text != null) {
            const pageReview = document.createElement(p)
            pageReview.innerHTML = review.review_text
            newDiv.appendChild(pageReview)
        }
    }
    form.appendChild(input)
    form.appendChild(input2)
    form.appendChild(submit)

    form.addEventListener("submit", createReview)
    
    newDiv.appendChild(ratingDiv)
    newDiv.appendChild(form)
    body.append(newDiv)
}


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
    console.log(data)

}