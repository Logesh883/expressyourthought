import React from "react";

function FeedUserProfile({ userdata }) {
  return (
    <div>
      {userdata.length &&
        userdata.map((val, i) => (
          <div className="flex items-center gap-x-2 w-[60rem]" key={i}>
            <div className="w-10 h-10 rounded-full ">
              <img src={val} alt="prp" className={`w-10 h-10 rounded-full`} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default FeedUserProfile;
