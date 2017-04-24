<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title">
				<h2>Assign Category</h2>
			</div>
			<div class="app-section assign-category-form">
				<form id="assign-category">
					<div class="form-group">
						<label for="projectSelect">Select Project</label>
						<select class="form-control" name="projectSelect" id="projectSelect">
						</select>
					</div>
					<div class="form-group">
						<label for="categorySelect">Select Task Category</label>
						<select class="form-control" name="categorySelect" id="categorySelect" multiple="multiple">
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Save</button>
				</form>
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
