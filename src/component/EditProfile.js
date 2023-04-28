import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiPhoto } from "react-icons/hi2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditProfile = ({ props, loggedUserData }) => {
  const toastId = useRef(null);
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState(loggedUserData?.profilePic);
  const [fullname, setFullName] = useState(loggedUserData?.fullname);
  const [bio, setBio] = useState(loggedUserData?.bio);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    setImg(changeEvent.target.files[0]);
  }

  async function imageUpload() {
    console.log("hellotoat");
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "rijoqnuu");
      data.append("cloud_name", "dcnm2ql9y");

      // Use toast to display a pending toast message while the image is being uploaded
      const toastIdImage = toast("Uploading image...", {
        // set autoClose to false so that the toast stays visible until the promise resolves
        autoClose: false,
        // set type to "info" to display a pending toast message
        type: "info",
      });

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
        toast.update(toastIdImage, {
          render: "Image uploaded successfully!",
          autoClose: 3000,
        });
        const data = {
          img: x,
          fullname: fullname,
          bio: bio,
        };
        await axios
          .put("https://emotionaloutletsserver.onrender.com/editprofile", data, {
            withCredentials: true,
          })
          .then(() => {
            toast.success("Successfully, updated profile");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateProfile = async () => {
    if (img === loggedUserData?.profilePic) {
      const data = {
        fullname: fullname,
        bio: bio,
      };
      await axios
        .put("https://emotionaloutletsserver.onrender.com/editprofile", data, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Successfully, updated profile");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      imageUpload();
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:backdrop-blur-none backdrop-blur-md">
        <div className="relative my-6 mx-auto md:max-w-xl w-[90%]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[25rem] lg:h-[30rem]">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="w-[15rem] md:w-[20rem] flex items-center justify-center ">
                <span className="font-poppins font-bold leading-relaxed text-lg">
                  Edit profile
                </span>
              </div>
              <i
                className="p-1 ml-auto float-right"
                onClick={() => props(false)}
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
              <span className="text-xs font-poppins">
                Change profile picture
              </span>
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
                    <img src={imageSrc} className="w-[22rem] rounded-b-md" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[100%] ">
                    <img src={img} className="w-[22rem] rounded-b-md" />
                  </div>
                </>
              )}

              <input
                type="text"
                placeholder="Full name.."
                value={fullname}
                className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Edit bio.."
                value={bio}
                className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (inputValue.length <= 50) {
                    setBio(inputValue);
                  }
                }}
                required
              />
              <p>Remaining letters: {50 - bio.length}</p>

              <div
                className="w-full py-2 px-2 bg-orange font-poppins text-white rounded-md text-center cursor-pointer"
                onClick={handleUpdateProfile}
              >
                <span>Update</span>
              </div>
            </div>
            {/* body end  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
