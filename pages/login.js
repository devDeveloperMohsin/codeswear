import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Login({ toast }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    if (response.success == "success") {
      localStorage.setItem("token", response.token);
      setEmail("");
      setPassword("");
      toast.success("You are Loggedin successfully", { autoClose: 1000 });
      router.push("/");
    } else {
      toast.error("Invalid Email or Password", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="h-screen bg-indigo-50 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form
          className="bg-white p-10 rounded-lg shadow-lg min-w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            Login
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
              type="email"
              name="email"
              id="email"
              placeholder="@email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            Login
          </button>

          <Link
            href="/signup"
            className="w-full block text-center mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
          >
            Create your account
          </Link>

          <Link href="/forgot" className="text-red-400">
            Forgot your password?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
