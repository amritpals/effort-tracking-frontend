<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title add-shadow">
				<h2>View/Edit User</h2>
				<button type="submit" class="btn btn-primary logout-btn pull-right">Log Out</button>
			</div>
			<div class="app-section create-user-form">
				<form>
					<div class="form-group">
						<label for="userSelect">Select User</label>
						<select class="form-control" id="userSelect">
						  <option value="Abcd">Abcd</option>
						  <option value="Defh">Defh</option>
						  <option value="Ghij">Ghij</option>
						  <option value="Jklm">Jklm</option>
						</select>
					</div>

					<div class="row show-user-details">
						<div class="col-md-12">
							<legend>User Details:</legend>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="firstNameInput">First Name</label>
								<input type="text" class="form-control" id="firstNameInput">
							</div>
							<div class="form-group">
								<label for="lastNameInput">Last Name</label>
								<input type="text" class="form-control" id="lastNameInput">
							</div>
							<div class="form-group">
								<label for="roleSelect">Role</label>
								<select class="form-control" id="roleSelect">
								  <option>Team Leader</option>
								  <option>Engineer</option>
								</select>
							</div>
							<!----- Radio Buttons -->
							<div class="row form-group">
								<label class="col-sm-2">Admin?</label>
								<div class="col-sm-10">
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="adminRadioOptions" id="adminRadio1" value="option1"> Yes
									  </label>
									</div>
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="adminRadioOptions" id="adminRadio2" value="option2"> No
									  </label>
									</div>
								</div>
							</div>
							<div class="row form-group">
								<label class="col-sm-2">Manager?</label>
								<div class="col-sm-10">
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="mgrRadioOptions" id="mgrRadio1" value="option1"> Yes
									  </label>
									</div>
									<div class="form-check form-check-inline col-md-3">
									  <label class="form-check-label">
										<input class="form-check-input" type="radio" name="mgrRadioOptions" id="mgrRadio2" value="option2"> No
									  </label>
									</div>
								</div>
							</div>

						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="idInput">ID</label>
								<input type="text" class="form-control" id="idInput">
							</div>
						</div>
					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
