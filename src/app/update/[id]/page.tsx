"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function UpdateUser({ params }: { params: { id: string } }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  const id = Number(params.id) || 0;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        id,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    router.push("/");
    router.refresh();
  };

  const getData = async () => {
    const user = await fetch("/api/users/" + id);
    const data = await user.json();

    if (!data.user) {
      router.push("404");
      return;
    }

    setName(data.user.name);
    setEmail(data.user.email);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="container w-1/2 mx-auto p-4">
        <h1 className="text-xl font-bold">Update User</h1>
        <div className="form">
          <form action="" className="mt-4" onSubmit={handleSubmit}>
            <div className="mt-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="bg-slate-100 border-none p-1 ml-3"
                id="name"
                defaultValue={name}
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
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <button
                className="bg-black text-white py-2 px-4 rounded"
                type="submit"
              >
                Update Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
