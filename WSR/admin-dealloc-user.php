<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">

			<div class="page-title add-shadow">
				<h2>Deallocate Resource</h2>
			</div>
			<div class="app-section assign-form add-shadow">
				<form id="dealloc-user">
					<div class="form-group">
						<label for="projectDeallocSelect">Select Project</label>
						<select class="form-control" name="projectDeallocSelect" id="projectDeallocSelect">
						</select>
					</div>
					<div class="form-group">
						<label for="userDeallocSelect">Reserved Resources</label>
						<select class="form-control" name="userDeallocSelect" id="userDeallocSelect" multiple="multiple">
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Remove</button>
				</form>
			</div><!-- End of assign user form -->

		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
