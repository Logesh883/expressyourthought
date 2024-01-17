import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./LoginComponents/signup";
import Login from "./LoginComponents/login";

import Loader from "./LoginComponents/Loader";
import Navigation from "./Views/navigation";
import CreatePost from "./Views/createPost";
import UserPost from "./Views/userpost";
import allPost from "./Views/feedPost";
import Smallloader from "./LoginComponents/smallloader";
import LandingPage from "./Views/landingPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={() => <Login />} />
          <Route path="/smallloader" element={<Smallloader />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/load" Component={Loader} />
          <Route path="/getUserPost" element={<UserPost />} />
          <Route path="/feedPost" Component={allPost} />
          <Route path="/nav" Component={Navigation} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
