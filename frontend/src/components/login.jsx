import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
 
      const userInfo = {
      
        email:data.email,
        password:data.password
      }

  
  
  
    await axios.post("http://localhost:4000/user/login",userInfo)
    .then((res) => {
      console.log(res.data);
      if(res.data) {

        toast.success("Login Successfully");
        setTimeout(() => {
          document.getElementById("my_modal_3").close();
          window.location.reload();
          localStorage.setItem("Users",JSON.stringify(res.data.user));

        },3000);
     
      }
      localStorage.setItem("Users",JSON.stringify(res.data.user));
    }).catch((err) => {
      if(err.response) {
        console.log(err);
        toast.error("Error : "+err.response.data.message);
      }
    })
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button
            onClick={() => document.getElementById("my_modal_3").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Login</h3>

          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-4 mt-4">
            <div>
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
                Login
              </button>
              <span className="text-sm">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
               
              </span>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Login

