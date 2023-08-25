<!DOCTYPE html>
<html lang="en">
    
<?php include 'header.php'; ?>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Card Content</title>
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
  <!-- Stylesheet -->
  <link rel="stylesheet" href="css/wheretogo_cardcontent.css" />
  <script src="https://kit.fontawesome.com/e173e574d6.js" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <section class="iframe-container">
    <div class="background-image"></div>
    <h3></h3>
  </div>
</div>
</section>

<section class="paragraph">
  <p class="dynamic-paragraph"></p>
</section>

<div class="iframe">
  <iframe src="wheretogo_carousel.html" width="100%" height="585" frameborder="0" background="transparent"></iframe>
</div>

<div class="iframe">
  <iframe src="wheretogo_maps.html" width="100%" height="585" frameborder="0" background="transparent"></iframe>
</div>

<script>
  const dynamicData = [
    {
      id: 1,
      backgroundImage: "images/churches.png",
      title: "SAMAL",
      paragraph: "Samal Island is a 4th class component city of the province of Davao del Norte. It is made up of Samal Island and the smaller Talikud Island in the Davao Gulf. It is part of the Metropolitan Davao area and is two kilometers away from Davao City, the largest city and the primary economic center of Mindanao. Samal Island is the quick go-to destination of Davaoeños looking for beach time. Its proximity to the city and its beautiful beaches and other attractions often make it a top choice.",
    },
    {
      id: 2,
      backgroundImage: "images/churches.png",
      title: "LIPA",
      paragraph: "Samal Island is a 4th class component city of the province of Davao del Norte. It is made up of Samal Island and the smaller Talikud Island in the Davao Gulf. It is part of the Metropolitan Davao area and is two kilometers away from Davao City, the largest city and the primary economic center of Mindanao. Samal Island is the quick go-to destination of Davaoeños looking for beach time. Its proximity to the city and its beautiful beaches and other attractions often make it a top choice.",
    },
    {
      id: 3,
      backgroundImage: "images/churches.png",
      title: "BATANGAS",
      paragraph: "Samal Island is a 4th class component city of the province of Davao del Norte. It is made up of Samal Island and the smaller Talikud Island in the Davao Gulf. It is part of the Metropolitan Davao area and is two kilometers away from Davao City, the largest city and the primary economic center of Mindanao. Samal Island is the quick go-to destination of Davaoeños looking for beach time. Its proximity to the city and its beautiful beaches and other attractions often make it a top choice.",
    },
    // ... other data objects ...
  ];

  // Get the id from the query string
  const queryParams = new URLSearchParams(window.location.search);
  const id = parseInt(queryParams.get('id'));

  // Find the data object that matches the selected id
  const selectedData = dynamicData.find(item => item.id === id);

  // Update dynamic elements with the selected data
  const backgroundElement = document.querySelector(".background-image");
  const titleElement = document.querySelector("h3");
  const paragraphElement = document.querySelector(".dynamic-paragraph");

  backgroundElement.style.backgroundImage = `url('${selectedData.backgroundImage}')`;
  titleElement.textContent = selectedData.title;
  paragraphElement.textContent = selectedData.paragraph;
</script>
</body>
</html>
