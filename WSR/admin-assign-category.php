<?php include 'header.php'; ?>
<?php include 'admin-sidebar.php'; ?>

		<div class="container app-container">
			<div class="page-title">
				<h2>Assign User</h2>
			</div>
			<div class="app-section create-user-form">
				<form>
					<div class="form-group">
						<label for="projectSelect">Select Project</label>
						<select class="form-control" id="projectSelect" multiple="multiple">
						  <option value="Abc">Abc Project</option>
						  <option value="Def">Def Project</option>
						  <option value="Ghi">Ghi Project</option>
						  <option value="Jkl">Jkl Project</option>
						</select>
					</div>
					<div class="form-group">
						<label for="userSelect">Select User</label>
						<select class="form-control" id="userSelect" multiple="multiple">
						  <option value="Abcd">Abcd</option>
						  <option value="Defh">Defh</option>
						  <option value="Ghij">Ghij</option>
						  <option value="Jklm">Jklm</option>
						</select>
					</div>
					<button type="submit" class="btn btn-primary">Save</button>
				</form>
			</div><!-- End of assign user form -->
		</div><!-- End of app-container -->

<?php include 'footer.php'; ?>
