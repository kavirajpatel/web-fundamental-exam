 
 let data; // Define data globally

 // Function to send a GET request to fetch orders from the API
 function fetchOrders() {
   fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
     .then((response) => response.json())
     .then((responseData) => {
       data = responseData; // Assign fetched data to the global variable
       updateOrdersTable(data); // Initially load all orders
     })
     .catch((error) => {
       console.error('Error fetching orders:', error);
     });
 }
 
 // Function to filter orders based on checkbox selections
 function filterOrders() {
   const filterCheckboxes = document.querySelectorAll('.ordre-FilterCheckbox input[type="checkbox"]');
   const selectedFilters = Array.from(filterCheckboxes)
     .filter((checkbox) => checkbox.checked)
     .map((checkbox) => checkbox.name.replace('orders-', ''));
 
   if (selectedFilters.length === 0) {
     return data; // If no filters are selected, return all orders
   }
 
   const filteredOrders = data.filter((order) => selectedFilters.includes(order.orderStatus));
   
   return filteredOrders;
 }
 
 // Function to update the orders table
 function updateOrdersTable(orders) {
   const ordersTableBody = document.getElementById('ordersTableBody');
   const orderCount = document.getElementById('orderCount');
   orderCount.textContent = orders.length; // Update order count
 
   // Clear the table body
   ordersTableBody.innerHTML = '';
 
   // Loop through the orders and create table rows
   orders.forEach((order) => {
     const row = document.createElement('tr');
     row.innerHTML = `
       <td class="orders-id-color">${order.id}</td>
       <td class="orders-id-color-black">${order.customerName}</td>
       <td class="orders-id-color-black">${order.orderDate}</td>
       <td class="orders-id-color">${order.amount}</td>
       <td class="orders-id-color-black">${order.orderStatus}</td>
     `;
 
     ordersTableBody.appendChild(row);
   });
 }
 
 // Function to handle checkbox filters
 function handleFilters() {
   const filterCheckboxes = document.querySelectorAll('.ordre-FilterCheckbox input[type="checkbox"]');
   filterCheckboxes.forEach((checkbox) => {
     checkbox.addEventListener('change', () => {
       const filteredOrders = filterOrders(); // Apply filtering
       updateOrdersTable(filteredOrders);
     });
   });
 }
 
 // Initial load: Fetch orders and set up filter event listeners
 fetchOrders();
 handleFilters();