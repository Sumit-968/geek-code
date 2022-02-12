import React, { useState, useEffect, Fragment } from "react";
import Card from "../card/Card";
import Base from "../core/Base";
import { getSavedCards } from "./helper/userapi";
import LoadingCard from "../card/LoadingCard";

const UserSavedCards = () => {
  const [mycards, setMycards] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetching user saved cards from server
  const fetchCards = async () => {
    await getSavedCards()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setLoading(false);
        } else {
          setMycards(data.savedCards);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  //fetching cards
  useEffect(() => {
    fetchCards();
  }, []);

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

  //user saved command cards
  const commandCards = mycards.map((element) => {
    if (element.cardType === "command") {
      return (
        <div className="p-8 lg:w-1/4 md:w-1/2" key={element.id}>
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
        </div>
      );
    }
  });

  //user saved shortcut cards
  const shortcutCards = mycards.map((element) => {
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
          <p className="text-xs text-gray-900 font-bold mx-2 mt-3 hover:underline hover:cursor-pointer hover:text-violet-600">
            View all
          </p>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {loading ? loadingCards() : commandCards}
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
          <p className="text-xs text-gray-900 font-bold mx-2 mt-3 hover:underline hover:cursor-pointer hover:text-violet-600">
            View all
          </p>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {loading ? loadingCards() : shortcutCards}
        </div>
      </div>
    </Base>
  );
};

export default UserSavedCards;
