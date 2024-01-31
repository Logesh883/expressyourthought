import React from "react";
import Navigation from "./navigation";
import Design from "../LoginComponents/Logo_Design";

function Privacy_policy() {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="-mt-20 max-sm:-ml-20">
        <Design />
      </div>
      <div className="font-roboto text-justify  p-3 flex flex-col mx-auto w-[50rem] max-sm:w-[20rem] flex-wrap">
        <div className="-mt-20 text-lg">
          <p> Effective Date: 01/02/2023</p>
        </div>
        <p className="text-center my-3 text-2xl text-blue-500 font-semibold ">
          Welcome to Ideavista!
        </p>
        <p className="my-3">
          This Privacy Policy outlines how Ideavista collects, uses, and
          protects your personal information. By using our services, you agree
          to the practices described in this Privacy Policy.
        </p>{" "}
        <div>
          <p className=" text-lg my-3">Information We Collect</p>
          <p className="ml-6 max-sm:ml-0">
            {" "}
            User-Provided Information When you sign up for Ideavista using
            Google authentication, we collect the following information: Name
            Email address Profile picture
          </p>
        </div>
        <div className="my-3">
          <p className=" text-lg my-3">User-Generated Content</p>
          <p className="ml-6 max-sm:ml-0">
            As you use our platform, you may contribute ideas, innovations, and
            other user-generated content.
          </p>
        </div>
        <div className="my-2">
          <p className="text-lg my-3">Automatically Collected Information</p>
          <p className="ml-6 max-sm:ml-0">
            We may collect certain information automatically when you interact
            with our services, including:
            <ul className="my-3  list-disc">
              <li>IP address</li>
              <li> Browser type </li>
              <li>Device information</li>
              <li>Usage patterns</li>
            </ul>
          </p>
        </div>
        <div>
          <p className="text-lg my-3">
            How We Use Your Information We use the information we collect for
            the following purposes:
          </p>
          <span className="text-lg">User Authentication</span>
          <p className="my-3 ml-6 max-sm:ml-0">
            To authenticate your identity when you log in using Google
            authentication.
          </p>{" "}
          <span className="text-lg">Profile Management</span>
          <p className="my-3 ml-6 max-sm:ml-0">
            To enable you to edit and manage your user profile.
          </p>
          <span className="text-lg">Posts Sharing </span>
          <p className="my-3 ml-6 max-sm:ml-0">
            To facilitate the creation, sharing, and display of posts on the
            platform.
          </p>
          <span className="text-lg mr-3">Communication</span>
          <p className="my-3 ml-6 max-sm:ml-0">
            To send welcome notes and notifications via email.
          </p>
          <span className="text-lg"> Account Deletion</span>
          <p className="my-3 ml-6 max-sm:ml-0">
            To process account deletion requests securely, we may use OTP
            authentication sent to your registered email address.
          </p>
          <span className="text-lg">Information Sharing </span>
          <p className="my-3 ml-6 max-sm:ml-0">
            We prioritize the confidentiality and security of your personal
            information. We do not sell, trade, or otherwise transfer your
            personal information to third parties. Your information may be
            shared with trusted third parties who assist us in operating our
            website, conducting our business, or servicing you.
          </p>
          <p className="">
            User-Generated Content By contributing ideas and innovations to
            Ideavista, you understand that your user-generated content may be
            publicly visible to other users. Security We take reasonable
            measures to protect the confidentiality and security of your
            personal information.
          </p>
        </div>
        <div className="my-3">
          <p className="">
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>
        <div>
          <p>
            Changes to This Privacy Policy We reserve the right to modify this
            Privacy Policy at any time. Changes will be effective immediately
            upon posting on our website. We encourage you to review this Privacy
            Policy periodically for any updates. Legal Compliance By using
            Ideavista, you agree to comply with applicable data protection laws,
            including but not limited to GDPR, CCPA, and other relevant
            regulations. Contact Us If you have any questions or concerns
            regarding this Privacy Policy, please contact us at
            tlogeshwaran2003@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy_policy;
