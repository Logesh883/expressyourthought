import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import FeedUserProfile from "./FeedUserProfile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./userPostButton.css";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import "./Share.css";
import nodata from "../Images/nodata.jpg";

function SharedPost() {
  const { id } = useParams();
  const [data, setdata] = useState("");
  var st;

  const [deleteLoad, setDeleteLoad] = useState("");
  const [doubleClick, setDoubleClick] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const notifyError = (data) => toast.error(data);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getSharedPost();
  }, []);
  const handleImageDoubleClick = (imageData) => {
    setClickedImage(imageData);
    setDoubleClick(true);
  };
  const handleCloseModal = () => {
    setDoubleClick(false);
  };

  async function getSharedPost() {
    setloading(true);
    await axios
      .get(`https://server.ideavista.online/api/sharepost/${id}`)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.description.length > 210) {
          st = true;
        }
        setdata(res.data.data);
      })
      .catch((err) => notifyError(err.message))
      .finally(() => setloading(false));
  }
  return (
    <>
      <div className="min-h-[34rem]">
        <div className="flex justify-between mx-10 my-3 items-center flex-wrap ">
          <div className="flex flex-wrap font-laila bg-gradient-to-tl from-blue-600 to-pink-500 bg-clip-text text-transparent max-sm:mx-auto">
            <p className="font-bold text-4xl">
              Ideavista{" "}
              <sup className="font-laila  font-bold bg-gradient-to-r text-transparent from-blue-600 to-pink-500 bg-clip-text">
                24
              </sup>
            </p>
          </div>
          <div className="max-sm:hidden">
            <Link to="/">
              <button class="btn " type="button">
                <strong className="font-roboto text-lg fond-bold">
                  Start Yours
                </strong>{" "}
                <span class="icon">
                  <ArrowRightAltOutlined />
                </span>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div class="circle"></div>
                  <div class="circle"></div>
                </div>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex  justify-center items-center flex-wrap mx-3">
          {loading ? (
            <div className="w-[60rem] h-[30rem] border-2 rounded-lg p-3 border-slate-300 animate-pulse my-2 overflow-hidden">
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
          ) : data ? (
            <div className="w-[60rem] min-h-[30rem] border-2 rounded-lg p-3 border-blue-300 my-2 overflow-hidden shadow-inner shadow-blue-200 text-black flex-wrap">
              <div>
                <Toaster />
              </div>

              <div className="flex items-center  gap-x-2  font-roboto flex-wrap">
                <div className="flex items-center flex-wrap    justify-between w-[58rem] ">
                  <div className="flex gap-x-3 items-center ">
                    <div className="w-10 h-10 rounded-full ">
                      <FeedUserProfile userdata={data.userProfile} />
                    </div>
                    <div>
                      <p className=" h-7">{data.username} </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-lg tracking-wide">
                <div className="mx-auto font-semibold flex justify-center mb-2">
                  <p className="text-xl w-fit border-b-2 border-blue-600">
                    {" "}
                    {data.title}
                  </p>
                </div>
                <div
                  className={`text-black text-justify  ${
                    deleteLoad ? "line-clamp-none" : "line-clamp-2"
                  }`}
                >
                  {data.description}
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
                <div className="select-none overflow-hidden   mt-6 relative">
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
                  >
                    {Array.from(data.image).map((image, i) => (
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
          ) : (
            <div>
              <img
                src={nodata}
                alt="no data found"
                className="w-[35rem] flex justify-center"
              />
              <p className="font-roboto flex text-xl max-sm:justify-center text-center my-2 text-red-500 ">
                There is no post under the link or the post is deleted by owner
                of the post
              </p>
            </div>
          )}

          <div className="max-sm:block hidden my-3">
            <Link to="/">
              <button class="btn " type="button">
                <strong className="font-roboto text-lg fond-bold">
                  Start Yours
                </strong>{" "}
                <span class="icon">
                  <ArrowRightAltOutlined />
                </span>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div class="circle"></div>
                  <div class="circle"></div>
                </div>
              </button>
            </Link>
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
                  <CloseOutlined />
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
        {data && (
          <div>
            <p className="text-wrap">
              <span>Disclaimer:</span> This content is provided for
              informational purposes only. The views and opinions expressed in
              this content are those of the author and do not necessarily
              reflect the official policy or position of Ideavista. Any action
              you take upon the information provided in this content is strictly
              at your own risk, and Ideavista will not be liable for any losses
              or damages in connection with the use of this content. Please seek
              professional advice before making any decisions.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SharedPost;
