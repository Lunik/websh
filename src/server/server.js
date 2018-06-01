import Express from 'express'
import http from 'http'
import compression from 'compression'
import path from 'path'
import morgan from 'morgan'

export default class Server {
  constructor () {
    this.app = Express()
    this.app.disable('x-powered-by')
    this.app.use(compression())
    this.app.use(morgan('combined'))

    this.server = http.createServer(this.app)

    require('./socket')(this.app, this)

    this.app.use(Express.static(path.join(__dirname, '/public')))
  }

  listen () {
    let host = '0.0.0.0'
    let port = '3000'
    this.server.listen(port, host, () => {
      console.log(`Server listening on ${host}:${port}`)
    })
  }
}
