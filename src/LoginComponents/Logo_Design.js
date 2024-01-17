import React from "react";
import pic from "../Images/explore.png";

function Design() {
  return (
    <div className="flex lg:gap-x-5 max-sm:gap-x-3 lg:justify-center lg:items-center ">
      <img src={pic} alt="logo" className="lg:w-32 max-sm:w-20 " />
      <div>
        <p className="text-7xl font-title text-center font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
          Express Your Thoughts
        </p>
        <p className="mt-3 text-2xl text-center font-content bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent ">
          Exploring vast ideas, weaving understanding, a journey unfolds.
        </p>
      </div>
    </div>
  );
}
export default Design;
