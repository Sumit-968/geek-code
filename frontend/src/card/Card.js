import React, { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { likeUnlikeCard } from "./helper/cardapi";
import { saveUnsaveCard } from "../user/helper/userapi";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  title = "Card Title",
  category = "VsCode",
  description = "GeekCode is a single spot for your needs of shortcuts & commands",
  authorName = "Author",
  code = "CODE-COMMAND",
  likes = 0,
  saves = 0,
  type = "command",
  id,
}) => {
  const [numLikes, setNumLikes] = useState(likes);
  const [numSaves, setNumSaves] = useState(saves);
  const [info, setInfo] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  //For Authentication (loggedin or not)
  const token = isAuthenticated();

  //To display messages for 1 second only

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrorMessage("");
      setMessage("");
      setCopyMessage("");
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errorMessage, message, copyMessage]);

  //Handle like button to like/unlike card when clicked

  const handleLikeUnlike = () => {
    //Only loggedin users ared allowed to like/unlike card

    if (token) {
      setErrorMessage("");
      likeUnlikeCard({ id })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            if (data.likes.length > numLikes) {
              setNumLikes(data.likes.length);
            } else {
              setNumLikes(data.likes.length);
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMessage("Please login to like");
    }
  };

  //Handle save button to save/unsave card when clicked

  const handleSaveUnsave = () => {
    //Only loggedin users ared allowed to save/unsave card

    if (token) {
      setErrorMessage("");
      saveUnsaveCard({ id })
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error);
          } else {
            if (data.saves.length > numSaves) {
              setMessage("Card Saved!");
              setNumSaves(data.saves.length);
            } else {
              setMessage("");
              setNumSaves(data.saves.length);
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMessage("Please login to save");
    }
  };

  return (
    <Fragment>
      {info ? (
        <div className="hover:-translate-y-1 border-solid border-2 hover:shadow-2xl shadow-violet-500 rounded-2xl shadow-xl w-54 sm:w-64 p-5 bg-violet-100 relative overflow-hidden">
          <div className="w-full ">
            <div>
              <div className="flex flex-row">
                <p className="text-base text-black font-medium">{title}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 hover:cursor-pointer absolute top-0 right-0 m-4"
                  viewBox="0 0 20 20"
                  fill="#1f2937"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    setCopyMessage("Copied!");
                  }}
                >
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                </svg>
                <p className="text-xs text-gray-500 absolute top-0 right-0 mt-8 mx-2">
                  {copyMessage}
                </p>
              </div>
              <p className="text-xs text-gray-500 ">{category}</p>
              <div className="flex justify-center my-5">
                <p className="text-base text-gray-800  font-bold font-sans">
                  {code}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLikeUnlike}
                  className="w-full flex items-center px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-1"
                    viewBox="0 0 20 20"
                    fill="#4f46e5"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {numLikes}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInfo(false);
                  }}
                  className="w-full flex items-center px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleSaveUnsave}
                  className="w-full flex items-center px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-1"
                    viewBox="0 0 20 20"
                    fill="#a21caf "
                  >
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 9v4m0 0l-2-2m2 2l2-2"
                    />
                  </svg>
                  {numSaves}
                </button>
              </div>
              <div className="flex justify-center text-xs">
                {message}
                {errorMessage}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500 shadow-violet-500 rounded-2xl shadow-xl w-54 sm:w-64 p-5 bg-gray-900 relative overflow-hidden">
          <div className="w-full">
            <div>
              <p className="font-light max-w-2xl mx-auto w-full text-sm text-white text-center py-8">
                {description}
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLikeUnlike}
                  className="w-full text-white flex items-center px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-1 "
                    viewBox="0 0 20 20"
                    fill="white"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {numLikes}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInfo(true);
                  }}
                  className="w-full flex items-center px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleSaveUnsave}
                  className="w-full text-white flex items-center px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-1"
                    viewBox="0 0 20 20"
                    fill="white"
                  >
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 9v4m0 0l-2-2m2 2l2-2"
                    />
                  </svg>
                  {numSaves}
                </button>
              </div>
              <div className="flex justify-center text-xs text-white">
                {message}
                {errorMessage}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Card;
