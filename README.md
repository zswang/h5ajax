h5ajax Ajax of Moblie
-----

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

Smaller than smaller. 

无他，就是小

## 使用方法

### GET

```js
h5ajax.get('http://localhost/user/info', function(err, json) {
  console.log(JSON.stringify(json));
  // > {"status":200,"data":{"user_id":30001,"name":"zswang"}}
  // * done
});
```

### POST

```js
h5ajax.post('http://localhost/user/info', { "code": "2016" }, function(err, json) {
  console.log(JSON.stringify(json));
  // > {"status":200,"data":{"user_id":30001,"name":"zswang","code":"2016"}}
  // * done
});
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/h5tracker
[npm-image]: https://badge.fury.io/js/h5tracker.svg
[travis-url]: https://travis-ci.org/zswang/h5tracker
[travis-image]: https://travis-ci.org/zswang/h5tracker.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/h5tracker?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/h5tracker/badge.svg?branch=master&service=github
