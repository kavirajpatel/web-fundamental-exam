// Define the API endpoint for product data
const apiUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";

// Get references to HTML elements where we will display the product data and total count
const productData = document.getElementById("productData");
const totalCountDisplay = document.getElementById("displayedItemCount");

// Function to populate the product table based on data
function populateTable(data) {
    productData.innerHTML = ""; // Clear existing rows in the product table
    let totalCount = 0; // Initialize a variable to count displayed products

    // Loop through each product in the data
    data.forEach(product => {
        // Check if the product is expired by comparing its expiry date with the current date
        const isExpired = new Date(product.expiryDate) < new Date();

        // Check if the product is low in stock
        const isLowStock = product.stock < 100;

        // Check if the product should be displayed based on filters
        if (
            (document.getElementById("expiredFilter").checked && isExpired) ||
            (document.getElementById("lowStockFilter").checked && isLowStock)
        ) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="greycolor">${product.id}</td>
                <td class="${isExpired ? "expired-color" : ""}">${product.medicineName}</td>
                <td class="greycolor">${product.medicineBrand}</td>
                <td class="${isExpired ? "expired-color" : ""}">${product.expiryDate}</td>
                <td class="greycolor">${product.unitPrice}</td>
                <td class="greycolor">${product.stock}</td>
            `;

            productData.appendChild(row); // Append the row to the product table
            totalCount++; // Increment the displayed product count
        }
    });

    totalCountDisplay.innerText = totalCount; // Update the total count display
}

// Function to handle filter changes
function handleFilterChange() {
    fetch(apiUrl) // Fetch product data from the API
        .then(response => response.json())
        .then(data => {
            populateTable(data); // Call the populateTable function with the fetched data
        })
        .catch(error => console.error("Error fetching product data:", error));
}

// Attach filter change event listeners
document.getElementById("expiredFilter").addEventListener("change", handleFilterChange);
document.getElementById("lowStockFilter").addEventListener("change", handleFilterChange);

// Load product data on page load
fetch(apiUrl) // Fetch initial product data when the page loads
    .then(response => response.json())
    .then(data => {
        populateTable(data); // Call the populateTable function with the fetched data
    })
    .catch(error => console.error("Error fetching product data:", error));