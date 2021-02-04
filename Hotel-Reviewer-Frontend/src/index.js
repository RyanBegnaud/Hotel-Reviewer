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
    newDiv.innerHTML = `<h2>${hotel.name}</h2><p>Located on: ${hotel.island}</p><p>Address: ${hotel.address}</p><img src=${imgArr[0]}><img src=${imgArr[1]}><br><button type="button"></button>`
    body.append(newDiv)
}

const addListeners = () => {
    const signIn = document.querySelector("button.btnIn")
    const signUp = document.querySelector("button.btnUp")
    const form = document.createElement("form")
    const input = document.createElement("input")

    form.setAttribute("name", "sign-in")
    input.innerHTML = "UserName:"
    form.appendChild(input)
    signIn.addEventListener("click", alert(`<form name="sign-in"><p>Enter UserName!: <input type="text">`))
}

// const signUps = () => {
//     const signIn = document.querySelector("button.sign-in")
//     const signUp = document.querySelector("button.sign-up")
//     signUp.innerHTML = "lol"
//     signIn.addEventListener("click", showForm)
//     signUp.addEventListener("click", showForm)   
// }

const showForm = () => {
    
}