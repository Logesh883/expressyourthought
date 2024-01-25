import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import "./userPostButton.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Design from "../LoginComponents/Logo_Design";
import { Alert } from "@mui/material";

function CreatePost() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [files, setfiles] = useState([]);

  const [status, setstatus] = useState("");
  const [statuserror, setstatuserror] = useState("");
  const location = useLocation();
  const [loadingPost, setLoadingPost] = useState(false);
  const Email = location.state;
  const imageRef = useRef([]);
  const [width, setWidth] = useState(window.innerWidth);
  const navigation = useNavigate();
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

  const Postcreation = async (e) => {
    e.preventDefault();
    setLoadingPost(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    for (let index = 0; index < files.length; index++) {
      formData.append("postimage", files[index]);
    }
    if (title === "" || description === "") {
      setstatuserror("Fill required fields");
      setLoadingPost(false);
      setTimeout(() => {
        setstatuserror("");
      }, 4000);
      return;
    }
    if (files.length > 4) {
      setstatuserror("Only 4 Images allowed per Post");
      setLoadingPost(false);
      setTimeout(() => {
        setstatuserror("");
      }, 3000);
      return;
    }
    axios.defaults.withCredentials = true;
    await axios
      .post(`https://server.ideavista.online/api/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        setstatus(res.data.msg);
        settitle("");
        setdescription("");
        setfiles("");
        imageRef.current = "";
        setTimeout(() => {
          setstatus("");
        }, 4000);
      })
      .catch((err) => {
        setstatuserror(err.response.data.err);
        setTimeout(() => {
          setstatuserror("");
        }, 4000);
      })
      .finally(() => {
        setLoadingPost(false);
      });
  };
  const Remove = (val, i) => {
    const Updatedfiles = [...files];
    Updatedfiles.splice(i, 1);
    setfiles(Updatedfiles);
  };

  return (
    <div className="bg-slate-100 min-h-[110vh] max-sm:min-h-screen">
      <div>
        <Navigation value={"addPost"} />
      </div>
      <div className="  lg:mt-3  ">
        {width >= 650 ? (
          <p className="text-center text-2xl font-bold uppercase tracking-wider">
            Create Post
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center max-sm:flex-col flex-wrap justify-between mx-20">
          {width >= 650 ? (
            <div
              className="ml-30 w-[30rem] 
          "
            >
              <Design />
            </div>
          ) : (
            <p className="text-3xl font-title  font-bold my-2">Ideavista</p>
          )}
          <div className="lg:w-[40rem]  flex max-sm:flex-wrap  lg:mt-10 max-sm:my-8 border-2 rounded-lg border-x-red-400 border-y-blue-600  max-sm:mb-20  ">
            <form
              onSubmit={(e) => Postcreation(e)}
              encType="multipart/form-data"
              className=" max-sm:w-[340px] p-5 overflow-hidden rounded-lg "
            >
              <div className="my-2 lg:ml-4">
                <label className="text-lg uppercase tracking-wider ">
                  Title
                </label>
                <div className="mt-2 ">
                  <input
                    type="text"
                    className="w-[35rem] max-sm:w-72 h-10 pl-2 bg-transparent focus:outline-2 focus:outline-red-400 rounded-lg outline outline-1 outline-slate-400"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
              <div className="lg:ml-4">
                <label className="text-lg uppercase tracking-wider ">
                  Description
                </label>
                <div className="">
                  {" "}
                  <textarea
                    type="text"
                    className="resize-y min-h-60 w-[35rem] max-sm:w-72 p-2 bg-transparent  outline outline-1 outline-slate-400 rounded-lg focus:outline-2 focus:outline-red-400"
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                  />
                </div>
              </div>
              <div className="mt-3 lg:ml-4">
                <div className="bg-red-500 h-12 relative  w-[35rem] max-sm:w-72 rounded-lg">
                  <input
                    type="file"
                    name="postimage"
                    className="opacity-0 mt-2 w-[35rem] max-sm:w-72 h-12  cursor-pointer"
                    multiple
                    ref={imageRef}
                    onChange={(e) => {
                      setfiles(e.target.files);
                    }}
                  />
                  {files.length <= 0 ? (
                    <p className="absolute top-3 left-48 max-sm:left-14 font-bold text-white capitalize tracking-widest">
                      <span className="mr-2 mb-6">
                        <FileUploadIcon />
                      </span>
                      Choose your Files
                    </p>
                  ) : (
                    <p className="absolute top-3 left-48 max-sm:left-20 font-bold text-white capitalize tracking-widest">
                      {files.length}{" "}
                      {files.length === 1 ? "File selected" : "Files selected"}
                    </p>
                  )}
                </div>
                <div>
                  {files.length > 0 ? (
                    <div className="my-2 flex flex-wrap gap-x-3">
                      {Array.from(files).map((val, i) => (
                        <div key={i}>
                          <div className="flex bg-green-200 ring-2 ring-green-600 rounded-lg mb-2 items-center w-[120px] h-[30px] hover:scale-105 transition-all duration-150 hover:ring-red-600 hover:bg-red-200 group">
                            <p className=" mb-2 rounded-lg text-wrap w-[90px] h-[30px] overflow-clip p-1">
                              {val.name}
                            </p>
                            <span
                              className="hover:cursor-pointer group-hover:text-blue-600"
                              onClick={() => Remove(val, i)}
                            >
                              <CloseIcon />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mx-auto  w-fit p-2 mt-4 ">
                {loadingPost ? (
                  <div
                    className="border h-12 w-40 flex justify-center items-center"
                    style={{
                      padding: "12px 35px",
                      background: " #4c83fa",
                      fontSize: 17,
                      fontWeight: 1000,
                      color: "#ffffff",
                      border: "3px solid #4c83fa",
                      borderRadius: 8,
                      boxShadow: "0 0 0 #ffffff",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <div className="h-8 w-8 border-4 animate-spin border-t-transparent border-white rounded-full"></div>
                  </div>
                ) : (
                  <button>
                    Create
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
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {status && (
        <div className="absolute w-[20%] right-7 top-14 max-sm:fixed max-sm:w-96 max-sm:left-2">
          <Alert severity="success" sx={{ width: "100%" }}>
            <p className="capitalize font-semibold tracking-wider">{status}</p>
          </Alert>
        </div>
      )}
      {statuserror && (
        <div className="absolute w-[20%] right-7 top-14 max-sm:fixed max-sm:w-96 max-sm:left-2">
          <Alert severity="error" sx={{ width: "100%" }}>
            <p className="capitalize font-semibold tracking-wider">
              {statuserror}
            </p>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
