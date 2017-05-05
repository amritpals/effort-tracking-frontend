var currentPage = this.window.location.pathname;

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  localStorage.baseURL = "http://localhost:8080/WSRTool/";
} else {
  // Too bad, no localStorage for us
}

// Create the httpRequest object.
function createCORSRequest(method, url) {
  var httpRequest = new XMLHttpRequest();
  if ("withCredentials" in httpRequest) {
    // httpRequest for Chrome/Firefox/Opera/Safari.
    //httpRequest = new XMLHttpRequest();

  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    httpRequest = new XDomainRequest();
    httpRequest.open(method, url);
  } else {
    // CORS not supported.
    httpRequest = null;
  }
  return httpRequest;
}

/* Function to convert Query Strings to JSON format string */
function queryStringToJsonString(str){
  var pairs = str.split('&');
  var result = {};
  pairs.forEach(function (pair) {
    pair = pair.split('=');
    var name = pair[0]
    var value = pair[1]
    if (name.length)
      if (result[name] !== undefined) {
        if (!result[name].push) {
          result[name] = [result[name]];
        }
        result[name].push(value || '');
      } else {
        result[name] = value || '';
      }
  });
  return (JSON.stringify(result));
}

/* Convert Object to query string */
function toQueryString(obj, prefix){
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

/* Convert to JavaScript Object */
function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}

/* Rename the key property of JavaScript Object */
function renameKeyInObject(newKeyDescriptor, o){
  for(var old_key in o){
    var new_key = newKeyDescriptor+old_key;
    if (old_key !== new_key) {
      Object.defineProperty(o, new_key,
          Object.getOwnPropertyDescriptor(o, old_key));
      delete o[old_key];
    }
  }
  return o;
}

/* Function to check if the browser supports Storage API */
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

/* Function to generate XMLHttpRequest */
function createHttpRequest(method, url){
  var httpRequest = createCORSRequest(method, url);
  if (!httpRequest) {
    console.log('CORS not supported');
    return;
  }
  return httpRequest;
}
/* Function to send XMLHttpRequest */
function sendHttpRequest(httpRequest, method, url, mimeType, payload){
  httpRequest.open(method, url, true);
  httpRequest.setRequestHeader("Content-Type", mimeType);
  if(payload == null){
    httpRequest.send();
  } else {
    httpRequest.send(payload);
  }
}
