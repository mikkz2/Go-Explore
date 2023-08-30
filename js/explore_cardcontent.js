document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-nav button");
    const commentCardsContainer = document.querySelector(".comment-cards-container");
    const addToFavoritesBtn = document.getElementById("add-to-favorites");
    const facebookIconBtn = document.getElementById("facebook-icon");
    const queryParams = new URLSearchParams(window.location.search);
    const desiredServiceId = parseInt(queryParams.get("id"));

    const isServiceFavorited = localStorage.getItem("favoriteService_" + desiredServiceId);

    facebookIconBtn.addEventListener("click", function () {
        const desiredService = dynamicData.find(service => service.id === desiredServiceId);
        if (desiredService && desiredService.website) {
            const externalLink = desiredService.website;
            window.open(externalLink, "_blank"); // Open external link in a new tab
        } else {
            console.log("Website URL not available for this service.");
        }
    });

    if (isServiceFavorited === "true") {
        addToFavoritesBtn.classList.add("added");
        addToFavoritesBtn.innerHTML = '<i class="fas fa-check"></i> Added to Favorites';
    }

    let addItemCounter = 1; // Initialize counter for adding items
    let deleteItemCounter = 1; // Initialize counter for deleting items

    addToFavoritesBtn.addEventListener("click", function () {
        addToFavoritesBtn.classList.toggle("added");

        if (addToFavoritesBtn.classList.contains("added")) {
            addToFavoritesBtn.innerHTML = '<i class="fas fa-check"></i> Added to Favorites';
            localStorage.setItem("favoriteService_" + desiredServiceId, "true");

            const favoriteData = {
                id: desiredServiceId, // Use the counter for adding items
                place_id: desiredServiceId,
                user_id: 1, // Replace with the actual user ID if available
                created_at: getCurrentDate(),
                updated_at: getCurrentDate(),
            };

            // Increment the counter for the next added item
            addItemCounter++;

            // Add the service to favorites
            fetch('http://localhost:3000/itinerary_favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favoriteData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Added to favorites successfully');
                } else {
                    alert('Failed to add to favorites');
                }
            })
            .catch(error => {
                alert('Error adding to favorites: ' + error);
            });
        } else {
            // Use the counter for deleting items
            const deleteItemId = deleteItemCounter;
            deleteItemCounter++; // Increment the counter for the next deleted item

            // Remove the service from favorites
            fetch(`http://localhost:3000/itinerary_favorites/${desiredServiceId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
                    localStorage.removeItem("favoriteService_" + desiredServiceId);
                    alert('Removed from favorites successfully');
                } else {
                    return response.json();  // Parse response body as JSON for detailed error
                }
            })
            .then(data => {
                if (data && data.error) {
                    alert('Failed to remove from favorites: ' + data.error);
                }
            })
            .catch(error => {
                alert('Error removing from favorites: ' + error);
            });
        }
    });


    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }
    
    const comments = [];

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push('<i class="fas fa-star"></i>');
        }

        if (halfStar) {
            stars.push('<i class="fas fa-star-half-alt"></i>');
        }

        return stars.join("");
    }

    

    function processData() {
        const queryParams = new URLSearchParams(window.location.search);
        const desiredServiceId = parseInt(queryParams.get("id"));
        const desiredService = dynamicData.find(service => service.id === desiredServiceId);
    
        const backgroundElement = document.querySelector(".background-image");
        const titleElement = document.querySelector("h3");
        const paragraphElement = document.querySelector(".dynamic-paragraph");
    
        backgroundElement.style.backgroundImage = `url('${desiredService.image}')`;
        titleElement.textContent = desiredService.title;
        paragraphElement.textContent = desiredService.description;
    
        // Fetch comments for the desired service from the server
        fetch(`http://localhost:3000/itinerary_visited/${desiredServiceId}/comments`)
            .then(response => response.json())
            .then(commentsData => {
                commentCardsContainer.innerHTML = ""; // Clear existing comment cards
    
                commentsData.forEach(comment => {
                    const commentCard = document.createElement("div");
                    commentCard.classList.add("comment-card");
                    commentCard.setAttribute("data-rating", comment.rating);
    
                    commentCard.innerHTML = `
                        <div class="comment-content">
                            <h4>${comment.user_id}</h4>
                            <div class="rating">
                                ${generateStars(comment.rating)}
                            </div>
                            <h3 class="comment-title">${comment.title}</h3>
                            <p>${comment.comment}</p>
                            <p class="comment-date">${comment.date}</p>
                        </div>
                    `;
    
                    commentCardsContainer.appendChild(commentCard);
                });
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    }
    

    const dynamicData = [];

    function fetchServicesData() {
        fetch('http://localhost:3000/places')
            .then(response => response.json())
            .then(data => {
                const mappedData = data.map(user => {
                    return {
                        id: user.id,
                        category: user.category,
                        title: user.title,
                        description: user.description,
                        image: user.image,
                        website:user.website
                    };
                });

                console.log(mappedData);

                dynamicData.push(...mappedData);
                processData(); 
            })
    }

    fetchServicesData();
});
