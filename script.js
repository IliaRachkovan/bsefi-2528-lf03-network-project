const showDays = document.getElementById('days')
const showHours = document.getElementById('hours')
const showMinutes = document.getElementById('minutes')
const showSeconds = document.getElementById('seconds')

const witzP = document.querySelector('.witz')

const darkmodeDiv = document.querySelector('.darkmode')
const navLink = document.querySelector('.nav-link')

let isDarkmode = JSON.parse(localStorage.getItem('darkmode')) ? JSON.parse(localStorage.getItem('darkmode')) : false

const releaseDate = new Date("11/19/2026")

const _second = 1000
const _minute = _second * 60
const _hour = _minute * 60
const _day = _hour * 24

let witz

function calcReleaseTime() {
    let dateNow = new Date()
    const remaining = releaseDate - dateNow

    const seconds = Math.floor((remaining % _minute) / 1000)
    const minutes = Math.floor((remaining % _hour) / _minute)
    const hours = Math.floor((remaining % _day) / _hour)
    const days = Math.floor(remaining / _day)

    showDays.textContent = `${days} Tage`
    showHours.textContent = `${hours} Stunden`
    showMinutes.textContent = `${minutes} Minuten`
    showSeconds.textContent = `${seconds} Sekunden`
}

function checkDarkmode() {
    const darkmode = JSON.parse(localStorage.getItem('darkmode'))
    if (darkmode !== null) {
        darkmodeDiv.textContent = darkmode ? '☀️' : '🌑'
        document.body.style.backgroundColor = darkmode ? '#000' : '#fff'
        document.body.style.color = darkmode ? '#fff' : '#000'
        navLink.style.color = darkmode ? '#fff' : '#000'
    }
}


const fetchWitz = async () => {
    const response = await fetch("https://witzapi.de/api/joke")
    if (!response.ok) {
        console.log("Etwas ist schief gelaufen.")
    }
    const data = await response.json()

    witzP.textContent = data[0].text
}

fetchWitz()


darkmodeDiv.addEventListener('click', () => {
    isDarkmode = !isDarkmode
    localStorage.setItem('darkmode', JSON.stringify(isDarkmode))
    checkDarkmode()
})

calcReleaseTime()

setInterval(() => calcReleaseTime(), 1000)

window.onload = async () => {
    checkDarkmode()
}
