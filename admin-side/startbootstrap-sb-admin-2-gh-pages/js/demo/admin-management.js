$(document).ready(function () {
  $('#dataTable').DataTable();
});

//modal for add user
$(document).ready(function () {
  $("#addButton").click(function () {
    $("#addModal").modal("show");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('tableBody');
  const addButton = document.getElementById('addButton');
  const addModal = new bootstrap.Modal(document.getElementById('addModal'));
  const addAccountButton = document.getElementById('btn-add-account');
  const editModal = new bootstrap.Modal(document.getElementById('editModal')); // Add this line
  const editForm = document.getElementById('edit-user-form'); // Add this line


  // Fetch data from JSON server and populate the table
  function populateTable() {
    fetch('http://localhost:3000/admin') // Replace with your JSON server URL
      .then(response => response.json())
      .then(data => {
        tableBody.innerHTML = ''; // Clear existing table data
        data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
                      <td>${user.id}</td>
                      <td>${user.user_name}</td>
                      <td>${user.email}</td>
                      <td>${maskPassword(user.password)}</td>
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

    // Handle edit button click event
    // tableBody.addEventListener('click', event => {
    //   if (event.target.classList.contains('edit-button')) {
    //     const userId = event.target.getAttribute('data-user-id');
    //     fetch(`http://localhost:3000/admin/${userId}`)
    //       .then(response => response.json())
    //       .then(user => {
    //         // Populate the edit form fields with user data
    //         editForm.elements.id.value = user.id;
    //         editForm.elements.user_name.value = user.user_name;
    //         editForm.elements.email.value = user.email;
    //         editForm.elements.password.value = user.password;
    //         editForm.elements.password.value = user.created_at;
    //         // Show the edit modal
    //         editModal.show();
    //       })
    //       .catch(error => console.error('Error fetching user data:', error));
    //   }
    // });
    function editRow(event) {
      const button = event.target;
    const row = button.closest('tr');
    const userId = row.querySelector('td:first-child').textContent;
      fetch(`http://localhost:3000/admin/${userId}`)
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
          editForm.elements.user_name.value = user.user_name;
          editForm.elements.email.value = user.email;
          editForm.elements.password.value = user.password;
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
      fetch(`http://localhost:3000/admin/${updatedUser.id}`, {
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
  addButton.addEventListener('click', () => {
    addModal.show();
  });

  addAccountButton.addEventListener('click', () => {
    const form = document.getElementById('add-user-form');
    const formData = new FormData(form);

    const user = {};
    formData.forEach((value, key) => {
      user[key] = value;
    });
    const date = new Date();

    let currentDay = String(date.getDate()).padStart(2, '0');

    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

    let currentYear = date.getFullYear();

    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    user['created_at'] = currentDate;

    // Send POST request to JSON server
    fetch('http://localhost:3000/admin', {
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
    fetch(`http://localhost:3000/admin/${userId}`, {
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
