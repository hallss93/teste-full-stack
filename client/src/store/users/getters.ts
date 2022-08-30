import { Nullable } from "@/interfaces/types"
import { IUserStore, IUser } from "./state";

export default {
    USER_LIST: (state: IUserStore): Nullable<IUser[]> => {
        return state.userList
    },
    LOADING: (state: IUserStore): boolean => {
        return state.loading
    }
}