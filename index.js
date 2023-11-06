function login(event) {
    event.preventDefault(); // Prevent the form from submitting (stops the form from reloading the page)

    // Get the values of the username and password fields from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the provided username and password match the expected values (in this case, "qaifi" and "qaifi")
    if (username === "qaifi" && password === "qaifi") {
        alert("Login Successful"); // Display an alert indicating a successful login
        window.location.href = "orders.html"; // Redirect to the orders.html page
    } else {
        alert("Please enter valid credentials!"); // Display an alert indicating invalid credentials
    }
}