<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title add-shadow">
				<h2>View/Update User</h2>
				<button type="submit" class="btn btn-primary logout-btn pull-right">Log Out</button>
			</div>
			<div class="app-section view-form">
				<form id="admin-view-user">
					<div class="form-group">
						<label for="userSelect">Select User</label>
						<select class="form-control" id="userViewSelect">
						</select>
					</div>

					<div class="row show-user-details">
						<div class="col-md-12">
							<legend>User Details:</legend>
						</div>

						<div class="col-md-6"> <!-- Start of first column -->

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
									<option value="" selected disabled>Select Role</option>
									<option value="Manager">Manager</option>
								  <option value="Technical Lead">Technical Lead</option>
								  <option value="Engineer">Engineer/Tester</option>
								</select>
							</div>

							<div class="form-group">
								<label for="dob">Date of Birth</label>
								<input type="date" class="form-control" id="dob" name="dob" placeholder="YYYY-MM-DD">
							</div>

						</div> <!-- End of first column -->

						<div class="col-md-6"> <!-- Start of second column -->

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

							<div class="form-group">
								<label for="projectName">Allocated Project(s)</label>
								<input type="text" class="form-control" id="projectName" name="projectName" readonly="readonly">
								<input type="hidden" class="form-control" id="id" name="id">
							</div>

						</div> <!-- End of second column -->

					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">Update</button>
					<button type="button" class="btn btn-primary" id="userViewForm" onclick="resetForm(this.id)">Reset Form</button>
				</form>
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
