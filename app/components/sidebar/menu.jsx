"use client";
import { generateActiveClass, sidebarListState } from "@/lib/ui";
import { useHookstate } from "@hookstate/core";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getSidebarAllData } from "@/firebase/db";
import { activeUserState } from "@/lib/ui";
import { useEffect } from "react";

function Menu() {
  const pathname = usePathname();
  const sidebarListStateRef = useHookstate(sidebarListState);
  const menuData = sidebarListStateRef.get({ noproxy: true })?.list;
  const activeUser = useHookstate(activeUserState).get({ noproxy: true });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const list = await getSidebarAllData(activeUser?.user?.uid);

      if (list?.length > 0) {
        sidebarListStateRef.set({ list: list });
      }
    })();

    return () => {};
  }, []);

  return (
    <ul className="mt-[10px] flex flex-col gap-1">
      <li>
        <button
          type={"button"}
          className={`hover:bg-background py-2 w-full px-2 justify-between items-center rounded-md cursor-pointer text-medium font-medium flex relative top-0 mb-4 ${generateActiveClass(
            `/`,
            pathname,
            "navlink-active"
          )}  `}
          onClick={() => {
            router.push("/" , undefined , {replace: true , shallow: false});
          }}
        >
          <span>Home</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
      </li>

      {menuData
        ?.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
        ?.map((value, index) => (
          <li key={index}>
            <Link
              href={`/${value?.handler}`}
              className={`hover:bg-background py-2 px-2 rounded-md cursor-pointer text-medium font-medium block ${generateActiveClass(
                `/${value?.handler}`,
                pathname,
                "navlink-active"
              )}`}
            >
              {value?.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default Menu;
