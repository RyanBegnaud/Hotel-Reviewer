const hotelUrl = "http://localhost:3000/hotels"
const proxyurl = "https://cors-anywhere.herokuapp.com/";

document.addEventListener('DOMContentLoaded', 
getHotels(),
)

function getHotels(hotels) {
    fetch("http://localhost:3000/hotels")
    .then(resp => resp.json())
    .then(hotels =>  hotels.forEach(hotel => makeHotel(hotel)))
}

function makeHotel(hotel) {
    let body = document.querySelector("body")
    let newDiv = document.createElement("div")
    let imgArr = hotel.imgs.split(",")
    newDiv.innerHTML = `<h2>${hotel.name}</h2><p>Located on: ${hotel.island}</p><p>Address: ${hotel.address}</p><img src=${imgArr[0]}><img src=${imgArr[1]}><br><button type="button"></button>`
    body.append(newDiv)
}
