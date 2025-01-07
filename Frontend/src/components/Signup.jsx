import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="absolute right-2 top-2 w-10 h-10 flex items-center justify-center bg-transparent text-gray-700 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-teal-500 hover:to-pink-500 hover:text-white hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                ✕
              </Link>


              <h3
                className="text-center relative text-pink-500 font-extrabold text-4xl tracking-wide"
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  padding: '10px 20px',
                  border: '3px solid navy',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(255,105,180,0.1), rgba(0,0,128,0.1))',
                  textShadow: `
      0 1px 2px rgba(0,0,0,0.2),
      0 0 5px pink,
      0 0 10px navy`,
                  animation: 'pulse 1.5s infinite',
                }}
              >
                Signup
                <style>
                  {`
      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 0 5px pink, 0 0 15px navy;
        }
        50% {
          box-shadow: 0 0 15px pink, 0 0 25px navy;
        }
      }
    `}
                </style>
              </h3>

              <div className="mt-4 space-y-2">
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 inline-block mb-2">Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 inline-block mb-2">Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 inline-block mb-2">Password</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
                <p className="text-gray-600">
                  Have account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
