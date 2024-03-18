"use client";
import { temUnitState } from "@/utils/weathUtil";
import { hookstate } from "@hookstate/core";
import { useState } from "react";
import Logo from "../Logo";

export const toggleState = hookstate({ active: false });

const CELSIUS = "c";
const FAHRT = "f";

function Navbar() {
  const [tempUnit, setTempUnit] = useState(CELSIUS);

  const celsiusClickHandler = (value) => {
    // globally set state
    setTempUnit(value);
    temUnitState.set({ c: true, f: false });
  };

  const fahrntClickHandler = (value) => {
    setTempUnit(value);
    // globaly set state
    temUnitState.set({ c: false, f: true });
  };

  return (
    <div className="flex  items-center w-full h-full justify-between py-2 ">
      <div className="md:hidden flex flex-col items-center">
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="sm:w-10 sm:h-8 h-7 w-7"
            aria-hidden="true"
            onClick={() =>
              toggleState.set((prev) => ({ active: !prev.active }))
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
      </div>

      <div className="w-full md:w-fit text-center">
        <Logo />
      </div>

      <ul className="inline-flex items-center lg:gap-8 ml-auto lg:ml-[initial]  gap-3">
        <li
          className={`md:py-1 lg:px-6  px-3 py-1 rounded-md duration-400 ease-out transition-all ${
            tempUnit === FAHRT ? "bg-orange-400" : "bg-common"
          } flex justify-center items-center `}
        >
          {/* fahrenheit */}
          <button type="button" onClick={() => fahrntClickHandler(FAHRT)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={45}
              height={45}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-temperature-fahrenheit lg:w-[45px] lg:h-[45px] w-[30px] h-[30px]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 8m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M13 12l5 0" />
              <path d="M20 6h-6a1 1 0 0 0 -1 1v11" />
            </svg>
          </button>
        </li>

        {/* celsius */}
        <li
          className={`md:py-1 lg:px-6  px-3 py-1 rounded-md duration-500  ease-in transition-all ${
            tempUnit === CELSIUS ? "bg-orange-400" : "bg-common"
          } flex justify-center items-center `}
        >
          <button
            type="button"
            className="w-full h-full  flex justify-center items-center"
            onClick={() => celsiusClickHandler(CELSIUS)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-temperature-celsius   lg:w-[45px] lg:h-[45px] w-[30px] h-[30px]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 8m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M20 9a3 3 0 0 0 -3 -3h-1a3 3 0 0 0 -3 3v6a3 3 0 0 0 3 3h1a3 3 0 0 0 3 -3" />
            </svg>
          </button>
        </li>
      </ul>

      <div className="inline-flex w-fit items-center gap-2 ">
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="md:w-[35px] lg:h-[35px] lg:block hidden"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </button>

        {/* <div>
          <CountrySelect />
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
