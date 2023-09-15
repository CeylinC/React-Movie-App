export interface IUser{
    email: string;
    username: string;
    favoriteMovies: string[];
    userId: string;
    role: "admin" | "user";
}