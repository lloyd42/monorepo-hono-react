import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { hcWithType } from "api/hc";

import { InferResponseType, InferRequestType } from "hono/client";

const client = hcWithType("http://localhost:3000");
const queryClient = new QueryClient();

const $get = client.todo.$get;
const $post = client.todo.$post;
const $delete = client.todo[":id"].$delete;

export const useTodoCreate = () => {
  return useMutation<
    InferResponseType<typeof $post>,
    Error,
    InferRequestType<typeof $post>["form"]
  >({
    mutationFn: async (todo) => {
      const res = await $post({
        form: todo,
      });
      return await res.json();
    },
    onSuccess: async () => {
      console.log("todo created");
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useTodoDel = () => {
  return useMutation<
    InferResponseType<typeof $delete>,
    Error,
    InferRequestType<typeof $delete>["param"]
  >({
    mutationFn: async (todo) => {
      const res = await $delete({
        param: { id: todo.id },
      });
      return await res.json();
    },
    onSuccess: async () => {
      console.log("todo deleted");
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useTodoQuery = () => {
  return useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const res = await $get();
      return await res.json();
    },
  });
};
