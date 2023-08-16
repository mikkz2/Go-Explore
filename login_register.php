<!DOCTYPE html>
<html>

<head>
    <title>LOG-IN/REGISTER</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
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
                    <input type="text" placeholder="Email">
                    <input type="password" placeholder="Password">
                    <input type="button" value="Login">
                    <a href="">Forgot password?</a>
                    <p>By proceeding, you agree to our <a href="">Terms of Use</a> and confirm you have read our <a href="">Privacy and Cookie Statement</a>.
                        <br><br>This site is protected by reCAPTCHA and the <a href="link-to-google-privacy-policy">Google Privacy Policy</a> and <a href="link-to-terms-of-service">Terms of Service</a> apply.
                    </p>
                </div>
                <div class="register-show">
                    <h2>REGISTER</h2>
                    <input type="text" placeholder="Name" id="name" autocomplete="off">
                    <input type="text" placeholder="Country" id="from_country" autocomplete="off">
                    <input type="text" placeholder="City" id="current_city" autocomplete="off">
                    <input type="text" placeholder="Baranggay" id="current_baranggay" autocomplete="off">
                    <input type="text" placeholder="Email" id="email" autocomplete="off">
                    <input type="password" placeholder="Password" id="password" autocomplete="off">
                    <input type="button" value="Register">
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
    <?php include 'footer.php'; ?>
    <script src="js/login_register.js"></script>
</body>

</html>