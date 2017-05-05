<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title add-shadow">
				<h2>View/Update Task Category</h2>
				<button type="submit" class="btn btn-primary logout-btn pull-right">Log Out</button>
			</div>
			<div class="app-section view-form">
				<form id="admin-view-category">
					<div class="form-group">
						<label for="userSelect">Select Task Category</label>
						<select class="form-control" id="categoryViewSelect">
						  <<option value="" selected disabled>Select the Task Category</option>
						</select>
					</div>

					<div class="row show-user-details">
						<div class="col-md-12">
							<legend>Task Category Details:</legend>
						</div>
						<div class="col-md-12">

							<input type="hidden" class="form-control" id="id" name="id">

							<div class="form-group">
								<label for="name">Name</label>
								<input type="text" class="form-control" id="name" name="name">
							</div>

							<div class="form-group">
								<label for="cost">Cost</label>
								<input type="text" class="form-control" id="cost" name="cost">
							</div>

							<!-- Radio Buttons -->
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

						</div>
					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">Update</button>
					<button type="button" class="btn btn-primary" id="categoryViewForm" onclick="resetForm(this.id)">Reset Form</button>
				</form>
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
