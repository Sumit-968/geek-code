import React, {useState} from "react";
import Base from "./Base";
import { Navigate,useNavigate } from "react-router-dom";
import { signup } from "../auth/helper";


const Signup = () => {
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    email: "",
    password: "",
    name:"",
    error: "",
    loading: false,
    didRedirect: false,
  });

  //destructuring values
  const { email, password,name, error, loading, didRedirect } = values;

  //set values on changing input in form
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: "", [name]: e.target.value });
  };

  //handle signup
  const onSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, error: "", loading: true });
    signup({name, email, password })
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error, loading: false });
        } else {
            setvalues({
              ...values,
              error: "",
              loading: false,
              didRedirect: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handle redirecting user to homepage
  const performRedirect = () => {
    //redirect to login after creating account
    if (didRedirect) {
          return <Navigate to="/login" />;
      }
  }


  const signupForm = () => {
    return(
      <div className="flex justify-center my-20 mx-5 md:mx-0">
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
            Create Your Account
          </div>
          <div className="mt-8">
            <form action="#" autoComplete="off">
              <div className="flex flex-col mb-4">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    onChange={handleChange("name")}
                    value={name}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent"
                    placeholder="Your fullname"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    onChange={handleChange("email")}
                    value={email}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    minLength="6"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent"
                    placeholder="Your password i.e minimum 6 words"
                  />
                </div>
              </div>
              <div className="flex justify-center font-bold text-red-800 my-3">
                {error}
              </div>
              <div className="flex w-full">
              {!loading ?  (<button
                  type="submit"
                  onClick={onSubmit}
                  className="py-2 px-4  bg-gray-800 hover:bg-gray-900 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  SignUp
                </button>) : (<button
                  className="py-2 px-4 flex justify-center bg-gray-800 hover:bg-gray-900 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
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
                  Creating Account...
                </button>)}
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <a className="hover:cursor-pointer inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
            onClick={() => {
              navigate("/login");
            }}
            >
              <span className="ml-2">Already have an account?</span>
            </a>
          </div>
        </div>
      </div>
    )
  }


  return(
    <Base>
      {signupForm()}
      {performRedirect()}
    </Base>
  );


};

export default Signup;
