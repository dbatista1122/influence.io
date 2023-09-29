import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const isLoggedIn = false; // Temp value to hide UI

  function handleNav() {
    setOpenMenu((menu) => !menu);
  }

  return (
    <nav className="fixed w-full h-16 shadow-xl bg-white">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href={"/"}>
          <Image
            src={"https://img.logoipsum.com/262.svg"}
            alt=""
            width={170}
            height={41}
            className="cursor-pointer"
            priority
          />
        </Link>
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex">
            <Link href={"/dashboard/analytics"}>
              <li className="ml-10 uppercase hover:border-b text-xl">Dashboard</li>
            </Link>
            {!isLoggedIn && (
              <>
                <Link href={"/account/register"}>
                  <li className="ml-10 uppercase hover:border-b text-xl">Register</li>
                </Link>
                <Link href={"/account/login"}>
                  <li className="ml-10 uppercase hover:border-b text-xl">Login</li>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Link href={"/account/profile"}>
                <li className="ml-10 uppercase hover:border-b text-xl">Profile</li>
              </Link>
            )}
          </ul>
        </div>

        <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25} />
        </div>

        <div
          className={
            openMenu
              ? "fixed left-0 top-0 width-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <AiOutlineClose size={25} />
            </div>
          </div>

          <div>
            <div className="flex-col py-4">
              <ul>
                <Link href={"/dashboard/analytics"}>
                  <li className="py-4 cursor-pointer" onClick={() => setOpenMenu(false)}>
                    Dashboard
                  </li>
                </Link>
                {!isLoggedIn && (
                  <>
                    <Link href={"/account/register"}>
                      <li className="py-4 cursor-pointer" onClick={() => setOpenMenu(false)}>
                        Register
                      </li>
                    </Link>
                    <Link href={"/account/login"}>
                      <li className="py-4 cursor-pointer" onClick={() => setOpenMenu(false)}>
                        Login
                      </li>
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <Link href={"/account/profile"}>
                    <li className="py-4 cursor-pointer" onClick={() => setOpenMenu(false)}>
                      Profile
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
          <Link href={"/"}>
            <Image
              src={"https://img.logoipsum.com/262.svg"}
              alt=""
              width={170}
              height={41}
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
