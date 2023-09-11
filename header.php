<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/83c0f4a797.js" crossorigin="anonymous"></script>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link href="css/header.css" rel="stylesheet">
    </head>
    <body>
        <header>
        <div class="nav">
                <input type="checkbox" id="nav-check">
                <div class="nav-header">
                    <div class="nav-title">
                        <a href="home_main.php" style="text-decoration: none; color: white; ">Go Explore</a>
                    </div>
                </div>
                <div class="nav-btn">
                    <label for="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

            <div class="nav-links">
                <a class="nav-link-1" href="explore_main.php">Let's Explore</a>
                <a class="nav-link-2" href="wheretogo_main.php">Where to Go</a>
                <a class="nav-link-3" href="calendar.php">Calendar of Activities</a>
                <a class="nav-link-4" href="love_our_planet.php">Love Our Planet</a>
                <a class="nav-search-icon" href="search_page.php">
                    <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
                </a>
                <?php
                session_start();
                
                $isAuthenticated = isset($_SESSION['user_id']);

                if ($isAuthenticated) {
                    include('itinerary_favorites.php');
                } else {
                    echo '<a class="nav-user-icon" href="login_register.php">';
                    echo '<i class="fa-solid fa-user" style="color: #ffffff;"></i>';
                    echo '</a>';
                }
                ?>

            </div>
        </div>
    </header>
</body>

</html>
