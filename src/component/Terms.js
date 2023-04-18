import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Terms = ({ props }) => {
  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[25rem] lg:h-[30rem] pb-5">
      {/*header*/}
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        {/* search button */}
        <div className="w-[10rem] md:w-[15rem] flex items-center justify-center ">
          <span className="font-poppins font-bold leading-relaxed text-lg">
            Terms and Conditions
          </span>
        </div>

        <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
          <AiOutlineClose
            size={25}
            className="text-red-900 block cursor-pointer"
          />
        </i>
      </div>
      {/* header end  */}
      {/* body start  */}
      <div className="relative p-6 flex-auto break-words space-y-3 font-opensans overflow-y-scroll">
        Welcome to <span className="text-orange font-bold">Emotional Outlets </span>, a web application that provides a safe
        space for people to express and manage their emotions. Before using our
        services, please read and agree to the following terms and conditions:
        <br />
        <br />
        1. Acceptance of Terms: By accessing and using Emotional Outlets, you
        agree to comply with these terms and conditions, as well as our Privacy
        Policy. If you do not agree to these terms and conditions, please do not
        use the web application.
        <br />
        <br />
        2. Privacy: Your privacy is important to us. Please review our Privacy
        Policy to understand how we collect, use, and protect your personal
        information. <br />
        <br />
        3. Prohibited Activities: You may not use Emotional Outlets to post any
        content that is unlawful, harmful, threatening, abusive, harassing,
        defamatory, vulgar, obscene, invasive of another's privacy, or otherwise
        objectionable. You also may not use the web application to engage in any
        illegal activity or to impersonate any person or entity. <br />
        <br />
        4. Disclaimer of Warranties: Emotional Outlets is provided "as is"
        without any warranties, express or implied. We do not guarantee that the
        web application will meet your needs or that it will be error-free or
        uninterrupted. <br />
        <br />
        5. Termination: Emotional Outlets reserves the right to terminate your
        access to the web application at any time for any reason without notice.
        We may also remove any content you post on the platform if we determine
        it violates our terms and conditions. <br />
        <br />
      </div>
      {/* body end  */}
    </div>
  );
};

export default Terms;
