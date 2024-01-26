import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreatePost from "./Views/createPost";
import UserPost from "./Views/userpost";
import "./footer.css";
import allPost from "./Views/feedPost";
import { Container, Typography, Link } from "@mui/material";
import {
  Policy,
  Gavel,
  GitHub,
  MailOutline,
  LinkedIn,
} from "@mui/icons-material";

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

      <footer className="footer-bg-animation text-white py-4 bg-gradient-to-r from-blue-500 to-teal-500">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row items-center justify-between ">
            <Typography
              variant="h3"
              component="p"
              className="font-bold mb-4 md:mb-0 text-orange-400"
            >
              Ideavista
            </Typography>
            <div className="flex flex-wrap space-y-2  max-sm:space-x-9 md:space-y-0 md:space-x-4">
              <a
                href="https://github.com/logesh883"
                color="inherit"
                className="hover:text-gray-300 max-sm:mt-1"
                underline="none"
                target="_blank"
              >
                <GitHub sx={{ color: "cyan" }} className="" />{" "}
                <span className="max-sm:hidden ">GitHub</span>
              </a>
              <a
                href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new"
                color="inherit"
                className="hover:text-gray-300"
                underline="none"
                target="_blank"
              >
                <MailOutline sx={{ color: "salmon" }} />{" "}
                <span className="max-sm:hidden">Gmail</span>
              </a>
              <a
                href="https://www.linkedin.com/in/logeshwaran-t-191588269/"
                color="inherit"
                className="hover:text-gray-300"
                underline="none"
                target="_blank"
              >
                <LinkedIn sx={{ color: "plum" }} />
                <span className="max-sm:hidden">LinkedIn</span>
              </a>
              <a
                href="#"
                color="inherit"
                className="hover:text-gray-300"
                underline="none"
                target="_blank"
                title="Privacy Policy"
              >
                <Policy /> <span className="max-sm:hidden">Privacy Policy</span>
              </a>
              <a
                title="Terms and Conditions"
                href="#"
                color="inherit"
                className="hover:text-gray-300"
                underline="none"
                target="_blank"
              >
                <Gavel />{" "}
                <span className="max-sm:hidden">Terms and Conditions</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center flex-wrap max-sm:flex-col lg:items-end space-x-10 max-sm:space-x-0">
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              mt={2}
            >
              &copy; {new Date().getFullYear()} Ideavista. All Rights Reserved.
            </Typography>
            <span className="text-center text-sm  font-roboto text-slate-700">
              Designed by Logeshwaran
            </span>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default App;
