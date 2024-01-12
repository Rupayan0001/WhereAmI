import { codes } from "./flag.js";


const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const ok = document.querySelector(".ok");
const info = document.querySelector(".info");
const img = document.querySelector(".img");
const roll = document.querySelector(".roll");
const askBox = document.querySelector(".askBox");
const yes = document.querySelector(".yes");
const no = document.querySelector(".no");
// const weatherAPI = "98180a666163350ae3546c170fce4c9e";
// const api = "659c27318fa14190569242bwsb4134d"

let lat;
let lon;

ok.addEventListener("click", whereAmI)
yes.addEventListener("click", function () {
    // yes.classList.add("shrink")
    // setTimeout(function () {
    //     yes.classList.remove("shrink")
    // }, 100)
    askBox.style.display = "none"
    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position)
            lat = position.coords.latitude;
            lon = position.coords.longitude
            roll.style.display = "block"
            ok.disabled = true;
            fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=659c27318fa14190569242bwsb4134d`)
                .then(response => {

                    if (response.ok == false) {
                        // info.style.transition = ".7s";
                        // info.style.opacity = "1";

                        throw new Error(`Could not find the address.`)
                    }
                    return response.json()
                })
                .then(data => {
                    if (data.address) {
                        console.log(data);
                        const countryName = data.address.country
                        // img.src = `https://flagcdn.com/w160/${codes[countryName]}.png`
                        console.log(img.src)
                        info.innerHTML = `

                    <img src=${`https://flagcdn.com/w160/${codes[countryName]}.png`} />
                    <p>City : ${data.address.city}</p>
                    <p>Country : ${data.address.country}</p>
                    <p>Address : ${data.display_name}</p>
                    `
                        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.address.city}&APPID=98180a666163350ae3546c170fce4c9e`)
                    }
                    else {
                        throw new Error(`Cound not find country`)
                    }
                })
                .then(response => {
                    if (response.ok === false) {
                        // info.style.transition = ".7s";
                        // info.style.opacity = "1";
                        throw new Error(`Could not get weather information, sorry!`)
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    const temp = Math.round(data.main.temp) - 273
                    info.innerHTML += `
                <p>Current Temparature : ${temp}°C ${data.weather[0].description}</p>
                <p>Current Humidity : ${data.main.humidity}%</p>
                `
                    img.style.opacity = 1;

                })

                .catch(error => {
                    roll.style.display = "none"
                    info.innerHTML = `Something went wrong. ${error}`
                })
                .finally(() => {

                    roll.style.display = "none"

                    info.style.transition = ".7s";
                    info.style.opacity = "1";
                    setTimeout(function () {
                        ok.disabled = false
                    }, 1000)
                })


        },
        error => console.log(error)
    )

})
no.addEventListener("click", function () {
    // no.classList.add("shrink")
    // setTimeout(function () {
    //     no.classList.remove("shrink")
    // }, 100)
    // askBox.style.opacity = "0"
    askBox.style.display = "none"
})

function whereAmI() {
    ok.classList.add("shrink")
    setTimeout(function () {
        ok.classList.remove("shrink")
    }, 100)
    roll.style.display = "block"
    ok.disabled = true;
    lat = Number(latitude.value)
    lon = Number(longitude.value)

    if (latitude.value === "" || longitude.value === "") {
        info.style.transition = ".7s";
        info.style.opacity = "1";
        info.innerHTML = `Please enter latitude and longitude.`
        roll.style.display = "none"
        setTimeout(function () {
            ok.disabled = false
        }, 1000)
        return;
    }

    else {
        askBox.style.display = "none"

        fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=659c27318fa14190569242bwsb4134d`)
            .then(response => {

                if (response.ok == false) {
                    // info.style.transition = ".7s";
                    // info.style.opacity = "1";

                    throw new Error(`Could not find the address.`)
                }
                return response.json()
            })
            .then(data => {
                if (data.address) {
                    console.log(data);
                    const countryName = data.address.country
                    // img.src = `https://flagcdn.com/w160/${codes[countryName]}.png`
                    console.log(img.src)
                    info.innerHTML = `

                    <img src=${`https://flagcdn.com/w160/${codes[countryName]}.png`} />
                    <p>City : ${data.address.city}</p>
                    <p>Country : ${data.address.country}</p>
                    <p>Address : ${data.display_name}</p>
                    `
                    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.address.city}&APPID=98180a666163350ae3546c170fce4c9e`)
                }
                else {
                    throw new Error(`Cound not find country`)
                }
            })
            .then(response => {
                if (response.ok === false) {
                    // info.style.transition = ".7s";
                    // info.style.opacity = "1";
                    throw new Error(`Could not get weather information, sorry!`)
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                const temp = Math.round(data.main.temp) - 273
                info.innerHTML += `
                <p>Current Temparature : ${temp}°C ${data.weather[0].description}</p>
                <p>Current Humidity : ${data.main.humidity}%</p>
                `
                // img.style.opacity = 1;

            })

            .catch(error => {
                roll.style.display = "none"
                info.innerHTML = `Something went wrong. ${error}`
            })
            .finally(() => {
                roll.style.display = "none"
                info.style.transition = ".7s";
                info.style.opacity = "1";
                setTimeout(function () {
                    ok.disabled = false
                }, 1000)
            })
    }
}



// 48.85661400
// 2.35222190