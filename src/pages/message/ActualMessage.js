import React, { useState, useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { format } from "timeago.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdDelete } from "react-icons/md";
axios.defaults.withCredentials = true;

const ActualMessage = ({ conversationId, conversationData, socket }) => {
  const [userMessageText, setUserMessageText] = useState("");
  const [senderId, setSenderId] = useState("");
  const [messageCombo, setMessageCombo] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messageCombo]);

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
    });
  }, []);

  useEffect(() => {
    //fetching the messages from conversation id or combo id
    if (conversationId) {
      axios({
        method: "get",
        url: `https://emotionaloutletsserver.onrender.com/message/messagesCombo/${conversationId}`,
      })
        .then((result) => {
          setMessageCombo(result.data.result);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [conversationId]);

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      conversationId: conversationId,
      msg: userMessageText,
    };
    const config = {
      headers: { "content-type": "application/json" },
    };

    axios({
      method: "post",
      url: "https://emotionaloutletsserver.onrender.com/message/messages",
      data,
      headers: config,
    })
      .then((result) => {
        setSenderId(result.data.messages.senderId);
        setUserMessageText("");
        setMessageCombo((messageCombo) => [
          ...messageCombo,
          result.data.messages,
        ]);
      })
      .catch((error) => console.error(error.message));

    //for socket io
    const messageData = {
      sender: user?._id,
      receiver: conversationData?._id,
      message: userMessageText,
    };
    socket.emit("textMessage", messageData);
  };

  //socket io get message from back to the specific client
  useEffect(() => {
    socket?.on("textMessageFromBack", ({ sender, message }) => {
      setArrivalMessage({
        sender: sender,
        msg: message,
      });
    });
  }, [socket]);

  // //socket io to get the message and update it after getting from the server
  useEffect(() => {
    arrivalMessage &&
      conversationData &&
      conversationData._id === arrivalMessage.sender &&
      setMessageCombo((messageCombo) => [...messageCombo, arrivalMessage]);
  }, [arrivalMessage, conversationData]);

  //delete conversation handler
  const deleteConversationHandler = () =>{
    console.log("hello")
  }

  return (
    <>
      <div className="absolute top-0 w-full h-16 flex items-center gap-x-5 px-2">
        {isLoading ? (
          <Skeleton circle width={50} height={50} />
        ) : (
          <>
            {conversationData && conversationData.profilePic ? (
              <img
                src={conversationData?.profilePic}
                alt="chat-profile"
                className="w-[3rem] h-[3rem] rounded-full"
              />
            ) : conversationData && conversationData?.gender === "male" ? (
              <img
                src="../assets/images/male-avatar.png"
                alt="chat-profile"
                className="w-[3rem] h-[3rem] rounded-full"
              />
            ) : (
              <img
                src="../assets/images/female-avatar.png"
                alt="chat-profile"
                className="w-[3rem] h-[3rem] rounded-full"
              />
            )}
          </>
        )}
        <span className="font-bold font-poppins">
          {conversationData ? (
            conversationData.fullname
          ) : (
            <Skeleton width={120} height={24} />
          )}
        </span>
        <div className="mdd:w-[3rem] flex items-end justify-end">
           <MdDelete size={25} color="red" onClick={deleteConversationHandler}/>
        </div>
      </div>
      {/* message body start  */}
      <div className="w-[100%] h-[70%] bg-[#f9fafb] p-5 overflow-y-scroll" ref={chatRef}>
        {!isLoading ? (
          messageCombo.map((val) => (
            <>
              {user ? (
                <>
                  {user._id === val.senderId ? (
                    <>
                      <div className="w-[50%] mt-4">
                        <div className="bg-gray-700  rounded-2xl p-4">
                          <span className="text-white font-medium text-sm">
                            {val.msg}
                          </span>
                          <div className="mt-2">
                            <span className="text-white text-xs">
                              {format(val.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="flex flex-col items-end justify-end w-full mt-2">
                        {isLoading ? (
                          <Skeleton width="50%" height={120} />
                        ) : (
                          <div class="bg-gray-300 rounded-lg w-[50%] p-4 break-words">
                            <span class="font-medium text-black text-sm">
                              {val?.msg}
                            </span>
                            <div class="mt-2">
                              <span class="text-xs text-black">
                                {format(val.createdAt)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Skeleton width="100%" height={500} />
              )}
            </>
          ))
        ) : (
          <div className="w-[50%] mt-4">
            <Skeleton height={80} width="100%" />
          </div>
        )}
      </div>

      {/* message body end  */}
      <div className="absolute w-[100%] bottom-0 h-16 px-3">
        {/* chat input start  */}
        <div>
          <form class="flex items-center">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsEmojiSmile />
              </div>
              <input
                type="text"
                id="message"
                className="border border-gray-300 w-[100%] text-gray-900 text-sm rounded-lg focus:outline-none  block md:w-96 pl-10 p-2.5"
                placeholder="Message..."
                autoComplete="off"
                required
                onChange={(e) => setUserMessageText(e.target.value)}
                value={userMessageText}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-orange bg-green rounded-lg focus:ring-0"
              onClick={messageSubmitHandler}
            >
              <IoSend size={25} />
            </button>
          </form>
        </div>
        {/* chat input end  */}
      </div>
    </>
  );
};

export default ActualMessage;
