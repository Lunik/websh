import io from 'socket.io-client'
import Hterm from 'hterm-umdjs'
import Websh from './websh'

export default class Term {
  constructor () {
    this.socket = io.connect(window.location.origin, {transports: ['websocket'] })
    window.socket = this.socket
    this.term = null
    this.buff = ''

    this.socket.on('connect', () => {
      Hterm.lib.init(() => {
        Hterm.hterm.defaultStorage = new Hterm.lib.Storage.Local()
        this.term = new Hterm.hterm.Terminal()
        window.term = this.term
        this.term.decorate(document.getElementById('terminal'))

        this.term.setCursorPosition(0, 0)
        this.term.setCursorVisible(true)
        this.term.prefs_.set('ctrl-c-copy', true)
        this.term.prefs_.set('ctrl-v-paste', true)
        this.term.prefs_.set('use-default-window-copy', true)

        this.term.runCommandClass(Websh, document.location.hash.substr(1))
        this.socket.emit('resize', {
          col: this.term.screenSize.width,
          row: this.term.screenSize.height
        })

        if (this.buf && this.buf != '') {
          this.term.io.writeUTF16(this.buf)
          this.buf = ''
        }
      })
    })

    this.socket.on('output', (data) => {
      if (!this.term) {
        this.buf += data
        return
      }

      this.term.io.writeUTF16(data)
    })

    this.socket.on('disconnect', () => {
      console.log("Socket.io connection closed")
    })
  }
}
