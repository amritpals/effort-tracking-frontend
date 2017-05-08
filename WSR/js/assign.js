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
        adminDeallocListCategories(baseURL + "Project");
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
      // Save Category object data for later use
      if (storageAvailable('localStorage')) {
        localStorage.categoryData = httpRequest.response;
      } else {
        // Too bad, no localStorage for us
      }
      var currentSelectedProjectId = document.getElementById("projectSelect").value;
      url = baseURL + "Project/" + currentSelectedProjectId;
      getProjectTaskCategories(method, url);
    }
  }

  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/******************************************/
/* Populates the Unassigned Category list */
/******************************************/
function getProjectTaskCategories(method, url){
  var httpRequest = createHttpRequest(method, url);
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var currentProjectCategoryData = httpResponse.category;
      var categoryDataSet = JSON.parse(localStorage.categoryData);

      var categorySelect = document.getElementById("categorySelect");

      currentProjectCategoryData.sort(function(a, b){
        return parseInt(a.id) - parseInt(b.id);
      });

      categoryDataSet.sort(function(a, b){
        return parseInt(a.id) - parseInt(b.id);
      });

      // Find Unassigned Category objects
      var result = categoryDataSet.filter(function(x){
        return !currentProjectCategoryData.some(function(y){
          return x.id == y.id;
        });
      });

      for(var key in result){
        var options = document.createElement('option');
        options.value = result[key]['id'];
        options.innerHTML = result[key]['name'];
        categorySelect.appendChild(options);
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
  var currentSelectedProjectId = document.getElementById("projectDeallocSelect").value;
  url = url + "/" + currentSelectedProjectId;
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);

      var categorySelect = document.getElementById("categoryDeallocSelect");
      for (var key in httpResponse.category) {
        var options = document.createElement('option');
        options.value = httpResponse.category[key]['id'];
        options.innerHTML = httpResponse.category[key]['name'];
        categorySelect.appendChild(options);
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
  var resource = "Resource ";
  if(currentPage.includes(assignUser)){
    var currentForm = "#assign-user";
    var method = "PUT";
    var userSelect = "userSelect";
    var projectSelect = "projectSelect";
    var action = resource + "Allocated";
  } else {
    var currentForm = "#dealloc-user";
    var method = "DELETE";
    var userSelect = "userDeallocSelect";
    var projectSelect = "projectDeallocSelect";
    var action = resource + "Deallocated";
  }
  var userFormData = JSON.parse(queryStringToJsonString($(currentForm).serialize()));
  for(var key in userFormData[userSelect]){
    var projectId = userFormData[projectSelect];
    var userId = userFormData[userSelect][key];
    var url = baseURL + "User/" + userId + "/Project/" + projectId;
    allocateDeallocate(method, url, userId, userSelect, action);
  }
}

/**********************************/
/* Save the Categories to Project */
/**********************************/
function saveProjectCategory(e){
  e.preventDefault();
  var resource = "Task Category ";
  if(currentPage.includes(assignCategory)){
    var currentForm = "#assign-category";
    var method = "PUT";
    var projectSelect = "projectSelect";
    var categorySelect = "categorySelect";
    var action = resource + "Allocated";
  } else {
    var currentForm = "#dealloc-category";
    var method = "DELETE";
    var projectSelect = "projectDeallocSelect";
    var categorySelect = "categoryDeallocSelect";
    var action = resource + "Deallocated";
  }

  var categoryFormData = JSON.parse(queryStringToJsonString($(currentForm).serialize()));
  for (var key in categoryFormData[categorySelect]) {
    var projectId = categoryFormData[projectSelect];
    var categoryId = categoryFormData[categorySelect][key];
    var url = baseURL + "Project/" + projectId + "/Category/" + categoryId;
    allocateDeallocate(method, url, categoryId, categorySelect, action);
  }
}

/*****************************************************************/
/* Generic Helper function for updating Category/User to Project */
/*****************************************************************/
function allocateDeallocate(method, url, id, childSelectName, action){
  var httpRequest = createHttpRequest(method, url);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var childSelect = document.getElementById(childSelectName);
      for (var i=0; i<childSelect.length; i++){
        if (childSelect.options[i].value == id ){
          childSelect.remove(i);
          alert(action + " Successfully!");
        }
      }
    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
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
    adminDeallocListCategories(baseURL + "Project");
  }
}
