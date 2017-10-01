const Sound = require('aplay')
const gpio = require('node-gpio')
const GPIO = gpio.GPIO

const music = new Sound()
music.play('../thugger/first.wav')

let state = 0

music.on('pause', () => {
    state = 1
})

music.on('resume', () => {
    state = 0
})

let btnControl = new GPIO('20')
btnControl.open()
btnControl.setMode(gpio.IN)
btnControl.on('changed', (value) => {
    if(value === 0) {
        if(state === 0){
            music.pause()
        } else {
            music.resume()
        }
    }
})
btnControl.listen()

let btnTerminate = new GPIO('21')
btnTerminate.open()
btnTerminate.setMode(gpio.IN)
btnTerminate.on('changed', (value) => {
    if(value === 0) {
        music.stop()
        process.exit(1)
    }
})
btnTerminate.listen()