//sigup request to the server
export const signup = async (user) => {
  return await fetch(`/api/v1/user/signup`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//google login request to server
export const handleLogin = async (googleData) => {
  return await fetch(`/api/v1/user/auth/google`, {
      method: "POST",
      body: JSON.stringify({
      token: googleData.tokenId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => console.log(error));
}

//login request to the server
export const login = async (user) => {
  return await fetch(`/api/v1/user/login`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//authenticate and set token to the cookies and localstorage
export const authenticate = (data, next) => {
  const token = data.token;
  let expDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  expDate.toUTCString();

  document.cookie = `token=${token}; expires=${expDate}; path=/`;
  localStorage.setItem("token", JSON.stringify(data.token));
  localStorage.setItem("userId", JSON.stringify(data.user._id));

  next();
};


//check if tokken exist or not wether in cookie or localstorage
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if(token){
      return token;
  }
  else {
      return false;
  }
};

//logout user and clear cookies and local storage
export const logout = async (next) => {
  if (document.cookie || localStorage.getItem("token")) {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
    if (document.cookie) {
      document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC;path=/;";
    }
    next();

    return await fetch(`/api/v1/user/logout`, {
      method: "GET",
    })
  }
};



