import React, { useState, useEffect } from "react";
import LeftSide from "../component/LeftSide";
import MobileFooter from "../component/MobileFooter";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TipsSingle = () => {
  const id = useParams();
  const [singlePostData, setSinglePostData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSinglePost() {
      const response = await axios
        .get("https://emotionaloutletsbackend.vercel.app/admin/blognumber/" + id.id, {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      return response.data;
    }
    fetchSinglePost().then((data) => {
      setSinglePostData(data.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-14">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
          <LeftSide />
          {/* mobile view  */}
          <Link to="/">
            <div className="md:hidden flex items-center justify-between pt-2 pb-4 sticky top-0 bg-white z-50">
              <div className="flex flex-col items-center justify-center cursor-pointer select-none">
                <span className="text-orange font-poppins font-bold text-base tracking-wide leading-relaxed">
                  Emotional
                </span>
                <span className="font-poppins text-black text-xs">Outlets</span>
              </div>
            </div>
          </Link>

          {/* single post rendering  */}
          <div className="w-full flex justify-center items-center">
            <div className="flex w-full xl:w-[90%] 2xl:w-[80%] gap-x-3">
              {/* right side  */}
              <div className="flex flex-col gap-y-2">
                {isLoading ? (
                  <div className="flex flex-col gap-y-2">
                    <Skeleton height={200} width={700} />
                    <Skeleton height={20} width={700} />
                    <Skeleton height={20} width={700} />
                    <Skeleton height={20} width={700} />
                    <Skeleton height={20} width={700} />
                  </div>
                ) : (
                  <>
                    <img
                      src={singlePostData?.picture}
                      alt="landing-photo"
                      layout="fill"
                      objectFit="cover"
                      className="w-[100%]"
                    />

                    <div className="flex items-center justify-between">
                      <span className="font-poppins text-orange text-xs md:text-sm">
                        {singlePostData?.author}
                      </span>
                      <span className="mr-3 font-popins text-orange text-xs md:text-sm">
                        {format(singlePostData?.createdAt)}
                      </span>
                    </div>

                    <span className="font-poppins leading-normal tracking-wide py-3 mt-[-5px]">
                      {parse(String(singlePostData?.content))}
                    </span>

                    <hr className="border-1 border-black my-3 " />
                  </>
                )}
              </div>
              {/* right side end */}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </>
  );
};

export default TipsSingle;
