import React, { useEffect, useState } from "react";
import Navigation1 from "./navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FeedUserProfile from "./FeedUserProfile";
import "./userPostButton.css";
import toast from "react-hot-toast";
import { RWebShare } from "react-web-share";
import { Share } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AllPost() {
  const [data, setdata] = useState([]);
  const [doubleClick, setDoubleClick] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const [loading, setloading] = useState(true);
  const [deleteLoad, setDeleteLoad] = useState("");
  var st;

  const [isEndOfPage, setIsEndOfPage] = useState(false);

  const handleScroll = () => {
    const scrolledHeight = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrolledHeight + windowHeight >= totalHeight - 50) {
      setIsEndOfPage(true);
    } else {
      setIsEndOfPage(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigation = useNavigate();

  const svgStyle = {
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    imageRendering: "optimizeQuality",
    fillRule: "evenodd",
    clipRule: "evenodd",
  };
  const notifyError = (data) => toast.error(data);
  const notifyLoading = (data) => toast.success(data);
  axios.defaults.withCredentials = true;
  const fetch = async () => {
    try {
      await axios
        .get("https://server.ideavista.online/api/allpost", null, {
          withCredentials: true,
        })
        .then((res) => {
          setdata(res.data.fetched);
        });
    } catch (err) {
      notifyError("Error in fetching data");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (isEndOfPage) {
      fetch();
      const nav = document.getElementById("navigation");
      nav.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      return;
    }
  }, [isEndOfPage]);

  useEffect(() => {
    fetch();
  }, []);

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

  const handleImageDoubleClick = (imageData) => {
    setClickedImage(imageData);
    setDoubleClick(true);
  };
  const handleCloseModal = () => {
    setDoubleClick(false);
  };

  return (
    <>
      <div className="min-h-[38rem]">
        {" "}
        <div className="" id="navigation">
          <Navigation1 value={"allPost"} />
        </div>
        <div className="flex gap-x-20 flex-wrap justify-center overflow-hidden lg:mt-10 max-sm:mx-2">
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
          ) : data.length >= 1 ? (
            Array.from(data).map((val, i) => (
              <div
                className="w-[60rem] min-h-[30rem] border-2 rounded-lg p-3 border-blue-300 my-2 overflow-hidden shadow-inner shadow-blue-200 text-black"
                key={i}
              >
                <div className="flex items-center  gap-x-2  font-roboto flex-wrap">
                  <div className="flex items-center flex-wrap    justify-between w-[58rem] ">
                    <div className="flex gap-x-3 items-center ">
                      <div className="w-10 h-10 rounded-full ">
                        <FeedUserProfile userdata={val.userProfile} />
                      </div>
                      <div>
                        <p className=" h-7">{val.username} </p>
                      </div>
                    </div>
                    <div className="">
                      <RWebShare
                        data={{
                          text: "Ideavista",
                          title: "Ideavista share",
                          url: `https://www.ideavista.online/post/${val._id}`,
                        }}
                        onClick={() => notifyLoading("Linked Generated")}
                      >
                        <p className="cursor-pointer text-blue-600">
                          {" "}
                          <Share sx={{ fontSize: "30px" }} />
                        </p>
                      </RWebShare>
                    </div>
                  </div>
                </div>
                <div key={i} className="mt-2 text-lg tracking-wide">
                  <div className="mx-auto font-semibold flex justify-center mb-2">
                    <p className="text-xl w-fit border-b-2 border-blue-600">
                      {" "}
                      {val.title}
                    </p>
                  </div>
                  <div
                    className={`text-black text-justify  ${
                      deleteLoad ? "line-clamp-none" : "line-clamp-2"
                    }`}
                  >
                    {val.description}
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
                  <div className="select-none overflow-hidden  mt-6 relative">
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
                          <div>
                            <img
                              src={image.url}
                              alt="prp"
                              className={`w-[60rem] h-[20rem]  object-contain cursor-pointer`}
                              onDoubleClick={() =>
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
            ))
          ) : (
            <div>
              <p className="font-serif text-4xl font-semibold text-blue-600 capitalize tracking-wider max-sm:text-2xl max-sm:mt-20 lg:mb-6">
                Server has no Post
              </p>
              <div className="flex justify-center items-center my-3 flex-col cursor-pointer  max-sm:mt-20">
                <button
                  onClick={() => {
                    fetch();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="uppercase tracking-wider"
                >
                  Refresh
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
        <div className="fixed  top-0 z-50 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
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
    </>
  );
}

export default AllPost;
