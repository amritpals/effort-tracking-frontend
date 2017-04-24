<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title">
				<h2>Assign User</h2>
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
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
