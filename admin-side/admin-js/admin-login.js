// function login() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // You should replace this with your actual API or data source URL
//     const apiUrl = 'http://localhost:3000/users'; // Modify this URL

//     // Make a fetch request to check user credentials
//     fetch(`${apiUrl}?email=${email}&password=${password}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.length > 0) {
//                 window.location.href = 'Dashboard.php';
//             } else {
//                 alert('Login failed');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// document.getElementById('loginButton').addEventListener('click', login);