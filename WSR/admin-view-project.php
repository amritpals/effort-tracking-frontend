<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title add-shadow">
				<h2>View/Update Project</h2>
				<button type="submit" class="btn btn-primary logout-btn pull-right">Log Out</button>
			</div>
			<div class="app-section view-form">
				<form id="admin-view-project">
					<div class="form-group">
						<label for="userSelect">Select Project</label>
						<select class="form-control" id="projectViewSelect">
						  <<option value="" selected disabled>Select the Project</option>
						</select>
					</div>

					<div class="row show-project-details">
						<div class="col-md-12">
							<legend>Project Details:</legend>
						</div>
						<div class="col-md-12">

							<div class="form-group">
								<label for="projectName">Project Name</label>
								<input type="text" class="form-control" id="projectName" name="projectName">
							</div>

							<div class="form-group">
								<label for="billingModel">Billing Model</label>
								<select class="form-control" id="billingModel" name="billingModel">
									<option value="" selected disabled>Select Billing Model</option>
								  <option value="Outcome Based Model">Outcome Based Model</option>
									<option value="XYZ">XYZ</option>
								</select>
							</div>

							<div class="form-group">
								<label for="budget">Budget</label>
								<input type="number" class="form-control" id="budget" name="budget">
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
								<label for="intelManagerName">Intel Manager</label>
								<input type="text" class="form-control" id="intelManagerName" name="intelManagerName">
							</div>

							<div class="form-group">
								<label for="name">Allocated Task Categories:</label>
								<input type="text" class="form-control" id="name" name="name" readonly="readonly">
								<input type="hidden" class="form-control" id="id" name="id">
							</div>

						</div>
					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">Update</button>
					<button type="button" class="btn btn-primary" id="projectViewForm" onclick="resetForm(this.id)">Reset Form</button>
				</form>
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
