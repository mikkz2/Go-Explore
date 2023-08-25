
const festivalData = [];

// Find the elements to populate
const bgImage = document.querySelector('.bg-image');
const overlayTitle = document.querySelector('.overlay-title');
const festivalTitle = document.querySelector('.festival-title');
const festivalDescription = document.querySelector('.festival-description');

// Populate the elements with dynamic content
function populateElements(data) {
    bgImage.style.backgroundImage = `url('${data.imageSrc}')`;
    overlayTitle.textContent = data.overlayTitle;
    festivalTitle.textContent = data.festivalTitle;
    festivalDescription.textContent = data.festivalDescription;
}

// Fetch data from your server or database
fetch('http://localhost:3000/festival') 
    .then(response => response.json())
    .then(data => {

        if (data.length > 0) {
            const firstFestival = data[0];
            festivalData.push({
                imageSrc: firstFestival.image, 
                overlayTitle: firstFestival.title,
                festivalTitle: firstFestival.title,
                festivalDescription: firstFestival.description,
            });

            populateElements(festivalData[0]);
        }
    })
    .catch(error => console.error('Error fetching data:', error));


// CARD DATA
const contentData = [
    {
        imageSrc: 'image/resorts/1.png',
        title: 'Camp Netanya Resort and Spa',
        location: 'Location: Baun - Mabini Rd, Mabi, Batangas / Ligaya Mabini Batangas',
    },
    {
        imageSrc: 'image/resorts/2.png',
        title: 'Aquaventure Reef Club',
        location: 'Location: Sitio Looc, Barangay Bagalangit, Mabini, Batangas',
    },
    {
        imageSrc: 'image/resorts/3.png',
        title: 'Casita Ysabel',
        location: 'Location: Baun - Mabini Rd, Mabi, Batangas / Ligaya Mabini Batangas',
    },
    {
        imageSrc: 'image/resorts/4.png',
        title: 'Eagle Point Beach and Dive Resort',
        location: 'Location: Barangay Bagalangitm, Anilao, Mabini Batangas ',
    },
    {
        imageSrc: 'image/resorts/5.png',
        title: 'La Chevrerie resort and Spa',
        location: 'Location: 052 Barangay Ligaya, Anilao, Mabini Batangas',
    },
    {
        imageSrc: 'image/resorts/6.png',
        title: 'Sadayo Beach Resort',
        location: 'Location: Sitio Bubuyan Brgy Locloc Baun Batangas',
    },
    {
        imageSrc: 'image/resorts/7.png',
        title: 'Camp Raya Adventure Resort',
        location: 'Location:San Luis Baun Batangas',
    },
    {
        imageSrc: 'image/resorts/8.png',
        title: 'Destino Beach Club Dive Resort and Hotel',
        location: 'Location: Sitio Nangkaan Brgy Locloc Bauan Batangas',
    },
    {
        imageSrc: 'image/resorts/9.png',
        title: 'New Yorkers Resort',
        location: 'Location: Sitio Bubuyan Brgy Locloc Bauan Batangas',
    },
];

// Find the element where you want to insert the content
const carouselInner = document.querySelector('.carousel-inner');

// Generate content cards from the contentData array with three cards per slide
for (let i = 0; i < contentData.length; i += 3) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = i; j < i + 3 && j < contentData.length; j++) {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-3');

        const link = document.createElement('a');
        link.href = 'resorts-content.php';
        link.style.textDecoration = 'none';
        link.style.color = 'black';

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.classList.add('img-fluid');
        img.alt = '100%x280';
        img.src = contentData[j].imageSrc;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h4');
        title.classList.add('card-title');
        title.textContent = contentData[j].title;

        const location = document.createElement('p');
        location.classList.add('card-text');
        location.textContent = contentData[j].location;

        // Append elements to create the card structure
        cardBody.appendChild(title);
        cardBody.appendChild(location);
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


