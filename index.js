const body = document.querySelector('body')
const crypto = document.getElementById('crypto')
const author = document.getElementById('author')
const time = document.getElementById('time')
const weather = document.getElementById('weather')

function updateTime(){
    const date = new Date()
    const current_sec = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()
    const current_time = date.getHours()+":"+date.getMinutes()+":"+ current_sec;
    time.innerText = current_time
}

setInterval(updateTime, 100)

// Get background image
fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`)
    .then(res => res.json())
    .then(data => {
        // body.style.backgroundImage = `url(${data.urls.full})`
        body.style.backgroundImage = `url(${data.urls.regular})`
        author.innerHTML = `
            <p>Image by ${data.user.name}</p>
            <p><a href="https://www.flaticon.com/free-icons/cloud" target="__blank" title="cloud icons">Weather icons by iconixar - Flaticon</a></p>
        `
    })
    .catch(err => {
        console.log(err)
        body.style.backgroundImage = `url("https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTE3MjI3NzN8&ixlib=rb-4.0.3&q=85"
        )`
    })

// Get Crypto data
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(res => res.json())
    .then(data => {
        const priceChange = data.market_data.price_change_percentage_24h.toFixed(2)
        const color = priceChange >= 0 ? 'green' : 'red'
        
        crypto.innerHTML = `
            <div class="crypto-title">
                <img src="${data.image.thumb}" />
                <h2>${data.name}</h2>
            </div>
            <p>Price: $ ${data.market_data.current_price.usd}</p>
            <p>24h: <span class=${color}>${priceChange}%</span></p>
        `
    })
    .catch(err => {
        crypto.innerHTML = `
        <div class="crypto-title">
            <h2>Crypto</h2>
        </div>
        <p>Not available</p>
    `
    })

// Get Weather data

navigator.geolocation.getCurrentPosition((position) => {
    const api_key = 'b290d016167dc05f3e1bbc9b7378204f'
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            weather.innerHTML = `
                <div class="weather-title">
                    <h2>${data.name}</h2>
                    <img class="weather-img" src="/assets/icons/${data.weather[0].icon}.png">
                </div>
                <p class="weather-description">
                    ${(data.main.temp - 273).toFixed()}°C ${data.weather[0].description}
                </p>
                <p>${data.wind.speed.toFixed()} m/s</p>
            `
        })
})