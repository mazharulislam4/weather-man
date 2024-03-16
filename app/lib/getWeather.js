export async function getWeather({ lat, lon, city, state, countryCode, zip }) {
  try {
    let url;
    if (lat && lon) {
      url = `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
    } else if (city && state && countryCode) {
      url = `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}/weather?q=${city},${state},${countryCode}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
    } else if (zip && countryCode) {
      url = `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}/weather?zip=${zip},${countryCode}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
    } else if (countryCode && city) {
      url = `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}/weather?q=${city},${countryCode}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
    } else {
      throw new Error("params are not correct ");
    }

    const res = await fetch(url);

    const data = await res.json();

    if (Object.keys(data).length > 0) {
      const [weather] = data.weather;
      const formatted = { ...data, weather: weather };
      return formatted;
    }
    return {};
  } catch (err) {
    console.log(err);
  }
}
