import { isAuthenticated } from "../../auth/helper";


// get saved cards of user from server
export const getSavedCards = async () => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/user/saved/cards`, {
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

//get al user created card
export const getAllUserCard = async () => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/card/user/all`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//get loggedin user detail
export const getLoggedInUserDetails = async () => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/user/`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//save unsave card
export const saveUnsaveCard = async (id) => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/user/save/card`, {
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

// delete card
export const deleteCard = async (id) => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/card/delete`, {
    method: "DELETE",
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

// update card
export const updateCard = async (card, cardId) => {
  const token = isAuthenticated();
  return await fetch(`/api/v1/card/update/${cardId}`, {
    method: "PUT",
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
    .catch((error) => console.log(error));
};
