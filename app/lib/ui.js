import { celsiusToFahrenheit, convertUnixToLocalTimeString } from "@/utils/utils";
import {
  calculateDewPoint,
  convertWindSpeedToKmh,
  getWindDirection,
} from "@/utils/weathUtil";
import { hookstate } from "@hookstate/core";
export const generateActiveClass = (href, path, className) => {
  if (href === path) {
    return className;
  }
  return null;
};

/**
 * Global data sets
 */

// get user weather zip input
export const userZipInput = hookstate({ zip: "" });
export const activeUserState = hookstate({ user: {}, tokens: {} });
export const activeCountryState = hookstate("");
export const activeUserLocation = hookstate({ location: {} });
export const sidebarListState = hookstate({ list: [] });
export const currentHandlerState = hookstate({ handler: null });
/**
 * Global data sets  end
 */

// get user IP address
export const getUserIP = async () => {
  return await fetch("https://api.ipify.org/?format=json");
};

export const getCurrentUserLocationByIP = async (apiKey, IP) => {
  return await fetch(`https://ipinfo.io/${IP}?token=${apiKey}`);
};
// get current user location from user input
export const getCurrentUserLocation = async () => {
  try {
    const getIP = await getUserIP();
    const ip = await getIP.json();

    const currentLocationdata = await getCurrentUserLocationByIP(
      process.env.NEXT_PUBLIC_IPINFO_KEY,
      ip.ip
    );
    const currentLocation = await currentLocationdata.json();

    return currentLocation;
  } catch (err) {
    return err;
  }
};

// html weather response string
export const getWeatherResponseHTML = ({ data, errorData }, unit) => {
  let html = "";
  if (data?.length > 0) {
    data.map((value) => {
      html += `<div>
      <div class="inline-flex flex-col gap-1 my-3">
         <span class = "text-xl font-medium">${value?.name}</span>
         <span class="font-medium">Zip: ${value?.zip}</span>
      </div>
    <div class="flex flex-col gap-1 pl-5 pt-3 ">
      <span class="text-xl">
        Weather:
        <span class="font-medium">${value?.weather?.main}</span>
      </span>
      <span>
        Description:
        <span class="font-medium">${value?.weather?.description}</span>
      </span>
      <span>
        Temperature:
        <span class="font-medium">
               ${
                 unit == "f"
                   ? celsiusToFahrenheit(
                       Number(value?.main?.temp?.toFixed("2"))
                     ).toFixed(2)
                   : value?.main?.temp?.toFixed("2")
               }
            ${unit == "f" ? "&#8457;" : "&#8451;"}
        </span>
      </span>
      <span>
        Feel Like:
        <span class="font-medium">
               ${
                 unit == "f"
                   ? celsiusToFahrenheit(
                       Number(value?.main?.feels_like?.toFixed("2"))
                     ).toFixed(2)
                   : value?.main?.feels_like?.toFixed("2")
               }
            ${unit == "f" ? "<span>&#8457;</span>" : "<span>&#8451;</span>"}
        </span>
      </span>
      <span>
        Dew Point:
        <span class="font-medium">
          ${calculateDewPoint(value?.main?.temp, value?.main?.humidity)}
          &#x2103;
        </span>
      </span>
      <span>
        Max Temperature:
        <span class="font-medium">${value?.main?.temp_max}&#x2103;</span>
      </span>
      <span>
        Min Temperature:
        <span class="font-medium">${value?.main?.temp_min}&#x2103;</span>
      </span>
      <span>
        Cloud Cover:
        <span class="font-medium">${value?.clouds?.all}%</span>
      </span>
      <span>
        Humidity:
        <span class="font-medium">${value?.main?.humidity}%</span>
      </span>
      <span>
        Wind:
        <span class="font-medium">
          ${getWindDirection(value?.wind?.deg)}
          ${convertWindSpeedToKmh(value?.wind?.speed)?.toFixed("2")}
          km/h
        </span>
      </span>
      <span>
        Wind Gusts:
        <span class="font-medium">
          ${getWindDirection(value?.wind?.deg)}
          ${convertWindSpeedToKmh(value?.wind?.gust)?.toFixed("2")}km/h
        </span>
      </span>
      <span class="font-medium">
        Sunrise: ${convertUnixToLocalTimeString(value?.sys?.sunrise)}
      </span>
      <span class="font-medium">
        Sunset: ${convertUnixToLocalTimeString(value?.sys?.sunset)}
      </span>
      <span>
        Pressure:
        <span> ${value?.main?.pressure} mb</span>
      </span>

      <span>
        Visibility:
        <span>${value?.visibility / 1000} km</span>
      </span>
    </div>

  </div>
`;
    });
  }

  let error = "";

  if (errorData?.length > 0) {
    errorData?.map((err) => {
      error += `<span>${err.code}</span>`;
    });
  }

  const margeErrorHTML = `<div class ="inline-flex items-center pt-3 gap-2">
  <span>All entered invalid zip code: </span>
      <div class="text-red-400">
      ${error}
      </div>
  </div>`;

  const margeHTML = `<div>
 <p>Certainly! Bellow is weather information about given zip codes:</p>
   ${html} 
  ${errorData?.length > 0 ? margeErrorHTML : "<span></span>"}
  </div>`;

  if (html) {
    return margeHTML;
  }
  return ``;
};
