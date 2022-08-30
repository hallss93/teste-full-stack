import { Func2 } from "@/interfaces/types";
import userService from "../../service/models/users";
import { IUser } from "./state";
export default {
  async GET_USERS({
    commit,
  }: {
    commit: Func2<string, boolean | IUser | number, void>;
  }): Promise<void> {
    commit("SET_LOADING", true);
    return userService
      .getUsers()
      .then((res) => {
        console.log(res.data);
        commit("SET_USER_COUNT", res.data.length);
        commit("SET_USER_LIST", res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async GET_USER(
    { commit }: { commit: Func2<string, boolean | IUser, void> },
    { id }: { id: number }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return userService
      .getUser({ id })
      .then((res) => {
        commit("SET_USER", res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async CREATE(
    { commit }: { commit: Func2<string, boolean | string, void> },
    { user }: { user: IUser }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return userService
      .create({ user })
      .then((res) => {
        commit("SET_MESSAGE", "Usuário adicionado com sucesso!");
        commit("SET_SHOW_MESSAGE", true);
        return res;
      })
      .catch((err) => {
        commit("SET_MESSAGE", err);
        commit("SET_SHOW_MESSAGE", true);
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async UPDATE(
    { commit }: { commit: Func2<string, boolean | string, void> },
    { user, id }: { user: IUser; id: string }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return userService
      .update({ user, id })
      .then((res) => {
        commit("SET_MESSAGE", "Usuário atualizado com sucesso!");
        commit("SET_SHOW_MESSAGE", true);
        return res;
      })
      .catch((err) => {
        commit("SET_MESSAGE", err);
        commit("SET_SHOW_MESSAGE", true);
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async DELETE(
    { commit }: { commit: Func2<string, boolean | string, void> },
    { id }: { id: number }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return userService
      .delete({ id })
      .then((res) => {
        commit("SET_MESSAGE", "Usuário excluido com sucesso!");
        commit("SET_SHOW_MESSAGE", true);
        return res;
      })
      .catch((err) => {
        commit("SET_MESSAGE", err);
        commit("SET_SHOW_MESSAGE", true);
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },
};
