import { Nullable } from "@/interfaces/types"

export interface IUserStore {
    userList: Nullable<IUser[]>;
    user: Nullable<IUser>;
    count: number;
    loading: boolean;
    message: string;
    showMessage: boolean;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    id?: string;
    cpf: string;
}

const state: IUserStore = {
    userList: [],
    user: null,
    count: 0,
    loading: false,
    message: '',
    showMessage: false,
}

export interface IStateUser {
    users: IUserStore;
}

export default state
