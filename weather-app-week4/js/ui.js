class WeatherUI {

    constructor() {

        // =========================
        // DOM ELEMENTS
        // =========================

        this.currentWeather =
            document.getElementById("currentWeather");

        this.weatherDetails =
            document.getElementById("weatherDetails");

        this.forecastSection =
            document.getElementById("forecastSection");

        this.forecast =
            document.getElementById("forecast");

        this.favoriteCities =
            document.getElementById("favorites");

        this.searchHistory =
            document.getElementById("searchHistory");

        this.searchInput =
            document.getElementById("searchInput");


        // Weather detail elements

        this.humidity =
            document.getElementById("humidity");

        this.windSpeed =
            document.getElementById("windSpeed");

        this.feelsLike =
            document.getElementById("feelsLike");

        this.pressure =
            document.getElementById("pressure");

        this.visibility =
            document.getElementById("visibility");

        this.sunrise =
            document.getElementById("sunrise");


        // =========================
        // DATA
        // =========================

        this.currentWeatherData = null;

        this.currentForecastData = null;

        this.unit = "C";
    }


    // =====================================
    // TEMPERATURE
    // =====================================

    convertTemperature(temp) {

        if (this.unit === "C") {

            return Math.round(temp);
        }

        return Math.round(
            (temp * 9 / 5) + 32
        );
    }


    getUnitSymbol() {

        return this.unit === "C"
            ? "°C"
            : "°F";
    }


    // =====================================
    // WEATHER EMOJI
    // =====================================

    getWeatherEmoji(condition) {

        const main =
            condition.toLowerCase();


        if (main.includes("thunderstorm")) {

            return "⛈️";
        }


        if (main.includes("drizzle")) {

            return "🌦️";
        }


        if (main.includes("rain")) {

            return "🌧️";
        }


        if (main.includes("snow")) {

            return "❄️";
        }


        if (
            main.includes("mist") ||
            main.includes("fog") ||
            main.includes("haze") ||
            main.includes("smoke")
        ) {

            return "🌫️";
        }


        if (main.includes("clear")) {

            return "☀️";
        }


        if (main.includes("cloud")) {

            return "☁️";
        }


        return "🌤️";
    }


    // =====================================
    // CURRENT WEATHER
    // =====================================

    displayCurrentWeather(data) {

        this.currentWeatherData = data;


        if (!this.currentWeather) {

            return;
        }


        const weather =
            data.weather[0];


        const temperature =
            this.convertTemperature(
                data.main.temp
            );


        const feelsLike =
            this.convertTemperature(
                data.main.feels_like
            );


        const icon =
            this.getWeatherEmoji(
                weather.main
            );


        const isFavorite =
            storageManager.isFavorite(
                data.name
            );


        const currentDate =
            new Date().toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );


        // =========================
        // CURRENT WEATHER CARD
        // =========================

        this.currentWeather.innerHTML = `

            <div class="weather-location">

                <div>

                    <h2 class="weather-city">
                        📍 ${data.name}, ${data.sys.country}
                    </h2>

                    <p class="weather-date">
                        ${currentDate}
                    </p>

                </div>


                <button
                    id="favoriteBtn"
                    class="favorite-button"
                    title="Add to favorites"
                >
                    ${isFavorite ? "⭐" : "☆"}
                </button>

            </div>


            <div class="weather-main">

                <div>

                    <div class="temperature">
                        ${temperature}${this.getUnitSymbol()}
                    </div>

                    <p class="weather-date">
                        Feels like
                        ${feelsLike}${this.getUnitSymbol()}
                    </p>

                </div>


                <div class="weather-condition">

                    <div class="weather-icon">
                        ${icon}
                    </div>

                    <p class="condition-text">
                        ${weather.description}
                    </p>

                </div>

            </div>

        `;


        // =========================
        // FAVORITE BUTTON EVENT
        // =========================

        const favoriteBtn =
            document.getElementById(
                "favoriteBtn"
            );


        if (favoriteBtn) {

            favoriteBtn.addEventListener(
                "click",
                () => {

                    this.toggleFavorite(
                        data.name
                    );

                }
            );
        }


        // Update weather details

        this.displayWeatherDetails(
            data
        );
    }


    // =====================================
    // WEATHER DETAILS
    // =====================================

    displayWeatherDetails(data) {

        if (
            !this.weatherDetails
        ) {

            return;
        }


        // Show section

        this.weatherDetails.classList.remove(
            "hidden"
        );


        if (this.humidity) {

            this.humidity.textContent =
                `${data.main.humidity}%`;
        }


        if (this.windSpeed) {

            this.windSpeed.textContent =
                `${data.wind.speed} m/s`;
        }


        if (this.feelsLike) {

            const feels =
                this.convertTemperature(
                    data.main.feels_like
                );

            this.feelsLike.textContent =
                `${feels}${this.getUnitSymbol()}`;
        }


        if (this.pressure) {

            this.pressure.textContent =
                `${data.main.pressure} hPa`;
        }


        if (this.visibility) {

            const visibility =
                data.visibility
                    ? (
                        data.visibility / 1000
                    ).toFixed(1)
                    : "N/A";

            this.visibility.textContent =
                `${visibility} km`;
        }


        if (this.sunrise) {

            const sunriseTime =
                new Date(
                    data.sys.sunrise * 1000
                ).toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );

            this.sunrise.textContent =
                sunriseTime;
        }
    }


    // =====================================
    // FORECAST
    // =====================================

    displayForecast(data) {

        this.currentForecastData = data;


        if (!this.forecast) {

            return;
        }


        if (this.forecastSection) {

            this.forecastSection.classList.remove(
                "hidden"
            );
        }


        const dailyData = {};


        data.list.forEach(item => {

            const date =
                new Date(
                    item.dt * 1000
                );


            const dateKey =
                date.toDateString();


            /*
               Har day ka ek representative
               forecast item store karenge
            */

            if (!dailyData[dateKey]) {

                dailyData[dateKey] =
                    item;
            }

        });


        // Get maximum 5 days

        const days =
            Object.values(
                dailyData
            ).slice(0, 5);


        let html = "";


        days.forEach(day => {

            const date =
                new Date(
                    day.dt * 1000
                );


            const dayName =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                );


            const icon =
                this.getWeatherEmoji(
                    day.weather[0].main
                );


            const temp =
                this.convertTemperature(
                    day.main.temp
                );


            html += `

                <div class="forecast-day">

                    <div class="day-name">
                        ${dayName}
                    </div>


                    <div class="forecast-icon">
                        ${icon}
                    </div>


                    <div class="forecast-temp">

                        <span class="temp-max">

                            ${temp}${this.getUnitSymbol()}

                        </span>

                    </div>


                    <p class="forecast-condition">

                        ${day.weather[0].description}

                    </p>

                </div>

            `;
        });


        this.forecast.innerHTML =
            html;
    }


    // =====================================
    // FAVORITES
    // =====================================

    displayFavorites() {

        if (!this.favoriteCities) {

            return;
        }


        const favorites =
            storageManager.getFavorites();


        // Empty favorites

        if (favorites.length === 0) {

            this.favoriteCities.innerHTML = `

                <p class="empty-message">
                    No favorite cities added yet.
                </p>

            `;

            return;
        }


        let html = "";


        favorites.forEach(city => {

            html += `

                <button
                    class="favorite-city"
                    data-city="${city}"
                >

                    📍 ${city}

                    <span
                        class="remove-city"
                        data-remove="${city}"
                    >
                        ×
                    </span>

                </button>

            `;
        });


        this.favoriteCities.innerHTML =
            html;


        // =========================
        // CLICK FAVORITE CITY
        // =========================

        document
            .querySelectorAll(
                ".favorite-city"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    (event) => {

                        // If remove button clicked

                        if (
                            event.target.classList.contains(
                                "remove-city"
                            )
                        ) {

                            return;
                        }


                        const city =
                            button.dataset.city;


                        window.searchCity(
                            city
                        );

                    }
                );

            });


        // =========================
        // REMOVE FAVORITE
        // =========================

        document
            .querySelectorAll(
                ".remove-city"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();


                        const city =
                            button.dataset.remove;


                        storageManager.removeFavorite(
                            city
                        );


                        this.displayFavorites();

                    }
                );

            });
    }


    // =====================================
    // TOGGLE FAVORITE
    // =====================================

    toggleFavorite(city) {

        if (
            storageManager.isFavorite(
                city
            )
        ) {

            storageManager.removeFavorite(
                city
            );

        } else {

            storageManager.addFavorite(
                city
            );
        }


        // Refresh favorites

        this.displayFavorites();


        // Refresh current weather button

        if (
            this.currentWeatherData
        ) {

            this.displayCurrentWeather(
                this.currentWeatherData
            );
        }
    }


    // =====================================
    // SEARCH HISTORY
    // =====================================

    displaySearchHistory() {

        if (!this.searchHistory) {

            return;
        }


        const history =
            storageManager.getSearchHistory();


        // Empty history

        if (history.length === 0) {

            this.searchHistory.innerHTML = `

                <p class="empty-message">
                    No recent searches.
                </p>

            `;

            return;
        }


        let html = "";


        history.forEach(city => {

            html += `

                <button
                    class="history-city"
                    data-city="${city}"
                >

                    🕒 ${city}

                </button>

            `;
        });


        this.searchHistory.innerHTML =
            html;


        // Click history city

        document
            .querySelectorAll(
                ".history-city"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const city =
                            button.dataset.city;


                        window.searchCity(
                            city
                        );

                    }
                );

            });
    }


    // =====================================
    // CLEAR SEARCH HISTORY
    // =====================================

    clearSearchHistory() {

        storageManager.clearSearchHistory();

        this.displaySearchHistory();
    }


    // =====================================
    // LOADING
    // =====================================

    showLoading() {

        if (this.currentWeather) {

            this.currentWeather.innerHTML = `

                <div class="default-weather">

                    <div class="loader"></div>

                    <h2>
                        Loading weather data...
                    </h2>

                    <p>
                        Please wait while we fetch
                        the latest weather information.
                    </p>

                </div>

            `;
        }


        // Hide old sections while loading

        if (this.weatherDetails) {

            this.weatherDetails.classList.add(
                "hidden"
            );
        }


        if (this.forecastSection) {

            this.forecastSection.classList.add(
                "hidden"
            );
        }
    }


    // =====================================
    // ERROR
    // =====================================

    showError(message) {

        if (!this.currentWeather) {

            return;
        }


        this.currentWeather.innerHTML = `

            <div class="default-weather">

                <div class="error-icon">
                    ⚠️
                </div>

                <h2>
                    Something went wrong
                </h2>

                <p>
                    ${message}
                </p>

            </div>

        `;


        if (this.weatherDetails) {

            this.weatherDetails.classList.add(
                "hidden"
            );
        }


        if (this.forecastSection) {

            this.forecastSection.classList.add(
                "hidden"
            );
        }
    }


    // =====================================
    // UNIT TOGGLE
    // =====================================

    toggleUnit() {

        this.unit =
            this.unit === "C"
                ? "F"
                : "C";


        // Update current weather

        if (
            this.currentWeatherData
        ) {

            this.displayCurrentWeather(
                this.currentWeatherData
            );
        }


        // Update forecast

        if (
            this.currentForecastData
        ) {

            this.displayForecast(
                this.currentForecastData
            );
        }


        return this.unit;
    }

}


// =====================================
// GLOBAL WEATHER UI OBJECT
// =====================================

const weatherUI =
    new WeatherUI();