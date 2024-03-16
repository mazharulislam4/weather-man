// Constants for calculating the heat index
const c1 = -8.78469475556;
const c2 = 1.61139411;
const c3 = 2.33854883889;
const c4 = -0.14611605;
const c5 = -0.012308094;
const c6 = -0.0164248277778;
const c7 = 0.002211732;
const c8 = 0.00072546;
const c9 = -0.000003582;

// Function to calculate the heat index (real feel)
export function calculateHeatIndex(temperature, humidity) {
  return (
    c1 +
    c2 * temperature +
    c3 * humidity +
    c4 * temperature * humidity +
    c5 * temperature ** 2 +
    c6 * humidity ** 2 +
    c7 * temperature ** 2 * humidity +
    c8 * temperature * humidity ** 2 +
    c9 * temperature ** 2 * humidity ** 2
  );
}

// Function to convert wind speed from m/s to km/h
export function convertWindSpeedToKmh(windSpeed) {
  return windSpeed * 3.6; // Convert m/s to km/h
}

// Function to determine wind direction in cardinal directions
export function getWindDirection(deg) {
  if (deg > 337.5 || deg <= 22.5) {
    return "N";
  } else if (deg > 22.5 && deg <= 67.5) {
    return "NE";
  } else if (deg > 67.5 && deg <= 112.5) {
    return "E";
  } else if (deg > 112.5 && deg <= 157.5) {
    return "SE";
  } else if (deg > 157.5 && deg <= 202.5) {
    return "S";
  } else if (deg > 202.5 && deg <= 247.5) {
    return "SW";
  } else if (deg > 247.5 && deg <= 292.5) {
    return "W";
  } else if (deg > 292.5 && deg <= 337.5) {
    return "NW";
  }
}


// Calculate dew point
export function calculateDewPoint(temperature, humidity) {
    const Tc = temperature;
    const RH = humidity;
    const a = 17.27;
    const b = 237.7;
    const lnRH = Math.log(RH / 100);
    const dewPoint = (b * (a * Tc / (b + Tc) + lnRH)) / (a - (a * Tc / (b + Tc) + lnRH));
    return dewPoint.toFixed(2); 
}