# Documentation

## RequestInfo constructor

```js
class RequestInfo {
  constructor (request, options) {
    ...
  }
}
```
### ``request``

``request`` object created by [request](https://www.npmjs.com/package/request) module

### ``options``

Object containing ``RequestInfo`` options
```js
{
  reportInterval: 1000
}
```
* ``reportInterval`` - interval between progress reports in milliseconds

## Events

### ``RequestInfo.on('progress', fn)``
It is emitted every ``RequestInfo.options.reportInterval``

``RequestInfo.status`` object is passed as an argument, to ``fn`` function

## Methods

### ``RequestInfo.pipe()``

Returns original ``request.pipe()`` function

### ``RequestInfo.on()``
Returns original ``request.on()`` function

## Properties

### ``status``
Object containing download status

Below is it's structure, with initial values:
```js
{
  percent: 0,
  speed: 0,
  size: {
    total: response.headers['content-length'],
    downloaded: 0
  },
  time: {
    start: new Date(),
    elapsed: 0,
    eta: Infinity
  }
}
```

* ``percent`` - percent completion of download
* ``speed`` - instantaneous speed of download
* ``size.total`` - number of file bytes (if response headers contain that info)
* ``size.downloaded`` - number of currently downloaded bytes
* ``time.start`` - ``Date()`` when the download started
* ``time.elapsed`` - time that has passed since the begining of download
* ``time.eta`` - estimated time remaining

Values like ``percent`` and ``time.eta`` can be calculated only if ``size.total`` is known

You can access this properity at any time, even after download has finished
