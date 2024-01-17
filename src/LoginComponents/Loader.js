import React, { useEffect, useState } from "react";
function Loader() {
  const [value, setValue] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      <div className="flex flex-col ">
        <div className="border-4 border-t-red-300 border-l-red-200 border-r-red-400 w-40 h-40 rounded-full border-b-transparent animate-spin mx-auto my-48"></div>
        <p className="absolute font-semibold font-mono text-xl flex justify-center inset-96">
          Redirecting to homepage{" "}
          <span className="text-red-400 ml-3">{value}</span>
        </p>
      </div>
    </>
  );
}

export default Loader;
