"use client";
import { useHookstate } from "@hookstate/core";
import { toggleState } from "../navbar/navbar";
import SidebarContent from "./sidebarContent";

function Sidebar() {
  const toggle = useHookstate(toggleState);
  const isActive = toggle.get({ noproxy: true })?.active;

  const onOverlayClickToCloseHandler = (e) => {
    if (e.currentTarget === e.target) {
      toggle.set((prev) => ({ active: !prev.active }));
    }
  };

  return (
    <>
      <aside className="w-[var(--aside-width)] flex-shrink-0 h-screen bg-common md:block hidden ">
        <SidebarContent />
      </aside>

      <div
        className={`fixed  inset-0 z-[90] bg-black/20 transition-opacity ease-soft-spring delay-[400] ${
          isActive ? "opacity-100 pointer-events-auto" : "opacity-0"
        } pointer-events-none `}
        onClick={onOverlayClickToCloseHandler}
      ></div>

      <div
        className={`fixed w-[var(--aside-width)] h-full inset-0  z-[99999] bg-black/0 transition-opacity duration-75 ${
          isActive ? "left-0" : "left-[-200%]"
        }
        } `}
        onClick={onOverlayClickToCloseHandler}
      >
        <button
          onClick={() => toggle.set((prev) => ({ active: !prev.active }))}
          type="button"
          className={`text-black absolute top-[50px] right-[-50px]  ${isActive ? "opacity-100" : "opacity-0"} transition-opacity duration-500 delay-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-12 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <aside
          className={`fixed w-[var(--aside-width)] flex-shrink-0 h-screen bg-common fixed  inset-0 transform   transition-transform duration-1000
          delay-100
          ease-in
          md:hidden ${
            isActive ? "translate-x-0" : "translate-x-[-120%]"
          } block  `}
        >
          <SidebarContent />
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
