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
document.addEventListener('DOMContentLoaded', function () {
    // Fetch festival data from your localhost server
    fetch('http://localhost:3000/places')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.visits - a.visits);

            const top5Places = data.slice(0, 5);

            const destinationsData = top5Places.map((places, index) => ({
                name: places.title,
                visits: places.visits,
                progress: places.progress,
                rank: index + 1,
            }));

            const popularDestinationsContainer = document.getElementById('popular-destinations');
            
            // Apply the CSS class to make the container wider
            popularDestinationsContainer.classList.add('wider-container');

            const ulElement = document.createElement('ul');
            ulElement.className = 'no-bullet';

            destinationsData.forEach(destination => {
                const liElement = document.createElement('li');
                liElement.innerHTML = `
                    <span class="chart-progress-indicator chart-progress-indicator--increase">
                        <span class="chart-progress-indicator__number">${destination.visits}</span>
                    </span>
                    <span class="bold-rank">Top ${destination.rank}:</span> ${destination.name}
                    <div class="progress wds-progress progress-bar-blue">
                        <div class="progress-bar" style="width: ${destination.progress}%;"></div>
                    </div>
                `;

                ulElement.appendChild(liElement);
            });

            popularDestinationsContainer.appendChild(ulElement);
        })
        .catch(error => console.error('Error fetching data:', error));
});


// RECENT ACTIVITY
const recentActivity = [
    {
      userImage: 'https://i.imgur.com/UIhwGhr.jpg',
      userName: 'Timothy Husai',
      activityText: 'For what reason would it be advisable.',
      timeAgo: '24 min ago',
    },
    {
      userImage: 'https://i.imgur.com/rAInTHU.jpg',
      userName: 'Simkil Ahleu',
      activityText: 'That might be a little bit risky to have a crew.',
      timeAgo: '12 hours ago',
    },
    {
      userImage: 'https://i.imgur.com/rAInTHU.jpg',
      userName: 'John Deo',
      activityText: 'For what reason would it be advisable.',
      timeAgo: '2 min ago',
    },
    {
      userImage: 'https://i.imgur.com/UIhwGhr.jpg',
      userName: 'John Deo',
      activityText: 'Member like them. For what reason.',
      timeAgo: '12 min ago',
    },
  ];
  document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.user-activity-card .card-block');

    recentActivity.forEach(item => {
        const row = document.createElement('div');
        row.className = 'row m-b-25';

        const col1 = document.createElement('div');
        col1.className = 'col-auto p-r-0';

        const uImg = document.createElement('div');
        uImg.className = 'u-img';
        const coverImg = document.createElement('img');
        coverImg.src = item.userImage;
        coverImg.alt = 'user image';
        coverImg.className = 'img-radius cover-img';
        const profileImg = document.createElement('img');
        profileImg.src = 'https://img.icons8.com/office/16/000000/active-state.png';
        profileImg.alt = 'user image';
        profileImg.className = 'img-radius profile-img';

        uImg.appendChild(coverImg);
        uImg.appendChild(profileImg);
        col1.appendChild(uImg);

        const col2 = document.createElement('div');
        col2.className = 'col';

        const userName = document.createElement('h6');
        userName.className = 'm-b-5';
        userName.textContent = item.userName;

        const activityText = document.createElement('p');
        activityText.className = 'text-muted m-b-0';
        activityText.textContent = item.activityText;

        const timeAgo = document.createElement('p');
        timeAgo.className = 'text-muted m-b-0';
        const timerIcon = document.createElement('i');
        timerIcon.className = 'mdi mdi-timer feather icon-clock m-r-10';
        timeAgo.appendChild(timerIcon);
        timeAgo.textContent = item.timeAgo;

        col2.appendChild(userName);
        col2.appendChild(activityText);
        col2.appendChild(timeAgo);

        row.appendChild(col1);
        row.appendChild(col2);

        card.appendChild(row);
    });

    // Add a link to view all activities if needed
    const viewAllLink = document.createElement('div');
    viewAllLink.className = 'text-center';
    const viewAllAnchor = document.createElement('a');
    viewAllAnchor.href = '#!';
    viewAllAnchor.className = 'b-b-primary text-primary';
    viewAllAnchor.dataset.abc = 'true';
    viewAllAnchor.textContent = 'View all Activities';
    viewAllLink.appendChild(viewAllAnchor);

    card.appendChild(viewAllLink);
});
  
