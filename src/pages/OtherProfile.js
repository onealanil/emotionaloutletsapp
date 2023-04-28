import React, { useState, useEffect } from "react";
import LeftSide from "../component/LeftSide";
import MobileFooter from "../component/MobileFooter";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import { BsGrid } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import SinglePost from "./SinglePost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiMessageRounded } from "react-icons/bi";

const OtherProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [loggedUser, setLoggedUser] = useState();
  const [stateChanged, setStateChanged] = useState(false);

  const updateState = (e, newState) => {
    e.preventDefault();
    setShowModal(newState);
    setStateChanged(!stateChanged);
  };

  const sendRequest = async () => {
    const res = await axios
      .get(`https://emotionaloutletsserver.onrender.com/user/${id}`, { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequestLoggedUser = async () => {
    const res = await axios
      .get("https://emotionaloutletsserver.onrender.com/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setPost(data.post);
      setIsLoading(false);
    });

    sendRequestLoggedUser().then((data) => {
      setLoggedUser(data.user);
    });
  }, [stateChanged]);

  const handleCardClick = (e, postData) => {
    e.preventDefault();
    setSelectedPostData(postData);
  };

  //follow handler
  const followHandler = async () => {
    try {
      await axios.put(
        "https://emotionaloutletsserver.onrender.com/follow",
        { otherId: user?._id },
        { withCredentials: true }
      );
      setStateChanged(false);
    } catch (error) {
      console.error(error);
    }
  };

  const unfollowHandler = async () => {
    try {
      await axios.put(
        "https://emotionaloutletsserver.onrender.com/unfollow",
        { otherId: user?._id },
        { withCredentials: true }
      );
      setStateChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  // follow back
  const followbackHandler = async () => {
    try {
      await axios.put(
        "https://emotionaloutletsserver.onrender.com/followback",
        { otherId: user?._id },
        { withCredentials: true }
      );
      setStateChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addConversationHandler = async () => {
    await axios
      .post(
        `https://emotionaloutletsserver.onrender.com/message/conversation`,
        {
          senderId: loggedUser?._id,
          receiverId: user?._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
          <LeftSide />
          {/* mobile view  */}
          <div className="md:hidden flex items-center justify-between pt-2 pb-4 sticky top-0 bg-white z-50">
            <Link to="/">
              <div className="flex flex-col items-center justify-center cursor-pointer select-none">
                <span className="text-orange font-poppins font-bold text-base tracking-wide leading-relaxed">
                  Emotional
                </span>
                <span className="font-poppins text-black text-xs">Outlets</span>
              </div>
            </Link>
          </div>
          {/* right side start  */}
          <div className="md:w-[75%] w-full">
            <div className="w-full flex md:flex-row flex-col justify-center items-center gap-y-5 md:gap-y-0 md:justify-start">
              <div className="w-[40%] flex items-center justify-around">
                {isLoading ? (
                  <Skeleton circle={true} height={140} width={140} />
                ) : user && user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="other-profile-pic"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                ) : user && user.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="other-profile-pic"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="other-profile-pic"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                )}
              </div>
              <div className="flex items-center justify-center md:items-start md:justify-start flex-col gap-y-1 w-full md:w-[40%]">
                <span className="text-lg font-semibold">
                  {user?.fullname ? user.fullname : <Skeleton width={150} />}
                </span>
                <span className="text-base font-poppins font-semibold">
                  {user?.username ? user.username : <Skeleton width={100} />}
                </span>
                <span className="text-sm ">
                  {user?.who ? user.who : <Skeleton width={80} />}
                </span>
              </div>
            </div>

            {/* following follwers start  */}
            <div className="w-full flex items-center justify-center gap-x-4 my-2 md:my-5 select-none">
              <span className="font-poppins text-sm md:text-base cursor-pointer">
                <b className="mx-1">
                  {user?.followers ? (
                    user.followers.length
                  ) : (
                    <Skeleton width={30} />
                  )}
                </b>
                followers
              </span>
              <span className="font-poppins text-sm md:text-base cursor-pointer">
                <b className="mx-1 font-semibold">
                  {user?.following ? (
                    user.following.length
                  ) : (
                    <Skeleton width={30} />
                  )}
                </b>{" "}
                following
              </span>
              <span className="font-poppins text-sm md:text-base cursor-pointer">
                <b className="mx-1 font-semibold">
                  {post ? post.length : <Skeleton width={30} />}
                </b>{" "}
                post
              </span>
            </div>

            {/* bio start  */}
            <div className="w-full flex items-center justify-center gap-x-4 my-2 md:my-5 select-none">
              <div className="md:w-[35%] w-[80%] pb-2 flex items-center justify-center">
                <span className="font-opensans text-xs md:text-sm">
                  {user?.bio || user?.bio == "" ? (
                    user.bio
                  ) : (
                    <Skeleton width={200} />
                  )}
                </span>
              </div>
            </div>

            {/* message and following follwers span  */}
            {isLoading ? (
              <>
                <div className="w-full flex gap-x-5 items-center justify-center">
                  <div>
                    <Skeleton width={30} />
                  </div>
                  <div className="flex gap-x-2 items-center justify-center">
                    <Skeleton width={30} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex gap-x-5 items-center justify-center">
                  <div>
                    {user?.followers.includes(loggedUser?._id) &&
                      user?.following.includes(loggedUser?._id) && (
                        <span
                          className="px-4 py-2 bg-orange text-white font-poppins text-xs rounded-md cursor-pointer"
                          onClick={unfollowHandler}
                        >
                          Unfollow
                        </span>
                      )}
                    {!user?.followers.includes(loggedUser?._id) &&
                      user?.following.includes(loggedUser?._id) && (
                        <span
                          className="px-4 py-2 bg-orange text-white font-poppins text-xs rounded-md cursor-pointer"
                          onClick={followbackHandler}
                        >
                          Follow back
                        </span>
                      )}
                    {!user?.followers.includes(loggedUser?._id) &&
                      !user?.following.includes(loggedUser?._id) && (
                        <span
                          className="px-4 py-2 bg-orange text-white font-poppins text-xs rounded-md cursor-pointer"
                          onClick={followHandler}
                        >
                          Follow
                        </span>
                      )}
                    {user?.followers.includes(loggedUser?._id) &&
                      !user?.following.includes(loggedUser?._id) && (
                        <span
                          className="px-4 py-2 bg-orange text-white font-poppins text-xs rounded-md cursor-pointer"
                          onClick={unfollowHandler}
                        >
                          Unfollow
                        </span>
                      )}
                  </div>
                  <div
                    className="flex gap-x-2 items-center justify-center px-4 py-2 mt-1 bg-gray-400 text-white rounded-md cursor-pointer"
                    onClick={addConversationHandler}
                  >
                    <span className="font-poppins text-xs">
                      Add to Conversation
                    </span>
                    <BiMessageRounded />
                  </div>
                </div>
              </>
            )}

            {/* post start  */}

            <hr className="border-1 border-black my-5" />
            <div className="flex items-center justify-center gap-x-10 md:w-[75%] my-5">
              <div
                className={`flex gap-x-2 items-center justify-center cursor-pointer select-none font-semibold leading-relaxed tracing-wide text-orange `}
              >
                <BsGrid />
                <span className="uppercase font-poppins text-xs">Posts</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-3 md:w-[75%] mb-20">
              {post ? (
                post.map((val) => (
                  <div onClick={(e) => handleCardClick(e, val)}>
                    <Card
                      key={val._id}
                      setShowModal={showModal}
                      updateState={updateState}
                      postData={val}
                      postOwner={user}
                      loggedUserData={loggedUser}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <Skeleton height={200} />
                  <Skeleton height={200} />
                  <Skeleton height={200} />
                </div>
              )}
            </div>

            {/* post end  */}
          </div>

          {/* right side end  */}
        </div>
        {showModal ? (
          <SinglePost
            setShowModal={setShowModal}
            updateState={updateState}
            postData={selectedPostData}
            loggedUserData={loggedUser}
          />
        ) : null}
      </div>
      <MobileFooter />
    </>
  );
};

export default OtherProfile;
