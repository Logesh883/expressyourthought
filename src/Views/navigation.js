import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PortraitIcon from "@mui/icons-material/Portrait";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";

import {
  AddCircle,
  DeleteForever,
  HomeOutlined,
  LogoutTwoTone,
  PortraitOutlined,
} from "@mui/icons-material";
import { googleLogout } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";

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
  const [username, setusername] = useState("");
  axios.defaults.withCredentials = true;

  const notifyError = (data) => toast.error(data);
  const notifySuccess = (data) => toast.success(data);

  const Logout = async () => {
    googleLogout();
    await axios
      .get("https://server.ideavista.online/api/logout", null, {
        withCredentials: true,
      })
      .then((res) => {
        notifySuccess(res.data.msg);
        navigation("/");
      })
      .catch((err) => notifyError(err.message || "Logout Error"));
  };

  const Upload = async (e) => {
    e.preventDefault();

    if (!files) {
      notifyError("Please select a file to upload.");
      return;
    }
    setload(true);
    const formData = new FormData();
    formData.append("testImage", files);

    await axios
      .post(`https://server.ideavista.online/image`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        notifySuccess(res.data.msg);
        fileInputRef.current.value = null;
        setfiles("");
        setupload(false);
        setnavProfile(false);
      })
      .catch((err) => {
        notifyError(err.message || "Error in upload");
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
      .get(`https://server.ideavista.online/fetchImage`, null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 401) {
          notifyError("not Autorization");
        }
        setBase64Image(res.data.fetched.Profile);

        setusername(res.data.fetched.UserName);
      })
      .catch((err) => {
        notifyError("Update Your Profile Picture!");
        if (err.response.request.status === 401) {
          window.location.pathname = "/";
        }
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div>
            <Toaster />
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

            <div className="flex gap-x-2   cursor-pointer">
              {base64Image ? (
                <div className=" flex justify-center items-center">
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <img
                        src={base64Image}
                        className="w-12 rounded-full  h-12"
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => setupload(!upload)}>
                      <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <DeleteForever fontSize="small" />
                      </ListItemIcon>
                      Delete account
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        Logout();
                      }}
                    >
                      <ListItemIcon>
                        <LogoutTwoTone fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div className="">
                  <div className="w-10 h-10 rounded-full animate-pulse bg-neutral-400 "></div>
                </div>
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
