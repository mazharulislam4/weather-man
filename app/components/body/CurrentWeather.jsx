"use client";
import { getWeather } from "@/lib/getWeather";
import { activeUserLocation } from "@/lib/ui";
import {
  celsiusToFahrenheit,
  convertUnixToLocalTimeString
} from "@/utils/utils";
import {
  calculateDewPoint,
  convertWindSpeedToKmh,
  getWindDirection,
  temUnitState,
} from "@/utils/weathUtil";
import { useHookstate } from "@hookstate/core";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UnitText = ({ children }) => (
  <span className="text-gray-500 text-small"> {children}</span>
);

function CurrentWeather() {
  const locationDataState = useHookstate(activeUserLocation);
  const locationData = locationDataState.get({ noproxy: true }).location;
  const [currentWeather, setCurrentWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const temUnit = useHookstate(temUnitState).get({ noproxy: true });

  useEffect(() => {
    if (Object.keys(locationData).length > 0) {
      (async () => {
        try {
          setIsLoading(true);
          const data = await getWeather({
            zip: locationData?.zip || locationData?.postal,
            countryCode: locationData?.country,
            city: locationData?.city,
            let: locationData?.let,
            lon: locationData?.lon,
            state: locationData?.state,
          });

          if (Object.keys(data).length > 0) {
            setCurrentWeather(data);
          }
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [locationData]);

  return (
    <div className="bg-background flex flex-col gap-3 py-4 px-3 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl block  mb-2 font-bold">Current Weather</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
        <span>Date: {new Date().toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {isLoading ? (
            <Spinner />
          ) : (
            <figure className="relative self-end">
              <Image
                src={`https://openweathermap.org/img/w/${currentWeather?.weather?.icon}.png`}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                width={150}
                height={100}
                alt="icon"
              />
            </figure>
          )}
          <span className="text-[2.5rem]">
            {temUnit?.f
              ? celsiusToFahrenheit(
                  Number(currentWeather?.main?.temp?.toFixed("2"))
                ).toFixed(2)
              : currentWeather?.main?.temp?.toFixed("2")}
            {temUnit?.f ? <>&#8457;</> : <>&#8451;</>}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            Real Feel: &nbsp;
            {temUnit?.f
              ? celsiusToFahrenheit(
                  Number(currentWeather?.main?.feels_like?.toFixed("2"))
                ).toFixed(2)
              : currentWeather?.main?.feels_like?.toFixed("2")}
            {temUnit?.f ? <>&#8457;</> : <>&#8451;</>}
          </span>
          <span className="font-medium">
            Clouds Cover: {currentWeather?.clouds?.all}%
          </span>
          <span className="font-medium">
            Sunrise:{" "}
            {convertUnixToLocalTimeString(currentWeather?.sys?.sunrise)}
          </span>
          <span className="font-medium">
            Sunset: {convertUnixToLocalTimeString(currentWeather?.sys?.sunset)}
          </span>
        </div>
      </div>

      {/* weather describe  */}
      <div>
        <h3 className="text-2xl py-2 font-medium text-gray-500">
          {currentWeather?.weather?.main}
        </h3>
        <p className="text-lg font-medium">
          Desc:{" "}
          <span className="text-gray-500 font-normal">
            {currentWeather?.weather?.description}
          </span>
        </p>
      </div>

      {/* weather conditions  */}
      <div className="flex gap-3 text-md">
        <ul className="w-1/2">
          <li className="flex relative justify-between items-center border-b border-b-gray  py-4 px-3 text-foreground">
            <span>Wind</span>
            <span>
              {getWindDirection(currentWeather?.wind?.deg)}
              &nbsp;
              {convertWindSpeedToKmh(currentWeather?.wind?.speed)?.toFixed("2")}
              <UnitText>km/h</UnitText>
            </span>
          </li>
          <li className="flex justify-between items-center border-b border-b-gray  py-4 px-3 text-foreground">
            <span>Wind Gusts</span>
            <span>
              {getWindDirection(currentWeather?.wind?.deg)}
              &nbsp;
              {convertWindSpeedToKmh(currentWeather?.wind?.gust)?.toFixed("2")}
              <UnitText>km/h</UnitText>
            </span>
          </li>
          <li className="flex justify-between items-center   py-4 px-3 text-foreground">
            <span>Humidity</span>
            <span>
              {currentWeather?.main?.humidity}
              <UnitText>%</UnitText>
            </span>
          </li>
        </ul>
        <ul className="w-1/2">
          <li className="flex justify-between items-center border-b border-b-gray  py-4 px-3 text-foreground">
            <span>Dew Point</span>
            <span>
              {calculateDewPoint(
                currentWeather?.main?.temp,
                currentWeather?.main?.humidity
              )}{" "}
              &#176;
            </span>
          </li>
          <li className="flex justify-between items-center border-b border-b-gray  py-4 px-3 text-foreground">
            <span>Pressure</span>
            <span>
              <UnitText>↓</UnitText>
              {currentWeather?.main?.pressure}
              <UnitText>mb</UnitText>
            </span>
          </li>
          <li className="flex justify-between items-center  py-4 px-3   text-foreground">
            <span>Visibility</span>
            <span>
              {currentWeather?.visibility / 1000} <UnitText>km</UnitText>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CurrentWeather;
