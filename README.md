# requestinfo
This module is a wrapper around [request](https://www.npmjs.com/package/request) module.

It provides ``progress`` event that shows current of the download
like it's speed, ETA, percentage etc.

## Installation

You have to install [request](https://www.npmjs.com/package/request) module:
```bash
npm install request --save
```
Then you need to install this module:
```bash
npm install requestinfo --save
```

## Usage

```js
const request = require('request')
const RequestInfo = require('requestinfo')
const fs = require('fs')

let info = new RequestInfo(
  request('http://releases.ubuntu.com/16.04.3/ubuntu-16.04.3-desktop-amd64.iso')
)
info.on('progress', status => {
  console.log(status)
}).pipe(fs.createWriteStream('ubuntu.iso'))
```

The above example downloads Ubuntu iso from official page, to ``ubuntu.iso`` in
current directory and prints status of download each second (by default).

## Documentation

See [Documentation](docs/main.md) here
