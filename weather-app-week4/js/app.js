document.addEventListener("DOMContentLoaded", () => {

    console.log("Weather Application Started");

    initializeApp();

});


// =====================================
// INITIALIZE APPLICATION
// =====================================

function initializeApp() {

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");

    const locationButton =
        document.getElementById("locationButton");

    const unitButton =
        document.getElementById("unitToggle");

    const themeButton =
        document.getElementById("themeToggle");

    const clearHistoryButton =
        document.getElementById("clearHistory");


    // =====================================
    // LOAD SAVED THEME
    // =====================================

    loadTheme();


    // =====================================
    // DISPLAY SAVED DATA
    // =====================================

    weatherUI.displayFavorites();

    weatherUI.displaySearchHistory();


    // =====================================
    // SEARCH BUTTON
    // =====================================

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const city =
                    searchInput.value.trim();


                if (!city) {

                    weatherUI.showError(
                        "Please enter a city name."
                    );

                    return;
                }


                searchCity(city);

            }
        );
    }


    // =====================================
    // ENTER KEY SEARCH
    // =====================================

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    const city =
                        searchInput.value.trim();


                    if (!city) {

                        weatherUI.showError(
                            "Please enter a city name."
                        );

                        return;
                    }


                    searchCity(city);

                }

            }
        );
    }


    // =====================================
    // LOCATION BUTTON
    // =====================================

    if (locationButton) {

        locationButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                getUserLocation();

            }
        );
    }


    // =====================================
    // UNIT TOGGLE
    // =====================================

    if (unitButton) {

        unitButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const unit =
                    weatherUI.toggleUnit();


                unitButton.textContent =
                    unit === "C"
                        ? "°C"
                        : "°F";

            }
        );
    }


    // =====================================
    // THEME TOGGLE
    // =====================================

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                toggleTheme();

            }
        );
    }


    // =====================================
    // CLEAR SEARCH HISTORY
    // =====================================

    if (clearHistoryButton) {

        clearHistoryButton.addEventListener(
            "click",
            () => {

                weatherUI.clearSearchHistory();

            }
        );
    }


    // =====================================
    // LOAD LAST CITY
    // =====================================

    const lastCity =
        storageManager.getLastCity();


    if (lastCity) {

        console.log(
            "Loading last searched city:",
            lastCity
        );


        searchCity(
            lastCity,
            false
        );

    } else {

        // Default city

        searchCity(
            "Delhi",
            false
        );
    }

}


// =====================================
// SEARCH CITY
// =====================================

async function searchCity(
    city,
    addToHistory = true
) {

    const searchInput =
        document.getElementById("searchInput");


    // Remove extra spaces

    city =
        city.trim();


    if (!city) {

        return;
    }


    console.log(
        "Searching for city:",
        city
    );


    try {

        // =====================================
        // SHOW LOADING
        // =====================================

        weatherUI.showLoading();


        // =====================================
        // GET CURRENT WEATHER
        // =====================================

        const currentWeather =
            await weatherService.getCurrentWeather(
                city
            );


        // =====================================
        // GET FORECAST
        // =====================================

        const forecast =
            await weatherService.getForecast(
                currentWeather.name
            );


        // =====================================
        // DISPLAY CURRENT WEATHER
        // =====================================

        weatherUI.displayCurrentWeather(
            currentWeather
        );


        // =====================================
        // DISPLAY FORECAST
        // =====================================

        weatherUI.displayForecast(
            forecast
        );


        // =====================================
        // SAVE LAST CITY
        // =====================================

        storageManager.saveLastCity(
            currentWeather.name
        );


        // =====================================
        // ADD TO RECENT SEARCH HISTORY ⭐
        // =====================================

        if (addToHistory) {

            storageManager.addSearchHistory(
                currentWeather.name
            );


            weatherUI.displaySearchHistory();

        }


        // =====================================
        // UPDATE SEARCH INPUT
        // =====================================

        if (searchInput) {

            searchInput.value =
                currentWeather.name;
        }


        console.log(
            "Weather loaded successfully:",
            currentWeather.name
        );


    } catch (error) {

        console.error(
            "Search Error:",
            error
        );


        weatherUI.showError(
            error.message ||
            "Unable to load weather data."
        );

    }

}


// =====================================
// MAKE SEARCH FUNCTION GLOBAL
// =====================================

window.searchCity =
    searchCity;



// =====================================
// GET USER LOCATION
// =====================================

function getUserLocation() {

    if (!navigator.geolocation) {

        weatherUI.showError(
            "Geolocation is not supported by your browser."
        );

        return;
    }


    weatherUI.showLoading();


    navigator.geolocation.getCurrentPosition(

        // =====================================
        // SUCCESS
        // =====================================

        async (position) => {

            try {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                console.log(
                    "Location:",
                    latitude,
                    longitude
                );


                // =====================================
                // GET CURRENT WEATHER
                // =====================================

                const currentWeather =
                    await weatherService
                        .getWeatherByCoordinates(
                            latitude,
                            longitude
                        );


                // =====================================
                // GET FORECAST
                // =====================================

                const forecast =
                    await weatherService
                        .getForecastByCoordinates(
                            latitude,
                            longitude
                        );


                // =====================================
                // DISPLAY WEATHER
                // =====================================

                weatherUI.displayCurrentWeather(
                    currentWeather
                );


                weatherUI.displayForecast(
                    forecast
                );


                // =====================================
                // SAVE LAST CITY
                // =====================================

                storageManager.saveLastCity(
                    currentWeather.name
                );


                // =====================================
                // ADD LOCATION CITY TO HISTORY ⭐
                // =====================================

                storageManager.addSearchHistory(
                    currentWeather.name
                );


                weatherUI.displaySearchHistory();


                // =====================================
                // UPDATE SEARCH INPUT
                // =====================================

                const searchInput =
                    document.getElementById(
                        "searchInput"
                    );


                if (searchInput) {

                    searchInput.value =
                        currentWeather.name;

                }


                console.log(
                    "Location weather loaded:",
                    currentWeather.name
                );


            } catch (error) {

                console.error(
                    "Location Weather Error:",
                    error
                );


                weatherUI.showError(
                    error.message ||
                    "Unable to get weather for your location."
                );

            }

        },


        // =====================================
        // ERROR
        // =====================================

        (error) => {

            console.error(
                "Location Error:",
                error
            );


            let message =
                "Unable to access your location.";


            if (error.code === 1) {

                message =
                    "Location permission denied. Please allow location access.";

            }

            else if (error.code === 2) {

                message =
                    "Location information is unavailable.";

            }

            else if (error.code === 3) {

                message =
                    "Location request timed out.";

            }


            weatherUI.showError(
                message
            );

        },

        // =====================================
        // GEOLOCATION OPTIONS
        // =====================================

        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 300000
        }

    );

}



// =====================================
// DARK MODE
// =====================================

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    const theme =
        isDark
            ? "dark"
            : "light";


    // Save theme

    storageManager.saveTheme(
        theme
    );


    // Update button

    updateThemeButton(
        theme
    );

}



// =====================================
// LOAD SAVED THEME
// =====================================

function loadTheme() {

    const theme =
        storageManager.getTheme();


    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

    }


    updateThemeButton(
        theme
    );

}



// =====================================
// UPDATE THEME BUTTON
// =====================================

function updateThemeButton(theme) {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );


    if (!themeButton) {

        return;
    }


    if (theme === "dark") {

        themeButton.textContent =
            "☀️";


        themeButton.title =
            "Switch to Light Mode";

    } else {

        themeButton.textContent =
            "🌙";


        themeButton.title =
            "Switch to Dark Mode";

    }

}