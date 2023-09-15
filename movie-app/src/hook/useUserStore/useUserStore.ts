import { create } from "zustand";
import { IUser } from "../../model";

interface UserState {
    user: IUser | undefined;
    setUser: (user: IUser) => void;
    setFavoriteMovies: (movies: string[]) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUser: (user: IUser) => set({
        user: user
    }),
    setFavoriteMovies: (movies: string[]) => set((state) => {
        if(state.user !== undefined){
            return {user: {...state.user, favoriteMovies: movies}}
        }
        return {user: undefined}
    }),
    clearUser: () => set({user: undefined})
}));