<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the email and password from the POST data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // You should replace this with the actual URL of your JSON Server
    $apiUrl = 'http://localhost:3000/users'; // Modify this URL

    // Create the URL with query parameters
    $url = "$apiUrl?email=$email&password=$password";

    // Make the HTTPS request using file_get_contents()
    $jsonData = @file_get_contents($url);

    if ($jsonData !== false) {
        $data = json_decode($jsonData);
        if (count($data) > 0) {
            // Redirect to Dashboard.php on successful login
            header('Location: Dashboard.php');
            exit;
        } else {
            echo 'Login failed';
        }
    } else {
        echo 'Error fetching data';
    }
}

?>
<!DOCTYPE html>
<html>

<head>
    <title>Admin Login</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css" rel="stylesheet">
    <link href="admin-side/admin-login.css" rel="stylesheet">
</head>

<body>
<div class="container" style="margin-top: 200px">
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <div class="card p-5">
        <h5 class="text-center">ADMIN LOGIN</h5>
        <form action="#">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password">
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" type="button">LogIn</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</div>
<script src="admin-side/admin-js/admin-login.js"></script>
</body>

</html>
