import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiPhoto } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../feature/postReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextEditor from "./TextEditor";

const UserCreate = ({ props, loggedUserData }) => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState(null);

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
        const data = {
          img: x,
          content,
        };
        dispatch(createPost(data));
        // update the toast object with a success message and type
        toast.update(toastIdImage, {
          render: "Image uploaded successfully!",
          type: "success",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmitPost = () => {
    if (img) {
      imageUpload();
    } else {
      const data = {
        content,
      };
      dispatch(createPost(data));
    }
  };

  //create post state handler-->
  const createPostState = useSelector((state) => state.posts);

  const handleToast = (createPostState) => {
    switch (createPostState.createPostStatus) {
      case "pending":
        if (toastId.current === null) {
          toastId.current = toast.info("Loading...", {
            position: "top-right",
            autoClose: 8000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        break;
      case "success":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: createPostState.createPost.message,
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
          window.location.reload();
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: createPostState.createPostError,
            type: toast.TYPE.ERROR,
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
        }
        break;
      default:
        break;
    }
  };

  // call the handleToast function when createPostState changes
  useEffect(() => {
    if (createPostState && createPostState.createPostStatus) {
      handleToast(createPostState);
    }
  }, [createPostState]);


  return (
    <>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-screen lg:h-screen pb-5">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          {/* search button */}
          <div className="w-[15rem] md:w-[40rem] flex items-center justify-center ">
            <span className="font-poppins font-bold leading-relaxed text-lg">
              Create post
            </span>
          </div>
          <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
            <AiOutlineClose
              size={25}
              className="text-red-900 block cursor-pointer"
            />
          </i>
        </div>
        {/* header end  */}
        {/* body start  */}
        <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
          <label htmlFor="postimg-input" className="cursor-pointer">
            <HiPhoto size={25} color="#f5190a" />
          </label>
          <input
            type="file"
            name="postImg"
            id="postimg-input"
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
            ""
          )}
          <TextEditor setContent={setContent} />
          {/* <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-orange resize-none"
            placeholder="Write your thoughts here..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea> */}
          <div
            className="w-full py-2 px-2 bg-orange font-poppins text-white rounded-md text-center cursor-pointer"
            onClick={handleSubmitPost}
          >
            <span>Post</span>
          </div>
        </div>
        {/* body end  */}
      </div>
    </>
  );
};

export default UserCreate;
