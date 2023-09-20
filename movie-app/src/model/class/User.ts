import { IUser } from "../interface";

export class User implements IUser{
    email: string;
    username: string;
    favoriteMovies: string[];
    userId: string;
    role: "user" | "admin";

    constructor(data?: any){
        this.email =  data?.email || ""
        this.username =  data?.email || ""
        this.favoriteMovies =  data?.favoriteMovies || []
        this.userId =  data?.userId || ""
        this.role =  data?.role || "user"
    }
}