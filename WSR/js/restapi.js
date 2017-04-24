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
