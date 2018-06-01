import SocketIO from 'socket.io'
import { spawn } from 'node-pty'

module.exports = (app, server) => {
  app.io = SocketIO(server.server)

  app.io.on('connection', (socket) => {
    var term = spawn('/usr/bin/env', ['login'], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
    })
    console.log((new Date()) + " PID=" + term.pid + " STARTED by ip " + socket.handshake.address)

    term.on('data', (data) => {
      socket.emit('output', data)
    })

    term.on('exit', (code) => {
      console.log((new Date()) + " PID=" + term.pid + " ENDED")
    })

    socket.on('resize', (data) => {
      term.resize(data.col, data.row)
    })

    socket.on('input', (data) => {
      term.write(data)
    })

    socket.on('disconnect', () => {
      term.end()
    })
  })
}
