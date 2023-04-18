import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdNotifications, MdLogout } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { Link } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../feature/authReducer";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
axios.defaults.withCredentials = true;

const MobileFooter = ({ socket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchBarMobile, setSearchBarMobile] = useState(false);
  const [notificationBar, setNotificationBar] = useState(false);
  const [likeCommentNotifications, setLikeCommentNotifications] = useState([]);
  const [followNotifications, setFollowNotifications] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [count, setCount] = useState(0);

  async function sendNotificationRequest() {
    const response = await axios.get(
      "https://emotionaloutletsbackend.vercel.app/post/notifications",
      { withCredentials: true }
    );
    const notifications = response.data.notifications;
    const likeCommentNotifications = notifications.filter(
      (notification) =>
        notification.type === "LIKE" || notification.type === "COMMENT"
    );
    const followNotifications = notifications.filter(
      (notification) => notification.type === "FOLLOW"
    );

    return {
      likeCommentNotifications,
      followNotifications,
    };
  }

  //socket io get message from back to the specific client
  useEffect(() => {
    socket?.on("messageFromBack", (data) => {
      setArrivalMessage(data);
    });
  }, [socket]);

  // socket io get message from back to the specific client
  useEffect(() => {
    arrivalMessage &&
      setLikeCommentNotifications((notificationEvent) => [
        ...notificationEvent,
        arrivalMessage,
      ]);
  }, [arrivalMessage]);

  const sendRequest = async () => {
    const res = await axios
      .get("https://emotionaloutletsbackend.vercel.app/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      socket?.emit("addUser", {
        username: data.user.username,
        userId: data.user._id,
      });
    });
  }, []);

  useEffect(() => {
    async function fetchNotificationsCount() {
      const response = await axios
        .get("https://emotionaloutletsbackend.vercel.app/post/notifications/count", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      setCount(response.data.count);
    }
    fetchNotificationsCount();
    sendNotificationRequest().then((data) => {
      setLikeCommentNotifications(data.likeCommentNotifications);
      setFollowNotifications(data.followNotifications);
    });
  }, []);

  const handleBoolValueChangeNotification = (newValue) => {
    setNotificationBar(newValue);
  };

  const handleSearchFunctionMobile = (newValue) => {
    setSearchBarMobile(newValue);
  };

  //send logout request
  const sendLogoutRequest = async () => {
    const res = await axios
      .post("https://emotionaloutletsbackend.vercel.app/logout", { withCredentials: true })
      .catch((err) => console.log(err));
  };

  // logout handling-->
  const handleLogout = async () => {
    sendLogoutRequest()
      .then(() => dispatch(authActions.logout()))
      .then(() => navigate("/login"));
  };

  return (
    <>
      <div
        className="md:hidden w-full p-4 sticky bottom-0 bg-white z-50"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div className="flex gap-x-3 items-center justify-around">
          <Link to="/">
            <div>
              <i>
                <AiFillHome color="#f5190a" size={25} />
              </i>
            </div>
          </Link>

          <div onClick={() => setSearchBarMobile(true)}>
            <i>
              <BiSearch color="#f5190a" size={25} />
            </i>
          </div>
          {/* for search div  */}
          {searchBarMobile ? (
            <>
              <div className="fixed inset-0 z-50 w-full flex items-center justify-center mr-4">
                <div className="w-[90%] my-6 mx-auto max-w-3xl">
                  <Search props={handleSearchFunctionMobile} />
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : (
            ""
          )}
          <Link to="/message">
            <div>
              <i>
                <TbMessageCircle2Filled color="#f5190a" size={25} />
              </i>
            </div>
          </Link>

          <Link to="/tips">
            <div>
              <i>
                <GiTeamIdea color="#f5190a" size={25} />
              </i>
            </div>
          </Link>

          <div className="relative">
            <div
              className={`absolute left-3 top-[-10px] font-poppins text-xs text-white w-6 flex items-center justify-center h-6 rouned-full rounded-full bg-red-600  ${
                count === 0 ? "hidden" : "block"
              }`}
              onClick={() => setNotificationBar(true)}
            >
              {count}
            </div>
            <i>
              <MdNotifications color="#f5190a" size={25} />
            </i>
          </div>

          <div onClick={handleLogout}>
            <i>
              <MdLogout color="#f5190a" size={25} />
            </i>
          </div>
        </div>
      </div>
      {notificationBar ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl md:backdrop-blur-none backdrop-blur-md">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <Notification
                props={handleBoolValueChangeNotification}
                likeCommentNotifications={likeCommentNotifications}
                followNotifications={followNotifications}
              />
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

export default MobileFooter;
