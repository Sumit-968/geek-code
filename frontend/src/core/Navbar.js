import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/helper/index";
import {GoogleLogout} from "react-google-login"

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [query, setQuery] = useState("?q=");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  //on searcing text in search bar
  const handleSearch = (name) => (e) => {
    setSearch(e.target.value);
  };

  //logout user
  const logoutUser =  async () => {
    await logout(() => {
      navigate("/login");
    });
  }

  //updating search query value on changing seacrh
  useEffect(() => {
    setQuery("?q=" + search);
  }, [search]);

  return (
    <header className="sticky top-0 bg-gray-800  h-20 sm:h-20 flex flex-col items-center z-30 w-full">
      <div className="w-full flex flex-row items-center p-3 justify-between shadow-xs">
        <div
          className="ml-8 text-2xl text-white font-bold hidden md:flex"
          onClick={() => {
            navigate("/");
          }}
        >
          GeekCODE
        </div>
        <div className="w-2/3 md:w-1/3 h-10 cursor-pointer bg-white text-sm rounded-full flex flex-row justify-center">
          <svg
            onClick={() => {
              navigate("/");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mt-2 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <input
            type="text" 
            name="search"
            onKeyPress={(e) => {
              if(e.key==="Enter"){
                navigate(`/search${query}`)
              }
            }}
            onChange={handleSearch("search")}
            value={search}
            className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              navigate(`/search${query}`);
            }}
            className="h-5 w-5 mt-2 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex items-center mr-4 md:flex">
          {!isAuthenticated() && (
            <Fragment>
              <div className="mr-4">
                <button 
                onClick={() => {
                  navigate(`/login`);
                }}
                className="w-full  items-center justify-center px-2 py-2 md:px-4  md:text-base text-xs font-medium rounded-md text-white hover:bg-white hover:text-gray-800 ">
                  Login
                </button>
              </div>
              <div className="rounded-md mr-4 shadow">
                <button 
                onClick={() => {
                  navigate(`/signup`);
                }}
                className="w-full  items-center justify-center px-2 py-2 md:px-4  md:text-base text-xs font-medium rounded-md text-white bg-violet-500 hover:bg-white hover:text-gray-800">
                  Signup
                </button>
              </div>
            </Fragment>
          )}

          {isAuthenticated() && (
            <Fragment>
              <div className="rounded-md inline-block mr-2 md:mr-10">
                <button
                  onClick={() => {
                    navigate("/user/card/create");
                  }}
                  className="w-full items-center justify-center px-2 py-2 md:px-4 md:text-base text-xs font-medium rounded-md text-white bg-violet-500 hover:bg-white hover:text-gray-800"
                >
                  <Link to="/signup">Add Card</Link>
                </button>
              </div>
              <div className="relative inline-block text-left -mr-4 md:mr-2">
                <div>
                  <button
                    type="button"
                    onClick={() => setisOpen(!isOpen)}
                    className="  flex items-center justify-center w-full rounded-full   text-sm font-medium "
                    id="options-menu"
                  >
                    <svg
                      width="25"
                      fill={`${isOpen ? "#8b5cf6" : "white"}`}
                      height="25"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </button>
                </div>

                <div
                  className={`${
                    isOpen ? "absolute" : "hidden"
                  } origin-top-right right-0 mt-4 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5`}
                >
                  <ul
                    className="py-1 "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li
                      className="block cursor-default px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      role="menuitem"
                      onClick={() => {
                        navigate("/user/cards");
                      }}
                    >
                      <span className="flex flex-col">
                        <span>Your Cards</span>
                      </span>
                    </li>
                    <li
                      className="block cursor-default px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      role="menuitem"
                      onClick={() => {
                        navigate("/user/saved");
                      }}
                    >
                      <span className="flex flex-col">
                        <span>Saved Cards</span>
                      </span>
                    </li>
                    <li
                      className="block cursor-default px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      role="menuitem"
                      onClick={logoutUser}
                    >
                    <span className="flex flex-col">
                    <span>Logout</span>
                  </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
