export function useLogin() {
  return {
    mutate: (data: { username?: string; password?: string }) => {
      // TODO: implement login
      console.log("[ api.ts:5:data ] 👉", data);
    },
    isPending: false,
  };
}
