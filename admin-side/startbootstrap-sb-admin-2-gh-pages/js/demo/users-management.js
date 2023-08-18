// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable();
});

//modal for add user
$(document).ready(function () {
  $("#addButton").click(function () {
    $("#addModal").modal("show");
  });
});
// modal for add event
$(document).ready(function () {
  $("#addButton").click(function () {
    $("#addEventModal").modal("show");
  });
});
// modal for add places
$(document).ready(function () {
  $("#addButton").click(function () {
    $("#addPlaceModal").modal("show");
  });
});

// month and day picker
// document.addEventListener('DOMContentLoaded', function () {
//   const eventDateInput = document.getElementById('eventDate');

//   eventDateInput.addEventListener('input', function () {
//     const inputValue = eventDateInput.value;

//     if (!/^(January|February|March|April|May|June|July|August|September|October|November|December) (0?[1-9]|[12][0-9]|3[01])$/.test(inputValue)) {
//       eventDateInput.setCustomValidity('Please enter a valid date in the format "Month Day" (e.g., "July 23").');
//     } else {
//       eventDateInput.setCustomValidity('');
//     }
//   });
// });

// USER MANAGEMENT DATA
document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('tableBody');
  const addButton = document.getElementById('addButton');
  const addModal = new bootstrap.Modal(document.getElementById('addModal'));
  const addAccountButton = document.getElementById('btn-add-account');
  const editModal = new bootstrap.Modal(document.getElementById('editModal')); // Add this line
  const editForm = document.getElementById('edit-user-form'); // Add this line

  // Fetch data from JSON server and populate the table
  function populateTable() {
    fetch('http://localhost:3000/users') // Replace with your JSON server URL
      .then(response => response.json())
      .then(data => {
        tableBody.innerHTML = ''; // Clear existing table data
        data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
                      <td>${user.id}</td>
                      <td>${user.first_name}</td>
                      <td>${user.last_name}</td>
                      <td>${user.email}</td>
                      <td>${maskPassword(user.password)}</td>
                      <td>${user.from_country}</td>
                      <td>${user.current_province}</td>
                      <td>${user.current_city}</td>
                      <td>${user.current_baranggay}</td>
                      <td>${user.created_at}</td>
                      <td>${user.updated_at}</td>
                      <!-- ... Other cells ... -->
                      <td>
                      <button class="btn btn-primary btn-sm edit-button" data-user-id="${user.id}">
                              <i class="fa fa-pen"></i>
                          </button>
                          <button class="btn btn-danger btn-sm delete-button">
                              <i class="fa fa-trash"></i>
                          </button>
                      </td>
                  `;
          tableBody.appendChild(row);
        });
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
          button.addEventListener('click', deleteRow);
        });
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
          button.addEventListener('click', editRow);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  function editRow(event) {
    const button = event.target;
    const row = button.closest('tr');
    const userId = row.querySelector('td:first-child').textContent;
    fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(user => {

        const date = new Date();

        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        let updated_at = `${currentDay}-${currentMonth}-${currentYear}`;

        // user['created_at'] = currentDate;
        // Populate the edit form fields with user data
        editForm.elements.id.value = user.id;
        editForm.elements.first_name.value = user.first_name;
        editForm.elements.last_name.value = user.last_name;
        editForm.elements.email.value = user.email;
        editForm.elements.password.value = user.password;
        editForm.elements.from_country.value = user.from_country;
        editForm.elements.current_province.value = user.current_province;
        editForm.elements.current_city.value = user.current_city;
        editForm.elements.current_baranggay.value = user.current_baranggay;
        editForm.elements.created_at.value = user.created_at;
        editForm.elements.updated_at.value = updated_at;
        // Show the edit modal
        editModal.show();
      })
      .catch(error => console.error('Error fetching user data:', error));
  }

  // Handle edit form submission
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(editForm);
    const updatedUser = {};
    formData.forEach((value, key) => {
      updatedUser[key] = value;
    });

    // Send PUT request to update user data
    fetch(`http://localhost:3000/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => response.json())
      .then(data => {
        editForm.reset();
        editModal.hide();
        populateTable(); // Refresh the table to reflect changes
      })
      .catch(error => console.error('Error updating user data:', error));
  });


  // Handle form submission and add new user
  // const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', () => {
    addModal.show();
  });

  addAccountButton.addEventListener('click', () => {
    const form = document.getElementById('add-user-form');
    const formData = new FormData(form);

    // Convert form data to JSON object
    const user = {};
    formData.forEach((value, key) => {
      user[key] = value;
    });
    const date = new Date();

    let currentDay = String(date.getDate()).padStart(2, '0');

    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

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
        form.reset();
        addModal.hide();

        populateTable();
      })
      .catch(error => console.error('Error adding user:', error));
  });

  function deleteRow(event) {
    const button = event.target;
    const row = button.closest('tr');
    const userId = row.querySelector('td:first-child').textContent;

    // Send DELETE request to JSON server
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        // Remove the row from the table
        row.remove();
      })
      .catch(error => console.error('Error deleting user:', error));
  }

  // Populate the table on page load
  populateTable();
});
function maskPassword(password) {
  return '*'.repeat(password.length);
}

