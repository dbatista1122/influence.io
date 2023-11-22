import React from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Logo from "./Logo";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const session = useSession();
  const isLoggedIn = session.status === 'authenticated' ? true : false;

  function handleSmallNavMenu() {
    setOpenMenu((menu) => !menu);
  }

  function handleOnClickSmallNavMenu() {
    setOpenMenu(false);
  }

  return (
    <nav className=" absolute w-full h-16 shadow-lg bg-gray-600 text-slate-50	font-sans px-10">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Logo />

        <LargeScreenNavbar isLoggedIn={isLoggedIn} />

        <HamburgerIcon handleNav={handleSmallNavMenu} />

        <SmallScreenNavbar
          isLoggedIn={isLoggedIn}
          handleNav={handleSmallNavMenu}
          openMenu={openMenu}
          onClickNavMenu={handleOnClickSmallNavMenu}
        />
      </div>
    </nav>
  );
};

function LargeScreenNavbar({ isLoggedIn }) {
  return (
    <div className="hidden sm:flex">
      <ul className="hidden sm:flex md:flex-row md:space-x-8 md:mt-0 md:border-0">
        {!isLoggedIn && (
          <>
            <Link href={"/account/register"}>
              <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">
                Register
              </li>{" "}
            </Link>
            <Link href={"/account/login"}>
              <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Login
              </li>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link href={"/dashboard/analytics"}>
              <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Dashboard
              </li>
            </Link>
            <Link href={"/account/profile"}>
              <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Profile
              </li>
            </Link>
            <button
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

function HamburgerIcon({ handleNav }) {
  return (
    <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
      <AiOutlineMenu size={25} />
    </div>
  );
}

// TODO: Might possibly want to refactor passing down menu state to separate functions. Will work fine as is.
function SmallScreenNavbar({ isLoggedIn, handleNav, handleOnClickSmallNavMenu, openMenu }) {
  return (
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
            {!isLoggedIn && (
              <>
                <Link href={"/account/register"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Register
                  </li>
                </Link>
                <Link href={"/account/login"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Login
                  </li>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link href={"/dashboard/analytics"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Dashboard
                  </li>
                </Link>
                <Link href={"/account/profile"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Profile
                  </li>
                </Link>
                <Link href={"/"}>
                  <li className="py-4 cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      <Logo />
    </div>
  );
}
export default Navbar;
