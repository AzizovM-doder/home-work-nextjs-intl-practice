import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddImageArg, IEditData, IResponse } from "../types/todo";
export const TodoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://37.27.29.18:8001" }),
  endpoints: (build) => ({
    getTodos: build.query<IResponse, null>({
      query: () => `/api/to-dos`,
    }),
    deleteTodos: build.mutation<any, number>({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: "DELETE",
      }),
    }),
    deleteTodosImg: build.mutation<any, number>({
      query: (id) => ({
        url: `/api/to-dos/images/${id}`,
        method: "DELETE",
      }),
    }),
    checkTodos: build.mutation<any, number>({
      query: (id) => ({
        url: `/completed?id=${id}`,
        method: "PUT",
      }),
    }),
    addTodos: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "api/to-dos",
        method: "POST",
        body: formData,
      }),
    }),
    editTodos: build.mutation<any, IEditData>({
      query: (data) => ({
        url: "api/to-dos",
        method: "PUT",
        body: data,
      }),
    }),
    addTodosImg: build.mutation<any, AddImageArg>({
      query: ({ formData, id }) => ({
        url: `/api/to-dos/${id}/images`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
export const {
  useGetTodosQuery,
  useDeleteTodosMutation,
  useCheckTodosMutation,
  useDeleteTodosImgMutation,
  useAddTodosMutation,
  useAddTodosImgMutation,
  useEditTodosMutation
} = TodoApi;
// /api/to-dos/1/images
