<?php include 'header.php' ?>
<?php include 'admin-sidebar.php' ?>

		<div class="container app-container">
			<div class="page-title">
				<h2>Create Task Category</h2>
			</div>
			<div class="app-section create-form">
				<form action="http://localhost:8080/WSRTool/Category/" enctype="application/x-www-form-urlencoded" method="POST" id="create-category-form">
					<div class="row">
						<div class="col-md-12">  <!-- Start of Column 2 -->

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

						</div> <!-- End of Column 2 -->
					</div><!-- End of row 1 -->
					<button type="submit" class="btn btn-primary">SAVE</button>
				</form>
			</div><!-- End of create user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php' ?>
