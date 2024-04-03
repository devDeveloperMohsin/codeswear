import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function ResetPassword() {
  const router = useRouter();
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {

  };

  return (
    <div className="h-screen bg-indigo-50 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            Reset Password
          </h1>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="password"
              id="Password"
              placeholder="Password"
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="ConfirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="password"
              id="ConfirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
