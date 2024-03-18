"use client";
import { firebaseAuth } from "@/firebase/auth";

import useAuth from "@/hook/useAuth";
import { activeUserState } from "@/lib/ui";
import { useHookstate } from "@hookstate/core";
import {
  Avatar,
  AvatarIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import commonData from "../../../common.json";
import Menu from "./menu";

function SidebarContent() {
  const authState = useHookstate(firebaseAuth);
  const activeUser = useHookstate(activeUserState).get({ noproxy: true });
  const isAuth = useAuth();
const router = useRouter()

  const logoutHandler = async () => {
    const { logout } = authState.get({ noproxy: true })?.auth;

    logout()
      .then((value) => {
        Cookies.remove(commonData.auth_cookie_name);
        localStorage.removeItem("__usr__");
        router.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" px-3 flex flex-col w-full h-full relative overflow-hidden">
      <div className="flex-1  overflow-auto w-full ">
        <Menu />
      </div>

      <div className="w-full py-4 relative">
        {isAuth && (
          <Popover placement="top" size="lg">
            <PopoverTrigger className="focus:outline-none">
              <div
                role="button"
                className="flex cursor-pointer gap-2 items-center  transition-background duration-300 hover:bg-slate-100 py-1 px-2 rounded-md"
              >
                {activeUser?.user?.photoURL ? (
                  <span>
                    <User
                      avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                      }}
                    />
                  </span>
                ) : (
                  <Avatar icon={<AvatarIcon />} />
                )}
                {activeUser?.user?.displayName ? (
                  <span>${activeUser?.user?.displayName}</span>
                ) : (
                  "Some one"
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-[220px] py-4 ">
              <div className="w-full flex flex-col">
                <button
                  type="button"
                  className="flex gap-2 items-center  transition-background duration-300 hover:bg-slate-100 py-1 px-2 rounded-md"
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="flex gap-2 items-center  transition-background duration-300 hover:bg-slate-100 py-1 px-2 rounded-md"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {!isAuth && (
          <ul className="flex items-center gap-2 text-xl justify-center">
            <li>
              <Link href={"/register"} className="text-primary">
                Sign up
              </Link>
            </li>
            <li>
              <Link href={"/login"} className="text-secondary">
                Log in
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SidebarContent;
