import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../feature/loginSignupReducer";
import { authActions } from "../../feature/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //for auth
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const loginDetails = useSelector((state) => state.loginSignup);

  const handleToast = (loginDetails) => {
    switch (loginDetails.loginStatus) {
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
            render: "Successfully, logged in",
            type: toast.TYPE.SUCCESS,
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
          dispatch(authActions.login());
          navigate("/");
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: loginDetails.loginError.message,
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

  // call the handleToast function when loginDetails changes
  useEffect(() => {
    if (loginDetails && loginDetails.loginStatus) {
      handleToast(loginDetails);
    }
  }, [loginDetails]);

  //handle login function
  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    dispatch(loginUser(loginData));
    console.log(email, password);
  };

  return (
    <>
      <div className="bg-white fixed inset-0 flex items-center justify-center mt-1 md:mt-5 select-none">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5 items-center justify-center">
          <div className="w-full flex flex-col md:w-[50%] gap-y-3 p-4">
            <div className="w-full flex flex-col items-center justify-center cursor-pointer select-none">
              <span className="text-orange font-poppins font-bold text-xl md:text-2xl tracking-wide leading-relaxed">
                Emotional
              </span>
              <span className="font-poppins text-black text-base">Outlets</span>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-y-2">
              <span className="text-[1rem] md:text-[1.5rem] font-black leading-relaxed tracking-wide">
                Login to your account
              </span>
              <span className="font-poppins text-xs">
                Don't have an account yet?
                <Link to="/signup">
                  <span className="ml-2 text-orange">Signup</span>
                </Link>
              </span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="w-full flex flex-col items-center juistify-center mt-5 gap-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />

                {/* for password  */}
                <div className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEye className="h-5 w-5" />
                    ) : (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="flex w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] items-center justify-between mt-2">
                  <div>
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4  bg-gray-100 border-gray-300 rounded focus:outline-none"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 mt-1 text-sm font-medium font-poppins"
                    >
                      Remember Me
                    </label>
                  </div>
                  <span className="text-orange font-opensans font-semibold text-xs">
                    Forget your password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] font-poppins text-sm leading-relaxed px-4 py-2 cursor-pointer bg-orange text-white rounded-md text-center mt-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
