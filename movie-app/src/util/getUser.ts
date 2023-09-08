export const getUser = () => {
    const data = sessionStorage.getItem("user");
    if(data !== null){
      const user = JSON.parse(data);
      return {username: user.username, favoriteMovies: user.favoriteMovies, email: user.email}
    }
    return {username: "", favoriteMovies: [], email: ""};
  }