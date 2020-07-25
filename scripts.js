let running = false
let hundredths = 0
let seconds = 0
let minutes = 0
let runInt

function tick() {
    if (hundredths === 99) {
        hundredths = 0
        seconds += 1
    } else {
        hundredths += 1
    }
    if (seconds === 59) {
        seconds = 0
        minutes += 1
    }

    document.getElementById('hundredths').innerHTML = (hundredths < 10 ? '0' + hundredths : hundredths)
    document.getElementById('seconds').innerHTML = (seconds < 10 ? '0' + seconds : seconds)
    document.getElementById('minutes').innerHTML = (minutes < 10 ? '0' + minutes : minutes)
}

function startTimer() {
    hundredths = 0
    seconds = 0
    minutes = 0
    runInt = setInterval(tick, 1)	
}
function stopTimer() {
    clearInterval(runInt)
}

function startStopTimer() {
  if (running) {
    running = false
    stopTimer()
  } else {
    running = true
    startTimer()
  }
}

document.body.onkeyup = function(e) {
    if (e.code === 'Space') {
        startStopTimer()
    }
}

document.body.addEventListener('click', function(e) {
    if (e.target.id !== 'scramble-button') {
        startStopTimer()
    }
})