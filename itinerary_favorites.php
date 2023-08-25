<!DOCTYPE html>
<html lang="en">
<?php include 'header.php'; ?>
<head>
   <link rel="icon" type="image/png" href="images/logo_tab.png" sizes="64x64">
   <title>Our Portfolio</title>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
   <!-- Bootstrap CSS CDN -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/css/bootstrap.min.css">
   
   <link rel="stylesheet" href="css/itinerary_favorites.css" />
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
    <section id="home">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <!-- Images will be dynamically added here -->
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <div class="slider-content">
            <div class="container">
              <div class="row">
                <h2>BATANGAS PHILIPPINES</h2>
              </div>
              <div class="row">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
          </div>
      </section>
      
      
      <nav class="navbar navbar-expand-lg">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="nav-link btn btn-link animate" id="favoritesButton">
              <i class="fas fa-heart"></i> Favorites
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-link animate" id="visitedButton">
              <i class="fas fa-check"></i> Visited
            </button>
          </li>
        </ul>
      </nav>
      

      <div class="container">
        <div class="box-container">
          <!-- Box containers with cards will be added here dynamically -->
        </div>
      </div>

      <div class="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ratingModalLabel">Rate and Comment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="rating">Rating:</label>
                <div class="ratings">
                    <span class="star" data-rating="1"><i class="fas fa-star star-icon"></i></span>
                    <span class="star" data-rating="2"><i class="fas fa-star star-icon"></i></span>
                    <span class="star" data-rating="3"><i class="fas fa-star star-icon"></i></span>
                    <span class="star" data-rating="4"><i class="fas fa-star star-icon"></i></span>
                    <span class="star" data-rating="5"><i class="fas fa-star star-icon"></i></span>
                  </div>
                  
                <input type="hidden" id="rating" value="0">
              </div>
              <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea class="form-control" id="comment" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit</button>
              <button type="button" class="btn btn-primary" id="saveRating">Save</button>
            </div>
          </div>
        </div>
      </div>
      
      
      

   <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/js/bootstrap.bundle.min.js"></script>
   <script>

const favoritesButton = document.getElementById("favoritesButton");
    const visitedButton = document.getElementById("visitedButton");

    // Add event listeners to the buttons
    favoritesButton.addEventListener("click", function() {
      window.location.href = "itinerary_favorites.php"; // Redirect to index.html
    });

    visitedButton.addEventListener("click", function() {
      window.location.href = "itinerary_visited.php"; // Redirect to visited.html
    });
    
    const images = [
  'image/places/churches.png',
  'image/places/hotels.png',
  'image/places/naturetrip.png',
  // Add more image URLs as needed
];

const carouselInner = document.querySelector('.carousel-inner');

// Dynamically add carousel items with images
images.forEach((imageUrl, index) => {
  const carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');
  if (index === 0) {
    carouselItem.classList.add('active');
  }
  const image = document.createElement('img');
  image.src = imageUrl;
  image.classList.add('d-block', 'w-100', 'vh-100', 'object-fit-cover');
  carouselItem.appendChild(image);
  carouselInner.appendChild(carouselItem);
});
      const dynamicContent = [
    {
      imageSrc: 'image/places/churches.png',
      title: 'Title 1',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, adipisci!'
    },
    {
      imageSrc: 'image/places/hotels.png',
      title: 'Title 2',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, adipisci!'
    },
    // Add more objects for additional cards
    {
      imageSrc: 'image/places/touristspots.png',
      title: 'Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, adipisci!'
    },
    {
      imageSrc: 'image/places/naturetrip.png',
      title: 'Title 4',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, adipisci!'
    },
  ];

  const boxContainer = document.querySelector('.box-container');

  dynamicContent.forEach((item) => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
      <div class="image">
        <img src="${item.imageSrc}" alt="">
        <span class="heart-icon">
          <i class="fas fa-heart"></i>
        </span>
      </div>
      <div class="content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="button-container">
          <button class="completed-button" data-toggle="modal" data-target="#ratingModal">
            <span class="material-icons">check_circle</span> Completed
          </button>
          <button class="delete-button">
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    `;
    boxContainer.appendChild(box);
  });

  
function moveToExplored(box) {
        const exploredBoxContainer = document.querySelector('.explored-boxes');
        exploredBoxContainer.appendChild(box);
    }

    document.addEventListener("DOMContentLoaded", function () {
        const completedButtons = document.querySelectorAll('.completed-button');
  const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
  const saveRatingButton = document.getElementById('saveRating');
  const stars = document.querySelectorAll('.star');

  completedButtons.forEach(button => {
    button.addEventListener('click', () => {
      ratingModal.show();
    });
  });

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.getAttribute('data-rating');
      document.getElementById('rating').value = rating;
      stars.forEach(s => {
        if (s.getAttribute('data-rating') <= rating) {
          s.innerHTML = '&#9733;'; // Filled star
        } else {
          s.innerHTML = '&#9734;'; // Empty star
        }
      });
    });

        // Attach event listener to the "Explored" button within each card
        const exploreButtons = document.querySelectorAll('.explore-button');
        exploreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.box');
                if (card) {
                    moveToExplored(card);
                }
            });
        });

        saveRatingButton.addEventListener('click', () => {
            const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // You can do something with the rating and comment data here
    console.log('Rating:', rating);
    console.log('Comment:', comment);

    // Close the modal after saving
    ratingModal.hide();

            // Move the completed box to the "Explored" section
            if (rating > 0) {
                const completedBox = document.querySelector('.box.active');
                if (completedBox) {
                    completedBox.classList.remove('active');
                    moveToExplored(completedBox);
                }
            }
        });
    });
    });

    const showExploredButton = document.getElementById('showExplored');
    const exploredBoxContainer = document.querySelector('.explored-boxes');

    showExploredButton.addEventListener('click', () => {
        exploredBoxContainer.classList.toggle('show');
    });

    bindRatingAction();
    function bindRatingAction(){

      
    }

   </script>
</body>
</html>
