import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Design from "../LoginComponents/Logo_Design";
import "./button.css";
import { motion } from "framer-motion";

function LandingPage() {
  const [width, setWidth] = useState(window.innerWidth);
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
    <div className="  overflow-hidden box-content">
      <div className=" flex justify-between max-sm:justify-around lg:mx-20 items-center p-2">
        <p className="text-5xl max-sm:text-xl font-title bg-gradient-to-tr from-pink-600 bg-clip-text text-transparent to-teal-500  font-bold my-2">
          Express Your Thoughts
        </p>
        <Link to="/signup">
          <div>
            <div className="btn-conteiner">
              <a className="btn-content" href="./#">
                {width >= 650 ? (
                  <span className="btn-title">Start Journey</span>
                ) : (
                  <span className="btn-title">Start</span>
                )}
                <span className="icon-arrow">
                  <svg
                    width="66px"
                    height="43px"
                    viewBox="0 0 66 43"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="arrow"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        id="arrow-icon-one"
                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        id="arrow-icon-two"
                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        id="arrow-icon-three"
                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </Link>
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
