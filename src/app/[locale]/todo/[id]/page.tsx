"use client";

import { useGetTodo2ByIDQuery } from "@/src/api/todo2";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const { data } = useGetTodo2ByIDQuery(id);
  console.log(data);
  const e = data?.data;
  return (
    <div>
        {/* <button
        // onClick={() => navigate(-1)}/
        >BACK</button> */}
      <div
        key={e?.id}
        style={{ background: e?.isCompleted ? "green" : "red" }}
        className="rounded-2xl text-white p-5 flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold">{e?.name}</h1>
        <p>{e?.description}</p>
        <div className="w-full h-50">
          {e?.images?.map((img: any) => {
            return (
              <img
                key={img?.id}
                src={`https://to-dos-api.softclub.tj/images/${img?.imageName}`}
                alt={img?.imageName}
                className="rounded-2xl w-full h-full object-contain"
              />
            );
          })}
        </div>
        <input type="checkbox" checked={e?.isCompleted} />
        {/* <Link href={`/todo/${e.id}`}>
          <button>INFO</button>
        </Link> */}
      </div>
    </div>
  );
};

export default page;
