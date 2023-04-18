import React, { useState, useEffect } from "react";
import LeftSide from "../component/LeftSide";
import MobileFooter from "../component/MobileFooter";
import Tips from "../component/Tips";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchAdminAllPost() {
      const response = await axios
        .get("https://emotionaloutletsbackend.vercel.app/admin/getallpost", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      return response.data;
    }
    fetchAdminAllPost().then((data) => {
      setPosts(data.posts);
      setIsLoading(false);
    });
  }, []);

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
    });
  }, []);

  return (
    <>
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
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
            <div className="flex items-center justify-center cursor-pointer">
              <Link to="/profile">
                {user && user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="profile-img"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : user && user.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="profile-img"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="profile-img"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                )}
              </Link>
            </div>
          </div>
          {/* posts div for tips  */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 my-4 mb-12">
            {isLoading ? (
              <>
                <Skeleton height={200} width={300} />
                <Skeleton height={200} width={300} />
                <Skeleton height={200} width={300} />
              </>
            ) : posts.length > 0 ? (
              posts.map((val) => (
                <>
                  <div>
                    <Tips postData={val} />
                  </div>
                </>
              ))
            ) : (
              <span>No posts found.</span>
            )}
          </div>
        </div>
      </div>
      <MobileFooter />
    </>
  );
};

export default AdminPost;
