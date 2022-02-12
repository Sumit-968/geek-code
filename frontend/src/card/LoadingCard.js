import React from "react";

//loading cards template (animate-pulse)
const LoadingCard = () => {
  return (
    <div className="p-8 lg:w-1/4 md:w-1/2">
      <div className="shadow-violet-500 animate-pulse rounded-2xl shadow-xl w-54 h-48 sm:w-64 sm:h-48 p-5 bg-violet-100 relative overflow-hidden">
        <div className="w-full ">
          <div>
            <div className="flex flex-row">
              <p className="text-base text-black font-medium"></p>

              <p className="text-xs text-gray-500 absolute top-0 right-0 mt-8 mx-2"></p>
            </div>
            <p className="text-xs text-gray-500 "></p>
            <div className="flex justify-center my-5">
              <p className="text-base text-gray-800  font-bold font-sans"></p>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="w-full flex items-center px-4 py-2"
              ></button>
              <button
                type="button"
                className="w-full flex items-center px-4 py-2"
              ></button>
              <button
                type="button"
                className="w-full flex items-center px-4 py-2"
              ></button>
            </div>
            <div className="flex justify-center text-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
