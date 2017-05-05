<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">

			<div class="page-title add-shadow">
				<h2>Allocate Resource</h2>
			</div>
			<div class="app-section assign-form add-shadow">
				<form id="assign-user">
					<div class="form-group">
						<label for="projectSelect">Select Project</label>
						<select class="form-control" name="projectSelect" id="projectSelect">
						</select>
					</div>
					<div class="form-group">
						<label for="userSelect">Available Resources</label>
						<select class="form-control" name="userSelect" id="userSelect" multiple="multiple">
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Save</button>
				</form>
			</div><!-- End of assign user form -->

		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
