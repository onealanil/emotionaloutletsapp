import React, { useState, useEffect } from "react";
import LeftSide from "../component/LeftSide";
import MobileFooter from "../component/MobileFooter";
import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import { BsGrid } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SinglePost from "./SinglePost";
import EditProfile from "../component/EditProfile";

const Profile = () => {
  const [isPost, setIsPost] = useState(true);
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [savedPosts, setSavedPosts] = useState();
  const [stateChanged, setStateChanged] = useState(false);
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const updateState = (e, newState) => {
    e.preventDefault();
    setShowModal(newState);
    setStateChanged(!stateChanged);
  };

  const sendRequest = async () => {
    const res = await axios
      .get("https://emotionaloutletsserver.onrender.com/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setPost(data.posts);
      setIsLoading(false);
    });
  }, [stateChanged]);

  const handleCardClick = (e, postData) => {
    e.preventDefault();
    setSelectedPostData(postData);
  };

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get("https://emotionaloutletsserver.onrender.com/mysavedposts", {
          withCredentials: true,
        });
        setSavedPosts(response.data.savedPosts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedPosts();
  }, []);

  const handleBoolValueChange = (newValue) => {
    setIsEditProfile(newValue);
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
                {isLoading || !user ? (
                  <Skeleton circle={true} width="7rem" height="7rem" />
                ) : user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="profile-photo"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                ) : user.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="profile-photo"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="profile-photo"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                )}
              </div>
              <div className="flex items-center justify-center md:items-start md:justify-start flex-col gap-y-1 w-full md:w-[40%]">
                {isLoading || !user ? (
                  <Skeleton width="10rem" />
                ) : (
                  <span className="text-lg font-semibold">{user.fullname}</span>
                )}
                {isLoading || !user ? (
                  <Skeleton width="8rem" />
                ) : (
                  <span className="text-base font-poppins font-semibold">
                    {user.username}
                  </span>
                )}
                {isLoading || !user ? (
                  <Skeleton width="6rem" />
                ) : (
                  <span className="text-sm ">{user.who}</span>
                )}
              </div>
              <div className="md:w-[60%] w-full flex items-center justify-center md:justify-start cursor-pointer">
                {isLoading ? (
                  <Skeleton width="9rem" height="2.5rem" />
                ) : (
                  <span
                    className="py-2 px-4 bg-orange w-36 flex gap-x-2 items-center justify-center text-white rounded-md"
                    onClick={(e) => setIsEditProfile(true)}
                  >
                    Edit profile <AiFillSetting size={25} />
                  </span>
                )}
              </div>
            </div>

            {/* edit profile start  */}
            {isEditProfile ? (
              <EditProfile
                props={handleBoolValueChange}
                loggedUserData={user}
              />
            ) : null}
            {/* edit profile end  */}

            {/* following follwers start  */}
            <div className="w-full flex items-center justify-center gap-x-4 my-2 md:my-5 select-none">
              {user ? (
                <span
                  className="font-poppins text-sm md:text-base cursor-pointer"
                  onClick={() => {
                    setIsFollowerOpen(true);
                  }}
                >
                  <b className="mx-1">{user.followers.length}</b>
                  followers
                </span>
              ) : (
                <Skeleton width={100} height={20} />
              )}
              {user ? (
                <span
                  className="font-poppins text-sm md:text-base cursor-pointer"
                  onClick={() => {
                    setIsFollowingOpen(true);
                  }}
                >
                  <b className="mx-1 font-semibold">{user.following.length}</b>{" "}
                  following
                </span>
              ) : (
                <Skeleton width={100} height={20} />
              )}
              {post ? (
                <span className="font-poppins text-sm md:text-base cursor-pointer">
                  <b className="mx-1 font-semibold">{post.length}</b> post
                </span>
              ) : (
                <Skeleton width={100} height={20} />
              )}
            </div>

            {/* bio start  */}
            <div className="w-full flex items-center justify-center gap-x-4 my-2 md:my-5 select-none">
              {user ? (
                <div className="md:w-[35%] w-[80%] pb-2 flex items-center justify-center">
                  <span className="font-opensans text-xs md:text-sm">
                    {user?.bio}
                  </span>
                </div>
              ) : (
                <Skeleton width={200} height={20} />
              )}
            </div>

            {isFollowerOpen && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl md:backdrop-blur-none backdrop-blur-md">
                  <div className="relative  my-6 mx-auto md:max-w-md w-[90%]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[50%] pb-5">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        {/* search button */}
                        <div className="w-[15rem] md:w-[10rem] flex items-center justify-center gap-x-5 ">
                          <span className="font-poppins font-bold leading-relaxed text-lg">
                            Followers
                          </span>
                        </div>
                        <i
                          className="p-1 ml-auto float-right"
                          onClick={() => setIsFollowerOpen(false)}
                        >
                          <AiOutlineClose
                            size={25}
                            className="text-red-900 block cursor-pointer"
                          />
                        </i>
                      </div>
                      {/* header end  */}
                      {/* body start  */}
                      <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
                        {user?.followers.map((val) => (
                          <div
                            className="flex flex-row gap-x-2 w-full p-3 space-x-2 items-start justify-end select-none"
                            key={val._id}
                          >
                            <div className="w-[25%]">
                              <Link to={`/profile/${val._id}`}>
                                {val && val.profilePic ? (
                                  <img
                                    src={val.profilePic}
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                ) : val && val.gender === "male" ? (
                                  <img
                                    src="../assets/images/male-avatar.png"
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                ) : (
                                  <img
                                    src="../assets/images/female-avatar.png"
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                )}
                              </Link>
                            </div>
                            <div className="w-[50%] flex flex-col gap-y-1">
                              <span className="text-sm font-poppins font-semibold  max-[1067px]:text-xs">
                                {val.fullname}
                              </span>
                            </div>
                            <div className="w-[25%] flex items-center justify-center cursor-pointer">
                              <Link to={`/profile/${val._id}`}>
                                <span className="py-2 px-4 bg-orange text-xs rounded-md  max-[1067px]:bg-white text-white  max-[1067px]:text-orange">
                                  Visit
                                </span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* body end  */}
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}

            {/* is follwing open  */}
            {isFollowingOpen && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl md:backdrop-blur-none backdrop-blur-md">
                  <div className="relative  my-6 mx-auto md:max-w-md w-[90%]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[50%] pb-5">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        {/* search button */}
                        <div className="w-[15rem] md:w-[10rem] flex items-center justify-center gap-x-5 ">
                          <span className="font-poppins font-bold leading-relaxed text-lg">
                            Following
                          </span>
                        </div>
                        <i
                          className="p-1 ml-auto float-right"
                          onClick={() => setIsFollowingOpen(false)}
                        >
                          <AiOutlineClose
                            size={25}
                            className="text-red-900 block cursor-pointer"
                          />
                        </i>
                      </div>
                      {/* header end  */}
                      {/* body start  */}
                      <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
                        {user?.following.map((val) => (
                          <div
                            className="flex flex-row gap-x-2 w-full p-3 space-x-2 items-start justify-end select-none"
                            key={val._id}
                          >
                            <div className="w-[25%]">
                              <Link to={`/profile/${val._id}`}>
                                {val && val.profilePic ? (
                                  <img
                                    src={val.profilePic}
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                ) : val && val.gender === "male" ? (
                                  <img
                                    src="../assets/images/male-avatar.png"
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                ) : (
                                  <img
                                    src="../assets/images/female-avatar.png"
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                )}
                              </Link>
                            </div>
                            <div className="w-[50%] flex flex-col gap-y-1">
                              <span className="text-sm font-poppins font-semibold  max-[1067px]:text-xs">
                                {val.fullname}
                              </span>
                            </div>
                            <div className="w-[25%] flex items-center justify-center cursor-pointer">
                              <Link to={`/profile/${val._id}`}>
                                <span className="py-2 px-4 bg-orange text-xs rounded-md  max-[1067px]:bg-white text-white  max-[1067px]:text-orange">
                                  Visit
                                </span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* body end  */}
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}

            {/* post start  */}

            <hr className="border-1 border-black my-5" />
            <div className="flex items-center justify-center gap-x-10 md:w-[75%] my-5">
              <div
                className={`flex gap-x-2 items-center justify-center cursor-pointer select-none font-semibold leading-relaxed tracing-wide ${
                  isPost ? "text-orange" : "text-black"
                }`}
                onClick={() => setIsPost(true)}
              >
                <BsGrid />
                <span className="uppercase font-poppins text-xs">Posts</span>
              </div>
              <div
                className={`flex gap-x-2 items-center justify-center cursor-pointer select-none font-semibold leading-relaxed tracing-wide ${
                  isPost ? "text-black" : "text-orange"
                }`}
                onClick={() => setIsPost(false)}
              >
                <VscSave />
                <span className="uppercase font-poppins text-xs">Saved</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 md:w-[75%]">
              {isLoading ? (
                <div className="flex flex-col space-y-4">
                  <Skeleton height={200} count={3} />
                </div>
              ) : (
                <div className="flex flex-col space-y-4 mb-24">
                  {isPost ? (
                    <>
                      {post?.map((val) => (
                        <div onClick={(e) => handleCardClick(e, val)}>
                          <Card
                            key={val._id}
                            setShowModal={showModal}
                            updateState={updateState}
                            postData={val}
                            postOwner={user}
                            loggedUserData={user}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {savedPosts?.map((val) => (
                        <div onClick={(e) => handleCardClick(e, val)}>
                          <Card
                            key={val._id}
                            setShowModal={showModal}
                            updateState={updateState}
                            postData={val}
                            postOwner={val.postedBy}
                          />
                        </div>
                      ))}
                    </>
                  )}
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
            loggedUserData={user}
          />
        ) : null}
      </div>
      <MobileFooter />
    </>
  );
};

export default Profile;
