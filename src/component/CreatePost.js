import React, { useState } from "react";
import UserCreate from "./UserCreate";

const CreatePost = ({ loggedUserData }) => {
  const [isCreate, setIsCreate] = useState(false);

  const handleBoolValueChange = (newValue) => {
    setIsCreate(newValue);
  };

  return (
    <>
      <div className="w-full p-4 ">
        <div className="w-[100%] md:w-[95%] h-6 flex items-center justify-center gap-x-3">
          <div className="w-[10%]">
            {loggedUserData && loggedUserData.profilePic ? (
              <img
                src={loggedUserData.profilePic}
                alt="other-profile-pic"
                className="w-[2rem] h-[2rem] rounded-full"
              />
            ) : loggedUserData && loggedUserData.gender === "male" ? (
              <img
                src="../assets/images/male-avatar.png"
                alt="other-profile-pic"
                className="w-[2rem] h-[2rem] rounded-full"
              />
            ) : (
              <img
                src="../assets/images/female-avatar.png"
                alt="other-profile-pic"
                className="w-[2rem] h-[2rem] rounded-full"
              />
            )}
          </div>
          <div
            className="w-[90%] flex items-center justify-start px-4 border-solid border-2 border-gray-200 bg-gray-50 rounded-3xl py-2 cursor-pointer"
            onClick={handleBoolValueChange}
          >
            <span className="font-poppins text-xs select-none">
              What's on your mind? Anil ...
            </span>
          </div>
        </div>
      </div>

      {/* for creating the post  */}
      {isCreate ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl md:backdrop-blur-none backdrop-blur-md">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {loggedUserData ? (
                <UserCreate
                  props={handleBoolValueChange}
                  loggedUserData={loggedUserData}
                />
              ) : (
                <div>{alert("Something went wrong")}</div>
              )}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CreatePost;
