const hotelUrl = "http://localhost:3000/hotels"
const proxyurl = "https://cors-anywhere.herokuapp.com/";
document.addEventListener('DOMContentLoaded', getHotels())
document.addEventListener("DOMContentLoaded", () =>{
    const signIn = document.querySelector("button.btnIn")
    signIn.addEventListener("click", () => addListeners())
})

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