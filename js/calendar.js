$(document).ready(function() {
    const itemsPerPage = 6; // Number of items to load per click
    let startIndex = 0; // Starting index for loading items

    const galleryItems = [
        {
            month: 'January',
            image: 'image/festival/1.png',
            title: 'Sublian Festival',
            location: 'Batangas City',
        },
        {
            month: 'January',
            image: 'image/festival/2.png',
            title: 'Parada ng Lechon',
            location: 'Balayan',
        },
        {
            month: 'January',
            image: 'image/festival/3.jpg',
            title: 'Tapusan Festival',
            location: 'Alitagtag',
        },
        {
            month: 'January',
            image: 'image/festival/4.png',
            title: 'Anihan Festival',
            location: 'Lobo',
        },
        {
            month: 'January',
            image: 'image/festival/5.png',
            title: 'CALACAtchara Festival',
            location: 'Calaca',
        },
        {
            month: 'January',
            image: 'image/festival/6.png',
            title: 'EL PASUBAT Festival',
            location: 'Taal',
        },
        {
            month: 'January',
            image: 'image/festival/7.png',
            title: 'Kambingan Festival',
            location: 'Tuy',
        },
        {
            month: 'January',
            image: 'image/festival/8.png',
            title: 'Punlad Festival',
            location: 'Talisay',
        },
        {
            month: 'January',
            image: 'image/festival/9.png',
            title: 'Mahaguyog Festival',
            location: 'Sto. Tomas',
        },
        
    ];

    const galleryContainer = $('.image-gallery');
    const loadMoreButton = $('.load-more');

    function loadGalleryItems() {
        for (let i = startIndex; i < startIndex + itemsPerPage && i < galleryItems.length; i++) {
            const item = galleryItems[i];
            const itemHtml = `
                <a href="festival_content.php">
                    <div class="gallery-item">
                        <div class="image-wrapper">
                            <img src="${item.image}" alt="Image ${i + 1}">
                        </div>
                        <div class="item-overlay">
                            <div class="calendar-icon">
                                <i class="fas fa-calendar"></i>
                                <span class="month">${item.month}</span>
                            </div>
                            <h3>${item.title}</h3>
                            <p>${item.location}</p>
                        </div>
                    </div>
                </a>
            `;
            galleryContainer.append(itemHtml);
        }
    
        startIndex += itemsPerPage;
    
        if (startIndex >= galleryItems.length) {
            loadMoreButton.hide();
        }
    }
    

    loadGalleryItems();

    // Load more button click event
    loadMoreButton.click(function() {
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

// cardslider
$(document).ready(function () {
    $('.card-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });
});


$(document).ready(function() {
    const incomingFestivals = [
        {
            image: 'image/festival/1.png',
            title: 'Sublian Festival',
            location: 'Batangas City',
        },
        {
            image: 'image/festival/2.png',
            title: 'Parada ng Lechon',
            location: 'Balayan',
        },
        {
            image: 'image/festival/3.jpg',
            title: 'Tapusan Festival',
            location: 'Location: Alitagtag',
        },
        {
            image: 'image/festival/4.png',
            title: 'Anihan Festival',
            location: 'Location: Lobo',
        },
        {
            image: 'image/festival/5.png',
            title: 'CALACAtchara Festival',
            location: 'Location: Calaca',
        },
        {
            image: 'image/festival/6.png',
            title: 'EL PASUBAT Festival',
            location: 'Location: Taal',
        },
        // Add more items as needed
    ];

    const section = $('#incoming-festival');
    const carousel = section.find('.carousel-inner');
    const carouselControls = section.find('.carousel-control');

    // Set the section title
    section.find('h3.mb-3').text('INCOMING FESTIVAL');

    // Generate slide HTML based on incomingFestivals array
    incomingFestivals.forEach((item, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const slideHtml = `
            <div class="carousel-item ${activeClass}">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <a href="festival_content.php" style="text-decoration: none; color: black;">
                            <div class="card">
                                <img class="img-fluid" alt="100%x280" src="${item.image}">
                                <div class="card-body">
                                    <h4 class="card-title">${item.title}</h4>
                                    <p class="card-text">Location: ${item.location}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- Add more columns as needed -->
                </div>
            </div>
        `;
        carousel.append(slideHtml);
    });

    // Show/hide carousel controls based on the number of slides
    if (incomingFestivals.length <= 1) {
        carouselControls.hide();
    }

    // Initialize carousel
    section.find('.carousel').carousel();
});
