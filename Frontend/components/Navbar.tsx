"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import SearchBar from "./SearchBar";
import { AiOutlineMenu } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { iconMap } from "@/utils/map";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, logout } from "@/redux/features/authSlice";
import Image from "next/image";
import { toast } from "react-toastify";
import { ToastMessage, ToastStatus } from "@/utils/resources";
import showToast from "@/utils/showToast";

const links = [
  { href: "/login", label: "Login", icon: "BiLogIn" },
  { href: "/signup", label: "Sign Up", icon: "BsFillPenFill" },
];

function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogout, setLogout] = useState(false);
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setLogout(true);
    showToast(ToastStatus.SUCCESS, ToastMessage.LOGOUT_SUCCESS);
  };

  return (
    <div className="border-b bg-white w-full h-20 border-b-1 border-gray-200 text-black sticky top-0 z-10">
      <div className="max-w-screen-2xl h-full mx-auto flex items-center justify-between px-4">
        <Link href={"/"} className="text-2xl uppercase">
          E-LEANING
        </Link>
        <div className="hidden lg:inline-flex">
          <SearchBar />
        </div>
        <div className="">
          {user?.user ? (
            <div className="flex-center gap-10">
              <div className="xs:hidden">
                <Link href={"/my-courses"}>Khóa Học Của Tôi</Link>
              </div>
              <div>
                <Menu>
                  <Menu.Button>
                    <Image
                      src={"/banner.jpg"}
                      width={400}
                      height={400}
                      className="w-12 h-12 rounded-full ml-2"
                      alt="avatar"
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                    <div className="px-1 py-1">
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <div className="flex-center gap-4">
                          <Image
                            src={"/banner.jpg"}
                            width={400}
                            height={400}
                            alt="avt"
                            className="w-16 h-16 rounded-full"
                          />
                          <h4> Trần Chí Mỹ</h4>
                        </div>
                        <hr className="my-4" />

                        <div className="flex-col">
                          <div className="hidden xs:flex xs:flex-col">
                            <Link href={"/my-courses"}>Khóa Học Của Tôi</Link>
                            <hr className="my-4 w-full" />
                          </div>
                          <div>
                            <Link href={"/"}>Trang Cá Nhân </Link>
                            <hr className="my-4" />
                          </div>
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            Đăng Xuất
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          ) : (
            <div className="hidden lg:inline-flex gap-3">
              <CustomButton
                title="Login"
                containerStyles="bg-white-500 border-b-4 border-orange-500 hover:bg-blue-200 hover:scale-110 text-black font-bold py-2 px-4 rounded duration-1000"
                handleClick={() => {
                  router.push("/login");
                }}
              ></CustomButton>
              <CustomButton
                title="SignUp"
                containerStyles="bg-white-500  border-b-4 border-orange-500 hover:bg-blue-200 hover:scale-110 text-black font-bold py-2 px-4 rounded duration-1000"
                handleClick={() => {
                  router.push("/signup");
                }}
              ></CustomButton>
              <div className="text-3xl inline-flex lg:hidden">
                <Menu>
                  <Menu.Button>
                    <AiOutlineMenu />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                    <div className="px-1 py-1">
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        {links.map((link) => (
                          <Menu.Item
                            as={Link}
                            key={link.href}
                            href={link.href}
                            className="ui-active:bg-violet-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black group flex w-full items-center rounded-md px-2 py-2 text-sm"
                          >
                            {link.icon &&
                              iconMap[link.icon] &&
                              React.createElement(iconMap[link.icon], {
                                className: "mr-2",
                              })}
                            {link.label}
                          </Menu.Item>
                        ))}
                      </Transition>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
