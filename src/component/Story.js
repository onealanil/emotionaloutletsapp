import React, { useState, useRef, useEffect } from "react";
import {
  AiFillRightCircle,
  AiFillLeftCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { HiPhoto } from "react-icons/hi2";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { format } from "timeago.js";
import axios from "axios";

const Story = ({ loggedUserData }) => {
  const storiesRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [storyUpload, setStoryUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState(null);
  const [stories, setStories] = useState([]);
  const [ownStory, setOwnStory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyOwnerData, setStoryOwnerData] = useState();
  const [toastIdImage, setToastIdImage] = useState(null);
  const [updateState, setUpdateState] = useState(false);

  const sendStoryRequest = async () => {
    const res = await axios
      .get("https://emotionaloutletsbackend.vercel.app/fetchStory", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendOwnStoryRequest = async () => {
    const res = await axios
      .get("https://emotionaloutletsbackend.vercel.app/fetchOwnStory", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendStoryRequest().then((data) => {
      setStories(data);
      setIsLoading(false);
    });
    sendOwnStoryRequest().then((data) => {
      setOwnStory(data);
      setIsLoading(false);
    });
  }, [updateState]);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    setImg(changeEvent.target.files[0]);
  }

  async function handleSubmitStory() {
    const res = await axios.get("https://emotionaloutletsbackend.vercel.app/checkingStory", {
      withCredentials: true,
    });
    if (res.data.message === "you can") {
      handleSubmitStoryFunction();
    } else {
      toast.error("You can't upload story twice a day");
    }
  }

  async function handleSubmitStoryFunction() {
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "rijoqnuu");
      data.append("cloud_name", "dcnm2ql9y");

      const id = toast.info("Uploading image...", { autoClose: false });
      setToastIdImage(id);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcnm2ql9y/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res2 = await res.json();
      console.log(res2);
      if (res2.error) {
        console.log("something went wrong");
      } else {
        let x = res2.url;
        const data = {
          img: x,
        };
        await axios
          .post("https://emotionaloutletsbackend.vercel.app/uploadStory", data, {
            withCredentials: true,
          })
          .then(() => {
            toast.update(id, {
              render: "Image uploaded successfully!",
              autoClose: 3000,
            });
            setUpdateState(true);
            setStoryUpload(false);
            setImageSrc("");
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onScroll = () => {
    if (storiesRef.current.scrollLeft > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }

    if (
      storiesRef.current.scrollLeft ===
      storiesRef.current.scrollWidth - storiesRef.current.clientWidth
    ) {
      console.log("hello");
      setShowRight(false);
    } else {
      console.log("world");
      setShowRight(true);
    }
  };

  const storyHandler = () => {
    setStoryUpload(true);
  };

  console.log(storyOwnerData);

  return (
    <>
      <div className="relative w-full select-none z-0">
        <div
          onScroll={onScroll}
          ref={storiesRef}
          className="flex flex-row overflow-x-auto md:p-5 scrollbar-hide scroll-smooth"
        >
          <div className="flex-none">
            <div className="flex flex-row space-x-3">
              {" "}
              {/* fixed width container */}
              {/* Add to story  */}
              <div
                className="relative flex flex-col items-center justify-center gap-y-2 cursor-pointer z-50"
                onClick={storyHandler}
              >
                {isLoading ? (
                  <Skeleton
                    width="5rem"
                    height="5rem"
                    borderRadius="md"
                    borderWidth="2"
                    borderColor="orange"
                  />
                ) : (
                  <>
                    {ownStory && ownStory[0] ? (
                      <img
                        src={ownStory[0]?.img}
                        alt="stories"
                        className="w-[5rem] h-[5rem] rounded-t-md border-solid border-2 border-orange cursor-pointer"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <>
                        {loggedUserData && loggedUserData.profilePic ? (
                          <img
                            src={loggedUserData.profilePic}
                            alt="stories"
                            className="w-[5rem] h-[5rem] rounded-t-md border-solid border-2 border-orange cursor-pointer"
                          />
                        ) : loggedUserData &&
                          loggedUserData.gender === "male" ? (
                          <img
                            src="/assets/images/male-avatar.png"
                            alt="other-profile-pic"
                            className="w-[5rem] h-[5rem] rounded-t-md border-solid border-2 border-orange cursor-pointer"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <img
                            src="/assets/images/female-avatar.png"
                            alt="other-profile-pic"
                            className="w-[5rem] h-[5rem] rounded-t-md border-solid border-2 border-orange cursor-pointer"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </>
                    )}
                    <div className="absolute bottom-4">
                      <IoAddCircleSharp size={25} color="	#4267B2" />
                    </div>
                    <span className="text-xs">Create Story</span>
                  </>
                )}
              </div>
              {/* add to story end  */}
              {isLoading ? (
                <>
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-y-2 z-40"
                    >
                      <Skeleton circle width={100} height={100} />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {stories &&
                    stories.map((val) => (
                      <>
                        {/* one story start  */}
                        <div
                          className="flex flex-col items-center justify-center gap-y-2 z-40 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setStoryOpen(true);
                            setStoryOwnerData(val);
                          }}
                        >
                          <img
                            src={val.img}
                            alt="stories"
                            className="w-[5rem] h-[5rem] rounded-full border-solid border-2 border-orange"
                            style={{ objectFit: "cover" }}
                          />
                          <p className="w-16 truncate text-xs">
                            {val?.postedBy.fullname}
                          </p>
                        </div>
                        {/* one story end  */}
                      </>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-0 p-3 w-full h-full flex justify-between z-10 items-center">
          <i
            onClick={() => {
              storiesRef.current.scrollLeft =
                storiesRef.current.scrollLeft - 300;
            }}
          >
            <AiFillLeftCircle
              size={25}
              color="white"
              className={`drop-shadow-lg cursor-pointer ${
                showLeft ? "visible" : "invisible"
              }`}
            />
          </i>
          <i
            onClick={() => {
              storiesRef.current.scrollLeft =
                storiesRef.current.scrollLeft + 300;
            }}
          >
            <AiFillRightCircle
              size={25}
              fill="white"
              className={`drop-shadow-lg cursor-pointer ${
                showRight ? "visible" : "invisible"
              }`}
            />
          </i>
        </div>
      </div>
      {storyUpload && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl  md:backdrop-blur-none backdrop-blur-md">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[20rem] lg:h-[22rem] pb-5">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* search button */}
                  <div className="w-[15rem] md:w-[20rem] flex items-center justify-center ">
                    <span className="font-poppins font-bold leading-relaxed text-lg">
                      Create Story
                    </span>
                  </div>
                  <i
                    className="p-1 ml-auto float-right"
                    onClick={() => setStoryUpload(false)}
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
                  <label htmlFor="postimg-input" className="cursor-pointer">
                    <HiPhoto size={25} color="#f5190a" />
                  </label>
                  <input
                    type="file"
                    name="postImg"
                    id="postimg-input"
                    accept="image/jpeg, image/png"
                    onChange={handleOnChange}
                    style={{ display: "none" }}
                  />
                  {imageSrc ? (
                    <>
                      <div className="w-[100%] ">
                        <img
                          src={imageSrc}
                          className="w-[22rem] rounded-b-md"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className="w-full py-2 px-2 bg-orange font-poppins text-white rounded-md text-center cursor-pointer"
                    onClick={handleSubmitStory}
                  >
                    <span>Post</span>
                  </div>
                </div>
                {/* body end  */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {storyOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-screen pb-5">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* search button */}
                  <div className="w-full md:w-full flex items-center justify-center gap-x-5 ">
                    <span className="font-poppins font-bold leading-relaxed text-lg">
                      {storyOwnerData?.postedBy.fullname} - Story
                    </span>
                    <span className="text-xs">
                      {format(storyOwnerData?.createdAt)}
                    </span>
                  </div>
                  <i
                    className="p-1 ml-auto float-right"
                    onClick={() => setStoryOpen(false)}
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
                  <img
                    src={storyOwnerData?.img}
                    // className="w-full h-full"
                    alt="storyOwner"
                  />
                </div>
                {/* body end  */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default Story;
