import Image from "next/image";
import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/Auth";

const Header = () => {
  const { user, setUser } = useAuth();

  return (
    <header className="flex items-center px-2 py-1 shadow-md sticky top-0">
      <div className="w-[150px] h-16 relative cursor-pointer flex-shrink-0">
        <Image src={"/assets/reddit.png"} fill objectFit="contain" />
      </div>

      <div className="flex items-center ml-5">
        <HomeIcon className="h-6 cursor-pointer" />
        <p className="ml-1 hidden lg:block lg:w-[200px]">Home</p>
        <ChevronDownIcon className="h-6 cursor-pointer" />
      </div>

      <form className="flex items-center flex-1 border ml-7 border-gray-200 py-2 px-4 bg-gray-100 rounded-sm ">
        <MagnifyingGlassIcon className="h-6 cursor-pointer" />
        <input
          type="text"
          placeholder="search"
          className="bg-transparent flex-1 outline-none px-3"
        />
      </form>

      <div className="lg:flex mx-5 items-center gap-8 hidden ">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-400" />
        <ChatBubbleBottomCenterIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
      </div>
      <div className="lg:hidden ml-5">
        <Bars3Icon className="icon" />
      </div>
      <div className="flex gap-1 items-center px-4">
        {user && (
          <>
            <Image
              src={user.image}
              width={50}
              height={50}
              className="rounded-full"
            />
            <button
              onClick={() => setUser(null)}
              className="text-gray-400 text-lg"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <button
            onClick={() => setUser({ name: "Alext", image:'/assets/profile.png' })}
            className="text-gray-400 text-lg"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
