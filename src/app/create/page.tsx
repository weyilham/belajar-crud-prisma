"use client";
import { useRouter } from "next/navigation";
import React from "react";

function CreateUser() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { name, email };
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    push("/");
  };
  return (
    <div className="w-full h-screen">
      <div className="container w-1/2 mx-auto p-4">
        <h1 className="text-xl font-bold">Create User</h1>
        <div className="form">
          <form action="" className="mt-4" onSubmit={handleSubmit}>
            <div className="mt-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="bg-slate-100 border-none p-1 ml-3"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="bg-slate-100 border-none p-1 ml-3"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <button
                className="bg-black text-white py-2 px-4 rounded"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
