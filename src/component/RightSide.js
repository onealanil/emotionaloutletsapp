import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Suggestion from "./Suggestion";

axios.defaults.withCredentials = true;

const RightSide = ({ loggedUserData }) => {
  const [suggestedUser, setSuggestedUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isProfieLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const suggestedUserFunction = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://emotionaloutletsbackend.vercel.app/suggesteduser",
          { withCredentials: true }
        );
        if (response) {
          setIsLoading(false);
        }
        setSuggestedUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (loggedUserData) {
      setIsProfileLoading(false);
    }

    suggestedUserFunction();
  }, []);

  return (
    <>
      <div className="hidden md:w-[30%] md:flex flex-col gap-y-16 sticky top-10 h-max items-center justify-center p-5 select-none">
        {/* for profile  */}
        <div className="flex gap-x-4">
          {isProfieLoading && loggedUserData == undefined ? (
            <Skeleton circle width={100} height={100} />
          ) : (
            <Link to="/profile">
              {loggedUserData && loggedUserData.profilePic ? (
                <img
                  src={loggedUserData.profilePic}
                  alt="profile"
                  className="md:w-[4rem] xl:w-[5rem] xl:h-[5rem] md:h-[4rem] rounded-full border-solid border-2 border-blue-500"
                />
              ) : loggedUserData && loggedUserData.gender === "male" ? (
                <img
                  src="../assets/images/male-avatar.png"
                  alt="profile"
                  className="md:w-[4rem] xl:w-[5rem] xl:h-[5rem] md:h-[4rem] rounded-full border-solid border-2 border-blue-500"
                />
              ) : (
                <img
                  src="../assets/images/female-avatar.png"
                  alt="profile"
                  className="md:w-[4rem] xl:w-[5rem] xl:h-[5rem] md:h-[4rem] rounded-full border-solid border-2 border-blue-500"
                />
              )}
            </Link>
          )}
          <div className="flex flex-col gap-y-1">
            {isLoading ? (
              <Skeleton count={3} width={100} />
            ) : (
              <>
                <span className="text-sm font-semibold">
                  {loggedUserData && loggedUserData.fullname}
                </span>
                <span className="text-xs font-poppins font-semibold">
                  {loggedUserData && loggedUserData.username}
                </span>
                <span className="text-xs ">
                  {loggedUserData && loggedUserData.who}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-4 items-center justify-end">
          <div className="w-full flex items-center justify-center gap-x-10">
            <span className="text-sm font-semibold font-poppins">
              Suggestions for you
            </span>
            <span className="text-xs text-orange  max-[1067px]:hidden">
              View All
            </span>
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="flex flex-row gap-x-1 w-full space-x-2 items-start justify-end select-none">
                <Skeleton count={4} height={40} width={200} />
              </div>
            ) : (
              suggestedUser &&
              suggestedUser
                .slice(0, 4)
                .map((val) => (
                  <Suggestion key={val._id} suggestedUserProfile={val} />
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
