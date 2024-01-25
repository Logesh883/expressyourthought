import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PortraitIcon from "@mui/icons-material/Portrait";

import {
  AddCircle,
  HomeOutlined,
  LogoutTwoTone,
  PortraitOutlined,
} from "@mui/icons-material";
import { googleLogout } from "@react-oauth/google";

function Navigation({ value }) {
  const [files, setfiles] = useState(null);
  const [load, setload] = useState(false);
  const style = value;
  const [upload, setupload] = useState();
  const [navProfile, setnavProfile] = useState();
  const location = useLocation();
  const [base64Image, setBase64Image] = useState("");
  let Email = location.state;
  const fileInputRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const navigation = useNavigate();
  const [status, setstatus] = useState("");
  const [statuserror, setstatuserror] = useState("");
  const [username, setusername] = useState("");
  axios.defaults.withCredentials = true;

  const Logout = async () => {
    googleLogout();
    await axios
      .get("http://localhost:4000/api/logout", null, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data.msg))
      .catch((err) => console.log(err))
      .finally(() => (window.location.pathname = "/"));
  };

  const Upload = async (e) => {
    e.preventDefault();

    if (!files) {
      setstatuserror("Please select a file to upload.");
      setTimeout(() => {
        setstatuserror("");
      }, 4000);
      return;
    }
    setload(true);
    const formData = new FormData();
    formData.append("testImage", files);

    await axios
      .post(`http://localhost:4000/image`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        setstatus(res.data.msg);
        fileInputRef.current.value = null;
        setfiles("");
        setupload(false);
        setnavProfile(false);
        setTimeout(() => {
          setstatus("");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setload(false);
        window.location.reload();
      });
  };
  useEffect(() => {
    fetchImages();
  }, [files, Email, value]);
  axios.defaults.withCredentials = true;
  const fetchImages = async () => {
    await axios
      .get(`http://localhost:4000/fetchImage`, null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 401) {
          console.log("not Autorization");
        }
        setBase64Image(res.data.fetched.Profile);

        setusername(res.data.fetched.UserName);
      })
      .catch((err) => {
        setstatuserror("Update Your Profile Picture!");
        if (err.response.request.status === 401) {
          window.location.pathname = "/";
        }
        setTimeout(() => {
          setstatuserror("");
        }, 3000);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {width >= 650 ? (
        <nav className="h-14 bg-red-200  relative flex text-gray-700 items-center justify-between">
          <div className="ml-7 w-44 ">
            <p className="text-3xl font-laila  font-bold bg-gradient-to-r text-transparent from-blue-600 to-pink-500 bg-clip-text">
              Ideavista{" "}
              <sup className="font-laila  font-bold bg-gradient-to-r text-transparent from-blue-600 to-pink-500 bg-clip-text">
                24
              </sup>
            </p>
          </div>

          <div className="flex gap-x-20 mx-10 items-center text-stone-700 relative ">
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "allPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/feedPost", { state: Email })}
            >
              All posts
            </p>
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "myPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/getUserPost", { state: Email })}
            >
              My posts
            </p>
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "addPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/createPost", { state: Email })}
            >
              ADD POSTS
            </p>

            <div className="flex gap-x-2 group cursor-pointer items-center">
              <div className="w-12 h-12 rounded-full cursor-pointer">
                {base64Image ? (
                  <div className="">
                    <img
                      src={base64Image}
                      alt="Profile"
                      className="rounded-full w-12 h-12  "
                    />
                  </div>
                ) : (
                  <div className="">
                    <div className="w-12 h-12 rounded-full animate-pulse bg-neutral-400 "></div>
                  </div>
                )}

                <div className=" w-36  font-serif mt-2 rounded-lg cursor-pointer absolute right-0 top-[80%] bg-slate-100  hidden group-hover:block z-50 uppercase tracking-wider">
                  <div
                    className="border-b-2 border-red-500 p-2 rounded-3xl hover:border-green-500"
                    onClick={() => setupload(!upload)}
                    title="change your profile "
                  >
                    {" "}
                    <p className="">Edit Picture</p>
                  </div>
                  <div
                    className="border-b-2 p-2 border-red-500  rounded-3xl hover:border-green-500 cursor-not-allowed hover:opacity-40"
                    title="Available in V2"
                  >
                    {" "}
                    <p>Profile</p>
                  </div>
                  <div
                    className="border-b-2 p-2  border-red-500 rounded-3xl hover:border-green-500 cursor-pointer "
                    onClick={() => {
                      Logout();
                    }}
                  >
                    {" "}
                    <p>Logout</p>
                  </div>
                </div>
              </div>
              {username ? (
                <p className=" capitalize w-fit  font-bold gap-x-2 flex items-center h-12 text-center rounded-xl -left-30 ">
                  {username}
                </p>
              ) : (
                <div className=" capitalize w-28 justify-center  font-bold gap-x-2 flex items-center h-6 text-center rounded-xl -left-30 bg-neutral-400 animate-pulse"></div>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <div className="h-16 bg-slate-600 fixed bottom-0 w-screen z-50 flex justify-around items-center overflow-hidden">
          <div
            className={`cursor-pointer ${
              style === "allPost"
                ? "-translate-y-3 -translate-x-3 ring-offset-4 ring-2 p-3 rounded-full   bg-white"
                : ""
            }`}
            title="AllPost"
            onClick={() => navigation("/feedPost", { state: Email })}
          >
            {style === "allPost" ? (
              <HomeIcon sx={{ fontSize: "40px", fill: "red" }} />
            ) : (
              <HomeOutlined sx={{ fontSize: "30px", fill: "white" }} />
            )}
          </div>

          <div
            className={`cursor-pointer ${
              style === "myPost"
                ? "-translate-y-3  ring-2 ring-offset-4 p-3 rounded-full   bg-white"
                : ""
            }`}
            title="MyPosts"
            onClick={() => navigation("/getUserPost", { state: Email })}
          >
            {style === "myPost" ? (
              <PortraitIcon sx={{ fontSize: "40px", fill: "red" }} />
            ) : (
              <PortraitOutlined sx={{ fontSize: "30px", fill: "white" }} />
            )}
          </div>
          <div
            className={`cursor-pointer ${
              style === "addPost"
                ? "-translate-y-3 -translate-x-2 ring-offset-4 ring-2 p-3 rounded-full   bg-white"
                : ""
            }`}
            title="AddPost"
            onClick={() => navigation("/createPost")}
          >
            {style === "addPost" ? (
              <AddCircle sx={{ fontSize: "40px", fill: "red" }} />
            ) : (
              <AddCircleOutlineIcon sx={{ fontSize: "30px", fill: "white" }} />
            )}
          </div>
          <div
            onClick={() => {
              Logout();
            }}
            title="Logout"
            className="cursor-pointer"
          >
            <LogoutTwoTone sx={{ fontSize: "30px", fill: "white" }} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setnavProfile(!navProfile)}
          >
            {base64Image ? (
              <img
                src={base64Image}
                alt="UserProfile"
                className="rounded-full w-8 h-8"
              />
            ) : (
              <div className="">
                <div className="w-8 h-8 rounded-full animate-pulse bg-neutral-400 "></div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full relative z-50">
        {status && (
          <div className="absolute w-[20%] right-7 top-2 max-sm:fixed max-sm:w-96 max-sm:left-2">
            <Alert severity="success" sx={{ width: "100%" }}>
              {status}
            </Alert>
          </div>
        )}
        {statuserror && (
          <div className="absolute w-[20%] right-7 top-2 max-sm:fixed max-sm:w-96 max-sm:left-2">
            <Alert severity="error" sx={{ width: "100%" }}>
              {statuserror}
            </Alert>
          </div>
        )}
      </div>

      {upload && (
        <div
          className={`flex justify-center items-center  w-screen h-screen max-sm:bottom-0 border-2 border-pink-400 rounded-2xl p-2 absolute left-[50%] z-10 top-[50%] -translate-x-[50%] bg-slate-300  -translate-y-[50%]   ${
            upload ? "backdrop-brightness-0 " : ""
          }`}
        >
          <form
            onSubmit={(e) => Upload(e)}
            encType="multipart/form-data "
            className="border-2 p-10 rounded-lg border-pink-500"
          >
            <input
              type="file"
              name="testImage"
              ref={fileInputRef}
              onChange={(e) => {
                setfiles(e.target.files[0]);
              }}
              size={100}
              className="border-2  mt-4 p-2"
            />
            {load ? (
              <div
                className="border h-12 w-80 mt-4 flex justify-center items-center"
                style={{
                  padding: "12px 35px",
                  background: " #4c83fa",
                  fontSize: 17,
                  fontWeight: 1000,
                  color: "#ffffff",
                  border: "3px solid #4c83fa",
                  borderRadius: 8,
                  boxShadow: "0 0 0 #ffffff",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <div className="h-8 w-8 border-4 animate-spin border-t-transparent border-white rounded-full"></div>
              </div>
            ) : (
              <div className="mx-20 my-6 flex gap-x-3">
                <div>
                  <button
                    className="bg-green-500 border-2 p-2 hover:shadow-lg hover:shadow-green-500 rounded-lg text-white uppercase tracking-widest"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
                <div>
                  <button
                    className="bg-red-600 border-2 p-2 hover:shadow-lg hover:shadow-red-600 rounded-lg text-white uppercase tracking-widest"
                    onClick={() => {
                      setfiles("");
                      setupload("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
      {navProfile && (
        <div
          className={`flex justify-center items-center  w-fit h-fit max-sm:bottom-0 border-2 border-pink-400 rounded-2xl p-2 fixed left-[50%] z-10 top-[50%] -translate-x-[50%] bg-slate-300  -translate-y-[50%] overflow-x-hidden  ${
            upload ? "backdrop-brightness-0 " : ""
          }`}
        >
          <form
            onSubmit={(e) => Upload(e)}
            encType="multipart/form-data "
            className=" p-10 rounded-lg "
          >
            <input
              type="file"
              name="testImage"
              ref={fileInputRef}
              onChange={(e) => {
                setfiles(e.target.files[0]);
              }}
              className="border-2  mt-4 p-2"
            />
            {load ? (
              <div
                className="border h-12 w-80 mt-4 flex justify-center items-center"
                style={{
                  padding: "12px 35px",
                  background: " #4c83fa",
                  fontSize: 17,
                  fontWeight: 1000,
                  color: "#ffffff",
                  border: "3px solid #4c83fa",
                  borderRadius: 8,
                  boxShadow: "0 0 0 #ffffff",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <div className="h-8 w-8 border-4 animate-spin border-t-transparent border-white rounded-full"></div>
              </div>
            ) : (
              <div className="mx-20 my-6 flex gap-x-3">
                <div>
                  <button
                    className="bg-green-500 border-2 p-2 hover:shadow-lg hover:shadow-green-500 rounded-lg text-white uppercase tracking-widest"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
                <div>
                  <button
                    className="bg-red-600 border-2 p-2 hover:shadow-lg hover:shadow-red-600 rounded-lg text-white uppercase tracking-widest"
                    onClick={() => {
                      setfiles("");
                      setupload("");
                      setnavProfile(!navProfile);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
export default Navigation;
