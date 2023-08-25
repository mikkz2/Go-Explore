<!DOCTYPE html>
<html lang="en">
    
<?php include 'header.php'; ?>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Services Section</title>
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
  <!-- Stylesheet -->
  <link rel="stylesheet" href="css/explore_cardcontent.css" />
  <script src="https://kit.fontawesome.com/e173e574d6.js" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>

<body>
    <section class="iframe-container">
            <div class="background-image"></div>
                <h3></h3>
              </div>
            </div>
            <div class="ratings">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <button id="add-to-favorites" class="add-to-favorites">
                <i class="fas fa-heart"></i> Add to Favorites
            </button>
            <div class="extra-icons">
                <button class="icon-button" id="contact-icon">
                    <i class="fas fa-phone"></i> Contact
                </button>
                <button class="icon-button" id="facebook-icon">
                    <i class="fab fa-facebook"></i> Facebook
                </button>
                <button class="icon-button" id="address-icon">
                    <i class="fas fa-map-marker-alt"></i> Address
                </button>
            </div>
            
        </section>

    <section>
        <p class="dynamic-paragraph"></p>
    </section>

    <div class="filter-nav">
        <button class="active" data-rating="all">All</button>
        <button data-rating="5">5 Stars</button>
        <button data-rating="4">4 Stars</button>
        <button data-rating="3">3 Stars</button>
        <button data-rating="2">2 Stars</button>
        <button data-rating="1">1 Star</button>
    </div>

    <!-- Comments Section -->
    <section class="comments-section">
        <div class="comment-cards-container"></div>
      </section>
      

      <script src="js/explore_cardcontent.js"></script>
 <?php include 'footer.php'; ?>
</body>
</html>