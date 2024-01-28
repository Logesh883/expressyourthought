import React, { useEffect, useRef, useState } from "react";
import Navigation from "./navigation";
import Design from "../LoginComponents/Logo_Design";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MenuItem, TextField } from "@mui/material";
import "./Card.css";
import { Cancel, Edit } from "@mui/icons-material";

function EditProfile() {
  const [width, setWidth] = useState(window.innerWidth);
  const [username, setusername] = useState("");
  const [editusername, seteditusername] = useState("");
  const [email, setemail] = useState("");
  const [image, setimage] = useState("");
  const [files, setfiles] = useState(null);
  const [load, setload] = useState(false);
  const [edit, setedit] = useState("");
  const fileInputRef = useRef();
  const ref = useRef();
  const notifySuccess = (data) => toast.success(data);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const notifyError = (data) => toast.error(data);
  const fetchUser = async () => {
    await axios
      .get("https://server.ideavista.online/api/fetchuser")
      .then((res) => {
        setusername(res.data.user[0].UserName);
        setemail(res.data.user[0].Email);
        setimage(res.data.user[0].Profile);
      })
      .catch((err) => notifyError(err.message || "Error in fetching user"));
  };
  useEffect(() => {
    fetchUser();
  });
  let checkedState;
  const Upload = async (e) => {
    e.preventDefault();
    console.log(ref.current.checked);
    if (ref.current.checked) {
      checkedState = true;
    } else {
      checkedState = false;
    }
    if (!editusername && !checkedState && !files) {
      setedit(!edit);
      return notifyError("No updation fields");
    }
    if (!files && checkedState) {
      notifyError("Please select a file to upload.");
      return;
    }
    if (files && !ref.current.checked) {
      return notifyError("Please confirm image uploading");
    }
    if (!editusername) {
      var confirmusername = username;
    } else {
      confirmusername = editusername;
    }
    setload(true);
    const formData = new FormData();
    formData.append("testImage", files);
    formData.append("username", confirmusername);
    formData.append("state", checkedState);

    await axios
      .post(`https://server.ideavista.online/image`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        notifySuccess(res.data.msg);
        fileInputRef.current.value = null;
        setfiles("");
        setedit(!edit);
        window.location.pathname = "/editprofile";
      })
      .catch((err) => {
        console.log(err);
        notifyError(err.message || "Error in upload");
      })
      .finally(() => {
        setload(false);
      });
  };
  return (
    <div className="min-h-[48rem] ">
      <div className="">
        <Navigation />
        <Toaster />
      </div>
      <div className="justify-center flex-col flex">
        {width >= 650 ? (
          <div
            className="mx-auto -mt-20
          "
          >
            <Design />
          </div>
        ) : (
          <p className="text-3xl font-laila mx-auto text-pink-400  font-bold my-2">
            Ideavista <sup>24</sup>
          </p>
        )}

        <div className="flex justify-around max-sm:mt-0   mx-20 -mt-10 flex-wrap-reverse">
          <div
            className={`flex flex-col gap-y-3 flex-wrap ${
              !edit ? "mt-8" : "-mt-10"
            } min-w-[30rem] max-sm:min-w-[20rem] max-sm:mt-10`}
          >
            <form
              onSubmit={(e) => Upload(e)}
              encType="multipart/form-data "
              className=" p-5 rounded-lg flex-wrap flex-col flex gap-y-5  "
            >
              <label>Username</label>
              <TextField
                type="text"
                onChange={(e) => {
                  if (edit) {
                    seteditusername(e.target.value);
                  }
                }}
                value={edit ? editusername : username}
                disabled={!edit}
                className="min-w-fit max-w-[30rem] "
              />

              <label>Email</label>
              <TextField
                value={email}
                className="min-w-fit max-w-[30rem]"
                disabled
              />
              {edit ? (
                <div>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 
    "
                    ref={fileInputRef}
                    onChange={(e) => {
                      setfiles(e.target.files[0]);
                    }}
                  />
                  <div className="flex items-center gap-x-2 my-3">
                    <input
                      type="checkbox"
                      className="accent-purple-500 w-5 h-5 "
                      ref={ref}
                    />
                    <p>Update Profile Picture</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <button
                className={`tracking-wider group  ${
                  !edit ? "hidden" : "block text-white bg-blue-500"
                }`}
                type="submit"
              >
                {" "}
                {load ? (
                  <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin mx-auto group-hover:border-blue-600 group-hover:border-t-transparent group-hover:animate-spin"></div>
                ) : (
                  "UPDATE"
                )}
              </button>
            </form>
            <div className="flex justify-around max-sm:mb-4 ">
              <button
                onClick={() => {
                  setedit(!edit);
                  setfiles("");
                }}
              >
                <MenuItem>{!edit ? <Edit /> : <Cancel />}</MenuItem>{" "}
              </button>
            </div>
          </div>
          <div
            className={`w-[25rem] h-[25rem]  rounded-2xl flex flex-wrap  max-sm:hidden -mt-28  `}
          >
            <div className={`container ${!edit ? "" : "-mt-20"} `}>
              <div className="card w-[25rem] h-[25rem] ">
                <img
                  src={image}
                  alt="Profile"
                  className="w-[25rem] h-[25rem] object-fill rounded-lg  "
                />
              </div>
            </div>
          </div>
          <div className="hidden max-sm:block">
            <div className="card w-[20rem] h-[10rem] ">
              <img
                src={image}
                alt="Profile"
                className="w-[20rem] h-[10rem] object-fill rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
