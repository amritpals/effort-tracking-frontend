var baseURL = localStorage.baseURL;

function onError(){
  console.log('Woops, there was an error making the request : ');
}

/******************************************************************************/
/*********************************************/
/* Check current page and set function calls */
/*********************************************/
if(currentPage.includes("admin-view-user")){
  adminViewUserList(baseURL + "User");
} else if(currentPage.includes("admin-view-project")){
  adminViewProjectList(baseURL + "Project");
} else if(currentPage.includes("admin-view-category")){
  adminViewCategoryList(baseURL + "Category");
}

/****************************************************/
/* Add callback functions to submit & change button */
/****************************************************/
// User Form
var userViewSelect = document.getElementById("userViewSelect");
if(userViewSelect != null){
  userViewSelect.addEventListener("change", getUserDetails);
}
var viewUserForm = document.getElementById("admin-view-user");
if(viewUserForm != null){
  viewUserForm.addEventListener("submit", updateUserDetails);
}

// Project Form
var projectViewSelect = document.getElementById("projectViewSelect");
if(projectViewSelect != null){
  projectViewSelect.addEventListener("change", getProjectDetails);
}
var viewProjectForm = document.getElementById("admin-view-project");
if(viewProjectForm != null){
  viewProjectForm.addEventListener("submit", updateProjectDetails);
}

// Category Form
var categoryViewSelect = document.getElementById("categoryViewSelect");
if(categoryViewSelect != null){
  categoryViewSelect.addEventListener("change", getCategoryDetails);
}
var viewCategoryForm = document.getElementById("admin-view-category");
if(viewCategoryForm != null){
  viewCategoryForm.addEventListener("submit", updateCategoryDetails);
}

/******************************************************************************/
/************************************/
/* Populates the User dropdown list */
/************************************/
function adminViewUserList(url){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var userViewSelect = document.getElementById("userViewSelect");

      // Remove old entries, if any
      var length = userViewSelect.options.length;
      for (i = 0; i < length; i++) {
        userViewSelect.options[0] = null;
      }
      // Create default entry
      var defaultOption = document.createElement('option');
      defaultOption.text = "Select the Resource";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      userViewSelect.appendChild(defaultOption);

      // Create other entries based on data
      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for (var subkey in httpResponse[key]) {
          var options = document.createElement('option');
          if (subkey == "firstName") {
            options.value = httpResponse[key]['id'];
            options.innerHTML = httpResponse[key][subkey];
            userViewSelect.appendChild(options);
            break innerloop;
          }
        }
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/***************************************/
/* Populates the Project dropdown list */
/***************************************/
function adminViewProjectList(url){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var projectViewSelect = document.getElementById("projectViewSelect");

      // Remove old entries, if any
      var length = projectViewSelect.options.length;
      for (i = 0; i < length; i++) {
        projectViewSelect.options[0] = null;
      }
      // Create default entry
      var defaultOption = document.createElement('option');
      defaultOption.text = "Select the Project";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      projectViewSelect.appendChild(defaultOption);

      // Create other entries based on data
      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for (var subkey in httpResponse[key]) {
          var options = document.createElement('option');
          if (subkey == "projectName") {
            options.value = httpResponse[key]['id'];
            options.innerHTML = httpResponse[key][subkey];
            projectViewSelect.appendChild(options);
            break innerloop;
          }
        }
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/****************************************/
/* Populates the Category dropdown list */
/****************************************/
function adminViewCategoryList(url){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var categoryViewSelect = document.getElementById("categoryViewSelect");

      // Remove old entries, if any
      var length = categoryViewSelect.options.length;
      for (i = 0; i < length; i++) {
        categoryViewSelect.options[0] = null;
      }
      // Create default entry
      var defaultOption = document.createElement('option');
      defaultOption.text = "Select the Task Category";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      categoryViewSelect.appendChild(defaultOption);

      // Create other entries based on data
      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for (var subkey in httpResponse[key]) {
          var options = document.createElement('option');
          if (subkey == "name") {
            options.value = httpResponse[key]['id'];
            options.innerHTML = httpResponse[key][subkey];
            categoryViewSelect.appendChild(options);
            break innerloop;
          }
        }
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/*****************************************************************************/
/******************************************/
/* Populates the User Details in the form */
/******************************************/
function getUserDetails(){
  var userId = document.getElementById("userViewSelect").value;

  var method = "GET";
  var url = baseURL + "User/" + userId;
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var userForm = document.getElementById("admin-view-user");

      // Fill User form with data
      for(var key in httpResponse){
        if(key=="project"){
          if(httpResponse[key].length > 0){
            userForm.projectName.value = ""; // Initialize
            for(var subkey in httpResponse[key]){
              if(subkey==0){
                userForm.projectName.value = httpResponse[key][subkey].projectName;
              } else {
                userForm.projectName.value = userForm.projectName.value + ", " + httpResponse[key][subkey].projectName;
              }
            }
          } else {
            userForm.projectName.value = "Free Resource";
          }
        }
        //Ignore any other invalid key
        if(typeof userForm[key] === 'undefined' || !userForm[key]){
          continue;
        }
        // Assign all other values
        userForm[key].value = httpResponse[key];
        // Special case for Date
        if(key=="dob"){
          var dob = new Date(httpResponse[key]);
          userForm[key].value = ((dob.getFullYear())+ "-" + (dob.getMonth() + 1) + "-" + (dob.getDate()));
        }
        // Special case for Radio buttons
        if((key=="isAdmin") || (key=="isManager") || (key=="isEnabled")){
          if(httpResponse[key] == true){
            userForm[key][0].checked = true;
          } else {
            userForm[key][1].checked = true;
          }
        }
      }

    }
  }

  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/******************************************/
/* Populates the Project Details in the form */
/******************************************/
function getProjectDetails(){
  var projectId = document.getElementById("projectViewSelect").value;

  var method = "GET";
  var url = baseURL + "Project/" + projectId;
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var projectForm = document.getElementById("admin-view-project");

      // Fill User form with data
      for(var key in httpResponse){
        if(key=="category"){
          if(httpResponse[key].length > 0){
            projectForm.name.value = ""; // Initialize
            for(var subkey in httpResponse[key]){
              if(subkey==0){
                projectForm.name.value = httpResponse[key][subkey].name;
              } else {
                projectForm.name.value = projectForm.name.value + ", " + httpResponse[key][subkey].name;
              }
            }
          } else {
            projectForm.name.value = "No Categories Allocated";
          }
        }
        //Ignore any other invalid key
        if(typeof projectForm[key] === 'undefined' || !projectForm[key]){
          continue;
        }
        // Assign all other values
        projectForm[key].value = httpResponse[key];
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/**********************************************/
/* Populates the Category Details in the form */
/**********************************************/
function getCategoryDetails(){
  var categoryId = document.getElementById("categoryViewSelect").value;

  var method = "GET";
  var url = baseURL + "Category/" + categoryId;
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var categoryForm = document.getElementById("admin-view-category");

      // Fill User form with data
      for(var key in httpResponse){
        //Ignore any other invalid key
        if(typeof categoryForm[key] === 'undefined' || !categoryForm[key]){
          continue;
        }
        // Assign all other values
        categoryForm[key].value = httpResponse[key];
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/*****************************************************************************/
/********************************************************/
/* Update the changes made in User form to the database */
/********************************************************/
function updateUserDetails(e){
  e.preventDefault();

  var userFormData = JSON.parse(queryStringToJsonString($("#admin-view-user").serialize()));
  var userObj = {};
  for(var key in userFormData){
    if(key=="projectName")
      continue;
    userObj[key] = decodeURIComponent(userFormData[key]);
  }

  updateDetails("PUT", baseURL + "User", JSON.stringify(userObj), "Resource", "userViewForm");
}

/***********************************************************/
/* Update the changes made in Project form to the database */
/***********************************************************/
function updateProjectDetails(e){
  e.preventDefault();

  var projectFormData = JSON.parse(queryStringToJsonString($("#admin-view-project").serialize()));
  var projectObj = {};
  for(var key in projectFormData){
    if(key=="name")
      continue;
    projectObj[key] = decodeURIComponent(projectFormData[key]);
  }

  updateDetails("PUT", baseURL + "Project", JSON.stringify(projectObj), "Project", "projectViewForm");
}

/************************************************************/
/* Update the changes made in Category form to the database */
/************************************************************/
function updateCategoryDetails(e){
  e.preventDefault();

  var categoryFormData = JSON.parse(queryStringToJsonString($("#admin-view-category").serialize()));
  var categoryObj = {};
  for(var key in categoryFormData){
    categoryObj[key] = decodeURIComponent(categoryFormData[key]);
  }

  updateDetails("PUT", baseURL + "Category", JSON.stringify(categoryObj), "Task Category", "categoryViewForm");
}


/*************************************************************/
/* Generic method to send and handle update request/response */
/*************************************************************/
function updateDetails(method, url, payload, objectString, formName){

  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      alert(objectString + " updated successfully!");
      resetForm(formName);
    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/x-www-form-urlencoded", payload);
}

/*****************************************************************************/
/******************/
/* Reset the form */
/******************/
function resetForm(id){
  if(id == "userViewForm"){
    document.getElementById("userViewSelect").selectedIndex = 1;
    document.getElementById("admin-view-user").reset();
    adminViewUserList(baseURL + "User");
  } else if(id == "projectViewForm"){
    document.getElementById("projectViewSelect").selectedIndex = 1;
    document.getElementById("admin-view-project").reset();
    adminViewProjectList(baseURL + "Project");
  } else if(id == "categoryViewForm"){
    document.getElementById("categoryViewSelect").selectedIndex = 1;
    document.getElementById("admin-view-category").reset();
    adminViewCategoryList(baseURL + "Category");
  }
}
