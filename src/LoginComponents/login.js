import React, { useState, useEffect } from "react";
import Design from "./Logo_Design";
import { TextField, Alert } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import "../Views/userPostButton.css";

function Login() {
  const [Email, setEmail] = useState("");
  const navigation = useNavigate();
  const [Password, setPassword] = useState("");
  const [show, setshow] = useState(false);
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const navigate = useNavigate();
  var regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [width, setWidth] = useState(window.innerWidth);
  const svgStyle = {
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    imageRendering: "optimizeQuality",
    fillRule: "evenodd",
    clipRule: "evenodd",
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Login = async () => {
    const response = await axios.get(
      "/api/check",
      {
        params: { Email },
      }
    );
    if (!response.data) {
      seterror("UserEmail not Found");
    } else {
      if (Email !== "" && Password !== "") {
        if (Email.match(regex)) {
          const response = await axios.get(
            "/api/login",
            {
              params: { Email, Password },
            }
          );
          if (response.data) {
            setsuccess("Login successfull");

            navigate("/smallloader", { state: Email });

            setTimeout(() => {
              navigate("/feedPost ", { state: Email });
            }, 3000);
            setEmail("");
            setPassword("");
          } else {
            seterror("incorrect Password");
          }
        } else {
          seterror("enter valid email");
        }
      } else {
        seterror("Enter required field");
      }
    }
    setTimeout(() => {
      seterror("");
      setsuccess("");
    }, 4000);
  };

  return (
    <>
      <div className="flex lg:gap-x-60 flex-wrap ">
        <div className="lg:w-96 lg:mt-48  lg:ml-40 max-sm:mt-3 max-sm:ml-3 max-sm:h-28 ">
          <Design className="" />
          <div className="lg:mt-16 max-sm:mt-8 max-sm:mx-3 flex flex-col items-center flex-wrap relative">
            <p
              className="my-2 text-lg font-serif tracking-wider  hover:underline cursor-pointer"
              onClick={() => {
                navigation("/smallloader");
                setTimeout(() => {
                  navigation("/signup");
                }, 1400);
              }}
            >
              Don't have an account?
            </p>

            <button
              onClick={() => {
                navigation("/smallloader");
                setTimeout(() => {
                  navigation("/signup");
                }, 1400);
              }}
              className="lg:w-[30rem] capitalize max-sm:w-[22rem] font-serif h-14 tracking-wider"
            >
              go to signup
              <div className="star-1">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={svgStyle}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-2">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={svgStyle}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-3">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={svgStyle}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-4">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={svgStyle}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-5">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={svgStyle}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-6">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={svgStyle}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div
          className="absolute lg:right-5 max-sm:right-2 lg:top-10  capitalize text-2xl font-serif w-96 lg:overflow-hidden max-sm:fixed max-sm:top-4 max-sm:left-1"
          initial={{ x: "30vh" }}
          animate={{
            x: 0,
            transition: {
              ease: "linear",
              duration: 10,
            },
          }}
        >
          {error && (
            <motion.div
              initial={{ x: "30vh" }}
              animate={{
                x: 0,
                transition: {
                  type: "spring",
                  duration: 2,
                  bounce: 0.2,
                },
              }}
            >
              <Alert
                severity="error"
                variant="standard"
                sx={{ fontSize: "18px" }}
              >
                {error}
              </Alert>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ x: "30vh" }}
              animate={{
                x: 0,
                transition: {
                  type: "spring",
                  duration: 2,
                  bounce: 0.2,
                },
              }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ fontSize: "18px" }}
              >
                {success}
              </Alert>
            </motion.div>
          )}
        </div>
        <div className="flex  flex-col   lg:mt-44 max-sm:mt-60 lg:gap-y-5 max-sm:mx-auto max-sm:gap-y-3 ">
          {width >= 650 ? (
            <p className="capitalize font-serif text-2xl max-sm:mb-4 max-sm:ml-10  text-wrap">
              Login to{" "}
              <span className="font-title text-6xl  font-bold capitalize ml-2 max-sm:ml-8 max-sm:text-center text-wrap">
                Express Your thoughts{" "}
              </span>
            </p>
          ) : (
            ""
          )}
          <div className="flex flex-col lg:gap-y-2 max-sm:mt-8 flex-wrap">
            <label className="text-xl capitalize mb-2">Email</label>
            <TextField
              variant="outlined"
              value={Email}
              type="email"
              className="lg:w-[30rem] lg:ml-3  max-sm:w-[22rem]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 relative flex-wrap">
            <label className="text-xl capitalize">Password</label>
            <TextField
              variant="outlined"
              value={Password}
              type={Password.length >= 1 && show ? "text" : "password"}
              className="lg:w-[30rem] ml-3 max-sm:w-[22rem]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => {
                if (Password.length >= 1) setshow(!show);
              }}
              className="cursor-pointer absolute right-3 top-[53%]"
            >
              {show && Password.length >= 1 ? (
                <Visibility />
              ) : (
                <VisibilityOff />
              )}
            </div>
          </div>
          <button
            onClick={() => {
              Login();
            }}
            className=" tracking-wider"
          >
            Login
            <div className="star-1">
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 784.11 815.53"
                style={svgStyle}
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    className="fil0"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="star-2">
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 784.11 815.53"
                style={svgStyle}
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    className="fil0"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="star-3">
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 784.11 815.53"
                style={svgStyle}
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    className="fil0"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="star-4">
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 784.11 815.53"
                style={svgStyle}
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    className="fil0"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="star-5">
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 784.11 815.53"
                style={svgStyle}
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    className="fil0"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="star-6">
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 784.11 815.53"
                style={svgStyle}
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    className="fil0"
                  ></path>
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
export default Login;
