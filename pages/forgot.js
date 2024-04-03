import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Forgot({toast}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const sendResetEmail = async() => {
    if(!email) {
      toast.error("Please enter your email address");
      return;
    }

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email}),
    });

    if(a.status != 200) {
      if(a.status == 419) {
        let res = await a.json();
        toast.error(res.error);
        return;
      }

      toast.error("Something went wrong");
    }
    else {
      toast.success("An email has been sent with Reset Passowrd Link");
    }
    
  }

  return (
    <div className="h-screen bg-indigo-50 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            Forgot Password
          </h1>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="email"
              id="email"
              placeholder="@email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            onClick={sendResetEmail}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
