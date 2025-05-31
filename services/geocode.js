const fetch = require('node-fetch');

const countryToCode = {
  "united states": "US", "us" : "US", "united states of america" : "US", canada: "CA", "united kingdom": "GB",
  australia: "AU", india: "IN", germany: "DE", france: "FR",
  mexico: "MX", japan: "JP", china: "CN"
};

async function getCoordinates(city, state, countryInput) {
  const countryCode = countryToCode[countryInput.toLowerCase()];
  if (!countryCode) throw new Error("Invalid country name.");

  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&country=${countryCode}&count=10`;
  const geoRes = await fetch(geoURL);
  if (!geoRes.ok) throw new Error("Failed to fetch location data.");

  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) throw new Error("City not found.");

  let location = geoData.results.find(
    (loc) => loc.name.toLowerCase() === city.toLowerCase() &&
             (!state || loc.admin1?.toLowerCase().includes(state.toLowerCase()))
  ) || geoData.results[0];

  return location;
}

module.exports = { getCoordinates };