const throttleit = require('throttleit')

class RequestInfo {
  constructor(request, options) {
    this.request = request
    let defaultOptions = {
      reportInterval: 1000
    }

    this.options = Object.assign({}, defaultOptions, options)

    request.on('response', res => {
      this.status = {
        size: {
          total: res.headers['content-length'],
          downloaded: 0
        },
        time: {
          start: new Date(),
          elapsed: 0,
          eta: Infinity
        },
        percent: 0,
        speed: 0
      }
      this.info = {
        last_time: this.status.time.start,
        last_size: 0
      }

      this.reportStatus = throttleit(this.reportStatus, this.options.reportInterval)

      res.on('data', data => {
        let size = data.length
        this.status.size.downloaded += size
        this.info.last_size += size
        if(this.status.size.total > 0) {
          this.status.percent = Number(this.status.size.downloaded / this.status.size.total * 100).toFixed(2)
        }
        this.reportStatus()
      })
      res.on('end', () => {
        this.status.speed = 0
        this.status.percent = 100
        this.status.time.eta = 0
      })
    })
  }

  _toSeconds(milis) {
    return Number(milis/1000).toFixed(0)
  }

  reportStatus() {
    let time = new Date()
    let time_delta = time - this.info.last_time
    this.status.time.elapsed = this._toSeconds(time - this.status.time.start)
    this.info.last_time = time
    this.status.speed = Number(this.info.last_size / time_delta).toFixed(0)
    if(this.status.size.total) {
      this.status.time.eta = this._toSeconds((this.status.size.total - this.status.size.downloaded) / this.status.speed)
    }
    this.info.last_size = 0

    this.request.emit('progress', this.status)
  }

  get r() {
    return this.request
  }
  on(event_name, fn) {
    this.request.on(event_name, fn)
    return this
  }
  pipe(target) {
    this.request.pipe(target)
  }
}

module.exports = RequestInfo
