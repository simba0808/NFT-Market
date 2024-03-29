"use client"

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";

import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { Logo } from "@/app/assets";

import useTheme from "@/app/context/themeContext";
import useAuthInfo from "@/app/context/AuthContext";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { authInfo, setAuthInfo } = useAuthInfo();
  const router = useRouter();
  const menuRef: any = useRef();

  const [loginModalShow, setLoginModalShow] = useState<Boolean>(false);
  const [signupModalShow, setSignupModalShow] = useState<Boolean>(false);
  const [logoutShow, setLogoutShow] = useState<Boolean>(false);

  useEffect(() => {
    const handleOutsieClick = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        handleMenuClick();
      } else {
        setLogoutShow(false);
      }
    }
    document.addEventListener("mousedown", handleOutsieClick);
    return () => document.removeEventListener("mousedown", handleOutsieClick);
  }, []);

  const handleLoginClick = () => {
    setLoginModalShow(true);
  }

  const handleSignupClick = () => {
    setSignupModalShow(true);
  }

  const handleLoginClose = () => {
    setLoginModalShow(false);
  }

  const handleSignupClose = () => {
    setSignupModalShow(false);
  }

  const handleMenuClick = () => {
    setLogoutShow(true);
  }

  const handleSignoutClick = async () => {
    try {
      const response = await axios.get("/api/auth/signout");

      setAuthInfo({
        email: ""
      });
      router.push("/");
    } catch(err: any) {
      console.log(err);
    }
  }

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="" className="flex items-center">
            <Image src={Logo} className="w-24 h-24 mr-3" priority alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NFT MarketPlace</span>
          </a>
          <div className="flex items-center gap-x-2 lg:order-2 relative">
            <button
              className="mr-4"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
              }}
            >
              {
                theme === "dark" ? (
                  <svg className="w-8" fill="#DA8F4D" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" /></svg>
                ) : (
                  <svg className="w-8" fill="#DA8F4D" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.5,2c-1.82,0-3.53,0.5-5,1.35c2.99,1.73,5,4.95,5,8.65s-2.01,6.92-5,8.65C5.97,21.5,7.68,22,9.5,22c5.52,0,10-4.48,10-10 S15.02,2,9.5,2z" /></svg>
                )
              }
            </button>
            {
              authInfo.email !== "" ?
                <>
                  <ConnectButton showBalance={false} />
                  <button onClick={handleMenuClick} >
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" className="w-10 h-10 rounded-full" alt="avatar" />
                  </button>
                  {
                    logoutShow &&
                      <ul
                        className={`absolute right-0 top-10 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                        ref={menuRef}
                      >
                        <div className="py-3 px-4">
                          <span className="block text-sm font-semibold text-gray-900 dark:text-white">{ authInfo.email.split("@")[0] }</span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{ authInfo.email }</span>
                        </div>
                        <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                          <li>
                            <button
                              className="block w-full py-2 px-4 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={handleSignoutClick}
                            >
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </ul>
                  }
                </> :
                <>
                  <PrimaryButton onClick={handleLoginClick} text="Sign In" />
                  <SecondaryButton onClick={handleSignupClick} text="Sign Up" />
                </>
            }
            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Collection</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Creator</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Road Map</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
        loginModalShow &&
        <LoginModal handleCloseClick={handleLoginClose} />
      }
      {
        signupModalShow &&
        <SignupModal handleCloseClick={handleSignupClose} />
      }
    </header>
  );
}

export default Header;