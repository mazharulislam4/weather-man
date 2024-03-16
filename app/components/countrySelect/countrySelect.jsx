"use client";
import {
  activeCountryState,
  activeUserLocation,
  getCurrentUserLocation,
} from "@/lib/ui";
import { Avatar } from "@nextui-org/react";
import { countries } from "country-list-json";
import { useEffect, useState } from "react";
import SelectItem from "./selectItem";

export default function CountrySelect() {
  const [currentCountry, setCurrentCountry] = useState("");
  const [selectedValue, setSelectedValue] = useState("");


  useEffect(() => {
    (async () => {
      try {
        const currentLocationRes = await getCurrentUserLocation();
        activeCountryState.set(currentLocationRes?.country);
        setCurrentCountry(currentLocationRes?.country);
        activeUserLocation.set({ location: { ...currentLocationRes } });
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {};
  }, [currentCountry]);


  return (
    <div className="inline-flex w-fit items-center  bg-background py-1 px-2 rounded-full justify-center">
      <div className="w-[25%] relative">
        <SelectItem countries={countries} onChange={setSelectedValue} />
      </div>

      <div className="flex items-center gap-2">
        <Avatar
          alt="Argentina"
          className="w-6 h-6"
          src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${
            selectedValue?.toUpperCase() || currentCountry?.toUpperCase()
          }.svg`}
        />
        <span>{selectedValue || currentCountry}</span>
      </div>
    </div>
  );
}
