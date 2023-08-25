document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-nav button");
    const commentCardsContainer = document.querySelector(".comment-cards-container");

    // "Add to Favorites" functionality
    const addToFavoritesBtn = document.getElementById("add-to-favorites");

    addToFavoritesBtn.addEventListener("click", function () {
        addToFavoritesBtn.classList.toggle("added");

        if (addToFavoritesBtn.classList.contains("added")) {
            addToFavoritesBtn.innerHTML = '<i class="fas fa-check"></i> Added to Favorites';
        } else {
            addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
        }
    });

    // Filter navigation functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedRating = button.getAttribute("data-rating");
            const commentCards = commentCardsContainer.querySelectorAll(".comment-card");

            commentCards.forEach(card => {
                const cardRating = card.getAttribute("data-rating");
                if (selectedRating === "all" || cardRating === selectedRating) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    const comments = [
        {
            id: 1,
            category: "Beach Experience",
            title: "Amazing Beaches",
            username: "User 1",
            rating: 5,
            comment: "This place is amazing! I had a fantastic time exploring the beaches.",
            date: "2023-08-16",
        },
        {
            id: 2,
            category: "Scenic Views",
            title: "Breathtaking Views",
            username: "User 2",
            rating: 4,
            comment: "Great destination for a weekend getaway. The views are breathtaking.",
            date: "2023-08-16",
        },
        // Add more comment objects as needed
    ];
    
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

    function processData(){
        const queryParams = new URLSearchParams(window.location.search);
        const desiredServiceId = parseInt(queryParams.get("id"));
        const desiredService = dynamicData.find(service => service.id === desiredServiceId);

        // Update dynamic elements with the specific service data
        const backgroundElement = document.querySelector(".background-image");
        const titleElement = document.querySelector("h3");
        const paragraphElement = document.querySelector(".dynamic-paragraph");

        backgroundElement.style.backgroundImage = `url('${desiredService.image}')`;
        titleElement.textContent = desiredService.title;
        paragraphElement.textContent = desiredService.description;

        // Populate comment cards with data from the 'comments' array
        comments.forEach(comment => {
            const commentCard = document.createElement("div");
            commentCard.classList.add("comment-card");
            commentCard.setAttribute("data-rating", comment.rating);

            commentCard.innerHTML = `
                <img class="user-profile" src="images/churches.png" alt="${comment.username}">
                <div class="comment-content">
                    <h4>${comment.username}</h4>
                    <div class="rating">
                        ${generateStars(comment.rating)}
                    </div>
                    <h3 class="comment-title">${comment.title}</h3>
                    <p>${comment.comment}</p>
                    <p class="comment-date">${comment.date}</p>
                </div>
            `;

            // Only append the desired comment card to the container
            if (comment.id === desiredServiceId) {
                commentCardsContainer.appendChild(commentCard);
            }
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
                    };
                });

                dynamicData.push(...mappedData);
                processData(); 
            })
    }

    fetchServicesData();
});

