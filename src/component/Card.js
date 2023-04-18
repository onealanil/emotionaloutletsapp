import React, { useState, useEffect } from "react";
import { BsFillHeartFill, BsThreeDots } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import parse from "html-react-parser";


const Card = ({
  setShowModal,
  updateState,
  postData,
  postOwner,
  loggedUserData,
}) => {
  // const [editOption, setEditOption] = useState(false);
  const [allComment, setAllComment] = useState(0);

  const openHandler = (e) => {
    updateState(e, true);
    setShowModal(true);
  };

  const sendRequestComment = async () => {
    const res = await axios
      .get(`https://emotionaloutletsbackend.vercel.app/post/${postData?._id}/comments`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequestComment().then((data) => setAllComment(data.comments.length));
  }, []);

  return (
    <>
      <div className="w-full md:pl-4 pt-4 pb-4 flex flex-col gap-y-2 select-none">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-5 items-center">
            <div className="picture">
              <Link to={`/profile/${postOwner._id}`}>
                {postOwner && postOwner.profilePic ? (
                  <img
                    src={postOwner.profilePic}
                    alt="other-profile-pic"
                    className="w-[4rem] h-[4rem] rounded-full bg-contain"
                    style={{ objectFit: "cover" }}
                  />
                ) : postOwner && postOwner.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="other-profile-pic"
                    className="w-[4rem] h-[4rem] rounded-full bg-contain"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="other-profile-pic"
                    className="w-[4rem] h-[4rem] rounded-full bg-contain"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </Link>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-sm font-poppins font-semibold">
                {postOwner.fullname}
              </span>
              <span className="text-xs font-thin">
                {format(postData?.time)}
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              // onMouseEnter={() => {
              //   setEditOption(true);
              // }}
            >
              <BsThreeDots className="cursor-pointer" />
            </div>
            {/* {editOption ? (
              <>
                <div
                  className="absolute w-16 right-2 md:right-0 bg-slate-50 flex flex-col gap-y-3 items-center justify-center px-5 py-3 rounded-md bg-opacity-90"
                  onMouseLeave={() => {
                    setEditOption(false);
                  }}
                >
                  <span className="hover:text-orange font-poppins cursor-pointer">
                    Edit
                  </span>
                  <span className="hover:text-orange font-poppins cursor-pointer">
                    Save
                  </span>
                </div>
              </>
            ) : (
              ""
            )} */}
          </div>
        </div>
        {/* container */}

        <div
          className="flex w-full md:pr-4 cursor-pointer"
          onClick={openHandler}
        >
          {!postData.content && postData.picture ? (
            <>
              <div className="w-[100%] flex flex-col items-end justify-center gap-y-3">
                {postData.picture && (
                  <img
                    src={postData.picture}
                    alt="post-img"
                    className="w-full"
                  />
                )}
                <div className="flex gap-x-4 my-1 items-center justify-center">
                  <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                    {postData?.likes.includes(loggedUserData?._id) ? (
                      <BsFillHeartFill color="#f5190a" />
                    ) : (
                      <BsFillHeartFill color="gray" />
                    )}
                    <span>{postData?.likes.length}</span>
                  </div>
                  <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                    <FaCommentAlt color="gray" />
                    {allComment && <span>{allComment}</span>}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {postData.content && !postData.picture && (
                <div className="w-[100%] flex flex-col items-start justify-center gap-y-3">
                  <span className="line-clamp-6 font-opensans text-sm leading-normal tracking-wide cursor-pointer p-1">
                    {parse(postData.content)}
                  </span>
                  <div className="flex gap-x-4 my-5 items-center justify-center">
                    <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                      {postData?.likes.includes(loggedUserData?._id) ? (
                        <BsFillHeartFill color="#f5190a" />
                      ) : (
                        <BsFillHeartFill color="gray" />
                      )}
                      <span>{postData?.likes.length}</span>
                    </div>
                    <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                      <FaCommentAlt color="gray" />
                      {allComment && <span>{allComment}</span>}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {postData.picture && postData.content && (
            <>
              <div className="w-[70%] md:p-4">
                <span className="line-clamp-6 font-opensans text-sm leading-normal tracking-wide cursor-pointer p-1">
                  {parse(postData.content)}
                </span>
              </div>
              <div className="w-[30%] flex flex-col items-end justify-center gap-y-3">
                {postData.picture && (
                  <img
                    src={postData.picture}
                    alt="post-img"
                    className="md:w-[10rem] w-full"
                  />
                )}
                <div className="flex gap-x-4 items-center justify-center">
                  <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                    {postData?.likes.includes(loggedUserData?._id) ? (
                      <BsFillHeartFill color="#f5190a" />
                    ) : (
                      <BsFillHeartFill color="gray" />
                    )}
                    <span>{postData?.likes.length}</span>
                  </div>
                  <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                    <FaCommentAlt color="gray" />
                    {allComment && <span>{allComment}</span>}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
