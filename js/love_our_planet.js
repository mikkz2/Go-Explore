

$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});

const dynamicImages = [
    {
        image: 'image/SombreroIsland.png',
        overlayText: 'EXPLORE THE COUNTRY WHILE PRACTICING SUSTAINABILITY.',
    },
    {
        image: 'image/leaves.jpg',
        overlayText: 'BE A RESPONSIBLE TOURIST.',
    },
    {
        image: 'image/LAMBAYOK5.PNG',
        overlayText: 'RESPECT THE CULTURE <br> RESPECT THE ENVIRONMENT',
    },

];

const container = document.getElementById('dynamic-images-container');

dynamicImages.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('bg-image-wrapper', `bg-image-wrapper-${index + 1}`);
    wrapper.style.backgroundImage = `url('${item.image}')`;
    wrapper.style.height = '800px';
    wrapper.style.backgroundRepeat = 'no-repeat';
    wrapper.style.backgroundSize = 'cover';

    const overlay = document.createElement('div');
    overlay.classList.add('col-6', 'overlay');

    const overlayText = document.createElement('h1');
    overlayText.classList.add('overlay-text');
    overlayText.innerHTML = item.overlayText;

    overlay.appendChild(overlayText);
    wrapper.appendChild(overlay);
    container.appendChild(wrapper);
});

// dynamic contents for 3 options
const dynamicOptions = [
    {
      backgroundImage: 'image/what to bring.jpg',
      icon: 'fas',
      icon2: 'fa-suitcase',
      title: 'THINGS TO BRING',
      sectionId: 'thing-to-bring',
    },
    {
      backgroundImage: 'image/what to avoid.jpg',
      icon: 'fas',
      icon2: 'fa-hand-paper',
      title: 'WHAT TO AVOID',
      sectionId: 'what-to-avoid',
    },
    {
      backgroundImage: 'image/what to remember.jpg',
      icon: 'fas',
      icon2: 'fa-lightbulb',
      title: 'STUFF TO REMEMBER',
      sectionId: 'stuff-to-remember',
    },
    
    // Add more objects as needed
  ];
  
  const optionsContainer = document.getElementById('dynamic-options-container');
  
  dynamicOptions.forEach((item) => {
    const optionColumn = document.createElement('div');
    optionColumn.classList.add('col-md-4', 'option-column');
    optionColumn.setAttribute('onclick', `navigateToSection('${item.sectionId}')`);
  
    const option = document.createElement('div');
    option.classList.add('option');
  
    const bgImage = document.createElement('div');
    bgImage.classList.add('bg-image');
    bgImage.style.backgroundImage = `url('${item.backgroundImage}')`;
  
    const icon = document.createElement('div');
    icon.classList.add('icon');
    const iconElement = document.createElement('i');
    iconElement.classList.add(item.icon);
    iconElement.classList.add(item.icon2);
    icon.appendChild(iconElement);
  
    const title = document.createElement('h2');
    title.innerText = item.title;
  
    option.appendChild(bgImage);
    option.appendChild(icon);
    option.appendChild(title);
    optionColumn.appendChild(option);
    optionsContainer.appendChild(optionColumn);
  });
  function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


// THINGS TO BRING
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');

    const baseURL = 'http://localhost:3000/thingstobring'; // Replace with your actual base URL

    function populateSlider(data) {
        data.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('slide');

            const slideImage = document.createElement('div');
            slideImage.classList.add('slide-image');
            slideImage.style.backgroundImage = `url('${baseURL}/${item.image}')`;

            const slideDetails = document.createElement('div');
            slideDetails.classList.add('slide-details');

            const slideTitle = document.createElement('h3');
            slideTitle.innerText = item.title;

            const slideDescription = document.createElement('p');
            slideDescription.innerText = item.description;

            const slideLink = document.createElement('a');
            slideLink.href = item.link;
            slideLink.classList.add('facebook-button');
            slideLink.innerText = 'Share';

            slideDetails.appendChild(slideTitle);
            slideDetails.appendChild(slideDescription);
            slideDetails.appendChild(slideLink);

            slide.appendChild(slideImage);
            slide.appendChild(slideDetails);

            slider.appendChild(slide);
        });
    }

    function fetchDataAndPopulateSlider() {
        fetch('http://localhost:3000/thingstobring')
            .then(response => response.json())
            .then(data => {
                populateSlider(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchDataAndPopulateSlider();
});

// what to avoid 
const dynamicAvoidSlides = [
    {
        image: 'image/things/9.png',
        title: 'Overusing Electricity',
        details: 'Too much power usage contributes to our carbon footprint. So why not set down your devices – simply unplug and enjoy your vacation!',
        link: '#'
    },
    {
        image: 'image/things/10.png',
        title: 'Wasting Food',
        details: 'Only get what you can finish, and just get seconds if you want more. You can be sustainable starting with your own plate!',
        link: '#'
    },
    {
        image: 'image/things/11.png',
        title: 'Touching Wildlife',
        details: 'When guides warn guests against interacting with animals, it’s not only for human protection. Some creatures, like the whale sharks, are so sensitive that touching them causes harm.',
        link: '#'
    },
    {
        image: 'image/things/12.png',
        title: 'Leaving Trash Around',
        details: 'Treat your destinations like your own home. Clean as you go, and set a great example: clean up after strangers as well.',
        link: '#'
    },
    {
        image: 'image/things/13.png',
        title: 'Taking Shells and Sand Home',
        details: 'Keep in mind that not everything is a souvenir. Let’s leave our nature as is, and just get better pasalubongs from small shops!',
        link: '#'
    },
    {
        image: 'image/things/14.png',
        title: 'Long Showers',
        details: 'Here’s a fact that should be made more public: water is a finite resource. Humans have access to only 1% of the world’s fresh water, so conservation should be a priority especially when we travel.',
        link: '#'
    },
    // Add more slides as needed
];

const avoidSectionTitle = document.getElementById('avoid-section-title');
const avoidSlider = document.getElementById('avoid-slider');

avoidSectionTitle.innerText = 'WHAT TO AVOID'; // Set the section title

dynamicAvoidSlides.forEach((item) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const slideImage = document.createElement('div');
    slideImage.classList.add('slide-image');
    slideImage.style.backgroundImage = `url('${item.image}')`;

    const slideDetails = document.createElement('div');
    slideDetails.classList.add('slide-details');

    const slideTitle = document.createElement('h3');
    slideTitle.innerText = item.title;

    const slideDescription = document.createElement('p');
    slideDescription.innerText = item.details;

    const slideLink = document.createElement('a');
    slideLink.href = item.link;
    slideLink.classList.add('facebook-button');
    slideLink.innerText = 'Share';

    slideDetails.appendChild(slideTitle);
    slideDetails.appendChild(slideDescription);
    slideDetails.appendChild(slideLink);

    slide.appendChild(slideImage);
    slide.appendChild(slideDetails);

    avoidSlider.appendChild(slide);
});

// stuff to remember

const dynamicRememberSlides = [
    {
        image: 'image/things/15.png',
        title: 'Understanding Every Site’s Rules',
        details: 'Each place has regulations set for a reason. Knowing what these are and respecting them, we get to keep the place fun and enjoyable!',
        link: '#'
    },
    {
        image: 'image/things/16.png',
        title: 'Research Before Visiting',
        details: 'Though some travelers prefer spontaneity, it’s also a good choice to be prepared. Learn about the destinations beforehand so you can dress respectfully, converse with locals, and immerse yourself better!',
        link: '#'
    },
    {
        image: 'image/things/17.png',
        title: 'Support Local Businesses',
        details: 'Sustainability also means making sure that locals benefit from travelers. Bring small bills along and buy what you need from those quaint shops run by locals!',
        link: '#'
    },
    {
        image: 'image/things/18.png',
        title: 'Respect the Locals',
        details: 'Ask permission before you take someone’s photograph. After all, you wouldn’t want total strangers',
        link: '#'
    },
    {
        image: 'image/things/5.png',
        title: 'Book DOT-Accredited Establishments',
        details: 'Take the guesswork out of planning ahead: choose accommodations and activities that have already been vetted as safe and trustworthy by the country’s tourism authority.',
        link: '#'
    },
    {
        image: 'image/things/20.png',
        title: 'Bring Only What’s Necessary',
        details: 'Travel with your essentials, and just leave the rest at home. The lighter your bag, the easier it will be to move around on foot and on bike, and there’s no need to check stuff in too!',
        link: '#'
    },
    // Add more slides as needed
];

const rememberSectionTitle = document.getElementById('remember-section-title');
const rememberSlider = document.getElementById('remember-slider');

rememberSectionTitle.innerText = 'STUFF TO REMEMBER'; // Set the section title

dynamicRememberSlides.forEach((item) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const slideImage = document.createElement('div');
    slideImage.classList.add('slide-image');
    slideImage.style.backgroundImage = `url('${item.image}')`;

    const slideDetails = document.createElement('div');
    slideDetails.classList.add('slide-details');

    const slideTitle = document.createElement('h3');
    slideTitle.innerText = item.title;

    const slideDescription = document.createElement('p');
    slideDescription.innerText = item.details;

    const slideLink = document.createElement('a');
    slideLink.href = item.link;
    slideLink.classList.add('facebook-button');
    slideLink.innerText = 'Share';

    slideDetails.appendChild(slideTitle);
    slideDetails.appendChild(slideDescription);
    slideDetails.appendChild(slideLink);

    slide.appendChild(slideImage);
    slide.appendChild(slideDetails);

    rememberSlider.appendChild(slide);
});


