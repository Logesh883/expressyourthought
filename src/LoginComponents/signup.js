import React, { useState, useEffect } from "react";

import { Alert, TextField } from "@mui/material";
import Design from "./Logo_Design";
import axios from "axios";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import "../Views/userPostButton.css";
function Signup() {
  var phoneno = /^\d{10}$/;
  var regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [show, setshow] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const navigation = useNavigate();
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const Sign = async () => {
    if (
      FirstName !== "" &&
      LastName !== "" &&
      Email !== "" &&
      MobileNumber !== "" &&
      Password !== "" &&
      ConfirmPassword !== ""
    ) {
      if (MobileNumber.match(phoneno) && Email.match(regex)) {
        if (Password.length >= 8 && Password === ConfirmPassword) {
          const res = await reg();
          if (!res.data) {
            await axios
              .post("https://express-be.vercel.app/post", {
                FirstName,
                LastName,
                Email,
                MobileNumber,
                Password,
                ConfirmPassword,
              })
              .then((res) => {
                setsuccess(res.data.msg);
                setTimeout(() => {
                  navigation("/login");
                }, 3000);
              })
              .catch((err) => {
                console.log(err);
              });
            setPassword("");
            setEmail("");
            setFirstName("");
            setLastName("");
            setMobileNumber("");
            setConfirmPassword("");
          } else {
            seterror("User already registered with this email");
            setPassword("");
            setEmail("");
            setFirstName("");
            setLastName("");
            setMobileNumber("");
            setConfirmPassword("");
          }
        } else {
          seterror("Check Password");
        }
      } else {
        seterror("Enter valid email address");
      }
    } else {
      seterror("enter all details");
    }
    setTimeout(() => {
      seterror("");
      setsuccess("");
    }, 4000);
  };

  const reg = async () => {
    const response = await axios.get(
      "https://express-be.vercel.app/api/check",
      {
        params: { Email },
      }
    );
    return response;
  };

  return (
    <>
      <div className="lg:flex flex-wrap lg:h-screen gap-x-60 relative max-sm:overflow-x-hidden ">
        <div className="lg:w-96 lg:mt-40 lg:ml-40 max-sm:mt-3 max-sm:ml-3 max-sm:h-28 ">
          <Design className="" />
          <div className="lg:mt-32 max-sm:mt-8">
            <p
              className="my-2 text-lg font-serif tracking-wider hover:underline cursor-pointer"
              onClick={() => {
                navigation("/smallloader");
                setTimeout(() => {
                  navigation("/login");
                }, 1400);
              }}
            >
              Already have an account?
            </p>
            <button
              onClick={() => {
                navigation("/smallloader");
                setTimeout(() => {
                  navigation("/login");
                }, 1400);
              }}
              className="lg:w-[30rem] capitalize max-sm:w-[22rem] font-serif h-14 tracking-wider"
            >
              go to login
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
        <div className="absolute lg:right-5  lg:top-10  capitalize text-2xl font-serif w-96 lg:overflow-hidden max-sm:fixed max-sm:top-4 max-sm:left-1">
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

        <div className=" flex items-start justify-start flex-col mt-60 lg:mt-2 lg:gap-y-1 max-sm:mx-5 max-sm:gap-y-3 ">
          {width >= 650 ? (
            <p className="capitalize text-2xl max-sm:mb-4 max-sm:ml-8 ml-20">
              Signup to{" "}
              <span className="font-title text-6xl font-bold capitalize ml-2">
                Express Your thoughts{" "}
              </span>
            </p>
          ) : (
            <div className="mx-auto max-sm:mt-2">
              <p className="font-serif text-3xl tracking-wider font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                Signup
              </p>
            </div>
          )}

          <div className="flex flex-col gap-y-2 max-sm:mt-2 ">
            <label className="text-xl capitalize">FirstName</label>
            <TextField
              variant="outlined"
              value={FirstName}
              className="lg:w-[30rem] lg:ml-3 max-sm:w-[22rem]"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-xl capitalize">LastName</label>
            <TextField
              variant="outlined"
              value={LastName}
              className="lg:w-[30rem] ml-3 max-sm:w-[22rem]"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-xl capitalize">MobileNumber</label>
            <TextField
              variant="outlined"
              value={MobileNumber}
              className="lg:w-[30rem] ml-3 max-sm:w-[22rem]"
              type="tel"
              inputProps={{ maxLength: 10 }}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-xl capitalize">Email</label>
            <TextField
              variant="outlined"
              value={Email}
              className="lg:w-[30rem] ml-3 max-sm:w-[22rem]"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 relative">
            <label className="text-xl capitalize">
              Password{" "}
              <span className="text-sm">
                (Don't Forget Your Password !!Changing password is available in
                V2)
              </span>
            </label>
            <TextField
              variant="outlined"
              value={Password}
              className="lg:w-[30rem] ml-3 max-sm:w-[22rem]"
              type={Password.length >= 1 && show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              onClick={() => {
                if (Password.length >= 1) setshow(!show);
              }}
              className="cursor-pointer absolute lg:right-12 right-3 top-[53%] max-sm:top-[65%]"
            >
              {Password.length >= 1 && show ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2 ">
            <label className="text-xl ">Re-enter Password</label>
            <TextField
              variant="outlined"
              value={ConfirmPassword}
              type="password"
              className="lg:w-[30rem] ml-3 max-sm:w-[22rem]"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-[30rem]  lg:my-3 mb-10">
            <button
              onClick={() => Sign()}
              className="max-sm:w-[22rem] lg:w-[30rem] uppercase tracking-wider"
            >
              signin
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
      </div>
    </>
  );
}
export default Signup;
