<!DOCTYPE html>
<html>

<head>
    <title>LOG-IN/REGISTER</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

    <script src="https://kit.fontawesome.com/83c0f4a797.js" crossorigin="anonymous"></script>

    <link href="css/login_register.css" rel="stylesheet">
</head>

<body>
    <?php include 'header.php'; ?>
    <div class="section" style="background-image: url('image/bg.png'); background-size: cover; background-position: center;">
        <div class="login-reg-panel">
            <div class="login-info-box">
                <h2>Have an account?</h2>
                <p>Log in to unlock the best of Go Explore</p>
                <label id="label-register" for="log-reg-show">Login</label>
                <input type="radio" name="active-log-panel" id="log-reg-show" checked="checked">
            </div>

            <div class="register-info-box">
                <h2>Don't have an account?</h2>
                <p>Sign in to unlock the best of Go Explore</p>
                <label id="label-login" for="log-login-show">Register</label>
                <input type="radio" name="active-log-panel" id="log-login-show">
            </div>

            <div class="white-panel">
                <div class="login-show">
                    <h2>LOGIN</h2>
                    <input type="text" placeholder="Email" name="email" id="email" >
                    <input type="password" placeholder="Password" name="password" id="password">
                    <input type="button" value="Login" id="loginButton">
                    <a href="">Forgot password?</a>
                    <p>By proceeding, you agree to our <a href="">Terms of Use</a> and confirm you have read our <a href="">Privacy and Cookie Statement</a>.
                        <br><br>This site is protected by reCAPTCHA and the <a href="link-to-google-privacy-policy">Google Privacy Policy</a> and <a href="link-to-terms-of-service">Terms of Service</a> apply.
                    </p>
                </div>
                <div class="register-show">
                    <h2>REGISTER</h2>
                    <input type="text" placeholder="First Name" name="first_name" id="first_name" autocomplete="off">
                    <input type="text" placeholder="Last Name" name="last_name" id="last_name" autocomplete="off">
                    <input type="email" placeholder="Email" name="email" id="email" autocomplete="off">
                    <input type="password" placeholder="Password" name="password" id="password" autocomplete="off">
                    <input type="text" placeholder="Country" name="from_country" id="from_country" autocomplete="off">
                    <input type="text" placeholder="Province" name="current_province" id="current_province" autocomplete="off">
                    <input type="text" placeholder="City" name="city" id="current_city" autocomplete="off">
                    <input type="text" placeholder="Baranggay"  name="current_baranggay" id="current_baranggay" autocomplete="off">
                    <input type="button" id="registerButton" value="Register">
                </div>
                <div class="login-reg-panel-mini">
                    <div class="login-info-box-mini">
                        <h2>Have an account?</h2>
                        <p>Log in to unlock the best of Go Explore</p>
                        <label id="label-register" for="log-reg-show">Login</label>
                        <input type="radio" name="active-log-panel" id="log-reg-show" checked="checked">
                    </div>
                    <div class="register-info-box-mini">
                        <h2>Don't have an account?</h2>
                        <p>Sign in to unlock the best of Go Explore</p>
                        <label id="label-login" for="log-login-show">Register</label>
                        <input type="radio" name="active-log-panel" id="log-login-show">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="errorModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Invalid login. Please check your credentials.</p>
    </div>
</div>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Attention</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Invalid Input. Please check your credentials
      </div>
    </div>
  </div>
</div>

    <?php include 'footer.php'; ?>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="js/login_register.js"></script>
</body>

</html>