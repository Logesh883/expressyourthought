import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function DeleteAccount() {
  const [userdata, setuserdata] = useState("");
  const [otp, setotp] = useState("");
  const [otpload, setotpload] = useState(false);
  const [otpfield, setotpfield] = useState("");
  const notifyError = (data) => toast.error(data);
  const notifySuccess = (data) => toast.success(data);
  const navigation = useNavigate();

  const [getotp, setgetotp] = useState("");
  const [deleteload, setDeleteLoad] = useState("");
  axios.defaults.withCredentials = true;
  const fetchUser = async () => {
    await axios
      .get("https://server.ideavista.online/api/fetchuser", null, {
        withCredentials: true,
      })
      .then((res) => {
        setuserdata(res.data.user[0]);
      })
      .catch((err) => notifyError(err.message || "Error in fetching user"));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const sendOTP = async () => {
    setotpload(true);
    await axios
      .get("https://server.ideavista.online/api/changepassword", {
        params: {
          email: userdata.Email,
          isDelete: true,
        },
      })
      .then((res) => {
        notifySuccess(res.data.msg[0]);
        setgetotp(res.data.msg[1]);
        setotpfield(!otpfield);
        setTimeout(() => {
          setgetotp("");
        }, 1000 * 120);
      })
      .catch((err) => {
        notifyError(err.message);
      })
      .finally(() => setotpload(false));
  };

  const DeleteAccount = async () => {
    if (!getotp) {
      setotpfield(false);
      setotp("");
      setgetotp("");
      return notifyError("OTP expired & Try Again ");
    }
    if (Number.parseInt(otp) === getotp) {
      setDeleteLoad(true);
      await axios
        .delete("https://server.ideavista.online/api/deleteaccount")
        .then((res) => {
          googleLogout();
          notifySuccess(res.data.msg);
          setotp("");
          setgetotp("");
          setTimeout(() => {
            navigation("/");
          }, 1000);
        })
        .catch((err) => notifyError(err.message))
        .finally(() => setDeleteLoad(false));
    } else {
      return notifyError("OTP mismatch");
    }
  };

  return (
    <div className="min-h-[38rem]">
      <div>
        <Navigation />
        <Toaster />
      </div>
      <div className="flex flex-col">
        <div>
          <p className="text-center font-semibold font-serif text-xl mt-10 uppercase tracking-wider text-blue-500">
            Delete Account
          </p>
        </div>
        <div className="flex flex-col mt-7 mx-auto flex-wrap gap-y-3 max-sm:w-[20rem] w-[30rem]">
          <TextField
            type="text"
            disabled
            value={userdata.UserName}
            className="  "
          />

          <TextField
            type="text"
            disabled
            value={userdata.Email}
            className="  "
          />
          <button
            className={`bg-red-500 tracking-wider border-red-500 hover:text-red-500 group ${
              otpfield ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={otpfield}
            onClick={() => {
              sendOTP();
            }}
          >
            {otpload ? (
              <div
                className={`w-10 h-10 rounded-full border-4  border-t-transparent animate-spin mx-auto group-hover:border-red-500  group-hover:border-t-transparent group-hover:animate-spin 
                `}
              ></div>
            ) : (
              "Confirm to delete account?"
            )}
          </button>
        </div>
        {otpfield ? (
          <div className="flex justify-center mx-auto my-6 gap-y-4 flex-col max-sm:w-[20rem]">
            <p className="w-[30rem] text-center max-sm:w-[20rem]">
              The One Time Password is send to(OTP) <b> {userdata.Email}</b>
            </p>
            <TextField
              placeholder="Enter One Time Password(OTP)"
              onChange={(e) => setotp(e.target.value)}
              value={otp}
              className="w-[32rem] max-sm:w-[20rem]"
            />

            <button variant="filled " onClick={() => DeleteAccount()}>
              {deleteload ? (
                <div
                  className={`w-10 h-10 rounded-full border-4  border-t-transparent animate-spin mx-auto group-hover:border-red-500  group-hover:border-t-transparent group-hover:animate-spin 
                `}
                ></div>
              ) : (
                "Confirm to delete account?"
              )}
            </button>
            <p className="text-lg">
              The OTP will expire in<b> 2 minutes</b>{" "}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DeleteAccount;
