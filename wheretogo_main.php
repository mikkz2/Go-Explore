<!DOCTYPE html>
<html lang="en">
<?php include 'header.php'; ?>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Services Section</title>
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
  <!-- Stylesheet -->
  <link rel="stylesheet" href="css/wheretogo_main.css" />
  <script src="https://kit.fontawesome.com/e173e574d6.js" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>
<body>

    <div class="services-content" id="services-content">
      <div class="row">
        <!-- The dynamic service cards will be inserted here -->
      </div>
    </div>

 
  <script>
    const servicesData = [
      {
        id: 1,
        title: 'MATAAS NA KAHOY',
        backgroundImage: 'image/places/swimandbeaches.png',
      },
      {
        id: 2,
        title: 'TALISAY MUNDO',
        backgroundImage: 'image/places/naturetrip.png',
      },
      {
        id:3,
       title: 'TUY',
        backgroundImage: 'image/places/touristspots.png',
      },
      {
        id: 4,
        title: 'AGONCILLO',
        backgroundImage: 'image/places/hotels.png',
      },
      {
        id: 5,
        title: 'BALAYAN',
        backgroundImage: 'image/places/churches.png',},
      {
        id: 6,
        title: 'BATANGAS',
        backgroundImage: 'image/places/eventsandculture.png',},
    ];

    function generateServiceCard(service) {
  return `
    <div class="column">
      <a href="wheretogo_cardcontent.php?id=${service.id}" class="card-link">
        <div class="card">
          <div class="background-image" style="background-image: url('${service.backgroundImage}');"></div>
          <div class="card-content">
            <h3>${service.title}</h3>
          </div>
        </div>
      </a>
    </div>
  `;
}


const servicesContainer = document.getElementById('services-content');

// Iterate through the servicesData array and generate cards
for (const service of servicesData) {
  const serviceCardHtml = generateServiceCard(service);
  servicesContainer.innerHTML += serviceCardHtml;
}
  </script>
</body>
</html>