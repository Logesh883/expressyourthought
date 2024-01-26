import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreatePost from "./Views/createPost";
import UserPost from "./Views/userpost";
import allPost from "./Views/feedPost";

import LandingPage from "./Views/landingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
const client_id =
  "1091257569215-a1pesh27mtqv7mk6oefla9na7lc1hmsj.apps.googleusercontent.com";
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={client_id}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/getUserPost" element={<UserPost />} />
            <Route path="/feedPost" Component={allPost} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
