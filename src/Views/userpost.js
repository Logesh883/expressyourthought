import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import Navigation1 from "./navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./userPostButton.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import toast, { Toaster } from "react-hot-toast";

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
  const [postLoading, setPostLoading] = useState({});
  const notifyError = (data) => toast.error(data);
  const nottifySuccess = (data) => toast.success(data);

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
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://server.ideavista.online/api/getUserPost`,
          null,
          {
            withCredentials: true,
          }
        );

        setUserPost(response.data.post);
      } catch (err) {
        notifyError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Email, statusdelete]);

  const removePost = async (val) => {
    setPostLoading((prev) => ({ ...prev, [val]: true }));
    await axios
      .delete(`https://server.ideavista.online/api/removePost/${val}`)
      .then((res) => {
        nottifySuccess(res.data.message);
      })
      .catch((err) => notifyError(err.message || "Not deleted"))
      .finally(() => {
        setPostLoading((prev) => ({ ...prev, [val]: false }));
      });

    setTimeout(() => {
      setstatusdelete("");
    }, 4000);
  };
  var st;
  return (
    <React.Fragment>
      <div className="min-h-[38rem]">
        <div className="max-sm:overflow-hidden">
          <Navigation1 value={"myPost"} />
        </div>
        <div>
          <Toaster />
        </div>
        <div className="flex gap-x-20 flex-wrap justify-center overflow-hidden lg:mt-10 max-sm:mx-2 max-sm:mb-20">
          {width >= 650 ? (
            ""
          ) : (
            <p className="text-3xl font-laila  font-bold my-2">Ideavista</p>
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
                className={` select-text my-2 w-[60rem] min-h-[30rem] border-2 rounded-lg p-3 border-blue-300  overflow-hidden shadow-inner shadow-blue-200`}
                key={i}
              >
                {postLoading[val._id] ? (
                  <div className="flex items-center flex-wrap   justify-center object-contain w-[60rem] h-[30rem]  flex-col bg-teal-100">
                    <div class="flex flex-row gap-2">
                      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-roboto">
                      <UserProfile
                        userdata={val.username}
                        userimage={val.userProfile[0]}
                        remove={() => {
                          removePost(val._id);
                        }}
                      />
                    </div>

                    <div
                      key={i}
                      className="mt-2 font-roboto text-lg tracking-wide"
                    >
                      <div className="mx-auto font-semibold flex justify-center mb-2 ">
                        <p className="text-xl w-fit border-b-2 border-blue-600">
                          {val.title}
                        </p>
                      </div>
                      <div
                        className={`text-black h-14 overflow-hidden text-ellipsis group line-clamp-2   ${
                          deleteLoad
                            ? "overflow-visible h-fit line-clamp-none"
                            : ""
                        }`}
                      >
                        <p className="text-justify">{val.description}</p>
                        {(() => {
                          st = false;
                          if (val.description.length > 210) {
                            st = true;
                          }
                        })()}
                      </div>

                      {deleteLoad ? (
                        <p
                          onClick={() => setDeleteLoad(!deleteLoad)}
                          className="text-blue-500 font-bold cursor-pointer hover:text-blue-700"
                        >
                          showless...
                        </p>
                      ) : (
                        <p
                          onClick={() => setDeleteLoad(!deleteLoad)}
                          className="text-blue-500 font-bold cursor-pointer hover:text-blue-700 group-target:hidden"
                        >
                          {st ? "readmore..." : ""}
                        </p>
                      )}

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
                                  className={`w-[60rem] h-[20rem] select-none object-contain cursor-pointer  `}
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
            <div className="flex flex-wrap items-center flex-col  ">
              <div className="font-serif text-4xl font-semibold text-blue-600 capitalize tracking-wider max-sm:mt-20">
                Not Yet Posted
              </div>
              <div className="flex max-sm:flex-col max-sm:items-center mt-20 ">
                <button onClick={() => navigator("/createPost")}>
                  Create Post
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
    </React.Fragment>
  );
}

export default UserPost;
