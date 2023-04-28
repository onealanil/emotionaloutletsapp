import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdNotifications, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiTeamIdea } from "react-icons/gi";
import Search from "./Search";
import Notification from "./Notification";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../feature/authReducer";
axios.defaults.withCredentials = true;

const LeftSide = ({ socket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(false);
  const [notificationBar, setNotificationBar] = useState(false);
  const [likeCommentNotifications, setLikeCommentNotifications] = useState([]);
  const [followNotifications, setFollowNotifications] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [count, setCount] = useState(0);

  async function sendNotificationRequest() {
    const response = await axios.get(
      "https://emotionaloutletsserver.onrender.com/post/notifications",
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
      .get("https://emotionaloutletsserver.onrender.com/user", { withCredentials: true })
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
        .get("https://emotionaloutletsserver.onrender.com/post/notifications/count", {
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

  const handleBoolValueChange = (newValue) => {
    setSearchBar(newValue);
  };

  const handleBoolValueChangeNotification = (newValue) => {
    setNotificationBar(newValue);
  };

  //send logout request
  const sendLogoutRequest = async () => {
    const res = await axios
      .post("https://emotionaloutletsserver.onrender.com/logout", { withCredentials: true })
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
      <div className="hidden md:w-[25%] md:flex flex-col gap-y-10 sticky top-10 h-max">
        {/* logo */}
        <Link to="/">
          <div className="w-full flex flex-col items-center justify-center cursor-pointer select-none">
            <span className="text-orange font-poppins font-bold text-xl md:text-2xl tracking-wide leading-relaxed">
              Emotional
            </span>
            <span className="font-poppins text-black text-base">Outlets</span>
          </div>
        </Link>
        {/* icons  */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-start justify-center gap-y-6 select-none">
            <Link to="/">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <AiFillHome color="#f5190a" size={25} />
                </i>
                <span className="font-poppins">Home</span>
              </div>
            </Link>

            <div
              className="flex gap-x-4 items-center justify-center cursor-pointer"
              onClick={() => setSearchBar(true)}
            >
              <i>
                <BiSearch color="#f5190a" size={25} />
              </i>
              <span className="font-poppins">Search</span>
            </div>

            <Link to="/message">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <TbMessageCircle2Filled color="#f5190a" size={25} />
                </i>
                <span className="font-poppins">Message</span>
              </div>
            </Link>

            <Link to="/tips">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <GiTeamIdea color="#f5190a" size={25} />
                </i>
                <span className="font-poppins">Tips</span>
              </div>
            </Link>

            <div
              className="flex gap-x-4 items-center justify-center cursor-pointer relative"
              onClick={() => setNotificationBar(true)}
            >
              <div
                className={`absolute left-3 top-[-10px] font-poppins text-xs text-white w-6 flex items-center justify-center h-6 rouned-full rounded-full bg-red-600 ${
                  count === 0 ? "hidden" : "block"
                }`}
              >
                {count}
              </div>
              <i>
                <MdNotifications color="#f5190a" size={25} />
              </i>
              <span className="font-poppins">Notifications</span>
            </div>

            <div
              className="flex gap-x-4 items-center justify-center cursor-pointer"
              onClick={handleLogout}
            >
              <i>
                <MdLogout color="#f5190a" size={25} />
              </i>
              <span className="font-poppins">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* for search  */}
      {searchBar ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <Search props={handleBoolValueChange} />
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}

      {notificationBar ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
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

export default LeftSide;
