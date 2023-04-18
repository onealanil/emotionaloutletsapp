import React, { useEffect, useState } from "react";

const Conversation = ({ conversationData, socket }) => {
  const [onlineUsers, setOnlineUsers] = useState();

  useEffect(() => {
    socket?.on("getUsers", (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  return (
    <>
      <div className="flex flex-row gap-x-2 w-full p-3 space-x-2 items-start justify-end select-none cursor-pointer">
        <div className="w-[20%]">
          {conversationData?.conversation[0] &&
          conversationData?.conversation[0].profilePic ? (
            <img
              src={conversationData?.conversation[0].profilePic}
              alt="suggestion"
              className="w-[3rem] h-[3rem] rounded-full"
            />
          ) : conversationData?.conversation[0] &&
            conversationData?.conversation[0].gender === "male" ? (
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
        </div>
        <div className="w-[80%] flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-poppins font-semibold  max-[1067px]:text-xs">
              {conversationData?.conversation[0].username}
            </span>
            {onlineUsers?.some(
              (item) => item.userId === conversationData?.conversation[0]._id
            ) && (
              <>
                <span className="text-[0.75rem] text-green-500">Online</span>
              </>
            )}
          </div>

          <span className="text-xs">Select conversation </span>
        </div>
      </div>
    </>
  );
};

export default Conversation;
