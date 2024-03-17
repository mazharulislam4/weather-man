"use client";
import { hookstate } from "@hookstate/core";
import Logo from "../Logo";

export const toggleState = hookstate({ active: false });

function Navbar() {
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
            className="w-10 h-8 "
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

      <div className="w-fit">
        <Logo />
      </div>

      <div className="inline-flex w-fit items-center gap-2 ">
        <button
          type="button"
          className="text-[1.9rem]  border border-gray-300 px-2 rounded-md"
        >
          &#8451;
        </button>

        <button className="text-[1.9rem]  border border-gray-300 px-2 rounded-md">
          &#8457;
        </button>

        {/* <div>
          <CountrySelect />
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
