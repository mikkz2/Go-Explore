// Function to fetch services data from the server
function fetchServicesData() {
    return fetch('http://localhost:3000/places_cities')
      .then(async function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cityData = await response.json();
        // You can select the city based on your logic here
        return cityData[0].city;
      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
        return []; // Return an empty array in case of an error
      });
  }
  
  // Function to generate the service card HTML
  function generateServiceCard(service) {
    console.log("i am working");
    return `
      <div class="column">
        <a href="wheretogo_cardcontent.php?id=${service.id}" class="card-link">
          <div class="card">
            <div class="background-image" style="background-image: url('${service.image}');"></div>
            <div class="card-content">
              <h3>${service.city}</h3>
            </div>
          </div>
        </a>
      </div>
    `;
  }
  
  // Function to generate service cards using fetched data
  function generateServiceCards() {
    fetchServicesData().then(function(servicesData) {
      const servicesContainer = document.getElementById('services-content');
    
      for (const service of servicesData) {
        const serviceCardHtml = generateServiceCard(service);
        servicesContainer.innerHTML += serviceCardHtml;
      }
    });
  }
  
  // Call the function to generate service cards
  generateServiceCards();
  