// const servicesData = [
//     {
//       id: 1,
//       category: 'SWIM AND BEACHES',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/swimandbeaches.png',
//     },
//     {
//       id: 2,
//       category: 'SWIM AND BEACHES',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/swimandbeaches.png',
//     },
//     {
//       id: 3,
//       category: 'SWIM AND BEACHES',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/swimandbeaches.png',
//     },
//     {
//       id: 4,
//       category: 'NATURE TRIP',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/naturetrip.png',
//     },
//     {
//       id: 5,
//       category: 'TOURIST SPOT',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/touristspots.png',
//     },
//     {
//       id: 6,
//       category: 'HOTEL',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/hotels.png',
//     },
//     {
//       id: 7,
//       category: 'CHURCHES',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.', 
//       backgroundImage: 'assets/images/churches.png',},
//     {
//       id: 8,
//       category: 'NATURE TRIP',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/naturetrip.png',
//     },
//     {
//       id: 18,
//       category: 'EVENTS AND CULTURE',
//       title: 'Lobo Beach',
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque.',
//       backgroundImage: 'assets/images/eventsandculture.png',},
//   ];

//   const iconMappings = {
//     'SWIM AND BEACHES': 'fas fa-water',
//     'NATURE TRIP': 'fas fa-leaf',
//     'TOURIST SPOT': 'fas fa-location-dot',
//     'HOTEL': 'fas fa-hotel',
//     'CHURCHES': 'fas fa-church',
//     'EVENTS AND CULTURE': 'fas fa-calendar-days',
//   };

//   function generateServiceCard(service) {
// const iconClass = iconMappings[service.category] || 'fas fa-question';

// return `
// <div class="column">
//     <a href="explore_cardcontent.php?id=${service.id}" class="card-link">
//     <div class="card">
//       <div class="background-image" style="background-image: url('${service.backgroundImage}');"></div>
//       <div class="icon-wrapper">
//         <i class="${iconClass}"></i>
//       </div>
//       <div class="card-content">
//         <h3>${service.title}</h3>
//         <p>${service.description}</p>
//       </div>
//     </div>
//   </div>
// `;
// }

const servicesData = []; // Initialize as an empty array

const iconMappings = {
  'SWIM AND BEACHES': 'fas fa-water',
  'NATURE TRIP': 'fas fa-leaf',
  'TOURIST SPOT': 'fas fa-location-dot',
  'HOTELS': 'fas fa-hotel',
  'CHURCHES': 'fas fa-church',
  'EVENTS AND CULTURE': 'fas fa-calendar-days',
};

function generateServiceCard(service) {
  const iconClass = iconMappings[service.category] || 'fas fa-question';

  return `
    <div class="column">
      <a href="explore_cardcontent.php?id=${service.id}" class="card-link">
        <div class="card">
          <div class="background-image" style="background-image: url('${service.backgroundImage}');"></div>
          <div class="icon-wrapper">
            <i class="${iconClass}"></i>
          </div>
          <div class="card-content">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

function fetchServicesData() {
  fetch('http://localhost:3000/places')
    .then(response => response.json())
    .then(data => {
      // Map the fetched data to match the required structure
      const mappedData = data.map(user => {
        return {
          id: user.id,
          category: user.category,
          title: user.title,
          description: user.description,
          backgroundImage: user.image, // Use the correct field name
        };
      });

      servicesData.push(...mappedData); // Push the mapped data into the servicesData array
      displayServiceCards(servicesData.slice(0, initialItems));
    })
    .catch(error => console.error('Error fetching data:', error));
}

const initialItems = 9;
const itemsPerPage = 3;
let currentPage = 0;

function updateButtons() {
const loadMoreBtn = document.getElementById('load-more-btn');
if (currentPage * itemsPerPage + initialItems >= servicesData.length) {
  loadMoreBtn.textContent = 'Load Less';
  loadMoreBtn.style.display = 'block'; // Display the button when at the end
} else if (currentPage * itemsPerPage + initialItems < servicesData.length) {
  loadMoreBtn.textContent = 'Load More';
  loadMoreBtn.style.display = 'block'; // Display the button when there's more to load
} else {
  loadMoreBtn.style.display = 'none'; // Hide the button when there's nothing more to load
}
}


function displayServiceCards(data) {
const servicesContent = document.querySelector('.services-content .row');
servicesContent.innerHTML = '';

const endIndex = Math.min(currentPage * itemsPerPage + initialItems, data.length);
for (let i = 0; i < endIndex; i++) {
  const cardMarkup = generateServiceCard(data[i]);
  servicesContent.insertAdjacentHTML('beforeend', cardMarkup);
}

updateButtons();
const contentContainer = document.getElementById('load-more-btn');
contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}



function toggleLoadMore() {
const activeCategory = document.querySelector('.category-link.active');
const selectedCategory = activeCategory ? activeCategory.getAttribute('data-category') : null;

const filteredServices = selectedCategory
  ? servicesData.filter(service => service.category === selectedCategory)
  : servicesData;

if (currentPage * itemsPerPage + initialItems >= filteredServices.length) {
  currentPage = 0; // Reset to the first page if we're at the end
} else {
  currentPage++;
}

displayServiceCards(filteredServices);
}


const contentContainer = document.getElementById('load-more-btn');
contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });


function resetContent() {
currentPage = 1;
const activeCategory = document.querySelector('.category-link.active');
if (activeCategory) {
  activeCategory.classList.remove('active');
}
const initialServices = servicesData.slice(0, initialItems);
if (initialServices.length < initialItems) {
  const loadMoreBtn = document.getElementById('load-more-btn');
  loadMoreBtn.style.display = 'none';
}
displayServiceCards(initialServices);
}


$(document).ready(function() {

  fetchServicesData();
  
$('.nav-links li a').click(function(e) {
  e.preventDefault();
  $('.nav-links li a').removeClass('active');
  $(this).addClass('active');
  const selectedCategory = $(this).data('category');

  if (selectedCategory === undefined) { // Handle "See All" click
  resetContent();
  } else {
    const filteredServices = servicesData.filter(service => service.category === selectedCategory);
    displayServiceCards(filteredServices);
  }
});

const loadMoreBtn = document.getElementById('load-more-btn');
loadMoreBtn.addEventListener('click', toggleLoadMore);

displayServiceCards(servicesData.slice(0, initialItems));
});