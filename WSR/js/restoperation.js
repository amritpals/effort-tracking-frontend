/*
 * createResource function
*/

/* Get all Create Form elements */
var createUserForm = document.getElementById('create-user-form');
var createProjectForm = document.getElementById('create-project-form');
var createCategoryForm = document.getElementById('create-category-form');
/* Assign callback functions when button is pressed */
if(createUserForm != null){
    createUserForm.addEventListener("submit", createResource);
}
if(createProjectForm != null){
    createProjectForm.addEventListener("submit", createResource);
}
if(createCategoryForm != null){
    createCategoryForm.addEventListener("submit", createResource);
}

function createResource(e){
  e.preventDefault();

  /* Create and initialize local variables */
  var currentForm = e.currentTarget.id;
  var encoding = null;
  var method = null;
  var action = null;
  var form = null;
  var formData = null;
  var httpRequest = null;

  /* Detecting current form */
  if(currentForm == "create-user-form"){
    form = createUserForm;
  } else if (currentForm == "create-project-form") {
    form = createProjectForm;
  } else if (currentForm == "create-category-form") {
    form = createCategoryForm;
  }

  encoding = form.enctype;
  method = form.method;
  action = form.action;

  /* Extracting form's data */
  formData = queryStringToJsonString($("#" + currentForm).serialize());
  /* Conversion to JSON object inorder to convert back special characters */
  var formDataObj = JSON.parse(formData);
  for (var key in formDataObj) {
    if (formDataObj.hasOwnProperty(key)) {
      formDataObj[key] = decodeURIComponent(formDataObj[key]);
    }
  }
  /* Post conversion final data */
  var finalData = JSON.stringify(formDataObj);

  httpRequest = createCORSRequest(method, action);
  if (!httpRequest) {
    console.log('CORS not supported');
    return;
  }
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
      form.reset();
    }
  }
  httpRequest.onerror = function() {
    console.log('Woops, there was an error making the request : ');
  };
  httpRequest.open(method, action, true);
  httpRequest.setRequestHeader("Content-Type", encoding);
  httpRequest.send(finalData);
}

/*
 * retrieveResource function
*/
var currentPage = this.window.location.pathname;
var viewUser = "admin-view";
if(currentPage.includes(viewUser)){
  getResourceData('http://localhost:8080/WSRTool/User');
}

function getResourceData(url){
  var method = "GET";
  var httpRequest = createCORSRequest(method, url);
  if (!httpRequest) {
    console.log('CORS not supported');
    return;
  }
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
      if(currentPage.includes(viewUser)){
        var objs = JSON.parse(httpRequest.response);
        var listParent = document.getElementById("user-list");
        var select = document.createElement('select');
        select.className = 'resource-list';
        listParent.appendChild(select);

        /* Resource select event listener */
        select.addEventListener("change", function(){
          var dataLabels = document.getElementById("resource-value");
          if(dataLabels != null){
            dataLabels.reset();
          }
          var resourceId = select.value;
          for(var key in objs){
            for(var subkey in objs[key]){
              if(subkey=="id" && objs[key][subkey]==resourceId){
                var resouceToGet = key;
              }
            }
          }
          for(var i in objs[resouceToGet]){
            var label = document.createElement('label');
            var valueLabel = document.createElement('label');
            var br = document.createElement('br');
            listParent.appendChild(br);
            label.className = "resource-key";
            valueLabel.className = "resource-value";
            label.innerHTML = i + " : ";
            valueLabel.innerHTML = " " + objs[resouceToGet][i];
            //console.log(i + " : " + objs[resouceToGet][i]);
            listParent.appendChild(label);
            listParent.appendChild(valueLabel);
            listParent.appendChild(br);
          }
        });

        /* Populate the dropdown list of the resources. */
        for(var key in objs){
          for(var subkey in objs[key]){
            if(subkey=="firstName"){
              var option = document.createElement('option');
              option.className = "resource-value";
              option.value = objs[key]['id'];
              option.innerHTML = objs[key][subkey];
              select.appendChild(option);
            }
          }
        }
        /*
        for(var key in objs){
          var innerDiv = document.createElement('div');
          innerDiv.className = 'resource-details-' + key;
          listParent.appendChild(innerDiv);
          for(var subkey in objs[key]){
            var heading = document.createElement('label');
            heading.className = "resource-heading";
            heading.innerHTML = subkey;
            innerDiv.appendChild(heading);
            console.log("subkey : "+subkey + " : " + objs[key][subkey]);
          }
          //listParent.createElement('</div>');
        }*/

      }
    }
  }
  httpRequest.onerror = function() {
    console.log('Woops, there was an error making the request : ');
  };
  httpRequest.open(method, url, true);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.send();
}


var retrieveForm = document.getElementById('view-form');
if(retrieveForm != null){
    retrieveForm.addEventListener("submit", retrieveResource);
}

function retrieveResource(e){
  e.preventDefault();

  /* Create and initialize local variables */
  var currentForm = e.currentTarget.id;
  var encoding = null;
  var method = null;
  var action = null;
  var form = null;
  var formData = null;
  var httpRequest = null;

  /* Detecting current form */
  if(currentForm == "create-user-form"){
    form = createUserForm;
  } else if (currentForm == "create-project-form") {
    form = createProjectForm;
  } else if (currentForm == "create-category-form") {
    form = createCategoryForm;
  }

  encoding = form.enctype;
  method = form.method;
  action = form.action;



  var form = retrieveForm;
  var id = document.getElementById("view-id").value;

  var url = form.action + id;
  var method = form.method;
  var encoding = "application/json";

  var httpRequest = createCORSRequest(method, url);
  if (!httpRequest) {
    console.log('CORS not supported');
    return;
  }
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
      console.log("View Response: " + httpRequest.response);
    }
  }
  httpRequest.onerror = function() {
    console.log('Woops, there was an error making the request : ');
  };
  httpRequest.open(method, url, true);
  httpRequest.setRequestHeader("Content-Type", encoding);
  httpRequest.send();
}

/*
 * deleteResource function
*/
var deleteForm = document.getElementById('delete-form');
if(deleteForm != null){
    deleteForm.addEventListener("submit", deleteResource);
}

function deleteResource(e){
  e.preventDefault();

  var form = deleteForm;
  var id = document.getElementById("delete-id").value;

  var url = form.action + id;
  var method = "DELETE";
  var encoding = "application/json";

  var httpRequest = createCORSRequest(method, url);
  if (!httpRequest) {
    console.log('CORS not supported');
    return;
  }
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
      console.log("Delete: " + httpRequest.response);
    }
  }
  httpRequest.onerror = function() {
    console.log('Woops, there was an error making the request : ');
  };
  httpRequest.open(method, url, true);
  httpRequest.setRequestHeader("Content-Type", encoding);
  httpRequest.send();
}
