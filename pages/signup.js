import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Signup({toast}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    if (response.success == "success") {
      setName("");
      setEmail("");
      setPassword("");
      toast.success('You are registered successfully', {autoClose: 1000});
      router.push('/login');
    }
    else{
      toast.error('Something went wrong', {autoClose: 1000});
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
            Register
          </h1>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="username"
            >
              Full Name
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="name"
              id="username"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            Register
          </button>

          <Link
            href="/login"
            className="w-full block text-center mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
          >
            Already have account! Login?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
