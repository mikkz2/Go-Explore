$(document).ready(function() {
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');
});

$('.login-reg-panel input[type="radio"]').on('change', function() {
    if ($('#log-login-show').is(':checked')) {
        if(screen.width > 768){
            $('.register-info-box').fadeOut();
            $('.login-info-box').fadeIn();
        }
        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');

    } else if ($('#log-reg-show').is(':checked')) {
        if(screen.width > 768){
            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();
        }

        $('.white-panel').removeClass('right-log');

        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
});

const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {
    // Collect form data
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const from_country = document.getElementById('from_country').value;
    const current_province = document.getElementById('current_province').value;
    const current_city = document.getElementById('current_city').value;
    const current_baranggay = document.getElementById('current_baranggay').value;

    // Redirect to learnmore.php
    window.location.href = 'learn_more.php';

    // Create an object with the form data
    const user = {
        first_name,
        last_name,
        email,
        password,
        from_country,
        current_province,
        current_city,
        current_baranggay
    };
    const date = new Date();

    let currentDay= String(date.getDate()).padStart(2, '0');
    
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    
    let currentYear = date.getFullYear();
  
    // we will display the date as DD-MM-YYYY 
  
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
   // Add current date to the user object
   user['created_at'] = currentDate; // or any other format you prefer

    // Send POST request to JSON server
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User added:', data);
        // Optionally, you can trigger table population here
    })
    .catch(error => console.error('Error adding user:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const staticBackdropModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    const closeButton = staticBackdropModal._element.querySelector('.btn-close'); 

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3001/auth/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Use the entered email and password
            })
            .then(response => response.json())
            .then(data => {
                if (data.access_token && data.refresh_token) {
                    // Valid login
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);

                    console.log(data);
                    console.log('Login successful');
                    window.location.href = 'learn_more.php'; 
                } else {
                    // Invalid login
                    console.log('Invalid login');
                    staticBackdropModal.show();
                }
            })
            .catch(error => console.error('Error checking login:', error));
        });

        // Close the modal when clicking on the close button
        closeButton.addEventListener('click', () => {
            staticBackdropModal.hide();
        });
    }
});



