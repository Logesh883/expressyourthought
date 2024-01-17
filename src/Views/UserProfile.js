import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CloseRounded } from "@mui/icons-material";

export default function UserProfile({ userdata, userimage, remove }) {
  const [showOptions, setshowOptions] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <div className="flex  items-center gap-x-2 w-[60rem] ">
          <div className="w-10 h-10 rounded-full">
            <img
              src={userimage}
              alt="ProfileImage"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <p>{userdata}</p>
          </div>
        </div>
        <div className="mr-2 relative ">
          <div
            className={`cursor-pointer ${showOptions ? "text-red-500" : ""}`}
            onClick={() => setshowOptions(!showOptions)}
          >
            {" "}
            {showOptions ? <CloseRounded /> : <MoreHorizIcon />}
          </div>

          {showOptions && (
            <div className="absolute border p-2 z-50 right-0 rounded-xl w-32 text-center bg-slate-300">
              <p
                className="font-serif font-semibold tracking-wider cursor-pointer"
                onClick={remove}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
