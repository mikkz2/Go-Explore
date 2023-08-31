// USER STATISTICS
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const userData = await response.json();

        const totalUsers = userData.length;
        const menUsers = userData.filter(user => user.gender === 'Male').length; 
        const womenUsers = userData.filter(user => user.gender === 'Female').length; 

        document.querySelector('#total-users').textContent = totalUsers;
        document.querySelector('#men-users').textContent = menUsers;
        document.querySelector('#women-users').textContent = womenUsers;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


// POPULAR DESTINATION
const destinationsData = [
    { name: 'Punta Fuego', visits: 280, progress: 95 },
    { name: 'Verde Island', visits: 268, progress: 90 },
    { name: 'Fortune Island', visits: 260, progress: 70 },
    { name: 'Sepoc Beach', visits: 245, progress: 60 },
    { name: 'Manuel Uy Beach', visits: 140, progress: 30 }
];

document.addEventListener('DOMContentLoaded', function() {
    const popularDestinationsContainer = document.getElementById('popular-destinations');

    const ulElement = document.createElement('ul');
    ulElement.className = 'no-bullet'; // Apply the no-bullet class
    destinationsData.forEach((destination, index) => {
        const rank = index + 1;
        const liElement = document.createElement('li');
        liElement.innerHTML = `
            <span class="chart-progress-indicator chart-progress-indicator--increase">
                <span class="chart-progress-indicator__number">${destination.visits}</span>
            </span>
            <span class="bold-rank">Top ${rank}:</span> ${destination.name}
            <div class="progress wds-progress progress-bar-blue">
                <div class="progress-bar" style="width: ${destination.progress}%;"></div>
            </div>
        `;

        ulElement.appendChild(liElement);
    });

    popularDestinationsContainer.appendChild(ulElement);
});
