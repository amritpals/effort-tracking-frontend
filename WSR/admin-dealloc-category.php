<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">

			<div class="page-title add-shadow">
				<h2>Deallocate Task Category</h2>
			</div>
			<div class="app-section assign-form add-shadow">
				<form id="dealloc-category">
					<div class="form-group">
						<label for="projectDeallocSelect">Select Project</label>
						<select class="form-control" name="projectDeallocSelect" id="projectDeallocSelect">
						</select>
					</div>
					<div class="form-group">
						<label for="categoryDeallocSelect">Available Task Categories</label>
						<select class="form-control" name="categoryDeallocSelect" id="categoryDeallocSelect" multiple="multiple">
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Remove</button>
				</form>
			</div><!-- End of assign category form -->

		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
