// Call the dataTables jQuery plugin
$(document).ready(function () {
    $('#dataTable').DataTable();
  });

// modal for add event
$(document).ready(function () {
    $("#addButton").click(function () {
      $("#addEventModal").modal("show");
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

  document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('tableBody');
    const addButton = document.getElementById('addButton');
    const addEventModal = new bootstrap.Modal(document.getElementById('addEventModal'));
    const addAccountButton = document.getElementById('btn-add-account');
    const editModal = new bootstrap.Modal(document.getElementById('editModal')); // Add this line
    const editForm = document.getElementById('edit-user-form'); // Add this line
  
  
    // Fetch data from JSON server and populate the table
    function populateTable() {
      fetch('http://localhost:3000/festival') // Replace with your JSON server URL
        .then(response => response.json())
        .then(data => {
          tableBody.innerHTML = ''; // Clear existing table data
          data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.image}</td>
                        <td>${user.title}</td>
                        <td>${user.description}</td>
                        <td>${user.date}</td>
                        <td>${user.province}</td>
                        <td>${user.city}</td>
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

    // handles image uploads
    const addForm = document.getElementById('add-user-form');

  //   addForm.addEventListener('submit', function (event) {
  //     event.preventDefault();
  //     const formData = new FormData(addForm);
  //     const imageFile = addForm.querySelector('input[type="file"]').files[0]; // Get the selected image file
  
  //     formData.delete('image'); // Remove the original image data from formData
  //     formData.append('image', imageFile); // Append the image file to formData
  
  //     fetch('http://localhost:3000/upload', {
  //         method: 'POST',
  //         body: formData
  //     })
  //     .then(response => response.json())
  //     .then(imagePath => {
  //         const user = {
  //             // Populate other form fields in the user object if needed
  //             imagePath: imagePath // Save the image path to the user object
  //         };
  
  //         // Now, you can send the user object to the server
  //         fetch('http://localhost:3000/festival', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify(user)
  //         })
  //         .then(response => response.json())
  //         .then(data => {
  //             form.reset();
  //             addEventModal.hide();
  //             populateTable();
  //         })
  //         .catch(error => console.error('Error adding item:', error));
  //     })
  //     .catch(error => console.error('Error uploading image:', error));
  // });


    // edit button
    function editRow(event) {
        const button = event.target;
      const row = button.closest('tr');
      const userId = row.querySelector('td:first-child').textContent;
        fetch(`http://localhost:3000/festival/${userId}`)
          .then(response => response.json())
          .then(user => {
  
            const date = new Date();
  
            let currentDay = String(date.getDate()).padStart(2, '0');
            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
            let currentYear = date.getFullYear();
            let updated_at = `${currentDay}-${currentMonth}-${currentYear}`;
  
            editForm.elements.id.value = user.id;
            // editForm.elements.image.value = user.image;
            editForm.elements.title.value = user.title;
            editForm.elements.description.value = user.description;
            editForm.elements.date.value = user.date;
            editForm.elements.province.value = user.province;
            editForm.elements.city.value = user.city;
            editForm.elements.created_at.value = user.created_at;
            editForm.elements.updated_at.value = updated_at; 

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
        fetch(`http://localhost:3000/festival/${updatedUser.id}`, {
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
          .catch(error => console.error('Error updating item data:', error));
      });
  
  
    // Handle form submission and add new item
    addButton.addEventListener('click', () => {
        addEventModal.show();
    });
  
    addAccountButton.addEventListener('click', () => {
      const form = document.getElementById('add-user-form');
      const formData = new FormData(form);
      const imageFile = addForm.querySelector('input[type="file"]').files[0]; // Get the selected image file
      
      formData.delete('image'); // Remove the original image data from formData
      formData.append('image', imageFile.name); // Append the image file to formData

      const user = {};
      formData.forEach((value, key) => {
        user[key] = value;
      });

      var formData2 = new FormData();
      formData2.append('image', imageFile);
      
      fetch('/upload.php', {
          method: 'POST',
          body: formData2
      })
      .then(response => {
          if (response.ok) {
              return response.text();
          } else {
              throw new Error('Network response was not ok.');
          }
      })
      .then(responseText => {
          document.getElementById('result').innerHTML = responseText;
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
      
      const date = new Date();
  
      let currentDay = String(date.getDate()).padStart(2, '0');
  
      let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  
      let currentYear = date.getFullYear();
  
      let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
      user['created_at'] = currentDate;
  
      // Send POST request to JSON server
      fetch('http://localhost:3000/festival', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          form.reset();
          addEventModal.hide();
  
          populateTable();
        })
        .catch(error => console.error('Error adding item:', error));
    });
  
    // handle delete button
    function deleteRow(event) {
      const button = event.target;
      const row = button.closest('tr');
      const userId = row.querySelector('td:first-child').textContent;
  
      // Send DELETE request to JSON server
      fetch(`http://localhost:3000/festival/${userId}`, {
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
