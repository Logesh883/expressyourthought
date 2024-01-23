import React from "react";
import "./smallloader.css";
import { useLocation } from "react-router-dom";

function Smallloader() {
  const location = useLocation();
  const Email = location.state;
  return (
    <div className="flex flex-col mt-40 items-center">
      <div className="loader">
        <div className="box box0">
          <div></div>
        </div>
        <div className="box box1">
          <div></div>
        </div>
        <div className="box box2">
          <div></div>
        </div>
        <div className="box box3">
          <div></div>
        </div>
        <div className="box box4">
          <div></div>
        </div>
        <div className="box box5">
          <div></div>
        </div>
        <div className="box box6">
          <div></div>
        </div>
        <div className="box box7">
          <div></div>
        </div>
        <div className="ground">
          <div></div>
        </div>
      </div>
      {Email ? (
        <p className="font-semibold tracking-wider text-slate-700 text-3xl font-sans max-sm:ml-10 mt-20">
          Login Successfull...{" "}
          <span className="text-red-400">Redirecting you to...</span>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Smallloader;
