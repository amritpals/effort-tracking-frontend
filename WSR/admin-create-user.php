<?php include 'header.php' ?>
<?php include 'admin-sidebar.php' ?>

		<div class="container app-container">
			<div class="page-title">
				<h2>Create User</h2>
			</div>
			<div class="app-section create-user-form">
				<form action="http://localhost:8080/WSRTool/User/" enctype="application/x-www-form-urlencoded" method="POST" id="create-user-form">
					<div class="row">
						<div class="col-md-6">

							<div class="form-group">
								<label for="firstName">First Name</label>
								<input type="text" class="form-control" id="firstName" name="firstName">
							</div>

							<div class="form-group">
								<label for="lastName">Last Name</label>
								<input type="text" class="form-control" id="lastName" name="lastName">
							</div>

							<div class="form-group">
								<label for="emailId">Email Address</label>
								<input type="email" class="form-control" id="emailId" name="emailId">
							</div>

							<div class="form-group">
								<label for="role">Role</label>
								<select class="form-control" id="role" name="role">
									<option value="Manager">Manager</option>
								  <option value="Technical Lead">Technical Lead</option>
								  <option value="Engineer">Engineer/Tester</option>
								</select>
							</div>

							<div class="form-group">
								<label for="dob">Date of Birth</label>
								<input type="date" class="form-control" id="dob" name="dob" placeholder="YYYY-MM-DD">
							</div>

						</div> <!-- End of Column 1 -->


						<div class="col-md-6">  <!-- Start of Column 2 -->

							<div class="form-group">
								<label for="wwid">WWID</label>
								<input type="text" class="form-control" id="wwid" name="wwid">
							</div>

							<div class="form-group">
								<label for="wiproEmpId">Wipro Employee ID</label>
								<input type="text" class="form-control" id="wiproEmpId" name="wiproEmpId">
							</div>

							<!-- Radio Buttons -->
							<div class="row form-group">
								<label class="col-sm-2">Admin?</label>
								<div class="col-sm-10">
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="isAdmin" id="adminRadio1" value="true"> Yes
									  </label>
									</div>
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="isAdmin" id="adminRadio2" value="false"> No
									  </label>
									</div>
								</div>
							</div>
							<div class="row form-group">
								<label class="col-sm-2">Manager?</label>
								<div class="col-sm-10">
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="isManager" id="mgrRadio1" value="true"> Yes
									  </label>
									</div>
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="isManager" id="mgrRadio2" value="false"> No
									  </label>
									</div>
								</div>
							</div>

							<div class="row form-group">
								<label class="col-sm-2">Enabled?</label>
								<div class="col-sm-10">
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="isEnabled" id="enabledRadio1" value="true"> Yes
									  </label>
									</div>
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="isEnabled" id="enabledRadio2" value="false"> No
									  </label>
									</div>
								</div>
							</div>

						</div> <!-- End of Column 2 -->
					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">SAVE</button>
				</form>
			</div><!-- End of create user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php' ?>
