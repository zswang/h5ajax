'use strict';

var XHR_STATES = {
  // The object has been constructed.
  UNSENT: 0,
  // The open() method has been successfully invoked.
  OPENED: 1,
  // All redirects (if any) have been followed and all HTTP headers of the response have been received.
  HEADERS_RECEIVED: 2,
  // The response's body is being received.
  LOADING: 3,
  // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
  DONE: 4
};


/**
 * 模拟 DOM
 */
class EventTarget {
  constructor() {
    this._listeners = [];
  }

  addEventListener(eventName, handler) {
    if (typeof handler === 'function') {
      this._listeners.push([eventName, handler]);
    }
  }

  dispatchEvent(eventName) {
    var eventData = {
      name: eventName
    };
    var self = this;
    this._listeners.forEach(function(item) {
      if (item[0] === eventName) {
        item[1].call(self, eventData);
      }
    });
  }
}

class XMLHttpRequest extends EventTarget {

  open(method, url, async, username, password) {
    this._url = url;
    this._method = method;
    this._async = async;
  }

  setRequestHeader(name, value) {}

  get readyState() {
    return this._readyState;
  }

  get status() {
    return this._status;
  }

  get statusText() {
    return this._statusText;
  }

  get responseText() {
    return this._responseText;
  }

  set onreadystatechange(fn) {
    var self = this;
    this.addEventListener('readystatechange', function () {
      fn.apply(self, arguments);
    });
  }

  send(data) {
    this._readyState = XHR_STATES.HEADERS_RECEIVED;
    this.dispatchEvent('readystatechange');

    this._readyState = XHR_STATES.LOADING;
    this.dispatchEvent('readystatechange');

    if (/error/.test(this._url)) {
      this._status = 500;
      this._responseText = '#error';
    } else {
      this._status = 200
      this._statusText = 'OK';

      var code = data ? String(data).replace(/code=(\d+)/, '$1') : undefined;
      this._responseText = JSON.stringify({
        status: 200,
        data: {
          user_id: 30001,
          name: 'zswang',
          code: code
        }
      });
    }

    this._readyState = XHR_STATES.DONE;
    this.dispatchEvent('readystatechange');
    this.dispatchEvent('load');
    this.dispatchEvent('loadend');
  }

  abort(data) {}
}

global.XMLHttpRequest = XMLHttpRequest;