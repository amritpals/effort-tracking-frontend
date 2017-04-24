<?php include 'header.php'; ?>

<div class="container">
  <div class="row" style="margin-top: 50px;">
    <h3>Create</h3>
    <form action="http://localhost:8080/WSRTool/User/" enctype="application/x-www-form-urlencoded" method="POST" id="form-data">
      <input type="text" name="firstName" id="firstName" placeholder="First Name"><br>
      <input type="text" name="lastName" id="lastName" placeholder="Last Name"><br>
      <button type="submit" class="btn btn-submit">Submit</button>
    </form>
  </div>
</div>
<div class="container">
  <div class="row" style="margin-top: 50px;">
    <h3>View</h3>
    <form action="http://localhost:8080/WSRTool/User/" enctype="application/json" method="GET" id="view-form">
      <input type="text" name="id" id="view-id" placeholder="User ID"><br>
      <button type="submit" class="btn btn-submit">Submit</button>
    </form>
  </div>
</div>
<div class="container">
  <div class="row" style="margin-top: 50px;">
    <h3>Delete</h3>
    <form action="http://localhost:8080/WSRTool/User/" enctype="application/json" method="DELETE" id="delete-form">
      <input type="text" name="id" id="delete-id" placeholder="User ID"><br>
      <button type="submit" class="btn btn-submit">Submit</button>
    </form>
  </div>
</div>

<?php include 'footer.php'; ?>
