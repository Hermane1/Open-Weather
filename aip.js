document.getElementById('zipForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const zipCode = document.getElementById('zipCode').value;
    const apiKey = 'ddb23d8efc42d8d2d4b9154da05f3830';   
    
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            const { lat, lon } = data;
            const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

            return fetch(oneCallUrl);
        })
        .then(response => response.json())
        .then(data => {
            const weatherDisplay = document.getElementById('weatherDisplay');
            const city = data.timezone.split('/')[1].replace('_', ' '); // Extract city from timezone
            weatherDisplay.innerHTML = `
                <h4 class="mb-0">${city}</h4>
                <p class="display-2 my-3">${data.current.temp}°F</p>
                <p class="mb-2">Feels Like: <strong>${data.current.feels_like}°F</strong></p>
                <h5>${data.current.weather[0].description}</h5>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
