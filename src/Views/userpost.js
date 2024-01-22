import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import Navigation1 from "./navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Alert } from "@mui/material";
import "swiper/css/pagination";
import "./userPostButton.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function UserPost() {
  const [doubleClick, setDoubleClick] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const [UserPost, setUserPost] = useState([]);
  const location = useLocation();
  const navigator = useNavigate();
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const Email = location.state;
  const [width, setWidth] = useState(window.innerWidth);
  const svgStyle = {
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    imageRendering: "optimizeQuality",
    fillRule: "evenodd",
    clipRule: "evenodd",
  };

  useEffect(() => {
    if (!Email) {
      setstatusdelete("Autorization failed Login again");
      setTimeout(() => {
        navigator("/login");
        setstatusdelete("");
      }, 3000);
    }
  }, [Email, navigator]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [statusdelete, setstatusdelete] = useState("");

  const handleImageDoubleClick = (imageData) => {
    if ("ontouchstart" in window === false) {
      setClickedImage(imageData);
      setDoubleClick(true);
    } else {
      const currentTime = new Date().getTime();
      const clickTime = currentTime - lastClickTime;
      if (clickTime < DOUBLE_CLICK_DELAY) {
        setClickedImage(imageData);
        setDoubleClick(true);
      } else {
        setDoubleClick(false);
      }
      lastClickTime = currentTime;
    }
  };

  const DOUBLE_CLICK_DELAY = 300;
  let lastClickTime = 0;

  const handleCloseModal = () => {
    setDoubleClick(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getUserPost/${Email}`
        );

        setUserPost(response.data.post);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Email, statusdelete]);

  const removePost = async (val) => {
    setDeleteLoad(true);
    await axios
      .delete(`http://localhost:4000/api/removePost/${val}`)
      .then((res) => {
        setstatusdelete(res.data.message);
      })
      .catch((err) => console.log(err))
      .finally(() => setDeleteLoad(false));

    setTimeout(() => {
      setstatusdelete("");
    }, 4000);
  };

  return (
    <React.Fragment>
      <div className="">
        <div className="max-sm:overflow-hidden">
          <Navigation1 value={"myPost"} />
        </div>

        <div className="flex gap-x-20 flex-wrap justify-center overflow-hidden lg:mt-10 max-sm:mx-2 max-sm:mb-20">
          {width >= 650 ? (
            ""
          ) : (
            <p className="text-3xl font-title  font-bold my-2">
              Express Your Thoughts
            </p>
          )}
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[60rem] h-[30rem] border-2 rounded-lg p-3 border-slate-300 animate-pulse my-2 overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2 w-[60rem]">
                      <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                      <div>
                        <p className="w-40 h-7 bg-slate-300 rounded-2xl"></p>
                      </div>
                    </div>
                    <div className="mr-2 w-10 h-10 rounded-full bg-slate-300"></div>
                  </div>
                </div>
                <div className="mt-2 rounded-xl w-[58rem] h-[25rem] bg-slate-300">
                  <div></div>
                </div>
              </div>
            ))
          ) : UserPost.length > 0 ? (
            Array.from(UserPost).map((val, i) => (
              <div
                className={` select-text w-[60rem] h-[30rem] border-2 rounded-lg p-3 border-blue-300 my-2 overflow-hidden ${
                  deleteLoad ? "bg-blue-400" : ""
                } `}
                key={i}
              >
                {deleteLoad ? (
                  <div className="flex mt-16 items-center flex-col">
                    <div className="w-40 h-40 rounded-full border-4 animate-spin border-white border-t-transparent "></div>
                    <div className="mt-4">
                      <p className="text-white font-bold text-xl tracking-widest">
                        Deleting....
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <UserProfile
                        userdata={val.username}
                        userimage={val.userProfile[0]}
                        remove={() => {
                          removePost(val._id);
                        }}
                      />
                    </div>

                    <div key={i} className="mt-2">
                      <div>
                        <p>Title: {val.title}</p>
                      </div>
                      <div className="text-black">
                        Description: {val.description}
                      </div>
                      <div className="select-none overflow-hidden  mt-6 relative ">
                        <Swiper
                          spaceBetween={30}
                          centeredSlides={true}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={true}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="mySwiper"
                        >
                          {Array.from(val.image).map((image, i) => (
                            <SwiperSlide key={i}>
                              <div className="">
                                <img
                                  src={image.url}
                                  alt="post"
                                  className={`w-[60rem] h-[20rem] select-none object-contain cursor-pointer`}
                                  onDoubleClick={() =>
                                    handleImageDoubleClick(image.url)
                                  }
                                  onTouchStart={() =>
                                    handleImageDoubleClick(image.url)
                                  }
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-wrap items-center flex-col ">
              <div className="font-serif text-4xl font-semibold text-blue-600 capitalize tracking-wider max-sm:mt-20">
                Not Yet Posted
              </div>
              <div className="flex max-sm:flex-col max-sm:items-center mt-20 ">
                <button
                  onClick={() => navigator("/createPost", { state: Email })}
                >
                  Create Post
                  <div class="star-1">
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
                          class="fil0"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div class="star-2">
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
                          class="fil0"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div class="star-3">
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
                          class="fil0"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div class="star-4">
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
                          class="fil0"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div class="star-5">
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
                          class="fil0"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div class="star-6">
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
                          class="fil0"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {doubleClick && clickedImage && (
        <div className="fixed select-none top-0 z-50 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
          <div className="">
            <div className=" w-full h-full">
              <span
                className="absolute right-5  text-white top-5 cursor-pointer"
                onClick={handleCloseModal}
              >
                <CloseOutlinedIcon />
              </span>
            </div>
            <div>
              <img
                src={clickedImage}
                alt="full-screen"
                className="w-[90%] h-[70%]"
              />
            </div>
          </div>
        </div>
      )}
      {statusdelete && (
        <div className=" z-50 absolute w-[20%] right-7 top-14 max-sm:fixed max-sm:w-96 max-sm:left-2 max-sm:top-2">
          <Alert severity="success" sx={{ width: "100%" }}>
            <p className="capitalize font-semibold tracking-wider">
              {statusdelete}
            </p>
          </Alert>
        </div>
      )}
      {statusdelete === "Autorization failed Login again" && (
        <div className=" z-50 absolute w-[20%] right-7 top-14 max-sm:fixed max-sm:w-96 max-sm:left-2 max-sm:top-2">
          <Alert severity="warning" sx={{ width: "100%" }}>
            <p className="capitalize font-semibold tracking-wider">
              {statusdelete}
            </p>
          </Alert>
        </div>
      )}
    </React.Fragment>
  );
}

export default UserPost;
