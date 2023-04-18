import React, { useEffect, useState, useRef } from "react";
import LeftSide from "../component/LeftSide";
import MiddleSide from "../component/MiddleSide";
import RightSide from "../component/RightSide";
import MobileFooter from "../component/MobileFooter";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const Home = ({ socket }) => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("https://emotionaloutletsbackend.vercel.app/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      socket?.emit("addUser", {
        username: data.user.username,
        userId: data.user._id,
      });
    });
  }, []);

  return (
    <>
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
          <LeftSide socket={socket} />
          {/* mobile view  */}
          <div className="md:hidden flex items-center justify-between pt-2 pb-4 sticky top-0 bg-white z-50">
            <div className="flex flex-col items-center justify-center cursor-pointer select-none">
              <span className="text-orange font-poppins font-bold text-base tracking-wide leading-relaxed">
                Emotional
              </span>
              <span className="font-poppins text-black text-xs">Outlets</span>
            </div>
            <div className="flex items-center justify-center cursor-pointer">
              <Link to={`/profile`}>
                {user && user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : user && user.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                )}
              </Link>
            </div>
          </div>
          <MiddleSide loggedUserData={user} socket={socket} />
          {/* right start  */}
          <RightSide loggedUserData={user} />
          {/* right end  */}
        </div>
      </div>
      <MobileFooter socket={socket} />
    </>
  );
};

export default Home;
