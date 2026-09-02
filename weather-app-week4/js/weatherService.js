class WeatherService {

    constructor() {

        this.apiKey = CONFIG.API_KEY;

        this.baseUrl = CONFIG.BASE_URL;

        // Cache valid for 10 minutes
        this.cacheDuration = 10 * 60 * 1000;
    }


    // =====================================
    // VALIDATE API KEY
    // =====================================

    validateApiKey() {

        if (
            !this.apiKey ||
            this.apiKey.trim() === "" ||
            this.apiKey === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE"
        ) {

            throw new Error(
                "Please add your OpenWeather API Key in config.js"
            );
        }
    }


    // =====================================
    // GET CURRENT WEATHER BY CITY
    // =====================================

    async getCurrentWeather(city) {

        this.validateApiKey();

        const cleanCity = city.trim();

        const cacheKey =
            `weather_current_${cleanCity.toLowerCase()}`;

        const cachedData =
            this.getFromCache(cacheKey);

        if (cachedData) {

            console.log(
                "Current weather loaded from cache"
            );

            return cachedData;
        }


        const url =
            `${this.baseUrl}/weather` +
            `?q=${encodeURIComponent(cleanCity)}` +
            `&appid=${this.apiKey}` +
            `&units=metric`;


        try {

            const response =
                await fetch(url);


            if (!response.ok) {

                if (response.status === 404) {

                    throw new Error(
                        "City not found. Please try again."
                    );
                }


                if (response.status === 401) {

                    throw new Error(
                        "Invalid API Key. Please check config.js"
                    );
                }


                throw new Error(
                    `Weather API Error: ${response.status}`
                );
            }


            const data =
                await response.json();


            this.saveToCache(
                cacheKey,
                data
            );


            return data;

        } catch (error) {

            console.error(
                "Current Weather Error:",
                error
            );

            throw error;
        }
    }


    // =====================================
    // GET 5 DAY FORECAST BY CITY
    // =====================================

    async getForecast(city) {

        this.validateApiKey();

        const cleanCity = city.trim();

        const cacheKey =
            `weather_forecast_${cleanCity.toLowerCase()}`;

        const cachedData =
            this.getFromCache(cacheKey);


        if (cachedData) {

            console.log(
                "Forecast loaded from cache"
            );

            return cachedData;
        }


        const url =
            `${this.baseUrl}/forecast` +
            `?q=${encodeURIComponent(cleanCity)}` +
            `&appid=${this.apiKey}` +
            `&units=metric`;


        try {

            const response =
                await fetch(url);


            if (!response.ok) {

                if (response.status === 404) {

                    throw new Error(
                        "Forecast not found for this city."
                    );
                }


                if (response.status === 401) {

                    throw new Error(
                        "Invalid API Key. Please check config.js"
                    );
                }


                throw new Error(
                    "Unable to load forecast data."
                );
            }


            const data =
                await response.json();


            this.saveToCache(
                cacheKey,
                data
            );


            return data;

        } catch (error) {

            console.error(
                "Forecast Error:",
                error
            );

            throw error;
        }
    }


    // =====================================
    // GET WEATHER BY COORDINATES
    // =====================================

    async getWeatherByCoordinates(lat, lon) {

        this.validateApiKey();


        const url =
            `${this.baseUrl}/weather` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&appid=${this.apiKey}` +
            `&units=metric`;


        try {

            const response =
                await fetch(url);


            if (!response.ok) {

                if (response.status === 401) {

                    throw new Error(
                        "Invalid API Key. Please check config.js"
                    );
                }


                throw new Error(
                    "Unable to get weather for your location."
                );
            }


            return await response.json();

        } catch (error) {

            console.error(
                "Location Weather Error:",
                error
            );

            throw error;
        }
    }


    // =====================================
    // GET FORECAST BY COORDINATES
    // =====================================

    async getForecastByCoordinates(lat, lon) {

        this.validateApiKey();


        const url =
            `${this.baseUrl}/forecast` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&appid=${this.apiKey}` +
            `&units=metric`;


        try {

            const response =
                await fetch(url);


            if (!response.ok) {

                if (response.status === 401) {

                    throw new Error(
                        "Invalid API Key. Please check config.js"
                    );
                }


                throw new Error(
                    "Unable to get forecast for your location."
                );
            }


            return await response.json();

        } catch (error) {

            console.error(
                "Location Forecast Error:",
                error
            );

            throw error;
        }
    }


    // =====================================
    // SAVE DATA TO CACHE
    // =====================================

    saveToCache(key, data) {

        try {

            const cacheData = {

                timestamp: Date.now(),

                data: data
            };


            localStorage.setItem(
                key,
                JSON.stringify(cacheData)
            );

        } catch (error) {

            console.warn(
                "Unable to save cache:",
                error
            );
        }
    }


    // =====================================
    // GET DATA FROM CACHE
    // =====================================

    getFromCache(key) {

        try {

            const cached =
                localStorage.getItem(key);


            if (!cached) {

                return null;
            }


            const cacheData =
                JSON.parse(cached);


            // Check cache structure
            if (
                !cacheData.timestamp ||
                !cacheData.data
            ) {

                localStorage.removeItem(key);

                return null;
            }


            const isValid =

                Date.now() -
                cacheData.timestamp
                <
                this.cacheDuration;


            if (isValid) {

                return cacheData.data;
            }


            // Remove expired cache
            localStorage.removeItem(key);


            return null;

        } catch (error) {

            console.warn(
                "Cache Error:",
                error
            );

            return null;
        }
    }


    // =====================================
    // CLEAR WEATHER CACHE
    // =====================================

    clearCache() {

        const keys = [];


        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);


            if (
                key &&
                key.startsWith("weather_")
            ) {

                keys.push(key);
            }
        }


        keys.forEach(key => {

            localStorage.removeItem(key);

        });


        console.log(
            "Weather cache cleared"
        );
    }

}


const weatherService =
    new WeatherService();