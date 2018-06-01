var socket

export default class Websh {
  constructor (argv) {
    this.argv_ = argv
    this.io = null
    this.pid_ = -1
  }

  run () {
    this.io = this.argv_.io.push()
    this.io.onVTKeystroke = this.sendString_.bind(this)
    this.io.sendString = this.sendString_.bind(this)
    this.io.onTerminalResize = this.onTerminalResize.bind(this)
  }

  sendString_ (str) {
    window.socket.emit('input', str)
  }

  onTerminalResize (col, row) {
    window.socket.emit('resize', { col: col, row: row })
  }
}
