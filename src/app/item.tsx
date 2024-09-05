"use client";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type PropsType = {
  users: User[];
};

function Item({ users }: PropsType) {
  const router = useRouter();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const id = Number(e.target.id);
    const user = await fetch(`http://localhost:3000/api/users?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => router.refresh())
      .catch((err) => console.log(err));
  };
  return (
    <>
      {/* {JSON.stringify(users)} */}
      {users.map((user: User, index: number) => {
        return (
          <div
            key={index}
            className="card  mt-3 p-3  border-2 border-slate-200 rounded-md"
          >
            <h2 className="text-md font-bold">Nama : {user.name}</h2>
            <p className="text-sm text-slate-600">Email : {user.email}</p>
            <div className="w-full mt-2 text-sm">
              <Link href={`/update/${user.id}`} className=" font-bold mr-2">
                Edit
              </Link>
              <button
                className="font-bold text-red-500"
                onClick={handleDelete}
                id={user.id.toString()}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Item;
