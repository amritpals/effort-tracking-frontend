<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">

			<div class="page-title">
				<h2>Allocate Resource</h2>
			</div>
			<div class="app-section assign-user-form">
				<form id="assign-user">
					<div class="form-group">
						<label for="projectSelect">Select Project</label>
						<select class="form-control" name="projectSelect" id="projectSelect">
						</select>
					</div>
					<div class="form-group">
						<label for="userSelect">Select User</label>
						<select class="form-control" name="userSelect" id="userSelect" multiple="multiple">
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Save</button>
				</form>
			</div><!-- End of assign user form -->

			<div class="page-title">
				<h2>Remove Resource</h2>
			</div>
			<div class="app-section remove-user-form">
				<form id="remove-user">
					<div class="form-group">
						<label for="projectRemove">Select Project</label>
						<select class="form-control" name="projectRemove" id="projectRemove">
						</select>
					</div>
					<div class="form-group">
						<label for="userRemove">Select User</label>
						<select class="form-control" name="userRemove" id="userRemove" multiple="multiple">
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Save</button>
				</form>
			</div><!-- End of remove user form -->

		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
