<?php include 'header.php'; ?>
<?php include 'user-sidebar.php'; ?>
<script type="text/javascript">
function userHomePageData(url){
	var method = "GET";
  var httpRequest = createHttpRequest(method, url);
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var httpResponse = JSON.parse(httpRequest.response);
			var userProjects = document.getElementById("projects-list");

			// Count if the user has any projects assigned
			var projectNames = {};
			var count = 0;
			for(var key in httpResponse.project){
				if(key == "projectName"){
					projectNames[count] = httpResponse.project[key];
					count++;
				}
			}
			// Create the homepage area where project info will be shown
			for(var key in projectNames){
				console.log(projectNames[key]);
				var projectDiv = createInnerDivForProject(projectNames[key]);
				userProjects.appendChild(projectDiv);
			}

		}
	}
	httpRequest.onerror = function(){

	}
	sendHttpRequest(httpRequest, method, url, "application/json", null);
}
/* Function to create innerDiv for showing Project data */
function createInnerDivForProject(projectName){
	var projectDiv = document.createElement('div');
	projectDiv.className = "project-item add-shadow";

	var iTag = document.createElement('i');
	iTag.className = "fa fa-file fa-lg";
	iTag.setAttribute("aria-hidden", "true");
	projectDiv.appendChild(iTag);

	var heading = document.createElement('h3');
	heading.innerHTML = projectName;
	projectDiv.appendChild(heading);

	var rightDiv = document.createElement('div');
	rightDiv.className = "pull-right";
	var button1 = document.createElement('button');
	var button2 = document.createElement('button');
	button1.className = button2.className = "btn btn-primary";
	button1.setAttribute("type", "button");
	button2.setAttribute("type", "button");

	var iEye = document.createElement('i');
	iEye.className = "fa fa-eye";
	iEye.setAttribute("aria-hidden", "true");
	button1.innerHTML = "View Report ";
	button1.appendChild(iEye);

	var iClock = document.createElement('i');
	iClock.className = "fa fa-clock-o";
	iClock.setAttribute("aria-hidden", "true");
	button2.innerHTML = "Log Effort ";
	button2.appendChild(iClock);

	rightDiv.appendChild(button1);
	rightDiv.appendChild(button2);


	var clearDiv = document.createElement('div');
	clearDiv.className = "clearfix";

	projectDiv.appendChild(rightDiv);
	projectDiv.appendChild(clearDiv);

	return projectDiv;
}
window.onload = function(){
	var baseURL = localStorage.baseURL;
	var userId = 1; //For temporary basis, otherwise it will be logged in user id
	userHomePageData(baseURL + "User/" + userId);
}

</script>

		<div class="container app-container">
			<div class="page-title add-shadow">
				<h2>Profile</h2>
				<button type="submit" class="btn btn-primary logout-btn pull-right">Log Out</button>
			</div>
			<div id="projects-list" class="app-section user-projects">
				<h2>My Projects</h2>
				<!--div class="project-item add-shadow">
					<i class="fa fa-file fa-lg" aria-hidden="true"></i>
					<h3>Project Name</h3>
					<div class="pull-right">
						<button type="button" class="btn btn-primary"><i class="fa fa-eye" aria-hidden="true"></i> View Report</button>
						<button type="button" class="btn btn-primary"><i class="fa fa-clock-o" aria-hidden="true"></i> Log Effort </button>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="project-item add-shadow">
					<i class="fa fa-file fa-lg" aria-hidden="true"></i>
					<h3>Project Name</h3>
					<div class="pull-right">
						<button type="button" class="btn btn-primary"><i class="fa fa-eye" aria-hidden="true"></i> View Report</button>
						<button type="button" class="btn btn-primary"><i class="fa fa-clock-o" aria-hidden="true"></i> Log Effort </button>
					</div>
					<div class="clearfix"></div>
				</div-->
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
