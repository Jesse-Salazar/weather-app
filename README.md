**Weather App** is a simple and interactive tool that allows users to check the current weather for any city, state (optional), and country. The app leverages the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to convert user input into geographic coordinates, and then retrieves real-time weather data using the [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs). Results are displayed with the temperature in Fahrenheit, a concise weather description, and a fun statement tailored to the current conditions.

You can use Weather App either from the Node.js terminal or through a browser interface.

---

## Features

- **Flexible Location Input:** Enter any city, state (optional), and country.
- **Real-Time Weather:** Fetches up-to-date weather data for your chosen location.
- **User-Friendly Output:** Displays temperature in Fahrenheit, weather conditions, and a fun, context-aware statement.
- **Multi-Platform:** Use via Node.js terminal or a web browser.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jesse-Salazar/weather-app.git
Navigate to the project directory:
- cd weather-app
- Install dependencies:
   ```bash 
   npm install

Run the application:
- For terminal usage: see Usage
- For browser usage: see Usage

## Usage
**Node.js Terminal**
Run the script:
- node get_city_temperature.js
- Enter the city, state (optional), and country when prompted.
- View the weather results directly in your terminal.

**Browser Interface**
- Open index.html in your preferred web browser.
- Run server in terminal
   ```bash
   node server.js
- Enter the city, state (optional), and country in the provided form on the browser.
- Click the "Get the Weather!" button.
- View the temperature, weather description, and a fun statement on the page.

**API Information**

Open-Meteo Geocoding API:  
Converts user-provided city, state, and country into latitude and longitude coordinates.

Open-Meteo Weather Forecast API:  
Retrieves current weather data (temperature, conditions, etc.) based on coordinates.
