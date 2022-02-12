import React, { useState } from "react";
import { createCard } from "../card/helper/cardapi";
import Base from "../core/Base";

const UserAddCard = () => {
  const [values, setvalues] = useState({
    title: "",
    description: "",
    code: "",
    cardType: "",
    category: "",
    error: "",
    loading: "none",
  });

  //destructuring values
  const { title, description, code, category, cardType, error, loading } =
    values;

  //set values on changing input in form
  const handleChange = (name) => (e) => {
    setvalues({ ...values, loading: "none", [name]: e.target.value });
  };

  //handle creating card
  const onSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, loading: "loading" });
    createCard({ title, description, code, category, cardType })
      .then((data) => {
        if (data.error) {
          console.log(data.status);
          console.log(data.error);
          setvalues({
            ...values,
            error: data.error + " !!",
            loading: "none",
          });
        } else {
          setvalues({
            ...values,
            title: "",
            description: "",
            code: "",
            cardType: "",
            category: "",
            error: "",
            loading: "loaded",
            didRedirect: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //create card form
  const createCardForm = () => {
    return (
      <div className="flex justify-center my-20 mx-5 md:mx-0">
        <div className="flex shadow-violet-500 rounded-2xl shadow-xl flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-xl  dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-4 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Create a new card
          </div>
          <div className="self-center mb-4 font-normal text-xl text-red-600 sm:text-xl dark:text-white">
            {error}
          </div>
          <div className="mt-8">
            <form action="#" autoComplete="off">
              <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <input
                    minLength="10"
                    maxLength="35"
                    type="text"
                    className=" rounded-lg border border-gray-300 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="title"
                    onChange={handleChange("title")}
                    value={title}
                    required
                    placeholder="Card title i.e Create React App"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex relative ">
                  <div className=" relative w-1/2 mx-1">
                    <select
                      className="text-gray-700 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      name="category"
                      onChange={handleChange("category")}
                      value={category}
                      required
                    >
                      <option value="">Category</option>
                      <option value="VsCode">VsCode</option>
                      <option value="GitHub">GitHub</option>
                      <option value="ReactJs">ReactJs</option>
                    </select>
                  </div>
                  <div className=" relative w-1/2 mx-1">
                    <select
                      className="text-gray-700 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      name="cardType"
                      onChange={handleChange("cardType")}
                      value={cardType}
                      required
                    >
                      <option value="">Type</option>
                      <option value="shortcut">ShortCut</option>
                      <option value="command">Command</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <input
                    type="text"
                    className=" rounded-lg border border-gray-300 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="code"
                    minLength="1"
                    maxLength="40"
                    onChange={handleChange("code")}
                    value={code}
                    required
                    placeholder="Command/Shortcut i.e npx create-react-app"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-gray-700">
                  <textarea
                    minLength="5"
                    maxLength="200"
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Short description for card"
                    name="description"
                    rows="5"
                    cols="40"
                    onChange={handleChange("description")}
                    value={description}
                    required
                  ></textarea>
                </label>
                <p className="text-gray-400">
                  * {200 - description.length} words left
                </p>
              </div>
              <div className="flex w-full">
                {loading === "none" ? (
                  <button
                    type="submit"
                    className=" flex justify-center py-2 px-4 mt-6 mb-4 bg-gray-800 hover:bg-gray-900 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={onSubmit}
                  >
                    Create Card
                  </button>
                ) : (
                  ""
                )}
                {loading === "loading" ? (
                  <button
                    type="submit"
                    className=" flex justify-center py-2 px-4 mt-6 mb-4 bg-white text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md "
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="#1f2937"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                    Creating....
                  </button>
                ) : (
                  ""
                )}
                {loading === "loaded" ? (
                  <button
                    type="submit"
                    className=" flex justify-center py-2 px-4 mt-6 mb-4 bg-green-600 hover:bg-green-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Card created successfully
                  </button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return <Base>{createCardForm()}</Base>;
};

export default UserAddCard;
