class StorageManager {

    constructor() {

        // =========================
        // STORAGE KEYS
        // =========================

        this.FAVORITES_KEY =
            "weather_favorite_cities";

        this.THEME_KEY =
            "weather_theme";

        this.LAST_CITY_KEY =
            "weather_last_city";

        this.HISTORY_KEY =
            "weather_search_history";

        this.MAX_HISTORY =
            8;
    }


    // =========================
    // FAVORITE CITIES
    // =========================

    getFavorites() {

        try {

            const favorites =
                localStorage.getItem(
                    this.FAVORITES_KEY
                );

            return favorites
                ? JSON.parse(favorites)
                : [];

        } catch (error) {

            console.error(
                "Error loading favorites:",
                error
            );

            return [];
        }
    }


    saveFavorites(favorites) {

        try {

            localStorage.setItem(
                this.FAVORITES_KEY,
                JSON.stringify(favorites)
            );

        } catch (error) {

            console.error(
                "Error saving favorites:",
                error
            );
        }
    }


    addFavorite(city) {

        const favorites =
            this.getFavorites();

        const exists =
            favorites.some(
                item =>
                    item.toLowerCase() ===
                    city.toLowerCase()
            );


        if (!exists) {

            favorites.push(city);

            this.saveFavorites(
                favorites
            );
        }


        return favorites;
    }


    removeFavorite(city) {

        let favorites =
            this.getFavorites();


        favorites =
            favorites.filter(
                item =>
                    item.toLowerCase() !==
                    city.toLowerCase()
            );


        this.saveFavorites(
            favorites
        );


        return favorites;
    }


    isFavorite(city) {

        return this.getFavorites().some(
            item =>
                item.toLowerCase() ===
                city.toLowerCase()
        );
    }


    // =========================
    // SEARCH HISTORY
    // =========================

    getSearchHistory() {

        try {

            const history =
                localStorage.getItem(
                    this.HISTORY_KEY
                );


            return history
                ? JSON.parse(history)
                : [];

        } catch (error) {

            console.error(
                "Error loading search history:",
                error
            );

            return [];
        }
    }


    saveSearchHistory(history) {

        try {

            localStorage.setItem(
                this.HISTORY_KEY,
                JSON.stringify(history)
            );

        } catch (error) {

            console.error(
                "Error saving search history:",
                error
            );
        }
    }


    addSearchHistory(city) {

        let history =
            this.getSearchHistory();


        // Remove duplicate city

        history =
            history.filter(
                item =>
                    item.toLowerCase() !==
                    city.toLowerCase()
            );


        // Add latest city at beginning

        history.unshift(city);


        // Keep only latest cities

        history =
            history.slice(
                0,
                this.MAX_HISTORY
            );


        this.saveSearchHistory(
            history
        );


        return history;
    }


    clearSearchHistory() {

        try {

            localStorage.removeItem(
                this.HISTORY_KEY
            );

        } catch (error) {

            console.error(
                "Error clearing search history:",
                error
            );
        }

    }


    // =========================
    // THEME
    // =========================

    saveTheme(theme) {

        localStorage.setItem(
            this.THEME_KEY,
            theme
        );
    }


    getTheme() {

        return localStorage.getItem(
            this.THEME_KEY
        ) || "light";
    }


    // =========================
    // LAST SEARCHED CITY
    // =========================

    saveLastCity(city) {

        localStorage.setItem(
            this.LAST_CITY_KEY,
            city
        );
    }


    getLastCity() {

        return localStorage.getItem(
            this.LAST_CITY_KEY
        );
    }

}


// =========================
// GLOBAL STORAGE OBJECT
// =========================

const storageManager =
    new StorageManager();