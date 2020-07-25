class State {
    constructor(startTimestamp, difference, suspended) {
        this.startTimestamp = startTimestamp
        this.difference = difference
        this.suspended = suspended
    }

    static ready() {
        return new State(null, 0, 0)
    }
}

class Stopwatch {
    constructor(state) {
        this.state = state
        this.requestAnimationId = null

        this.handleSpacebar = this.handleSpacebar.bind(this)
        document.body
            .onkeyup = this.handleSpacebar
        
        this.handleClickStart = this.handleClickStart.bind(this)
        document
            .getElementById("start")
            .addEventListener("click", this.handleClickStart)
        
        this.handleClickStop = this.handleClickStop.bind(this)
        document
            .getElementById("stop")
            .addEventListener("click", this.handleClickStop)
        
        this.tick = this.tick.bind(this)
        this.render()
    }

    static ready() {
        return new Stopwatch(State.ready())
    }

    setState(newState) {
        this.state = { ...this.state, ...newState }
        this.render()
    }

    tick() {
        this.setState({
            difference: new Date(new Date() - this.state.startTimestamp)
        })
        this.requestAnimationId = requestAnimationFrame(this.tick)
    }

    handleSpacebar() {
        if (this.state.startTimestamp) {
            cancelAnimationFrame(this.requestAnimationId)
            this.setState({
            startTimestamp: null,
            suspended: this.state.difference
        })
        } else {
            cancelAnimationFrame(this.requestAnimationId)
            this.setState(State.ready())
            this.setState({
                startTimestamp: new Date() - this.state.suspended,
                suspended: 0
            })
            this.requestAnimationId = requestAnimationFrame(this.tick)
        }
    }

    handleClickStart() {
        if (this.state.startTimestamp) {
            return
        }
        cancelAnimationFrame(this.requestAnimationId)
        this.setState(State.ready())
        this.setState({
            startTimestamp: new Date() - this.state.suspended,
            suspended: 0
        })
        this.requestAnimationId = requestAnimationFrame(this.tick)
    }

    handleClickStop() {
        cancelAnimationFrame(this.requestAnimationId)
        this.setState({
            startTimestamp: null,
            suspended: this.state.difference
        })
    }

    render() {
        const { difference } = this.state

        const hundredths = (difference ? Math.floor(difference.getMilliseconds() / 10)  : 0)
            .toString().padStart(2, "0")

        const seconds = (difference ? Math.floor(difference.getSeconds()) : 0)
            .toString().padStart(2, "0")
        
        const minutes = (difference ? Math.floor(difference.getMinutes()) : 0)
            .toString().padStart(2, "0")
        
        // Render screen
        document.getElementById("minutes").textContent = minutes
        document.getElementById("seconds").textContent = seconds
        document.getElementById("hundredths").textContent = hundredths
    }
}

const STOPWATCH = Stopwatch.ready()