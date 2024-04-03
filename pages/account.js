import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";

function Account({ toast }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");


  const fetchUserFromToken = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/currentuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    });

    let response = await res.json();
    if(response.success == true) {
      setEmail(response.email);
      setName(response.name);
    }
  };

  useEffect(() => {
    // Check if user is logged-in
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }

    fetchUserFromToken();
  }, [router]);

  const updateUser = async () => {
    if(!name || !password, !currentPassword) {
      toast.error("Please fill all information");
      return;
    }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        name, password, currentPassword,
      }),
    });

    let response = await res.json();
    if(res.status != 200) {
      if(res.status == 419) {
        toast.error(response.error);
      }
    }
    else {
      toast.success('Data updated');
      setPassword("");
      setCurrentPassword("");
    }
    console.log(response);
  }

  return (
    <>
      {/* htmlForm */}
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 pt-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              My Account
            </h1>
          </div>
          <div className="md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="disabled:bg-gray-200 disabled:cursor-not-allowed w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={email}
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>


              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="CurrentPassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="CurrentPassword"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out read-only:bg-gray-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="disabled:bg-indigo-300 disabled:cursor-not-allowed  flex items-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                onClick={updateUser}
              >
                <FaSave className="mr-1" /> Save
              </button>
              
            </div>
          </div>
        </div>
      </section>
      {/* End htmlForm */}
    </>
  );
}

export default Account;
