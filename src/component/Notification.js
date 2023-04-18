import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import parse from "html-react-parser";

const Notification = ({
  props,
  likeCommentNotifications,
  followNotifications,
}) => {
  const [isAll, setIsAll] = useState(true);

  return (
    <>
      {/*content*/}

      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[30rem] pb-5 z-50">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          {/* notification */}
          <div className=" md:w-96 pl-10 p-2.5 items-center">
            <span className="font-poppins text-[1.5rem] font-bold text-center">
              Notifications
            </span>
          </div>
          {/* <div className="flex justify-end">
            <span className="py-2 px-4 bg-orange text-white font-poppins text-[0.75rem] flex items-center justify-center rounded-b-lg cursor-pointer">
              Mark all as read
            </span>
          </div> */}

          <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
            <AiOutlineClose
              size={30}
              className="text-red-900 block cursor-pointer"
            />
          </i>
        </div>
        {/*body*/}
        <div className="flex justify-center gap-x-4 mt-2">
          <span
            className={`font-poppins text-xs cursor-pointer ${
              isAll ? "text-orange" : "text-black"
            }`}
            onClick={() => setIsAll(true)}
          >
            All
          </span>
          <span
            className={`font-poppins text-xs cursor-pointer ${
              !isAll ? "text-orange" : "text-black"
            }`}
            onClick={() => setIsAll(false)}
          >
            Following
          </span>
        </div>
        <div className="p-6 flex-auto justify-center flex break-words space-y-3 overflow-y-scroll">
          {/* Notification  */}

          {isAll ? (
            <>
              <div className="w-[98%] flex flex-col gap-y-3">
                {likeCommentNotifications?.map((val) => (
                  <>
                    {/* for like  */}
                    {/* one person start  */}
                    <div className="flex flex-row w-full p-3 items-start justify-end select-none bg-gray-200 rounded-md">
                      <div className="w-[10%]">
                        {val && val.sender.profilePic ? (
                          <img
                            src={val.sender.profilePic}
                            alt="suggestion"
                            className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-full"
                          />
                        ) : val && val.sender.gender === "male" ? (
                          <img
                            src="../assets/images/male-avatar.png"
                            alt="suggestion"
                            className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-full"
                          />
                        ) : (
                          <img
                            src="../assets/images/female-avatar.png"
                            alt="suggestion"
                            className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-full"
                          />
                        )}
                      </div>
                      <div className="w-[75%] px-3 flex flex-col gap-y-1">
                        {val && val.post?.picture && !val.post?.content ? (
                          <>
                            <div className="flex gap-x-6">
                              <span className="font-poppins line-clamp-2 text-sm">
                                <b>{val?.sender.fullname}</b> {val?.type} your
                                post{" "}
                              </span>
                              <img
                                src={val.post.picture}
                                alt="notification-post-image"
                                className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-md"
                              />
                            </div>
                          </>
                        ) : (val && !val.post.picture && val.post.content) ||
                          (val && val.post.picture && val.post.content) ? (
                          <span className="font-poppins line-clamp-2 text-sm">
                            <b>{val?.sender.fullname}</b> {val?.type} your post{" "}
                            {parse(val?.post.content)}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <small className="w-[15%] md:font-xs text-[0.5rem] text-center ">
                        {format(val?.createdAt)}
                      </small>
                    </div>
                    {/* one person end  */}
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="w-[100%] flex flex-col gap-y-3">
                {followNotifications?.map((val) => (
                  <>
                    {/* for like  */}
                    {/* one person start  */}
                    <Link to={`/profile/${val?.sender._id}`}>
                      <div className="flex flex-row  w-full md:w-[40rem] p-3 items-start justify-end select-none bg-gray-200 rounded-md">
                        <div className="w-[10%]">
                          {val && val.sender.profilePic ? (
                            <img
                              src={val.profilePic}
                              alt="suggestion"
                              className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-full"
                            />
                          ) : val && val.sender.gender === "male" ? (
                            <img
                              src="../assets/images/male-avatar.png"
                              alt="suggestion"
                              className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-full"
                            />
                          ) : (
                            <img
                              src="../assets/images/female-avatar.png"
                              alt="suggestion"
                              className="md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] rounded-full"
                            />
                          )}
                        </div>
                        <div className="w-[75%] px-3 flex flex-col gap-y-1 font-xs">
                          {val?.sender.fullname} follows you.
                        </div>
                        <small className="w-[15%] font-xs text-center text-[0.5rem] ">
                          {format(val?.createdAt)}
                        </small>
                      </div>
                    </Link>

                    {/* one person end  */}
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
