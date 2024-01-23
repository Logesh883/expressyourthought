import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Design from "../LoginComponents/Logo_Design";
import "./button.css";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function LandingPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [state, setstate] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  axios.defaults.withCredentials = true;

  const handleSuccess = async (res) => {
    console.log("handleCloseModal");
    const decode = jwtDecode(res.credential);
    setstate(!state);
    const { name, email, picture } = decode;
    await axios
      .post("http://localhost:4000/post", {
        name,
        email,
        picture,
      })
      .then(() => {})
      .catch((err) => console.log(err));
    await Login(email)
      .then((res) => {
        if (res.data) {
          console.log(res.data.msg);
          navigation("/feedPost");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    CheckLogin()
      .then((res) => {
        if (res.data) {
          setstate(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (state) {
          navigation("/feedpost");
        }
      });
  });

  const CheckLogin = async () => {
    return await axios.get("http://localhost:4000/api/check", null, {
      withCredentials: true,
    });
  };

  const Login = async (email) => {
    return await axios.get("http://localhost:4000/api/login", {
      params: { email },
    });
  };

  return (
    <div className="  overflow-hidden box-content">
      <div className=" flex justify-between max-sm:justify-around lg:mx-20 items-center p-2">
        <p className="text-5xl max-sm:text-xl font-title bg-gradient-to-tr from-pink-600 bg-clip-text text-transparent to-teal-500  font-bold my-2 ">
          Express Your Thoughts
        </p>

        {width >= 650 ? (
          <div>
            {state ? (
              <GoogleLogin
                onSuccess={(res) => handleSuccess(res)}
                onError={(err) => console.log(err)}
                theme="filled_blue"
                shape="square"
                width={150}
              />
            ) : (
              <div className="flex gap-2 ">
                <button>Start Journey</button>
                <button>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="">
            {state ? (
              <GoogleLogin
                onSuccess={(res) => handleSuccess(res)}
                onError={(err) => console.log(err)}
                theme="filled_blue"
                shape="square"
                width={400}
              />
            ) : (
              <div>
                <button>Start Journey</button>
                <button>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
      <motion.div
        className="my-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Design />
      </motion.div>
      <div className="flex lg:gap-x-80 max-sm:gap-x-10 justify-center mt-6  flex-wrap">
        <div className="w-[20rem] text-justify ">
          <motion.p
            className="text-xl font-bold uppercase tracking-wider relative w-fit home "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            About
          </motion.p>
          <motion.p
            className="mt-1 text-slate-600 font-semibold leading-7 tracking-wide "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            "Express your thoughts" is a social media platform designed to
            provide users with a space to share their thoughts, ideas, and
            experiences through posts. Inspired by platforms like Instagram, it
            offers a visually appealing and user-friendly interface to encourage
            users to express themselves creatively.
          </motion.p>
        </div>
        <div className="w-[20rem] text-justify max-sm:mt-3 ">
          <motion.p
            className="text-xl font-bold uppercase tracking-wider relative w-fit home "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Goals
          </motion.p>
          <motion.p
            className="mt-1 text-slate-600 font-semibold leading-7 tracking-wide "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            The primary goal of "Express your thoughts" is to provide a platform
            for users to share their thoughts and ideas in a visually appealing
            and interactive manner. The project aims to foster a sense of
            community, creativity, and self-expression.
          </motion.p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center gap-y-2 mt-4 flex-wrap mb-2">
        <motion.p
          className="text-lg font-semibold hover:underline w-fit"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          Release Notes
          <span className="ml-2">(Version 1.0)</span>
        </motion.p>
        <motion.ol className="ml-4 list-disc max-sm:list-disc text-lg tracking-wider  flex flex-col flex-wrap p-2 ">
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            Empowers users to express ideas and thoughts seamlessly through
            images and content
          </motion.li>
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            Each user is assigned a unique profile for sharing posts on the
            platform.
          </motion.li>
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.8 }}
          >
            Security is bolstered through the implementation of authentication.
          </motion.li>
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 4.2 }}
          >
            Enhance your profile on 'Express your thoughts' by setting a unique
            profile picture through the user settings.
          </motion.li>
        </motion.ol>
      </div>
    </div>
  );
}

export default LandingPage;
