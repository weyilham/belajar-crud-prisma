import Link from "next/link";
import Item from "./item";

const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/users", {
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return data.users;
};

export default async function Home() {
  const users = await getUsers();

  return (
    <div className="w-full h-screen">
      {/* {JSON.stringify(users)} */}
      <div className="w-1/2 h-full mx-auto p-10">
        <h1 className="text-xl text-center font-bold">Halaman User</h1>

        <Link
          href="/create"
          className="bg-black text-white py-2 px-4 rounded hover:bg-slate-900 mt-3"
        >
          Create
        </Link>

        <Item users={users} />
      </div>
    </div>
  );
}
