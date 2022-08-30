/* eslint-disable @typescript-eslint/no-explicit-any*/
import { IUser } from "@/store/users/state";
import api from "../index";
import URL from "../URLs";
export default {
  getUsers: async (): Promise<any> => {
    return await api.get(`${URL.USERS}`);
  },

  getUser: async ({ id }: { id: number }): Promise<any> => {
    return await api.get(`${URL.USERS}/${id}`);
  },

  create: async ({ user }: { user: IUser }): Promise<any> => {
    return await api.post(`${URL.USERS}`, user);
  },

  update: async ({
    user,
    id,
  }: {
    user: IUser;
    id: string;
  }): Promise<any> => {
    return await api.put(`${URL.USERS}/${id}`, user);
  },

  delete: async ({ id }: { id: number }): Promise<any> => {
    return await api.delete(`${URL.USERS}/${id}`);
  },
};
