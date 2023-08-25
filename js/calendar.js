$(document).ready(function () {
    const itemsPerPage = 6; // Number of items to load per click
    let startIndex = 0; // Starting index for loading items

    const galleryContainer = $('.image-gallery');
    const loadMoreButton = $('.load-more');

    function loadGalleryItems() {
        fetch('http://localhost:3000/festival')
            .then(response => response.json())
            .then(data => {
                const galleryItems = data.slice(startIndex, startIndex + itemsPerPage);

                galleryItems.forEach(item => {
                    const itemHtml = `
                        <a href="festival_content.php">
                            <div class="gallery-item">
                                <div class="image-wrapper">
                                    <img src="${item.image}" alt="Image ${item.id}">
                                </div>
                                <div class="item-overlay">
                                    <div class="calendar-icon">
                                        <i class="fas fa-calendar"></i>
                                        <span class="month">${item.date}</span>
                                    </div>
                                    <h3>${item.title}</h3>
                                    <p>${item.city}</p>
                                </div>
                            </div>
                        </a>
                    `;
                    galleryContainer.append(itemHtml);
                });

                startIndex += itemsPerPage;

                if (startIndex >= data.length) {
                    loadMoreButton.hide();
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    loadGalleryItems();

    // Load more button click event
    loadMoreButton.click(function () {
        loadGalleryItems();
    });
});

// month-dropdown
$(document).ready(function () {
    $("#monthDropdown").change(function () {
        var selectedMonth = $(this).val();
        updateCalendar(selectedMonth);
    });

    function updateCalendar(month) {

    }
});

// Find the element where you want to insert the content
const carouselInner = document.querySelector('.carousel-inner');

function populateCarousel() {
    fetch('http://localhost:3000/festival')
        .then(response => response.json())
        .then(data => {
            const incomingFestivals = data;

            for (let i = 0; i < incomingFestivals.length; i += 3) {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');

                const row = document.createElement('div');
                row.classList.add('row');

                for (let j = i; j < i + 3 && j < incomingFestivals.length; j++) {
                    const col = document.createElement('div');
                    col.classList.add('col-md-4', 'mb-3');

                    const link = document.createElement('a');
                    link.href = 'festival_content.php';
                    link.style.textDecoration = 'none';
                    link.style.color = 'black';

                    const card = document.createElement('div');
                    card.classList.add('card');

                    const img = document.createElement('img');
                    img.classList.add('img-fluid');
                    img.alt = '100%x280';
                    img.src = incomingFestivals[j].image;

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const title = document.createElement('h4');
                    title.classList.add('card-title');
                    title.textContent = incomingFestivals[j].title;

                    const city = document.createElement('p');
                    city.classList.add('card-text');
                    city.textContent = incomingFestivals[j].city;

                    // Append elements to create the card structure
                    cardBody.appendChild(title);
                    cardBody.appendChild(city);
                    card.appendChild(img);
                    card.appendChild(cardBody);
                    link.appendChild(card);
                    col.appendChild(link);
                    row.appendChild(col);
                }

                carouselItem.appendChild(row);

                // Set the first item as active
                if (i === 0) {
                    carouselItem.classList.add('active');
                }

                // Append the carousel item to the carousel inner
                carouselInner.appendChild(carouselItem);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

populateCarousel();