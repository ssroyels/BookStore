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
      .post("http://localhost:4000/user/signup", userInfo)
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
    <div className="text-center d-flex pt-[30vh] h-screen bg-gray-500">
     {/* The button to open modal */}
<a href="#my_modal_8" className="btn bg-red-400 z-20 font-bold text-white">SignUp</a>

{/* Put this part before </body> tag */}
<div className="modal" role="dialog" id="my_modal_8">
  <div className="modal-box">
  <h3 className="font-bold text-lg">SignUp</h3>
       <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-4 mt-4">
                <div>
                <span>Name</span>
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
                  <label className="block">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-80 py-1 px-3 border rounded-md outline-none"
                    {...register("email",{required:true})}
                  />
                  <br />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
    
                <div>
                  <label className="block">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-80 py-1 px-3 border rounded-md outline-none"
                    {...register("password",{required:true})}
                  />
                  <br /><br />
                   {errors.password && <span className='text-red-500'>This field is required</span>} 
                </div>
    
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                  >
                    SignUp
                  </button>
                  <span className="text-sm">
                    Have an account?{" "}
                    <Link
                      to="/"
                      className="underline text-blue-500 cursor-pointer"
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </form>
    <div className="modal-action">
      <a href="#" className="btn">Close</a>
    </div>
  </div>
</div>
    </div>
    </>
  );
}

export default Signup;