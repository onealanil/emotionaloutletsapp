import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const Suggestion = ({ suggestedUserProfile }) => {
  const [isFollow, setIsFollow] = useState(false);
  //follow handler
  const followHandler = async () => {
    try {
      await axios.put(
        "https://emotionaloutletsserver.onrender.com/follow",
        { otherId: suggestedUserProfile._id },
        { withCredentials: true }
      );
      setIsFollow(true);
    } catch (error) {
      console.error(error);
    }
  };

  const unfollowHandler = async () => {
    try {
      await axios.put(
        "https://emotionaloutletsserver.onrender.com/unfollow",
        { otherId: suggestedUserProfile._id },
        { withCredentials: true }
      );
      setIsFollow(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-x-1 w-full p-3 space-x-2 items-start justify-end select-none">
        <div className="w-[27%] cursor-pointer">
          <Link to={`/profile/${suggestedUserProfile._id}`}>
            {suggestedUserProfile && suggestedUserProfile.profilePic ? (
              <img
                src={suggestedUserProfile.profilePic}
                alt="suggestion"
                className="w-[3rem] h-[3rem]  max-[1067px]:w-[2rem]  max-[1067px]:h-[2rem] rounded-full"
              />
            ) : suggestedUserProfile.gender === "male" ? (
              <img
                src="./assets/images/male-avatar.png"
                alt="suggestion"
                className="w-[3rem] h-[3rem]  max-[1067px]:w-[2rem]  max-[1067px]:h-[2rem] rounded-full"
              />
            ) : (
              <img
                src="./assets/images/female-avatar.png"
                alt="suggestion"
                className="w-[3rem] h-[3rem]  max-[1067px]:w-[2rem]  max-[1067px]:h-[2rem] rounded-full"
              />
            )}
          </Link>
        </div>
        <div className="w-[50%] flex flex-col gap-y-1">
          <span className="text-sm font-poppins font-semibold overflow-x-hidden  max-[1067px]:text-xs">
            {suggestedUserProfile.username}
          </span>
          <span className="text-xs">{suggestedUserProfile.followers.length} followers</span>
        </div>
        <div className="w-[23%] flex items-center justify-center cursor-pointer">
          {isFollow ? (
            <>
              <span
                className="py-2 px-4 bg-orange text-xs rounded-md  max-[1067px]:bg-white text-white  max-[1067px]:text-orange"
                onClick={unfollowHandler}
              >
                unfollow
              </span>
            </>
          ) : (
            <>
              <span
                className="py-2 px-4 bg-orange text-xs rounded-md  max-[1067px]:bg-white text-white  max-[1067px]:text-orange"
                onClick={followHandler}
              >
                Follow
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Suggestion;
