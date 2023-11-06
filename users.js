// When the document is ready, execute the following code
$(document).ready(function () {
    // Define the API endpoint for fetching user data
    const apiUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";
    // Create an empty array to store user data
    let usersData = [];

    // Function to fetch users and populate the table
    function fetchUsers() {
        // Make an AJAX GET request to the API endpoint
        $.get(apiUrl, function (data) {
            // Store the fetched user data in the 'usersData' array
            usersData = data;
            // Call the 'updateTable' function to populate the table with user data
            updateTable(usersData);
        });
    }

    // Function to update the table with user data
    function updateTable(data) {
        // Get the table body element by its ID
        const usersTable = $("#usersTableBody");
        // Clear the existing table contents
        usersTable.empty();

        // Iterate through each user in the 'data' array
        data.forEach(user => {
            // Create a new table row element
            const row = $("<tr></tr>");
            // Populate the row with user data
            row.html(`
                <td>${user.id}</td>
                <td><img src="${user.profilePic}" alt="User Avatar"></td>
                <td>${user.fullName}</td>
                <td class="doB-User">${user.dob}</td>
                <td>${user.gender}</td>
                <td>${user.currentCity}, ${user.currentCountry}</td>
            `);
            // Append the row to the table
            usersTable.append(row);
        });
    }

    // Initial load of users when the document is ready
    fetchUsers();

    // Search functionality
    $("#searchInput").on("input", function () {
        // Get the search input value and trim any extra spaces
        const searchValue = $(this).val().trim().toLowerCase();

        // Check if the search value has at least 2 characters
        if (searchValue.length < 2) {
            // Display an alert if the input is too short
            alert("Please enter at least 2 characters");
        } else {
            // Filter users whose names include the search value and update the table
            const searchResults = usersData.filter(user => user.fullName.toLowerCase().includes(searchValue));
            updateTable(searchResults);
        }
    });

    // Reset button functionality
    $("#resetButton").on("click", function () {
        // Clear the search input field
        $("#searchInput").val("");
        // Update the table with the original user data
        updateTable(usersData);
    });
});