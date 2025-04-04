document.addEventListener("DOMContentLoaded", () => {

    const cities = [
        "New York",
        "London",
        "Tokyo",
        "Paris",
        "Dubai",
        "Singapore",
        "Hong Kong",
        "Bangkok",
        "Seoul",
        "Mumbai",
        "Delhi",
        "Chennai",
        "Kolkata",
        "Bangalore",
        "Hyderabad",
        "Sydney",
        "Melbourne",
        "Los Angeles",
        "San Francisco",
        "Chicago",
        "Toronto",
        "Vancouver",
        "Berlin",
        "Rome",
        "Madrid",
    ];

    
    const flights = [
        {
            id: 1,
            from: "Chennai",
            to: "Dubai",
            airline: "Emirates",
            flightNumber: "EK543",
            departureTime: "10:30 AM",
            arrivalTime: "1:45 PM",
            duration: "4h 15m",
            price: 32000,
            stops: "Non-stop",
        },
        {
            id: 2,
            from: "Chennai",
            to: "Dubai",
            airline: "Air India",
            flightNumber: "AI934",
            departureTime: "2:15 PM",
            arrivalTime: "5:45 PM",
            duration: "4h 30m",
            price: 28500,
            stops: "Non-stop",
        },
        {
            id: 3,
            from: "Chennai",
            to: "Dubai",
            airline: "IndiGo",
            flightNumber: "6E1402",
            departureTime: "11:45 PM",
            arrivalTime: "2:55 AM",
            duration: "4h 10m",
            price: 26000,
            stops: "Non-stop",
        },
        {
            id: 4,
            from: "Mumbai",
            to: "Delhi",
            airline: "IndiGo",
            flightNumber: "6E2135",
            departureTime: "6:15 AM",
            arrivalTime: "8:30 AM",
            duration: "2h 15m",
            price: 5600,
            stops: "Non-stop",
        },
        {
            id: 5,
            from: "Mumbai",
            to: "Delhi",
            airline: "Air India",
            flightNumber: "AI866",
            departureTime: "9:45 AM",
            arrivalTime: "12:00 PM",
            duration: "2h 15m",
            price: 6200,
            stops: "Non-stop",
        },
        {
            id: 6,
            from: "Bangalore",
            to: "Hyderabad",
            airline: "IndiGo",
            flightNumber: "6E6206",
            departureTime: "7:10 AM",
            arrivalTime: "8:25 AM",
            duration: "1h 15m",
            price: 3200,
            stops: "Non-stop",
        },
        {
            id: 7,
            from: "Delhi",
            to: "London",
            airline: "British Airways",
            flightNumber: "BA142",
            departureTime: "1:30 PM",
            arrivalTime: "7:30 PM",
            duration: "10h 00m",
            price: 58000,
            stops: "Non-stop",
        },
        {
            id: 8,
            from: "Delhi",
            to: "London",
            airline: "Air India",
            flightNumber: "AI161",
            departureTime: "2:15 AM",
            arrivalTime: "7:30 AM",
            duration: "9h 15m",
            price: 52000,
            stops: "Non-stop",
        },
    ];

    const fromCityInput = document.getElementById("fromCity");
    const toCityInput = document.getElementById("toCity");
    const fromSuggestions = document.getElementById("fromSuggestions");
    const toSuggestions = document.getElementById("toSuggestions");
    const searchBtn = document.getElementById("searchBtn");
    const flightResults = document.getElementById("flightResults");
    const noResults = document.getElementById("noResults");
    const resultsContainer = document.getElementById("resultsContainer");
    const swapIcon = document.querySelector(".swap-icon");

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("departDate").min = today;
    document.getElementById("returnDate").min = today;

    
    document.getElementById("fromCity").setAttribute("autocomplete", "off");
    document.getElementById("toCity").setAttribute("autocomplete", "off");

    
    fromCityInput.addEventListener("input", function () {
        showSuggestions(this.value, fromSuggestions, "from");
    });

    toCityInput.addEventListener("input", function () {
        showSuggestions(this.value, toSuggestions, "to");
    });

    
    document.addEventListener("click", (e) => {
        if (!fromCityInput.contains(e.target)) {
            fromSuggestions.style.display = "none";
        }
        if (!toCityInput.contains(e.target)) {
            toSuggestions.style.display = "none";
        }
    });

   
    swapIcon.addEventListener("click", () => {
        const temp = fromCityInput.value;
        fromCityInput.value = toCityInput.value;
        toCityInput.value = temp;
    });

   
    searchBtn.addEventListener("click", () => {
        searchFlights();
    });

    
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("d-none");
        mobileMenu.classList.toggle("d-block");
    });

    
    function showSuggestions(input, suggestionsElement, type) {
        
        suggestionsElement.innerHTML = "";

        if (input.length < 2) {
            suggestionsElement.style.display = "none";
            return;
        }

       
        const filteredCities = cities.filter((city) => city.toLowerCase().includes(input.toLowerCase()));

        if (filteredCities.length === 0) {
            suggestionsElement.style.display = "none";
            return;
        }

        
        filteredCities.forEach((city) => {
            const item = document.createElement("div");
            item.className = "suggestion-item";
            item.textContent = city;
            item.addEventListener("click", () => {
                if (type === "from") {
                    fromCityInput.value = city;
                } else {
                    toCityInput.value = city;
                }
                suggestionsElement.style.display = "none";
            });
            suggestionsElement.appendChild(item);
        });

        suggestionsElement.style.display = "block";
    }

   
    function searchFlights() {
        const fromCity = fromCityInput.value.trim();
        const toCity = toCityInput.value.trim();
        const departDate = document.getElementById("departDate").value;
        const returnDate = document.getElementById("returnDate").value;
        const passengers = document.getElementById("passengers").value;

        
        if (!fromCity || !toCity) {
            alert("Please enter both departure and destination cities.");
            return;
        }

        if (!departDate) {
            alert("Please select a departure date.");
            return;
        }
        if (!returnDate) {
            alert("Please select a return date.");
            return;
        }
        if (!passengers) {
            alert("Please select the number of passengers.");
            return;
        }

        
        const matchedFlights = flights.filter(
            (flight) =>
                flight.from.toLowerCase() === fromCity.toLowerCase() && flight.to.toLowerCase() === toCity.toLowerCase()
        );

       
        localStorage.setItem("searchParams", JSON.stringify({ fromCity, toCity, departDate, returnDate: "" }));
        localStorage.setItem("searchResults", JSON.stringify(matchedFlights));

       
        window.location.href = "flight-results.html";
    }

    
    function displayFlights(flights, departDate) {
        resultsContainer.innerHTML = "";

        flights.forEach((flight) => {
            
            const flightWithDate = {
                ...flight,
                departDate: departDate,
                passengers: document.getElementById("passengers").value,
            };

            const flightCard = document.createElement("div");
            flightCard.className = "flight-card";
            flightCard.innerHTML = `
                <div class="airline">
                    <div class="airline-name">${flight.airline}</div>
                    <div class="flight-number">${flight.flightNumber}</div>
                </div>
                <div class="flight-details">
                    <div class="flight-route">${flight.from} to ${flight.to}</div>
                    <div class="flight-time">${flight.departureTime} - ${flight.arrivalTime}</div>
                    <div class="flight-info">
                        <span><i class="fa-solid fa-clock"></i> ${flight.duration}</span>
                        <span><i class="fa-solid fa-plane"></i> ${flight.stops}</span>
                        <span><i class="fa-solid fa-calendar"></i> ${formatDate(departDate)}</span>
                    </div>
                </div>
                <div class="price-section">
                    <div class="flight-price">₹${flight.price}</div>
                    <button class="book-btn">Book Now</button>
                </div>
            `;
            resultsContainer.appendChild(flightCard);

            
            const bookBtn = flightCard.querySelector(".book-btn");
            bookBtn.addEventListener("click", () => {
                window.location.href = 'Cart.html';
            });
        });
    }

    
    function formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    }
});
document.getElementById('searchBtn').addEventListener('click', function (event) {
    event.preventDefault(); 
    const fromCity = document.getElementById('fromCity').value.trim();
    const toCity = document.getElementById('toCity').value.trim();
    const departDate = document.getElementById('departDate').value.trim();
    const returnDate = document.getElementById('returnDate').value.trim();
    const passengers = document.getElementById('passengers').value;

    if (!fromCity || !toCity || !departDate || !returnDate || passengers === "") {
        alert('Please fill in all required fields: From, To, Depart Date, Return Date, and Passengers.');
    } else {
        
        window.location.href = 'flight-results.html';
    }
});
