document.addEventListener("DOMContentLoaded", function () {
    const favoritesButton = document.getElementById("favoritesButton");
    const visitedButton = document.getElementById("visitedButton");
    const accountButton = document.getElementById("accountButton");
    const completedButtons = document.querySelectorAll('.completed-button');
    const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
    const saveRatingButton = document.getElementById('saveRating');
    const stars = document.querySelectorAll('.star');
    const boxContainer = document.querySelector('.box-container');
    const editProfileButton = document.querySelector('.edit-profile-button');


    let selectedPlaceId;
    let selectedUserId;


    editProfileButton.addEventListener('click', function () {
        // Show the edit modal when the button is clicked
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();

        // Fetch and populate the form fields with user data
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                const user = data[0];
                if (user) {
                    document.getElementById('edit-id').value = user.id;
                    document.getElementById('existingImage').value = user.image;
                    document.getElementById('first_name').value = user.first_name;
                    document.getElementById('last_name').value = user.last_name;
                    document.getElementById('gender').value = user.gender;
                    document.getElementById('email').value = user.email;
                    document.getElementById('password').value = user.password;
                    document.getElementById('from_country').value = user.from_country;
                    document.getElementById('current_province').value = user.current_province;
                    document.getElementById('current_city').value = user.current_city;
                    document.getElementById('current_baranggay').value = user.current_baranggay;
                    
                    editModal.show();
                } else {
                    console.error("No user data found.");
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    });



    favoritesButton.addEventListener("click", function () {
      window.location.href = "itinerary_favorites.php";
    });
  
    visitedButton.addEventListener("click", function () {
      window.location.href = "itinerary_visited.php";
    });
    accountButton.addEventListener("click", function () {
      window.location.href = "user-profile.php";
    });
    const images = [
      'image/places/churches.png',
      'image/places/hotels.png',
      'image/places/naturetrip.png',
    ];
  
    const carouselInner = document.querySelector('.carousel-inner');
  
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
  
    fetch('http://localhost:3000/itinerary_favorites')
    .then(response => response.json())
    .then(data => {
        const favoritePlaceIds = data.map(item => item.place_id);
        selectedUserId = data[0]?.user_id;

        fetch('http://localhost:3000/places')
        .then(response => response.json())
        .then(placesData => {

            if (Array.isArray(favoritePlaceIds)) {
            placesData.forEach(place => {
                if (favoritePlaceIds.includes(place.id)) {
                const box = createBox(place);
                boxContainer.appendChild(box);
                }
            });
            } else {
            console.error('Invalid favoritePlaceIds data:', favoritePlaceIds);
            }
        })
        .catch(error => {
            console.error('Error fetching places data:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching favorites data:', error);
    });

  
  function createBox(place) {
    const box = document.createElement('div'); 
    box.id = `box-${place.id}`;
    const completedButton = document.createElement('completed-button');
    completedButton.className = 'completed-button';
    completedButton.setAttribute('data-toggle', 'modal');
    completedButton.setAttribute('data-target', '#ratingModal');
    completedButton.setAttribute('data-place-id', place.id); // Add this line
    completedButton.innerHTML = `
        <span class="material-icons">check_circle</span> Completed
    `;

    box.classList.add('box');
    box.innerHTML = `
      <div class="image">
        <img src="${place.image}" alt="">
        <span class="heart-icon">
          <i class="fas fa-heart"></i>
        </span>
      </div>
      <div class="content">
        <h3>${place.title}</h3>
        <p>${place.description}</p>
        <div class="button-container">
        <button class="completed-button" data-toggle="modal" data-target="#ratingModal" data-place-id="${place.id}">
            <span class="material-icons">check_circle</span> Completed
        </button>
        <button class="delete-button" data-place-id="${place.id}">
            <span class="material-icons">delete</span>
        </button>
        </div>
      </div>
    `;

    return box;
    
  }
  
  boxContainer.addEventListener('click', (event) => {
    const completedButton = event.target.closest('.completed-button');
    const deleteButton = event.target.closest('.delete-button');
  
    if (completedButton) {
      ratingModal.show();
      selectedPlaceId = completedButton.getAttribute('data-place-id');
      console.log('Selected Place ID:', selectedPlaceId);
    } else if (deleteButton) {
      selectedPlaceId = deleteButton.getAttribute('data-place-id');
      console.log('Deleting Place ID:', selectedPlaceId);
  
      // Perform delete action
      const boxToRemove = document.getElementById(`box-${selectedPlaceId}`);
      if (boxToRemove) {
        boxToRemove.remove();
      }
  
      // Send DELETE request to remove from favorites on the server
      fetch(`http://localhost:3000/itinerary_favorites/${selectedPlaceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          console.error('Failed to remove from favorites:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error removing from favorites:', error);
      });
  
      // Reset selectedPlaceId
      selectedPlaceId = null;
    } else {
      selectedPlaceId = null; // Reset the selectedPlaceId if not clicking a button
    }
  });
  
  


    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            updateStarsRating(rating);
        });
    });

    saveRatingButton.addEventListener('click', (event) => {
    // Your existing logic to collect the data
    const placeId = selectedPlaceId;
    const userId = selectedUserId;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Prepare the data for the POST request
    const requestData = {
        place_id: placeId,
        user_id: userId,
        ratings: rating,
        comment: comment,
        created_at: getCurrentDate(),
        updated_at: getCurrentDate(),
    };

    // POST the rating and comment to the server
    fetch('http://localhost:3000/itinerary_visited', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) // Convert to JSON string
    })
    .then(response => {
        if (response.ok) {
            alert('Added to feedback successfully');

            // Remove the box from the DOM
            const boxToRemove = document.getElementById(`box-${placeId}`);
            if (boxToRemove) {
                boxToRemove.remove();
            }

            // Remove from favorites on the server
            fetch(`http://localhost:3000/itinerary_favorites/${placeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to remove from favorites:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error removing from favorites:', error);
            });

            // Close the modal
            ratingModal.hide();
        } else {
            alert('Failed to add to feedback');
        }
    })
    .catch(error => {
        alert('Error adding to feedback: ' + error);
    });
});

    
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}


function updateStarsRating(rating) {
    document.getElementById('rating').value = rating;
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const starRating = star.getAttribute('data-rating');
        star.innerHTML = starRating <= rating ? '&#9733;' : '&#9734;';
    });
}
});

// user profile
function updateProfile() {
    const isLoggedIn = true; 

    // Fetch user data from the server
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            const user = data[0];

            if (user) {
                const nameHolder = document.querySelector(".nameHolder");
                if (nameHolder) {
                    nameHolder.textContent = `${user.first_name} ${user.last_name}`;
                } else {
                    console.error("nameHolder element not found.");
                }

                const profileImg = document.querySelector(".profile-img img");
                if (profileImg) {
                    profileImg.src = user.image; 
                } else {
                    console.error("profile-img img element not found.");
                }

                const profileRating = document.querySelector(".proile-rating span");
                if (profileRating) {
                    profileRating.textContent = isLoggedIn ? "Active" : "Inactive";
                    profileRating.style.color = isLoggedIn ? "green" : "red";
                } else {
                    console.error("proile-rating span element not found.");
                }

                const table = document.querySelector("table");
                if (table) {
                    table.innerHTML = "";

                    const userData = [
                        { label: "First Name:", value: user.first_name },
                        { label: "Last Name:", value: user.last_name },
                        { label: "Gender:", value: user.gender },
                        { label: "Email:", value: user.email },
                        { label: "Country:", value: user.from_country },
                        { label: "Province:", value: user.current_province },
                        { label: "City:", value: user.current_city },
                        { label: "Baranggay:", value: user.current_baranggay },
                    ];
                    userData.forEach((item) => {
                        const row = document.createElement("tr");
                        const labelCell = document.createElement("th");
                        const valueCell = document.createElement("td");
                        labelCell.textContent = item.label;
                        valueCell.textContent = item.value;
                        row.appendChild(labelCell);
                        row.appendChild(valueCell);
                        table.appendChild(row);
                    });
                } else {
                    console.error("table element not found.");
                }
            } else {
                console.error("No user data found.");
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

updateProfile();


  