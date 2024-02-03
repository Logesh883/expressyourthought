import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import {
  DeleteForever,
  Edit,
  LogoutTwoTone,
  PostAdd,
  Settings,
  TipsAndUpdates,
} from "@mui/icons-material";
import { googleLogout } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/CreateSlice";

function Navigation({ value }) {
  const style = value;
  const [upload, setupload] = useState();
  const [navProfile, setnavProfile] = useState();

  const [base64Image, setBase64Image] = useState("");

  const [width, setWidth] = useState(window.innerWidth);
  const navigation = useNavigate();

  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  const notifyError = (data) => toast.error(data);
  const notifySuccess = (data) => toast.success(data);

  const Logout = async () => {
    googleLogout();
    await axios
      .get("https://server.ideavista.online/api/logout", null, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(authActions.logout());
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
          notifyError("Not Autorizated");
        }
        setBase64Image(res.data.fetched.Profile);
      })
      .catch((err) => {
        if (err.response.request.status === 401) {
          window.location.pathname = "/";
        }
      });
  };
  useEffect(() => {
    if (width <= 650) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [style]);

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
    setnavProfile(!navProfile);
  };

  return (
    <>
      {width >= 650 ? (
        <nav className="h-14  bg-gradient-to-l from-blue-300 to-teal-300  relative flex text-gray-700 items-center justify-between">
          <div className="ml-7 w-44 cursor-pointer">
            <p
              className="text-3xl font-laila  font-bold bg-gradient-to-r text-transparent from-blue-600 to-pink-500 bg-clip-text"
              onClick={() => navigation("/feedPost")}
            >
              Ideavista{" "}
              <sup className="font-laila  font-bold bg-gradient-to-r text-transparent from-blue-600 to-pink-500 bg-clip-text">
                24
              </sup>
            </p>
          </div>
          <div>
            <Toaster />
          </div>

          <div className="flex gap-x-20 mx-10 items-center text-black relative ">
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "allPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/feedPost")}
            >
              All Ideas
            </p>
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "myPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/getUserPost")}
            >
              My Ideas
            </p>
            <p
              className={`cursor-pointer font-bold font-serif relative  uppercase home ${
                style === "addPost" ? "home1 text-pink-600" : ""
              } `}
              onClick={() => navigation("/createPost")}
            >
              Share Ideas
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
                    <MenuItem onClick={() => navigation("/account")}>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={() => navigation("/deleteaccount")}>
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
                    <MenuItem onClick={() => navigation("/settings")}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
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
        <div className=" flex  ">
          <BottomNavigation
            showLabels
            value={upload}
            onChange={(event, newValue) => {
              setupload(newValue);
            }}
            className=" w-screen bottom-0 fixed  z-50 flex flex-nowrap "
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={() => navigation("/feedPost")}
              sx={style === "allPost" ? { color: "royalblue" } : ""}
            />
            <BottomNavigationAction
              label="MyIdeas"
              icon={<TipsAndUpdates />}
              onClick={() => navigation("/getuserPost")}
              sx={style === "myPost" ? { color: "royalblue" } : ""}
            />
            <BottomNavigationAction
              label="ShareIdeas"
              icon={<PostAdd />}
              onClick={() => navigation("/createPost")}
              sx={style === "addPost" ? { color: "royalblue" } : ""}
            />
            <BottomNavigationAction
              className="cursor-pointer"
              onClick={() => setnavProfile(!navProfile)}
              label="Profile"
              icon={
                <div>
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
              }
            />
          </BottomNavigation>
          <Menu
            className="-mt-16 relative"
            anchorEl={anchorEl}
            id="account-menu"
            open={navProfile}
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

                  bottom: 0,
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
            <MenuItem onClick={() => navigation("/account")}>
              <Avatar /> My account
            </MenuItem>
            <Divider />

            <MenuItem onClick={() => navigation("/deleteaccount")}>
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
            <MenuItem onClick={() => navigation("/settings")}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
export default Navigation;
