import { IUserStore, IUser } from "./state";

export default {
  SET_USER(state: IUserStore, payload: IUser): void {
    state.user = payload;
  },
  SET_USER_LIST(state: IUserStore, payload: IUser[]): void {
    state.userList = payload;
  },
  SET_USER_COUNT(state: IUserStore, payload: number): void {
    state.count = payload;
  },
  SET_LOADING(state: IUserStore, payload: boolean): void {
    state.loading = payload;
  },
  SET_MESSAGE(state: IUserStore, payload: string): void {
    state.message = payload;
  },
  SET_SHOW_MESSAGE(state: IUserStore, payload: boolean): void {
    state.showMessage = payload;
  },
};
