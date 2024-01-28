import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PortraitIcon from "@mui/icons-material/Portrait";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import {
  AddCircle,
  DeleteForever,
  Edit,
  HomeOutlined,
  LogoutTwoTone,
  PortraitOutlined,
} from "@mui/icons-material";
import { googleLogout } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";

function Navigation({ value }) {
  const style = value;
  const [upload, setupload] = useState();
  const [navProfile, setnavProfile] = useState();

  const [base64Image, setBase64Image] = useState("");

  const fileInputRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const navigation = useNavigate();

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

  useEffect(() => {
    fetchImages();
  }, [value]);
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
              onClick={() => navigation("/feedPost")}
            >
              All posts
            </p>
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "myPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/getUserPost")}
            >
              My posts
            </p>
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "addPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/createPost")}
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
                    <MenuItem onClick={() => navigation("/editprofile")}>
                      <ListItemIcon>
                        <Edit fontSize="small" />{" "}
                      </ListItemIcon>
                      Profile
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
                    <MenuItem onClick={() => Logout()}>
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
            onClick={() => navigation("/feedPost")}
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
            onClick={() => navigation("/getUserPost")}
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
    </>
  );
}
export default Navigation;
