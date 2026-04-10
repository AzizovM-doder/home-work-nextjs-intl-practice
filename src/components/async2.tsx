"use client";
import Link from "next/link";
import { useGetTodo2Query } from "../api/todo2";
import { IData2 } from "../types/todo2";

const Async2 = () => {
  const { data, isLoading, refetch } = useGetTodo2Query(null);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="max-w-7xl m-auto p-5 grid grid-cols-4 gap-5">
        {data?.data?.map((e: IData2) => {
          return (
            <div
              key={e.id}
              style={{ background: e.isCompleted ? "green" : "red" }}
              className="rounded-2xl text-white p-5 flex flex-col gap-5"
            >
              <h1 className="text-3xl font-bold">{e.name}</h1>
              <p>{e.description}</p>
              <div className="w-full h-50">
                {e.images?.map((img: any) => {
                  return (
                    <img
                      key={img.id}
                      src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                      alt={img.imageName}
                      className="rounded-2xl w-full h-full object-contain"
                    />
                  );
                })}
              </div>
              <input type="checkbox" checked={e.isCompleted} />
              <Link href={`/todo/${e.id}`}>
                <button>INFO</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Async2;
