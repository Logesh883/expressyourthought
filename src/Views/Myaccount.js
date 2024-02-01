import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import { Typography } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Myaccount() {
  const notifyError = (data) => toast.error(data);
  const [userdata, setuserdata] = useState([]);
  const navigation = useNavigate();
  const Account = async () => {
    axios.defaults.withCredentials = true;
    await axios
      .get("https://server.ideavista.online/api/account", null, {
        withCredentials: true,
      })
      .then((res) => {
        setuserdata(res.data.user);
      })
      .catch((err) => notifyError(err.message));
  };
  useEffect(() => {
    Account();
  }, []);
  return (
    <div className="min-h-[38rem]">
      <div>
        <Navigation />
        <Toaster />
      </div>
      <div className="">
        <div className="">
          {" "}
          <p className="mx-auto text-center font-semibold font-roboto text-3xl text-blue-500 my-2">
            Account Details
          </p>
        </div>
        {userdata.length >= 1 && (
          <div className=" flex m-10 justify-around flex-wrap">
            <div className="w-[22rem] overflow-hidden  h-[25rem] shadow-lg shadow-gray-500 rounded-3xl">
              <img
                src={userdata[0].Profile}
                alt="profile"
                className="hover:scale-110 w-[22rem] h-[25rem] transition-all duration-300 rounded-3xl"
              />
            </div>
            <div className="flex flex-col   gap-y-6 flex-1 flex-wrap p-10 mx-20 max-sm:mx-0 max-sm:mt-10 max-sm:p-0">
              <div className="flex justify-between max-sm:flex-col">
                <label className="text-lg tracking-wide font-roboto text-orange-600 ">
                  Username
                </label>
                <Typography sx={{ ml: 3 }}>{userdata[0].UserName}</Typography>
              </div>
              <div className="flex justify-between max-sm:flex-col">
                <label className="text-lg tracking-wide font-roboto text-orange-600 ">
                  Email
                </label>
                <Typography sx={{ ml: 3 }}>{userdata[0].Email}</Typography>
              </div>
              <div className="flex justify-between max-sm:flex-col">
                <label className="text-lg tracking-wide font-roboto text-orange-600 ">
                  Total ideas
                </label>
                <Typography sx={{ ml: 3 }}>{userdata[1]}</Typography>
              </div>
              <div className="flex justify-between max-sm:flex-col">
                <label className="text-lg tracking-wide font-roboto text-orange-600 ">
                  Journey starts on
                </label>
                <Typography sx={{ ml: 3 }}>{userdata[2]}</Typography>
              </div>
              {userdata[1] === 0 ? (
                <div className="flex flex-col">
                  <p
                    className="font-serif text-2xl font-semibold text-center bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent 
                  "
                  >
                    No posts or ideas yet. Be the first to share your thoughts
                    and make an impact!
                  </p>
                  <div className="mx-auto my-6">
                    <button onClick={() => navigation("/createPost")}>
                      Share Ideas
                    </button>
                  </div>
                </div>
              ) : userdata[1] >= 1 && userdata[1] <= 5 ? (
                <div className="flex flex-col">
                  <p
                    className="font-serif text-2xl font-semibold text-center bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent 
                  "
                  >
                    Great start! Keep sharing your ideas and inspiring others
                  </p>
                  <div className="mx-auto my-6">
                    <button onClick={() => navigation("/createPost")}>
                      Share Ideas
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p
                    className="font-serif text-2xl font-semibold text-center bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent 
                "
                  >
                    Keep up the good work! Your ideas are making a positive
                    impact
                  </p>
                  <div className="mx-auto my-6">
                    <button onClick={() => navigation("/createPost")}>
                      Share Ideas
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Myaccount;
