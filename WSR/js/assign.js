var baseURL = localStorage.baseURL;

function onError(){
  console.log('Woops, there was an error making the request : ');
}

/* Assign Screen JavaScript */
// Check the current page
var assignUser = "admin-assign-user";
var assignCategory = "admin-assign-category";
if (currentPage.includes(assignUser)) {
  //getAssignProjectData(baseURL + 'Project');
  getAssignProjectData(baseURL + 'Project', "projectSelect");
  getAssignProjectData(baseURL + 'Project', "projectRemove");
  getAssignUserData(baseURL + 'User', "userSelect");
  getAssignUserData(baseURL + 'User', "userRemove");
} else if (currentPage.includes(assignCategory)) {
  getAssignProjectData(baseURL + 'Project');
  getAssignCategoryData(baseURL + 'Category');
}

/*
 * Generic Assign Functions
 */

 /*
  * getAssignProjectData
  */

function getAssignProjectData(url, operation) {
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      if ( currentPage.includes(assignUser) || currentPage.includes(assignCategory)) {
        var objs = JSON.parse(httpRequest.response);
        if (storageAvailable('localStorage')) {
          // Yippee! We can use localStorage awesomeness
          localStorage.projectData = httpRequest.response;
        } else {
          // Too bad, no localStorage for us
        }
        var selectProject = document.getElementById(operation);
        for (var key in objs) {
          for (var subkey in objs[key]) {
            var options = document.createElement('option');
            if (subkey == "projectName") {
              options.name = subkey;
              options.value = objs[key]['id'];
              options.innerHTML = objs[key][subkey];
              selectProject.appendChild(options);
            }
          }
        }
      }
    }
  }
  httpRequest.onerror = onError;

  sendHttpRequest(httpRequest, method, url, "application/json", null);

}

/* Change Event Listener on Project dropdown in Allocate & Remove resource */
var projectSelect = document.getElementById("projectSelect");
var projectRemove = document.getElementById("projectRemove");
if(projectSelect != null){
  projectSelect.addEventListener("change", function(){
    getAssignUserData(baseURL + 'User', "userSelect");
  });
}
if(projectSelect != null){
  projectRemove.addEventListener("change", function(){
    getAssignUserData(baseURL + 'User', "userRemove");
  });
}

function onChangeProjectDropDown(e){
  console.log(e);
  if(projectSelect != null){
    getAssignUserData(baseURL + 'User', "userSelect");
  }
  if(projectRemove != null){
    getAssignUserData(baseURL + 'User', "userRemove");
  }
}

function getAssignUserData(url, operation) {
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      if (currentPage.includes(assignUser)) {
        var objs = JSON.parse(httpRequest.response);
        var selectUser = document.getElementById(operation);
        var length = selectUser.options.length;
        for (i = 0; i < length; i++) {
          selectUser.options[i] = null;
        }

        var selectProjectType = null;
        if(operation == "userSelect"){
          selectProjectType = "projectSelect";
        } else if (operation == "userRemove") {
          selectProjectType = "projectRemove";
        } else {
          selectProjectType = null;
        }
        var selectProject = document.getElementById(selectProjectType);

        //console.log(objs.toSource());

        for (var key in objs) {
          var allocatedProjectId = (objs[key]["projectId"]==null)?0:objs[key]["projectId"]['id'];
          var currentSelectedProjectId = parseInt(selectProject.value);
          for (var subkey in objs[key]) {
            var options = document.createElement('option');
            if (subkey == "firstName") {
              /* Check if the form being updated */
              if( (selectProjectType == "projectSelect") && (allocatedProjectId == currentSelectedProjectId)){
                /* Display resources which are allocated to the selected Project */
                  options.value = objs[key]['id'];
                  options.innerHTML = objs[key][subkey];
                  selectUser.appendChild(options);
              } else if( (selectProjectType == "projectRemove") && (allocatedProjectId != currentSelectedProjectId)){
                /* Display resources which are not allocated to the selected Project */
                options.value = objs[key]['id'];
                options.innerHTML = objs[key][subkey];
                selectUser.appendChild(options);
              } else {
                // nothing
              }
            }
          }
        }
      }
    }
  }

  httpRequest.onerror = onError;

  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

function getAssignCategoryData(url) {
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      if (currentPage.includes(assignCategory)) {
        var objs = JSON.parse(httpRequest.response);
        if (storageAvailable('localStorage')) {
          // Yippee! We can use localStorage awesomeness
          localStorage.categoryData = httpRequest.response;
        } else {
          // Too bad, no localStorage for us
        }
        var selectCategory = document.getElementById("categorySelect");
        for (var key in objs) {
          for (var subkey in objs[key]) {
            var options = document.createElement('option');
            if (subkey == "name") {
              options.value = objs[key]['id'];
              options.innerHTML = objs[key][subkey];
              selectCategory.appendChild(options);
            }
          }
        }
      }
    }
  }

  httpRequest.onerror = onError;

  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

var assignProjectUser = document.getElementById('assign-user');
var assignProjectCategory = document.getElementById('assign-category');
/* Assign callback functions when button is pressed */
if (assignProjectUser != null) {
  assignProjectUser.addEventListener("submit", fxn_assignProjectUser);
} else if (assignProjectCategory != null) {
  assignProjectCategory.addEventListener("submit", fxn_assignProjectCategory);
}

/* Assign Users to Project */
function fxn_assignProjectUser(e) {
  e.preventDefault();

  /* Extracting form's data */
  var formData = JSON.parse(queryStringToJsonString($("#assign-user").serialize()));
  var projectData = JSON.parse(localStorage.projectData);
  for (var j in formData) {
    console.log(j + " - " + formData[j]);
  }
  var projectId = null;
  for (var i in projectData) {
    if (formData['projectSelect'] == projectData[i]['id']) {
      //console.log(projectData[i]);
      console.log(formData['userSelect']);
      projectId = i;
      var userIds = formData['userSelect'].toString().split(",");
      console.log(userIds);
      for(var id in userIds){
        var payload = JSON.stringify(projectData[i]);
        updateUserProject("PUT", baseURL + "User/"+userIds[id], payload);
      }
    }
  }
}
function updateUserProject(method, url, projectData){

  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      console.log(httpRequest.response);
    }
  }

  httpRequest.onerror = onError;

  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/* Assign Task Category to Project */
function fxn_assignProjectCategory(e) {
  e.preventDefault();

  /* Extracting form's data */
  var formData = JSON.parse(queryStringToJsonString($("#assign-category").serialize()));
  var categoryData = JSON.parse(localStorage.categoryData);
  for (var k in formData['categorySelect']) {
    for(var j in categoryData){
      if(formData['categorySelect'][k] == categoryData[j]['id']){
        var projectId = formData['projectSelect'];
        var payload = JSON.stringify(categoryData[j]);
        updateProjectCategory("PUT", baseURL + "Project/"+projectId, payload);
      }
    }
  }
}

function updateProjectCategory(method, url, categoryData){

  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      console.log(httpRequest.response);
    }
  }

  httpRequest.onerror = onError;

  sendHttpRequest(httpRequest, method, url, "application/json", null);
}
