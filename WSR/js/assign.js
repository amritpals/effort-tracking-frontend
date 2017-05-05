var baseURL = localStorage.baseURL;

function onError(){
  console.log('Woops, there was an error making the request : ');
}

/******************************************************************************/
/*********************************************/
/* Check current page and set function calls */
/*********************************************/
var assignUser = "admin-assign-user";
var assignCategory = "admin-assign-category";
if(currentPage.includes(assignUser) || currentPage.includes(assignCategory)){
  adminListProjects(baseURL + "Project");
}

/****************************************************/
/* Add callback functions to submit & change button */
/****************************************************/
var assignUserForm = document.getElementById("assign-user");
if(assignUserForm != null){
  assignUserForm.addEventListener("submit", saveProjectUser);
}
var assignCategoryForm = document.getElementById("assign-category");
if(assignCategoryForm != null){
  assignCategoryForm.addEventListener("submit", saveProjectCategory);
}

var projectSelect = document.getElementById("projectSelect");
if(projectSelect != null){
  projectSelect.addEventListener("change", function(){
    if(currentPage.includes(assignUser)){
      refreshUserList();
    } else {
      refreshCategoryList();
    }
  });
}

/******************************************************************************/

/**************************** Create options functions ************************/
/***************************************/
/* Populates the Project dropdown list */
/***************************************/
function adminListProjects(url){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {

      var httpResponse = JSON.parse(httpRequest.response);
      var projectSelect = document.getElementById("projectSelect");

      // Save Project object data for later use
      if (storageAvailable('localStorage')) {
        localStorage.projectData = httpRequest.response;
      } else {
        // Too bad, no localStorage for us
      }

      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for (var subkey in httpResponse[key]) {
          var options = document.createElement('option');
          if (subkey == "projectName") {
            options.name = subkey;
            options.value = httpResponse[key]['id'];
            options.innerHTML = httpResponse[key][subkey];
            projectSelect.appendChild(options);
            break innerloop;
          }
        }
      }
      if(currentPage.includes(assignUser)){
        adminListUsers(baseURL + "User", projectSelect.value);
      } else {
        adminListCategories(baseURL + "Category", projectSelect.value);
      }
    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/************************************/
/* Populates the User dropdown list */
/************************************/
function adminListUsers(url, currentProjectId){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var userSelect = document.getElementById("userSelect");

      for (var key in httpResponse) { // loop through the user's list
        var flag = false;
        if(parseInt(httpResponse[key]["project"].length) > 0){

          for(var projectId in httpResponse[key]["project"]){
            var id = parseInt(httpResponse[key]["project"][projectId]['id']);
            if(id == parseInt(currentProjectId)){
              flag = true;
              break;
            }
          }

        }
        // If resource is not found allocated in the given project
        if(flag == false){
          var options = document.createElement('option');
          options.value = httpResponse[key]['id'];
          options.innerHTML = httpResponse[key]['firstName'];
          userSelect.appendChild(options);
        }
      } // End of outermostloop

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/****************************************/
/* Populates the Category dropdown list */
/****************************************/
function adminListCategories(url){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);

      // To find the current project and its relevant data to compare later
      var projectData = JSON.parse(localStorage.projectData);
      var currentSelectedProjectId = document.getElementById("projectSelect").value;
      var currentProjectData = null;
      for(var key in projectData){
        if(projectData[key]['id'] == currentSelectedProjectId){
          currentProjectData = projectData[key];
          break;
        }
      }
      // Save Category object data for later use
      if (storageAvailable('localStorage')) {
        localStorage.categoryData = httpRequest.response;
      } else {
        // Too bad, no localStorage for us
      }

      var categorySelect = document.getElementById("categorySelect");
      // Flag to find non-duplicate category to show in available list
      var flag = false;
      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for(var subkey in currentProjectData.category){
          if(httpResponse[key]['id'] == currentProjectData.category[subkey]['id']){
            flag = true;
            break innerloop;
          }
        }
        if(!flag){
          // Found non-duplicate category hence display it
          var options = document.createElement('option');
          options.value = httpResponse[key]['id'];
          options.innerHTML = httpResponse[key]['name'];
          categorySelect.appendChild(options);
        } else {
          // Reset the flag
          flag = false;
        }
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}


/****************************** Save Data functions ***************************/
/*****************************/
/* Save the Users to Project */
/*****************************/
function saveProjectUser(e){
  e.preventDefault();
  var userFormData = JSON.parse(queryStringToJsonString($("#assign-user").serialize()));
  var projectData = JSON.parse(localStorage.projectData);
  for (var i in projectData) {
    if (userFormData['projectSelect'] == projectData[i]['id']) {
      projectId = i;
      var userIds = userFormData['userSelect'].toString().split(",");
      for(var id in userIds){
        var payload = JSON.stringify(projectData[i]);
        updateProjectUser("PUT", baseURL + "User/" + userIds[id], payload, userIds[id]);
      }
    }
  }
}
/* Helper function for updating Project to User */
function updateProjectUser(method, url, projectData, userId){
  var httpRequest = createHttpRequest(method, url);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var userSelect = document.getElementById("userSelect");
      for (var i=0; i<userSelect.length; i++){
        if (userSelect.options[i].value == userId ){
          userSelect.remove(i);
          alert("Resource Allocated Successfully!");
        }
      }
    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", projectData);
}

/**********************************/
/* Save the Categories to Project */
/**********************************/
function saveProjectCategory(e){
  e.preventDefault();
  var categoryFormData = JSON.parse(queryStringToJsonString($("#assign-category").serialize()));
  var categoryData = JSON.parse(localStorage.categoryData);
  for (var k in categoryFormData['categorySelect']) {
    for(var j in categoryData){
      if(categoryFormData['categorySelect'][k] == categoryData[j]['id']){
        var projectId = categoryFormData['projectSelect'];
        var payload = JSON.stringify(categoryData[j]);
        var categoryId = categoryData[j]['id'];
        updateProjectCategory("PUT", baseURL + "Project/" + projectId, payload, categoryId);
      }
    }
  }
}
/* Helper function for updating Category to Project */
function updateProjectCategory(method, url, categoryData, categoryId){
  var httpRequest = createHttpRequest(method, url);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var categorySelect = document.getElementById("categorySelect");
      for (var i=0; i<categorySelect.length; i++){
        if (categorySelect.options[i].value == categoryId ){
          categorySelect.remove(i);
          alert("Task Category Allocated Successfully!");
        }
      }
    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", categoryData);
}

/****************************** OnChange Callbacks ***************************/
/************************************************************/
/* Refresh User list when Project dropdown value is changed */
/************************************************************/
function refreshUserList(){
  // Clear all previous option values
  var selectUser = document.getElementById("userSelect");
  var length = selectUser.options.length;
  for (i = 0; i < length; i++) {
    selectUser.options[0] = null;
    // After every delete the previous node gets updated at one above level, hence the options value is always 0
  }
  // Update the list again
  var projectSelect = document.getElementById("projectSelect");
  adminListUsers(baseURL + "User", projectSelect.value);

}

function refreshCategoryList(){
  // Clear all previous option values
  var categorySelect = document.getElementById("categorySelect");
  var length = categorySelect.options.length;
  for (i = 0; i < length; i++) {
    categorySelect.options[0] = null;
    // After every delete the previous node gets updated at one above level, hence the options value is always 0
  }
  // Update the list again
  var projectSelect = document.getElementById("projectSelect");
  adminListCategories(baseURL + "Category", projectSelect.value);
}
