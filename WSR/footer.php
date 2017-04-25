
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <script src="js/jquery.bootstrap-dropdown-hover.js"></script>
  <script src="js/bootstrap-multiselect.js"></script>
  <script src="js/restapi.js"></script>
  <script src="js/restoperation.js"></script>
  <script type="text/javascript">
    $(document).ready(function() {

      <!-- Initialize Navigation Hover Plugin -->
      $.fn.bootstrapDropdownHover();
      <!-- Initialize MultiSelect Plugin -->
      $('select.multiOptionSelect').multiselect({
        includeSelectAllOption: true,
        selectAllName: 'select-all-name',
        enableCaseInsensitiveFiltering: true

      });
    });

  </script>
</body>

</html>
