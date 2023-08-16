// Sample content data
const contentData = {
    backgroundImage: 'image/resorts/7.png',
    overlayText: 'Camp Netanya Resort and Spa',
    resortTitle: 'Camp Netanya Resort and Spa',
    infoBoxes: [
        {
            iconClass: 'fas fa-map-marker-alt',
            infoTitle: ' Location',
            infoContent: 'Mabini Rd, Mabi, Batangas/Ligaya Mabini Batangas'
        },
        {
            iconClass: 'fas fa-facebook',
            infoTitle: ' Facebook Page',
            infoContent: '<a href="https://www.facebook.com/campnetanya" style="color: black;">Visit Page</a>'
        },
        {
            iconClass: 'fas fa-globe',
            infoTitle: ' Website',
            infoContent: '<a href="www.campnetanya.com.ph" style="color: black;">Visit Site</a>'
        },
        {
            iconClass: 'fas fa-phone',
            infoTitle: 'Contact',
            infoContent: '0927-895-4092 <br>0939-753-5074 <br>0916-690-7269'
        }
    ],
    resortDescription: ' - Camp Netanya Resort and Spa claims its popularity from its Santorini architecture giving rise to its brilliant blue domes and white wash buildings. Camp Netanya offers 48 guest rooms and villas, dive shop, wellness center and family and friend everyone should enjoy.'
    // Add more content properties here
};

// Function to create an element with attributes
function createElement(tag, attributes) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

// Populate content
document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content');

    // Background Image
    const bgImage = createElement('div', {
        class: 'bg-image',
        style: `background-image: url('${contentData.backgroundImage}'); height: 450px; background-repeat: no-repeat; background-size: cover;`
    });

    // Overlay
    const overlay = createElement('div', { class: 'overlay' });
    const overlayText = createElement('h1', { class: 'overlay-text'});
    overlayText.textContent= contentData.overlayText;
    overlay.appendChild(overlayText);
    bgImage.appendChild(overlay);

    // Resort Title
    const resortTitle = createElement('div', { class: 'resort-title'});
    resortTitle.textContent= contentData.resortTitle;

    // Create a row for the entire content
    const row = createElement('div', { class: 'row p-5' });

    // Column 1: Info Boxes
    const col1 = createElement('div', { class: 'col-md-2 mb-3' });

    contentData.infoBoxes.forEach(info => {
        const infoBox = createElement('div', { class: 'row infobox' });
        const infoIcon = createElement('div', { class: 'information-box' });
        const icon = createElement('i', { class: info.iconClass });

        const infoDetails = createElement('div', { class: 'info-details' });
        const infoTitle = createElement('div', { class: 'info-title' });
        infoTitle.innerHTML = info.infoTitle;
        const infoContent = createElement('div', { class: 'info-content'});
        infoContent.innerHTML = info.infoContent; 

        infoIcon.appendChild(icon);
        infoDetails.appendChild(infoTitle);
        infoDetails.appendChild(infoContent);
        infoBox.appendChild(infoIcon);
        infoIcon.appendChild(infoDetails);
        col1.appendChild(infoBox);
    });

    // Append Column 1 to the row
    row.appendChild(col1);

    // Column 2: Resort Description
    const col2 = createElement('div', { class: 'col-md-8 mb-3 border-sides' });

    const resortDetails = createElement('div', { class: 'resort-details' });
    const descriptionText = createElement('div', { class: 'resort-description' });
    descriptionText.textContent = contentData.resortDescription;
    resortDetails.appendChild(descriptionText);
    col2.appendChild(resortDetails);

    // Append Column 2 to the row
    row.appendChild(col2);

    // Column 3: Rating Box and Review Input
    const col3 = createElement('div', { class: 'col-md-2 mb-3' });

    const ratingBox = createElement('div', { class: 'row rating-box' });
    const rateText = createElement('div', { class: 'rate-text text-center' });
    rateText.innerHTML = '<p style="font-weight: bold; font-size: 20px;">RATE US</p>';
    ratingBox.appendChild(rateText);

    // Stars
    const stars = createElement('div', { class: 'stars' });
    const starForm = createElement('form');
    for (let i = 5; i >= 1; i--) {
        const input = createElement('input', { class: `star star-${i}`, id: `star-${i}`, type: 'radio', name: 'star' });
        const label = createElement('label', { class: `star star-${i}`, for: `star-${i}` });
        starForm.appendChild(input);
        starForm.appendChild(label);
    }
    stars.appendChild(starForm);
    ratingBox.appendChild(stars);

    // Review Input
    const reviewText = createElement('div', { class: 'review-text text-center' });
    reviewText.innerHTML = '<p style="font-weight: bold;">Tell us what you think</p>';
    ratingBox.appendChild(reviewText);

    const reviewInput = createElement('div', { class: 'review-input' });
    const input = createElement('input', { type: 'text', class: 'form-control mb-2', placeholder: 'Write a review...' });
    const submitButton = createElement('button', { type: 'submit', class: 'btn btn-primary mt-3 float-right' });
    submitButton.textContent = 'Submit';
    reviewInput.appendChild(input);
    reviewInput.appendChild(submitButton);
    ratingBox.appendChild(reviewInput);

    col3.appendChild(ratingBox);

    // Append Columns to Row
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);

    // Append Content to Container
    const container = createElement('div', { class: 'container-fluid' });
    container.appendChild(row);

    // Append All Content to Main Container
    contentContainer.appendChild(bgImage);
    contentContainer.appendChild(resortTitle);
    contentContainer.appendChild(container);
});
