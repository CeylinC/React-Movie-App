import { useEffect } from "react";
import { IUser } from "../../model";
import { getUserData } from "../../service";

export const useUserControl = (
  user: IUser | undefined,
  setUser: (user: IUser) => void
) => {
  useEffect(() => {
    const getData = async () => {
      const data = await getUserData();
      setUser(data);
    };
    if (!user) {
      getData();
    }
  },[]);
};
