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
    document.querySelector(".close-button").click()
    document.querySelector("button").remove()

    let main = document.querySelector("main")
    let userDiv = document.createElement("div")
    let h3 = document.createElement("h1")

    userDiv.setAttribute("class", "user-display")
    h3.innerHTML = `Welcome ${user.username}!`
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

    newDiv.innerHTML = `<br><h2>${hotel.name}</h2><p>Located on: ${hotel.island}</p><p>Address: ${hotel.address}</p><img src=${imgArr[0]}><img src=${imgArr[1]}><br><br>`

    form.appendChild(input)
    form.appendChild(input2)
    form.appendChild(submit)

    form.addEventListener("submit", createReview)
    // div.innerHTML = `<form><input type="number" id="${hotel.id}" class="form-control" step="0.1" max="5" placeholder="Rate 1 - 5"></form>`
    
    newDiv.appendChild(form)
    body.append(newDiv)
}

// const addListeners = () => {
//     const signIn = document.querySelector("button.btnIn")
//     const signUp = document.querySelector("button.btnUp")
//     const form = document.createElement("form")
//     const input = document.createElement("input")

//     form.setAttribute("name", "sign-in")
//     input.innerHTML = "UserName:"
//     form.appendChild(input)
//     signIn.addEventListener("click", alert(`<form name="sign-in"><p>Enter UserName!: <input type="text">`))
// }

const createReview = (e) => {
    e.preventDefault()
    const form = e.target
    debugger
    console.log(e.target)

    // console.log(e.target)
}

const showForm = () => {
    
}