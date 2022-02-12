import { isAuthenticated } from "../../auth/helper";

//get all cards from server
export const getAllCards = async () => {
  return await fetch(`/api/v1/card/`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// create card request
export const createCard = async (card) => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/card/create`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(card),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//like unlike card request
export const likeUnlikeCard = async (id) => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/card/like`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//get card by id request
export const getCardById = async (id) => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/card/${id}`, {
    method: "GET",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
