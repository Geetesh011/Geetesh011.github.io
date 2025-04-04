src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
            
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("d-none");
    });
document.addEventListener("DOMContentLoaded", function () {

    var fromInput = document.querySelector('.search-form input[placeholder="From:"]');
    var toInput = document.querySelector('.search-form input[placeholder="To:"]');
    var departureInput = document.querySelector('.search-form input[placeholder="Departure"]');
    var returnInput = document.querySelector('.search-form input[placeholder="Return"]');
    var searchButton = document.querySelector('.nav-btn a');

    searchButton.addEventListener("click", function (event) {
        event.preventDefault(); 

        var fromLocation = fromInput.value.trim();
        var toLocation = toInput.value.trim();
        var departureDate = departureInput.value;
        var returnDate = returnInput.value;

        if (fromLocation === "" || toLocation === "" || departureDate === "") {
            alert("Please fill in the required fields: From, To, and Departure Date.");
            return;
        }
        window.location.href = "searchflights.html";
    });
});

