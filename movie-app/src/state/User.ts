import { create } from "zustand";
import { IUser } from "../interface/IUser";

interface UserState {
    user: IUser;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: {username: "", email: "", favoriteMovies: []},
    setUser: (user: IUser) => set({
        user: user
    }),
    clearUser: () => set(
        {user: {username: "", email: "", favoriteMovies: []}}
    )
}));