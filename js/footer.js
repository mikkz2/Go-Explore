// FOOTER DYNAMIC CONTENTS
const footerSections = [
    {
        title: "About",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        title: "Categories",
        links: [
            { title: "Dive", url: "#" },
            { title: "Nature", url: "#" },
            { title: "Beach", url: "#" },
            { title: "Adventure", url: "#" },
            { title: "Food", url: "#" },
            { title: "Festival", url: "#" }
        ]
    },
    {
        title: "Quick Links",
        links: [
            { title: "Let's Explore", url: "#" },
            { title: "Where to Go", url: "#" },
            { title: "Calendar of Activities", url: "#" },
            { title: "Love Our Planet", url: "#" },
            { title: "Favorites", url: "#" }
        ]
    }
];

// Function to generate dynamic content for the footer
function generateFooterContent() {
    const footerContentContainer = document.getElementById("footer-content");

    footerSections.forEach((section, index) => {
        const col = document.createElement("div");

        if (index === 0) {
            col.classList.add("col-xs-6", "col-md-6");
        } else {
            col.classList.add("col-xs-6", "col-md-3");
        }
        
        const sectionTitle = document.createElement("h6");
        sectionTitle.textContent = section.title;

        col.appendChild(sectionTitle);

        if (section.content) {
            const sectionContent = document.createElement("p");
            sectionContent.classList.add("text-justify");
            sectionContent.textContent = section.content;
            col.appendChild(sectionContent);
        }

        if (section.links) {
            const linkList = document.createElement("ul");
            linkList.classList.add("footer-links");

            section.links.forEach(link => {
                const listItem = document.createElement("li");
                const anchor = document.createElement("a");
                anchor.href = link.url;
                anchor.textContent = link.title;
                listItem.appendChild(anchor);
                linkList.appendChild(listItem);
            });

            col.appendChild(linkList);
        }

        footerContentContainer.appendChild(col);
    });
}

// Call the function to generate the dynamic content for the footer
generateFooterContent();