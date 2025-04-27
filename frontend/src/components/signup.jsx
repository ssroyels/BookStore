import React from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
      const userInfo = {
        fullname:data.fullname,
        email:data.email,
        password:data.password
      }
      await axios.post("http://localhost:4000/user/signup",userInfo)
      .then((res) => {
        console.log(res.data);
        if(res.data) {
          toast.success("Signup Successfully");
        }
        localStorage.setItem("Users",JSON.stringify(res.data.user));
      }).catch((err) => {
        if(err.response) {
          console.log(err);
          toast.error("Error : "+err.response.data.message);
        }
      })

    }
  return (
    <>
      {/* Signup Modal */}
      <div className="flex h-screen items-center justify-center ">
        <div id="my_modal_4" className="modal w-[600px]">
          <div  className="modal-box ">
            <button
              onClick={() => document.getElementById("my_modal_4").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Signup</h3>

            <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-4 mt-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-80 py-1 px-3 border rounded-md outline-none"
                  {...register("fullname",{required:true})}
                />
                <br /><br />
                {errors.fullname && <span className='text-red-500'>This field is required</span>}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 py-1 px-3 border rounded-md outline-none"
                  {...register("email",{required:true})}
                />
                <br /><br />
                {errors.email && <span className='text-red-500'>This field is required</span>}
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-80 py-1 px-3 border rounded-md outline-none"
                  {...register("password",{required:true})}
                />
                <br /><br />
                {errors.password && <span className='text-red-500'>This field is required</span>}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                >
                  Signup
                </button>
                <span className="text-sm">
                  Have an account?{" "}
                  <span
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Login Modal, rendered *outside* of the signup modal */}
      <Login />
    </>
  );
};

export default Signup;
