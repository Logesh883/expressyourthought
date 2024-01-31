import React from "react";
import Navigation from "./navigation";
import Design from "../LoginComponents/Logo_Design";

function Terms_Conditions() {
  return (
    <div>
      <div className="">
        <Navigation />
      </div>
      <div className="-mt-20 max-sm:-ml-20">
        <Design />
      </div>
      <div className=" text-justify w-[50rem] mx-auto max-sm:w-fit flex- flex-wrap flex-col max-sm:p-5">
        <p className="text-center -mt-20 text-xl font-roboto my-3 font-bold tracking-wider">
          Terms and Conditions
        </p>
        <div className="my-3">
          <span className="text-lg font-semibold ">Acceptance of Terms</span>
          <p className="my-3">
            By accessing or using Ideavista, you agree to comply with and be
            bound by these Terms and Conditions . If you do not agree to these
            Terms, please do not use the Service.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">Use of the Service</span>
          <p className="my-3">
            You must be at least 13 years old to use the Service. By using the
            Service, you represent and warrant that you are 13 years of age or
            older.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">User Accounts</span>
          <p className="my-3">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to notify us immediately of any
            unauthorized use of your account. Ideavista reserves the right to
            refuse service, terminate accounts, or remove or edit content in its
            sole discretion.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">User-Generated Content</span>
          <p className="my-3">
            Users are solely responsible for the content they post on the
            platform. Ideavista has the right to monitor and moderate
            user-generated content. Users must not post content that violates
            any applicable laws or infringes on the rights of others.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">Intellectual Property</span>
          <p className="my-3">
            All content and materials on the Service, including but not limited
            to text, graphics, logos, and software, are the property of
            Ideavista and are protected by copyright and other intellectual
            property laws.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold"> Privacy</span>
          <p className="my-3">
            Your use of the Service is also governed by our Privacy Policy,
            which is incorporated into these Terms by reference.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">Termination</span>
          <p className="my-3">
            Ideavista reserves the right to terminate or suspend your account
            and access to the Service at its sole discretion, without notice,
            for any reason, including violation of these Terms.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">
            Disclaimer of Warranties
          </span>
          <p className="my-3">
            The Service is provided on an "as-is" and "as-available" basis
            without any warranties, express or implied.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">
            {" "}
            Limitation of Liability
          </span>
          <p className="my-3">
            Ideavista shall not be liable for any direct, indirect, incidental,
            special, or consequential damages resulting from the use or
            inability to use the Service.
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">Governing Law</span>
          <p className="my-3 flex flex-col gap-y-3">
            These Terms shall be governed by and construed in accordance with
            the laws of
            <p className="flex flex-col ">
              <span className=" font-semibold my-3">
                Information Technology Act, 2000
              </span>{" "}
              The IT Act governs electronic transactions and provides a legal
              framework for e-commerce and digital services.
            </p>
            <p className="flex flex-col ">
              <span className="font-semibold my-3">
                Indian Contract Act, 1872
              </span>
              Relevant for establishing the legal relationship between us and
              the users of your platform.
            </p>
            <p className="flex flex-col ">
              <span className="font-semibold my-3">
                Consumer Protection Act, 2019
              </span>
              Pertinent if your web application involves providing services to
              consumers.
            </p>
            <p className="flex flex-col ">
              <span className="font-semibold my-3">Copyright Act, 1957</span>
              Important for protecting intellectual property rights, especially
              if your application involves creative content.
            </p>
            <span className="font-semibold">Indian Penal Code, 1860</span>
            <p>
              Relevant for issues related to cybercrime and unauthorized access.
            </p>
            <p className="flex flex-col ">
              <span className="font-semibold ">
                Payment and Settlement Systems Act, 2007
              </span>
              If your application involves payment processing or financial
              transactions.
            </p>
          </p>
        </div>
        <div className="my-3">
          <span className="text-lg font-semibold">Changes to Terms</span>
          <p className="my-3">
            Ideavista reserves the right to modify or revise these Terms at any
            time. Your continued use of the Service after any changes
            constitutes acceptance of the modified Terms
          </p>
        </div>
        <div className="my-3">
          <p className="text-lg font-semibold my-3">Contact Information</p>
          <span className="">
            For questions about these Terms, please contact us at
            tlogeshwaran2003@gmail.com.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Terms_Conditions;
