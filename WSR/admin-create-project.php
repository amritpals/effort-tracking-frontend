<?php include 'header.php' ?>
<?php include 'admin-sidebar.php' ?>

		<div class="container app-container">
			<div class="page-title">
				<h2>Create Project</h2>
			</div>
			<div class="app-section create-user-form">
				<form action="http://localhost:8080/WSRTool/Project/" enctype="application/x-www-form-urlencoded" method="POST" id="create-project-form">
					<div class="row">
						<div class="col-md-12">

							<div class="form-group">
								<label for="projectName">Project Name</label>
								<input type="text" class="form-control" id="projectName" name="projectName">
							</div>

							<div class="form-group">
								<label for="billingModel">Billing Model</label>
								<select class="form-control" id="billingModel" name="billingModel">
								  <option value="OBM">Outcome Based Model</option>
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

						</div> <!-- End of Column 1 -->

					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">SAVE</button>
				</form>
			</div><!-- End of create user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php' ?>
