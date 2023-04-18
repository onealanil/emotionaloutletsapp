import React, { useState, useEffect } from "react";
import Conversation from "../../component/Conversation";
import LeftSide from "../../component/LeftSide";
import { GrChatOption } from "react-icons/gr";
import { Link } from "react-router-dom";
import MobileFooter from "../../component/MobileFooter";
import ActualMessage from "./ActualMessage";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoIosArrowBack } from "react-icons/io";

const Message = ({ socket }) => {
  const [isActualMessage, setIsActualMessage] = useState(false);
  const [user, setUser] = useState();
  const [conversationList, setConversationList] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [conversationData, setConversationData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/message/conversation", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequestForLoggedUser = async () => {
    const res = await axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setConversationList(data.result);
      setIsLoading(false);
    });
    sendRequestForLoggedUser().then((data) => {
      setUser(data.user);
    });
  }, []);



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

          <div className="w-[100%] h-screen flex gap-x-3">
            <div className="w-full md:w-[40%] h-[90%] flex flex-col gap-y-4">
              {/* my self start  */}
              {isActualMessage && (
                <>
                  <span
                    className="md:hidden"
                    onClick={() => setIsActualMessage(false)}
                  >
                    <IoIosArrowBack />
                  </span>
                </>
              )}

              <div className="flex items-center justify-center gap-x-4">
                <span className="font-bold font-poppins">{user?.username}</span>
                <GrChatOption size={25} />
              </div>
              {/* my self end  */}
              <div className="hidden md:flex flex-col gap-y-3 overflow-y-scroll">
                {conversationList.length > 0 ? (
                  conversationList.map((value) => (
                    <div
                      onClick={() => {
                        setIsActualMessage(true);
                        setConversationId(value?._id);
                        setConversationData(value?.conversation[0]);
                      }}
                      key={value._id}
                    >
                      <Conversation
                        conversationData={value}
                        socket={socket}
                      />
                    </div>
                  ))
                ) : (
                  <Skeleton width="100%" height="40px" count={3} />
                )}
              </div>
              {/* mobile view start  */}
              <div className="flex flex-col gap-y-3 h-screen overflow-y-scroll md:hidden">
                {isActualMessage ? (
                  <>
                    <div className="h-[90%] relative flex items-center justify-center">
                      <ActualMessage
                        conversationId={conversationId}
                        conversationData={conversationData}
                        socket={socket}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {conversationList.length > 0 ? (
                      conversationList.map((value) => (
                        <div
                          onClick={() => {
                            setIsActualMessage(true);
                            setConversationId(value?._id);
                            setConversationData(value?.conversation[0]);
                          }}
                          key={value._id}
                        >
                          <Conversation conversationData={value} />
                        </div>
                      ))
                    ) : (
                      <Skeleton width="100%" height="40px" count={3} />
                    )}
                  </>
                )}
              </div>
              {/* mobile view end  */}
            </div>
            <div className="hidden md:w-[60%] h-[90%] relative md:flex items-center justify-center">
              {isActualMessage ? (
                <ActualMessage
                  conversationId={conversationId}
                  conversationData={conversationData}
                  socket={socket}
                />
              ) : (
                <>
                  <div>
                    <span className="font-poppins font-bold">
                      Select one conversation
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </>
  );
};

export default Message;
