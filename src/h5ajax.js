(function(exportName) {
  /*<remove>*/
  'use strict';
  /*</remove>*/

  /*<jdists encoding="ejs" data="../package.json">*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  var exports = {};

  /*<function name="h5ajax_send">*/
  /**
   * 发送 ajax 请求
   *
   * @param {string} url 请求链接
   * @param {string} method 方法
   * @param {Function} hook xhr 钩子
   * @param {Function=} callback 回调函数
   * @example send():base
    ```js
    // mock : {"status":200,"data":{"user_id":30001,"name":"zswang"}}

    h5ajax.send('http://localhost/user/info', 'GET', null, function(err, json) {
      console.log(JSON.stringify(json));
      // > {"status":200,"data":{"user_id":30001,"name":"zswang"}}
      // * done
    });
    ```
   * @example send():callback is null
    ```js
    h5ajax.send('http://localhost/user/info', 'GET');
    ```
   * @example send():response is error
    ```js
    h5ajax.send('http://localhost/error', 'GET', function (err, json) {
      console.log(!!err);
      // > true
    });
    ```
   */
  function h5ajax_send(url, method, hook, callback) {
    callback = callback || function() {};
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var data = xhr.responseText;
        try {
          data = JSON.parse(data);
          callback(null, data);
        } catch (ex) {
          callback(ex.message, data);
        }
      }
    };
    xhr.send(hook ? hook(xhr) : null);
  }
  /*</function>*/
  exports.send = h5ajax_send;

  /*<function name="h5ajax_get" depend="h5ajax_send">*/
  /**
   * 发送 ajax GET 请求
   *
   * @param {string} url 请求链接
   * @param {Function=} callback 回调函数
   * @example get():base
    ```js
    // mock : {"status":200,"data":{"user_id":30001,"name":"zswang"}}

    h5ajax.get('http://localhost/user/info', function(err, json) {
      console.log(JSON.stringify(json));
      // > {"status":200,"data":{"user_id":30001,"name":"zswang"}}
      // * done
    });
    ```
   */
  function h5ajax_get(url, callback) {
    h5ajax_send(url, 'GET', null, callback);
  }
  /*</function>*/
  exports.get = h5ajax_get;

  /*<function name="h5ajax_post" depend="h5ajax_send">*/
  /**
   * 发送 ajax POST 请求
   *
   * @param {string} url 请求链接
   * @param {string} params 请求参数
   * @param {Function=} callback 回调函数
   * @example post():base
    ```js
    // mock : {"status":200,"data":{"user_id":30001,"name":"zswang","code":$code}}

    h5ajax.post('http://localhost/user/info', { "code": "2016" }, function(err, json) {
      console.log(JSON.stringify(json));
      // > {"status":200,"data":{"user_id":30001,"name":"zswang","code":"2016"}}
      // * done
    });
    ```
   */
  function h5ajax_post(url, params, callback) {
    h5ajax_send(url, 'POST', function(xhr) {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      return Object.keys(params).map(function(key) {
        return key + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }, callback);
  }
  /*</function>*/
  exports.post = h5ajax_post;

  /* istanbul ignore next */
  if (typeof define === 'function') {
    if (define.amd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }

})('h5ajax');