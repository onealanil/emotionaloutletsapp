import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Tips = ({ postData }) => {
  return (
    <>
      <Link to={`/tipsSingle/${postData?._id}`}>
        <div className="hover:text-green cursor-pointer select-none">
          <div className="w-[100%] h-[15rem] relative">
            <img
              src={postData?.picture}
              alt="card-image"
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-2">
            <span className="font-poppins text-xs leading-relaxed tracking-wide line-clamp-4 h-[5rem]">
              {parse(String(postData?.content))}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Tips;
