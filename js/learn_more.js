// LEARN MORE DYNAMIC CONTENTS
const learnmoreItems = [
    {
        imageSrc: "image/6.png",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl lorem. Quisque eu lacus ut lacus dapibus malesuada."
    },
    {
        imageSrc: "image/2.png",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl lorem. Quisque eu lacus ut lacus dapibus malesuada."
    },
    {
        imageSrc: "image/3.png",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl lorem. Quisque eu lacus ut lacus dapibus malesuada."
    },
    {
        imageSrc: "image/4.png",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl lorem. Quisque eu lacus ut lacus dapibus malesuada."
    },
];

function generateLearnmoreItems() {
    const learnmoreContainer = document.getElementById("learnmore-container");

    learnmoreItems.forEach(item => {
        const divCol = document.createElement("div");
        divCol.classList.add("col", "col-12", "p-0");
        const learnmoreItem = document.createElement("div");
        learnmoreItem.classList.add("learnmore-item");

        const learnmoreImage = document.createElement("div");
        learnmoreImage.classList.add("learnmore-image");
        const img = document.createElement("img");
        img.src = item.imageSrc;
        img.alt = "Image";

        learnmoreImage.appendChild(img);

        const learnmoreContent = document.createElement("div");
        learnmoreContent.classList.add("learnmore-content");
        const learnmoreText = document.createElement("div");
        learnmoreText.classList.add("learnmore-text");
        learnmoreText.textContent = item.text;

        learnmoreContent.appendChild(learnmoreText);
        learnmoreItem.appendChild(learnmoreImage);
        learnmoreItem.appendChild(learnmoreContent);
        divCol.appendChild(learnmoreItem);

        learnmoreContainer.appendChild(divCol);
    });
}

generateLearnmoreItems();