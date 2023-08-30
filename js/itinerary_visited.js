
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
  
  <hr class="separator">
  
  <div class="ratings">
    <div class="star-ratings">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
    </div>
    <div class="comments">
      <p>Comments: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="date">
      <p>August 17, 2023</p>
    </div>
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