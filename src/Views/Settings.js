import React, { useEffect, useRef, useState } from "react";
import Navigation from "./navigation";
import Design from "../LoginComponents/Logo_Design";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Settings() {
  const value = useRef();
  const [checked, setchecked] = useState("");
  const notifySuccess = (d) => toast.success(d);
  const notifyError = (d) => toast.error(d);
  axios.defaults.withCredentials = true;
  const handleSettings = async () => {
    try {
      await axios
        .post(
          "https://server.ideavista.online/api/settings",
          { status: Boolean(value.current.checked) },
          { withCredentials: true }
        )
        .then((res) => {
          notifySuccess(res.data.msg);
          value.current.checked = null;
        });
    } catch (err) {
      notifyError(err);
    } finally {
      fetchSettings();
    }
  };

  const fetchSettings = async () => {
    await axios
      .get("https://server.ideavista.online/api/fetchsettings", {
        withCredentials: true,
      })
      .then((res) => {
        setchecked(res.data.msg.feedSetting);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="min-h-[37.8rem]">
      <div>
        <Navigation />
        <Toaster />
      </div>
      <div className="-mt-20 max-sm:-ml-20">
        <Design />
      </div>
      <div className="flex items-center flex-col -mt-20">
        <div className="bg-gray-600 w-[40rem] rounded-xl p-10 max-sm:w-fit space-x-4 flex justify-between items-center ">
          <div className="flex flex-wrap flex-col">
            <p className="text-lg text-white font-roboto tracking-wider capitalize">
              Enable infinte scroll
            </p>
            <p className="text-gray-300 max-sm:hidden">
              It enables infinite scrolling feature in{" "}
              <span className="text-blue-500 uppercase">all ideas</span> page
              over pagination
            </p>
          </div>

          <label class="relative inline-flex items-center cursor-pointer ">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              ref={value}
              onClick={handleSettings}
              checked={checked}
            />
            <div
              class={`group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-24 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0 `}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
