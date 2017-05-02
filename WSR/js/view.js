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
}

/****************************************************/
/* Add callback functions to submit & change button */
/****************************************************/
var userSelect = document.getElementById("userSelect");
if(userSelect != null){
  userSelect.addEventListener("change", getUserDetails);
}
var viewUserForm = document.getElementById("admin-view-user");
if(viewUserForm != null){
  viewUserForm.addEventListener("submit", updateUserDetails);
}

/************************************/
/* Populates the User dropdown list */
/************************************/
function adminViewUserList(url, currentProjectId){
  var method = "GET";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var userSelect = document.getElementById("userSelect");

      outerloop:
      for (var key in httpResponse) {
        innerloop:
        for (var subkey in httpResponse[key]) {
          var options = document.createElement('option');
          if (subkey == "firstName") {
            options.value = httpResponse[key]['id'];
            options.innerHTML = httpResponse[key][subkey];
            userSelect.appendChild(options);
            break innerloop;
          }
        }
      }

    }
  }
  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/******************************************/
/* Populates the User Details in the form */
/******************************************/
function getUserDetails(){
  var userId = document.getElementById("userSelect").value;

  var method = "GET";
  var url = baseURL + "User/" + userId;
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var httpResponse = JSON.parse(httpRequest.response);
      var userForm = document.getElementById("admin-view-user");

      userForm.firstName.value = httpResponse.firstName;
      userForm.lastName.value = httpResponse.lastName;
      userForm.emailId.value = httpResponse.emailId;
      var dob = new Date(httpResponse.dob);
      userForm.dob.value = ((dob.getFullYear())+ "-" + (dob.getMonth() + 1) + "-" + (dob.getDate()));
      userForm.role.value = httpResponse.role;
      userForm.wwid.value = httpResponse.wwid;
      userForm.wiproEmpId.value = httpResponse.wiproEmpId;
      //isAdmin Radio Button
      if(httpResponse.isAdmin == true){
        userForm.isAdmin[0].checked = true;
      } else {
        userForm.isAdmin[1].checked = true;
      }
      //isManager Radio Button
      if(httpResponse.isManager == true){
        userForm.isManager[0].checked = true;
      } else {
        userForm.isManager[1].checked = true;
      }
      //isEnabled Radio Button
      if(httpResponse.isEnabled == true){
        userForm.isEnabled[0].checked = true;
      } else {
        userForm.isEnabled[1].checked = true;
      }

      if(httpResponse.project.length != null && httpResponse.project.length > 1){
        userForm.projectName.value = ""; // Initialize
        for(var key in httpResponse.project){
          userForm.projectName.value = userForm.projectName[key].value + ", " + httpResponse.project[key].projectName;
        }
      } else {
        userForm.projectName.value      = httpResponse.project.projectName;
        userForm.id.value               = httpResponse.project.id;
        userForm.billingModel.value     = httpResponse.project.billingModel;
        userForm.budget.value           = httpResponse.project.budget;
        userForm.isEnabledProject.value = httpResponse.project.isEnabled;
        userForm.intelManagerName.value = httpResponse.project.intelManagerName;
      }

    }
  }

  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/json", null);
}

/***************************************************/
/* Update the changes made in form to the database */
/***************************************************/
function updateUserDetails(e){
  e.preventDefault();

  var userId = document.getElementById("userSelect").value;
  var userFormData = JSON.parse(queryStringToJsonString($("#admin-view-user").serialize()));

  //Create local User object
  var userObj = {};
  userObj.id = userId;
  userObj.firstName = decodeURIComponent(userFormData.firstName);
  userObj.lastName = decodeURIComponent(userFormData.lastName);
  userObj.emailId = decodeURIComponent(userFormData.emailId);
  userObj.role = decodeURIComponent(userFormData.role);
  userObj.dob = decodeURIComponent(userFormData.dob);
  userObj.wwid = userFormData.wwid;
  userObj.wiproEmpId = userFormData.wiproEmpId;
  userObj.isAdmin = userFormData.isAdmin;
  userObj.isManager = userFormData.isManager;
  userObj.isEnabled = userFormData.isEnabled;
  userObj.project = new Set();
  var project = {};
  if(userFormData.projectName != null){
    project.projectName = decodeURIComponent(userFormData.projectName);
    project.id = userFormData.id;
    project.billingModel = decodeURIComponent(userFormData.billingModel);
    project.budget = userFormData.budget;
    project.isEnabled = userFormData.isEnabledProject;
    project.intelManagerName = decodeURIComponent(userFormData.intelManagerName);
    project.category = new Set();
    userObj.project.add(project);
    /*userObj.project.projectName = decodeURIComponent(userFormData.projectName);
    userObj.project.id = userFormData.id;
    userObj.project.billingModel = decodeURIComponent(userFormData.billingModel);
    userObj.project.budget = userFormData.budget;
    userObj.project.isEnabled = userFormData.isEnabledProject;
    userObj.project.intelManagerName = decodeURIComponent(userFormData.intelManagerName);
    userObj.project.category = {};*/
    //to be extended for multiple projects and multiple adding categories data
  }

  var payload = JSON.stringify(userObj);

  var method = "PUT";
  var url = baseURL + "User";
  var httpRequest = createHttpRequest(method, url);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      console.log(httpRequest.response);
    }
  }

  httpRequest.onerror = onError;
  sendHttpRequest(httpRequest, method, url, "application/x-www-form-urlencoded", payload);
}
