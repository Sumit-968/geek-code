import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../card/Card";
import { getAllCards } from "../card/helper/cardapi";
import Base from "./Base";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [mycards, setMycards] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [values, setvalues] = useState({
    cardType: "",
    category: "",
  });

  //destructuring values
  const { category, cardType } = values;

  //on change filter properties
  const handleChange = (name) => (e) => {
    setvalues({ ...values, [name]: e.target.value });
  };

  //on clicking filter button
  const onSubmit = (e) => {
    e.preventDefault();
    setIsFilter(true);
  };

  //fetching all cards from server
  const fetchCards = async () => {
    await getAllCards()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          if (searchParams.get("q")) {
            setSearchValue(searchParams.get("q"));
          }
          setMycards(data.cards);
        }
      })
      .catch((err) => console.log(err));
  };

  //fetch cards on changing search query
  useEffect(() => {
    fetchCards()
  }, [searchParams]);

  //search results without any filter
  const searchCards = mycards.map((element) => {
    if (
      element.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      element.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      element.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      element.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      element.cardType.toLowerCase().includes(searchValue.toLowerCase())
    ) {
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

  //search results with filter properties
  const filterCards = mycards.map((card) => {
    if (
      (card.category.toLowerCase().includes(category.toLowerCase()) &&
        card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
        card.title.toLowerCase().includes(searchValue.toLowerCase())) ||
      (card.category.toLowerCase().includes(category.toLowerCase()) &&
        card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
        card.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (card.category.toLowerCase().includes(category.toLowerCase()) &&
        card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
        card.code.toLowerCase().includes(searchValue.toLowerCase())) ||
      (card.category.toLowerCase().includes(category.toLowerCase()) &&
        card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
        card.category.toLowerCase().includes(searchValue.toLowerCase())) ||
      (card.category.toLowerCase().includes(category.toLowerCase()) &&
        card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
        card.cardType.toLowerCase().includes(searchValue.toLowerCase()))
    ) {
      return (
        <div className="p-8 lg:w-1/4 md:w-1/2" key={card._id}>
          <Card
            title={card.title}
            category={card.category}
            description={card.description}
            authorName={card.authorName}
            code={card.code}
            likes={card.likes.length}
            saves={card.saves.length}
            type={card.cardType}
            id={card._id}
          />
        </div>
      );
    }
  });

  /*
  filter cards according to no. of likes in decending order
  const filterLikedCards = mycards
    .sort((a, b) => (a.likes.length < b.likes.length) ? 1 : ((b.likes.length < a.likes.length) ? -1 : 0))
    .map((card) => {
      if (
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.title.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.description.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.code.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.category.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.cardType.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        return (
          <div className="p-8 lg:w-1/4 md:w-1/2" key={card.id}>
            <Card
              title={card.title}
              category={card.category}
              description={card.description}
              authorName={card.authorName}
              code={card.code}
              likes={card.likes.length}
              saves={card.saves.length}
              type={card.cardType}
              id={card._id}
            />
          </div>
        );
      }
    });

  filter cards according to no. of saves in ascending order
  const filterSavedCards = mycards
    .sort((a, b) => (a.saves.length < b.saves.length) ? 1 : ((b.saves.length < a.saves.length) ? -1 : 0))
    .map((card) => {
      if (
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.title.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.description.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.code.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.category.toLowerCase().includes(searchValue.toLowerCase())) ||
        (card.category.toLowerCase().includes(category.toLowerCase()) &&
          card.cardType.toLowerCase().includes(cardType.toLowerCase()) &&
          card.cardType.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        return (
          <div className="p-8 lg:w-1/4 md:w-1/2" key={card.id}>
            <Card
              title={card.title}
              category={card.category}
              description={card.description}
              authorName={card.authorName}
              code={card.code}
              likes={card.likes.length}
              saves={card.saves.length}
              type={card.cardType}
              id={card._id}
            />
          </div>
        );
      }
    });

  set filter property   
  var finalfilterCard;
  if (sortBy === "") {
    finalfilterCard = filterCards;
  } else if (sortBy === "mostLiked") {
    finalfilterCard = filterLikedCards;
  } else if (sortBy === "mostSaved") {
    finalfilterCard = filterSavedCards;
  } */
//dark
  return (
    <Base>
      <h1 className="font-bold text-center text-xl my-4 mt-6 text-gray-800">
        Search results for "{searchValue}" :
      </h1>

      <div class="mx-auto bg-gray-800 p-6 h-36 w-64 rounded-2xl shadow-2xl text-center">
        <div class="flex flex-col h-full items-center justify-center">
          <div class="flex h-full flex-col justify-center mx-2">
            <div className="mx-1">
              <select
                class="block text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                name="category"
                onChange={handleChange("category")}
                value={category}
              >
              <option value="">Category</option>
              <option value="VsCode">VsCode</option>
              <option value="GitHub">GitHub</option>
              <option value="ReactJs">ReactJs</option>
              <option value="Ubuntu">Ubuntu</option>
              <option value="MsExcel">MsExcel</option>
              <option value="AdobePhotoshop">AdobePhotoshop</option>
              <option value="Figma">Figma</option>
              <option value="AdobeIllustrator">AdobeIllustrator</option>
              <option value="Basic Keyboard">Basic Keyboard</option>
              <option value="Linux">Linux</option>
              <option value="CommandPrompt">CommandPrompt</option>
              <option value="NodePackageManager">NodePackageManager</option>
              <option value="NodeJs">NodeJs</option>
              <option value="MsWord">MsWord</option>
              <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <select
                class="block text-gray-700 py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                onChange={handleChange("cardType")}
                value={cardType}
              >
                <option value="">Type</option>
                <option value="shortcut">ShortCut</option>
                <option value="command">Command</option>
              </select>
            </div>
          </div>
          <div class="flex w-1/2 h-full flex-row justify-between">
            <button
              type="button"
              class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full "
              onClick={onSubmit}
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="container px-8 py-2">
        <div className="flex flex-row flex-wrap justify-center">
          {isFilter ? filterCards : searchCards}
        </div>
      </div>
    </Base>
  );
};

export default Search;
