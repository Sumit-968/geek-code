import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Card from "../card/Card";
import { getAllCards } from "../card/helper/cardapi";
import LoadingCard from "../card/LoadingCard";
import Base from "./Base";

const Home = () => {
  const [mycards, setMycards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAllCommand, setViewAllCommand] = useState(false);
  const [viewAllShortcut, setViewAllShortcut] = useState(false);

  //fetch cards on loading homepage
  useEffect(() => {
    fetchCards();
  }, []);

  //fetching cards from backend
  const fetchCards = async () => {
    await getAllCards()
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

  var countCommandCards = 0;

  //all command cards to display
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
            likes={element.likes.length}
            saves={element.saves.length}
            type={element.cardType}
            id={element._id}
          />
        </div>
      );
    }
  });

  //8 command cards to display
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
            likes={element.likes.length}
            saves={element.saves.length}
            type={element.cardType}
            id={element._id}
          />
        </div>
      );
    }
  });

  var countShortcutCards = 0;

  //all shortcut cards to display
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
        </div>
      );
    }
  });

  //8 shortcut cards to display
  const lessShortcutCards = mycards.map((element) => {
    if (element.cardType === "shortcut" && countShortcutCards < 8) {
      countShortcutCards++;
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

  return (
    <Base>
      <div className="bg-violet-500 flex relative z-20 items-center">
        <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
          <div className="flex flex-col">
            <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl text-white">
              HUB FOR SHORTCUTS & COMMANDS
            </h1>
            <h2 className="font-base max-w-2xl mx-auto w-full text-xl text-gray-800 text-center py-8">
              GeekCODE is a single spot for all your requirements of shortcuts &
              commands. Covers more than ten categories i.e VsCode, GitHub,
              ReactJs.
            </h2>
            <div className="flex items-center justify-center">
              <div className="flex flex-wrap -m-4 text-center">
                <div className="p-8 sm:w-1/4 w-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="leading-relaxed">100+ ShortCuts</p>
                </div>
                <div className="p-8 sm:w-1/4 w-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <p className="leading-relaxed">100+ Commands</p>
                </div>
                <div className="p-8 sm:w-1/4 w-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="leading-relaxed">10+ Categories</p>
                </div>
                <div className="p-8 sm:w-1/4 w-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  <p className="leading-relaxed">500+ Saves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Home;
