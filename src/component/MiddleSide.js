import React, { useState, useEffect } from "react";
import SinglePost from "../pages/SinglePost";
import Card from "./Card";
import CreatePost from "./CreatePost";
import Story from "./Story";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../feature/postReducer";

const MiddleSide = ({ loggedUserData, socket }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChanged] = useState(false);

  const updateState = (e, newState) => {
    e.preventDefault();
    setShowModal(newState);
    setStateChanged(!stateChanged);
  };

  useEffect(() => {
    dispatch(getAllPost())
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [stateChanged]);

  const handleCardClick = (e, postData) => {
    e.preventDefault();
    setSelectedPostData(postData);
  };

  const postDetails = useSelector((state) => state.posts.allPost.result);

  return (
    <>
      {/* middle start  */}
      <div className="w-full md:w-[45%]">
        <div className="flex flex-col gap-y-4">
          <Story loggedUserData={loggedUserData} />
          <CreatePost loggedUserData={loggedUserData} />
          {/* post div  */}
          <div className="flex flex-col gap-y-3 mb-24">
            {isLoading ? (
              <Skeleton count={5} height={200} />
            ) : (
              postDetails &&
              postDetails.map((val) => (
                <>
                  <div key={val._id} onClick={(e) => handleCardClick(e, val)}>
                    <Card
                      setShowModal={showModal}
                      updateState={updateState}
                      postData={val}
                      postOwner={val.postedBy}
                      loggedUserData={loggedUserData}
                    />
                  </div>
                </>
              ))
            )}
          </div>
        </div>
        {showModal ? (
          <SinglePost
            setShowModal={setShowModal}
            updateState={updateState}
            postData={selectedPostData}
            loggedUserData={loggedUserData}
            socket={socket}
          />
        ) : null}
      </div>
    </>
  );
};

export default MiddleSide;
