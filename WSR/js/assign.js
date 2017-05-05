var baseURL = localStorage.baseURL;

function onError(){
  console.log('Woops, there was an error making the request : ');
}

/******************************************************************************/
/*********************************************/
/* Check current page and set function calls */
/*********************************************/
// Allocate
var assignUser = "admin-assign-user";
var assignCategory = "admin-assign-category";
if(currentPage.includes(assignUser) || currentPage.includes(assignCategory)){
  adminListProjects(baseURL + "Project", "projectSelect");
}
// Deallocate
var deallocUser = "admin-dealloc-user";
var deallocCategory = "admin-dealloc-category";
if(currentPage.includes(deallocUser) || currentPage.includes(deallocCategory)){
  adminListProjects(baseURL + "Project", "projectDeallocSelect");
}

/****************************************************/
/* Add callback functions to submit & change button */
/****************************************************/
// Submit - Allocate
var assignUserForm = document.getElementById("assign-user");
if(assignUserForm != null){
  assignUserForm.addEventListener("submit", saveProjectUser);
}
var assignCategoryForm = document.getElementById("assign-category");
if(assignCategoryForm != null){
  assignCategoryForm.addEventListener("submit", saveProjectCategory);
}

// Submit - Deallocate
var deallocUserForm = document.getElementById("dealloc-user");
if(deallocUserForm != null){
  deallocUserForm.addEventListener("submit", saveProjectUser);
}
var deallocCategoryForm = document.getElementById("dealloc-category");
if(deallocCategoryForm != null){
  deallocCategoryForm.addEventListener("submit", saveProjectCategory);
}

// Change Event - Allocate
var projectSelect = document.getElementById("projectSelect");
if(projectSelect != null){
  projectSelect.addEventListener("change", function(){
    if(currentPage.includes(assignUser)){
      refreshUserList("projectSelect", "userSelect");
    } else {
      refreshCategoryList("projectSelect", "categorySelect");
    }
  });
}

// Change Event - Deallocate
var projectDeallocSelect = document.getElementById("projectDeallocSelect");
if(projectDeallocSelect != null){
  projectDeallocSelect.addEventListener("change", function(){
    if(currentPage.includes(deallocUser)){
      refreshUserList("projectDeallocSelect", "userDeallocSelect");
    } else {
      refreshCategoryList("projectDeallocSelect", "categoryDeallocSelect");
    }
  });
}

/******************************************************************************/

/**************************** Create options functions ************************/
/***************************************/
/* Populates the Project dropdown list */
/***************************************/
function adminListProjects(url, projectSelectorName){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {

      var httpResponse = JSON.parse(httpRequest.response);
      var projectSelect = document.getElementById(projectSelectorName);

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
      } else if(currentPage.includes(assignCategory)) {
        adminListCategories(baseURL + "Category");
      } else if(currentPage.includes(deallocUser)){
        adminDeallocListUsers(baseURL + "User", projectSelect.value);
      } else {
        adminDeallocListCategories(baseURL + "Category");
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

/**************************** Deallocate List functions ***********************/
/**************************************************************/
/* Populates the User dropdown list - For Deallocate Scenario */
/**************************************************************/
function adminDeallocListUsers(url, currentProjectId){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var userSelect = document.getElementById("userDeallocSelect");

      for (var key in httpResponse) { // loop through the user's list
        var flag = false;
        if(parseInt(httpResponse[key]["project"].length) > 0){

          for(var projectId in httpResponse[key]["project"]){
            var id = parseInt(httpResponse[key]["project"][projectId]['id']);
            if(id == parseInt(currentProjectId)){
              var options = document.createElement('option');
              options.value = httpResponse[key]['id'];
              options.innerHTML = httpResponse[key]['firstName'];
              userSelect.appendChild(options);
              break;
            }
          }

        }
      } // End of outermostloop

    }
  }

  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}
/******************************************************************/
/* Populates the Category dropdown list - For Deallocate Scenario */
/******************************************************************/
function adminDeallocListCategories(url){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);

      // To find the current project and its relevant data to compare later
      var projectData = JSON.parse(localStorage.projectData);
      var currentSelectedProjectId = document.getElementById("projectDeallocSelect").value;
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

      var categorySelect = document.getElementById("categoryDeallocSelect");
      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for(var subkey in currentProjectData.category){
          if(httpResponse[key]['id'] == currentProjectData.category[subkey]['id']){
            var options = document.createElement('option');
            options.value = httpResponse[key]['id'];
            options.innerHTML = httpResponse[key]['name'];
            categorySelect.appendChild(options);
          }
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
  if(currentPage.includes(assignUser)){
    var currentForm = "#assign-user";
    var method = "PUT";
    var userSelect = "userSelect";
    var projectSelect = "projectSelect";
    var action = "Allocated";
  } else {
    var currentForm = "#dealloc-user";
    var method = "DELETE";
    var userSelect = "userDeallocSelect";
    var projectSelect = "projectDeallocSelect";
    var action = "Deallocated";
  }
  var userFormData = JSON.parse(queryStringToJsonString($(currentForm).serialize()));
  for(var key in userFormData[userSelect]){
    var projectId = userFormData[projectSelect];
    var userId = userFormData[userSelect][key];
    var url = baseURL + "User/" + userId + "/Project/" + projectId;
    updateProjectUser(method, url, userId, userSelect, action);
  }
}
/* Helper function for updating Project to User */
function updateProjectUser(method, url, userId, userSelectName, action){
  var httpRequest = createHttpRequest(method, url);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var userSelect = document.getElementById(userSelectName);
      for (var i=0; i<userSelect.length; i++){
        if (userSelect.options[i].value == userId ){
          userSelect.remove(i);
          alert("Resource " + action + " Successfully!");
        }
      }
    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
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

/**************************** Remove Data functions ***************************/
/**************************************/
/* Remove the Categories from Project */
/**************************************/
function removeProjectCategory(e){
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

/****************************** OnChange Callbacks ***************************/
/************************************************************/
/* Refresh User list when Project dropdown value is changed */
/************************************************************/
function refreshUserList(projectSelectName, userSelectName){
  // Clear all previous option values
  var selectUser = document.getElementById(userSelectName);
  var length = selectUser.options.length;
  for (i = 0; i < length; i++) {
    selectUser.options[0] = null;
    // After every delete the previous node gets updated at one above level, hence the options value is always 0
  }
  // Update the list again
  var projectSelect = document.getElementById(projectSelectName);
  if(projectSelectName == "projectSelect"){
    adminListUsers(baseURL + "User", projectSelect.value);
  } else {
    adminDeallocListUsers(baseURL + "User", projectSelect.value);
  }
}

function refreshCategoryList(projectSelectName, categorySelectName){
  // Clear all previous option values
  var categorySelect = document.getElementById(categorySelectName);
  var length = categorySelect.options.length;
  for (i = 0; i < length; i++) {
    categorySelect.options[0] = null;
    // After every delete the previous node gets updated at one above level, hence the options value is always 0
  }
  // Update the list again
  var projectSelect = document.getElementById(projectSelectName);
  if(projectSelectName == "projectSelect"){
    adminListCategories(baseURL + "Category");
  } else {
    adminDeallocListCategories(baseURL + "Category");
  }
}
