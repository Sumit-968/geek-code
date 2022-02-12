import React, { useState, useEffect, Fragment } from "react";
import Card from "../card/Card";
import Base from "../core/Base";
import { useNavigate } from "react-router-dom";
import { deleteCard, getAllUserCard } from "./helper/userapi";
import LoadingCard from "../card/LoadingCard";

const UserCreatedCards = () => {
  const [mycards, setMycards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAllCommand, setViewAllCommand] = useState(false);
  const [viewAllShortcut, setViewAllShortcut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, []);

  //fetch user created cards from server
  const fetchCards = async () => {
    setLoading(true);
    await getAllUserCard()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setLoading(false);
        } else {
          setMycards(data.cards);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  //delte user created card
  const deleteThisCard = async (id) => {
    console.log("usercreatedcard: " + id);
    await deleteCard({ id })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          console.log("Unsucessfull");
        } else {
          console.log("Successfull");
        }
      })
      .catch((err) => console.log(err));
  };

  //loading cards template
  const loadingCards = () => {
    return (
      <Fragment>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </Fragment>
    );
  };

  //count the number of command cards
  var countCommandCards = 0;
  //user created more command cards
  const moreCommandCards = mycards.map((element) => {
    if (element.cardType === "command") {
      return (
        <div className="p-8 lg:w-1/4 md:w-1/2" key={element._id}>
          <Card
            title={element.title}
            category={element.category}
            description={element.description}
            authorName={element.authorName}
            code={element.code}
            createdAt={element.createdAt}
            likes={element.likes.length}
            saves={element.saves.length}
            type={element.cardType}
            id={element._id}
          />
          <div className="flex items-center justify-center gap-4 w-full mt-4">
            <button
              onClick={() => deleteThisCard(element._id)}
              type="button"
              className="py-2 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/user/card/update/${element._id}`);
              }}
              type="button"
              className="py-2 px-6  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  });

  //user created less command cards
  const lessCommandCards = mycards.map((element) => {
    if (element.cardType === "command" && countCommandCards < 8) {
      countCommandCards++;
      return (
        <div className="p-8 lg:w-1/4 md:w-1/2" key={element._id}>
          <Card
            title={element.title}
            category={element.category}
            description={element.description}
            authorName={element.authorName}
            code={element.code}
            createdAt={element.createdAt}
            likes={element.likes.length}
            saves={element.saves.length}
            type={element.cardType}
            id={element._id}
          />
          <div className="flex items-center justify-center gap-4 w-full mt-4">
            <button
              onClick={() => deleteThisCard(element._id)}
              type="button"
              className="py-2 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/user/card/update/${element._id}`);
              }}
              type="button"
              className="py-2 px-6  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  });

  //count the number of shortcut cards
  var countShortcutCards = 0;
  ///user created more shortcut cards
  const moreShortcutCards = mycards.map((element) => {
    if (element.cardType === "shortcut") {
      return (
        <div className="p-8 lg:w-1/4 md:w-1/2" key={element._id}>
          <Card
            title={element.title}
            category={element.category}
            description={element.description}
            authorName={element.authorName}
            code={element.code}
            likes={element.likes.length}
            saves={element.saves.length}
            type={element.cardType}
            id={element._id}
          />
          <div className="flex items-center justify-center gap-4 w-full mt-4">
            <button
              type="button"
              onClick={() => deleteThisCard(element._id)}
              className="py-2 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(`/user/card/update/${element._id}`);
              }}
              className="py-2 px-6  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  });

  //user created less shortcut  cards
  const lessShortcutCards = mycards.map((element) => {
    if (element.cardType === "shortcut" && countShortcutCards < 8) {
      countShortcutCards++;
      return  (
        <div className="p-8 lg:w-1/4 md:w-1/2" key={element._id}>
          <Card
            title={element.title}
            category={element.category}
            description={element.description}
            authorName={element.authorName}
            code={element.code}
            likes={element.likes.length}
            saves={element.saves.length}
            type={element.cardType}
            id={element._id}
          />
          <div className="flex items-center justify-center gap-4 w-full mt-4">
            <button
              type="button"
              onClick={() => deleteThisCard(element._id)}
              className="py-2 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(`/user/card/update/${element._id}`);
              }}
              className="py-2 px-6  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white  transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  });

  return (
    <Base>
      <div className="container px-8 py-24">
        <div className="px-8 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-2xl text-gray-900 font-bold">Commands</p>
          <p
          onClick={() => setViewAllCommand(!viewAllCommand)}
          className="text-xs text-gray-900 font-bold mx-2 mt-3 hover:underline hover:cursor-pointer hover:text-violet-600"
        >
          {!viewAllCommand ? `View All` : `View Less`}
        </p>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
        {loading
          ? loadingCards()
          : (!viewAllCommand && lessCommandCards) ||
            (viewAllCommand && moreCommandCards)}
        </div>
      </div>
      <div className="container px-8 py-24 pt-0">
        <div className="px-8 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
            />
          </svg>
          <p className="text-2xl text-gray-900 font-bold">ShortCuts</p>
          <p
            onClick={() => setViewAllShortcut(!viewAllShortcut)}
            className="text-xs text-gray-900 font-bold mx-2 mt-3 hover:underline hover:cursor-pointer hover:text-violet-600"
          >
            {!viewAllShortcut ? `View All` : `View Less`}
          </p>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
        {loading
          ? loadingCards()
          : (!viewAllShortcut && lessShortcutCards) ||
            (viewAllShortcut && moreShortcutCards)}
        </div>
      </div>
    </Base>
  );
};

export default UserCreatedCards;
