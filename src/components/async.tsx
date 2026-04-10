"use client";
import { useState } from "react";
import {
  useAddTodosImgMutation,
  useAddTodosMutation,
  useCheckTodosMutation,
  useDeleteTodosImgMutation,
  useDeleteTodosMutation,
  useEditTodosMutation,
  useGetTodosQuery,
} from "../api/todo";
import { IData, IImage } from "../types/todo";

const Async = () => {
  const { data, isLoading, refetch } = useGetTodosQuery(null);
  const [checkTodos] = useCheckTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const [deleteTodosImg] = useDeleteTodosImgMutation();
  const [addTodos] = useAddTodosMutation();
  const [addTodosImg] = useAddTodosImgMutation();
  const [editTodos] = useEditTodosMutation();
  const [modal, setModal] = useState<any>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.desc.value);
    const files = e.target.images.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    await addTodos(formData);
    e.target.reset();
    refetch();
  };
  const handleSubmit2 = async (e: any, id: number) => {
    e.preventDefault();
    const formDataImg = new FormData();
    const files = e.target.images.files;
    for (let i = 0; i < files.length; i++) {
      formDataImg.append("images", files[i]);
    }
    await addTodosImg({ formData: formDataImg, id: id });
    e.target.reset();
    refetch();
  };
  const handleSubmit3 = async (e: any) => {
    e.preventDefault();
    const data = {
      id: modal?.id,
      name: e.target.name.value,
      description: e.target.desc.value,
    };
    await editTodos(data);
    setModal(false);
    e.target.reset();
    refetch();
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-5 p-5">
        <input
          className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
          type="file"
          multiple
          name="images"
        />
        <input
          className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
          placeholder="name"
          type="text"
          name="name"
        />
        <input
          className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
          placeholder="desc"
          type="text"
          name="desc"
        />
        <button
          type="submit"
          className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
        >
          Add
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4 p-4">
        {data?.data.map((e: IData) => (
          <div
            className="text-white p-5 flex flex-col gap-5 rounded-2xl"
            style={{ background: e.isCompleted ? "green" : "red" }}
            key={e.id}
          >
            <h1 className="text-3xl font-bold">{e.name}</h1>
            <p className="text-gray-400">{e.description}</p>
            <div className="w-full overflow-x-auto max-h-63 flex flex-col gap-5">
              {e.images?.map((img: IImage) => {
                return (
                  <div key={img.id}>
                    <img
                      className="w-full rounded-2xl h-50 object-fit"
                      src={"http://37.27.29.18:8001/images/" + img.imageName}
                      alt={img.imageName}
                    />
                    <button
                      className="py-1 px-3 bg-blue-500 border-2 text-white font-bold rounded-2xl"
                      onClick={async () => {
                        await deleteTodosImg(img.id);
                        refetch();
                      }}
                    >
                      DELETE IMG
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-5">
              <input
                type="checkbox"
                onChange={async () => {
                  await checkTodos(e.id);
                  refetch();
                }}
                checked={e.isCompleted}
              />
              <button
                className="py-3 px-5 bg-red-500 border-2 text-white font-bold rounded-2xl"
                onClick={async () => {
                  await deleteTodos(e.id);
                  refetch();
                }}
              >
                DELETE
              </button>
              <button
                className="py-3 px-5 bg-green-500 border-2 text-white font-bold rounded-2xl"
                onClick={async () => {
                  setModal(e);
                }}
              >
                EDIT
              </button>
            </div>
            <form
              onSubmit={(event) => handleSubmit2(event, e.id)}
              className="flex flex-col gap-5 "
            >
              <input
                className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
                type="file"
                multiple
                name="images"
              />
              <button
                className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
                type="submit"
              >
                Add Image
              </button>
            </form>
          </div>
        ))}
      </div>

      {modal && (
        <dialog open className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 p-5 rounded-2xl">
            <h1 className="text-3xl font-bold">Edit</h1>
            <form
              onSubmit={handleSubmit3}
              className="grid gap-5 p-5"
            >
              <input
                className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
                placeholder="name"
                defaultValue={modal.name}
                type="text"
                name="name"
              />
              <input
                className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
                placeholder="desc"
                defaultValue={modal.description}
                type="text"
                name="desc"
              />
              <button
                type="submit"
                className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
              >
                Edit
              </button>
              <button
              onClick={()=>setModal(false)}
                className="bg-blue-500 border-2 text-white font-bold py-3 px-5 rounded-2xl"
              >
                CLOSE
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Async;
