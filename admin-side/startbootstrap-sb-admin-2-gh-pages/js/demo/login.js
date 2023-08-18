document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const staticBackdropModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    const closeButton = staticBackdropModal._element.querySelector('.btn-close'); 

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Send a GET request to check if the user exists in the database
            fetch(`http://localhost:3000/admin?email=${email}&password=${password}`)
                .then(response => response.json())
                .then(admin => {
                    if (admin.length === 1) {
                        // Valid login
                        console.log('Login successful');

                        window.location.href = 'index.html'; 
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