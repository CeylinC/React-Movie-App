import { Button, Tooltip, Image } from "antd";
import "./MovieDetail.css";
import { HeartFilled } from "@ant-design/icons";
import { CustomIcon } from "../../../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateFavoriteMovies } from "../../../../service";
import { IMovie, IconData, Movie } from "../../../../model";
import { useUserStore } from "../../../../hook";
import { capitalize, favoriteControl, findMovie } from "../../../../util";

export default function MovieDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentParams = Object.fromEntries([...searchParams]);
  const [movie, setMovie] = useState<IMovie>(new Movie());
  const { user } = useUserStore();
  const [isfavorite, setFavorite] = useState<boolean>();

  useEffect(() => {
    if (user) {
      favoriteControl(user, currentParams.id, setFavorite);
    }
  }, [user]);

  useEffect(() => {
    const updateData = async () => {
      if (user) {
        if (user.userId !== "") {
          await updateFavoriteMovies(user);
        }
      }
    };
    if (user && isfavorite !== undefined) {
      if (isfavorite && !user.favoriteMovies.includes(currentParams.id)) {
        user.favoriteMovies.push(currentParams.id);
      } else if (
        !isfavorite &&
        user.favoriteMovies.includes(currentParams.id)
      ) {
        const index = user.favoriteMovies.indexOf(currentParams.id);
        user.favoriteMovies.splice(index, 1);
      }
      updateData();
    }
  }, [isfavorite]);

  useEffect(() => {
    findMovie(currentParams.id, setMovie);
  }, []);

  return (
    <div
      className="movie-detail w-full h-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.5)), url(${
          movie.background !== ""
            ? movie.background
            : "https://wallpaperset.com/w/full/6/d/3/366121.jpg"
        })`,
      }}
    >
      <div className="movie-detail-aside box-border w-1/2 h-full px-3 py-10">
        <Image src={movie.poster} width={75} className="float-left mt-5 ml-5"/>
        <h1>{movie.name}</h1>
        <div className="icons flex flex-row justify-between">
          <div className="imdb flex content-center items-center">
            <CustomIcon iconData={IconData.imdb} size="30px" color='#f3ce13'/>
            <span className="imdb-score flex content-center text-xl ml-2">{movie.imdb}</span>
          </div>
          <Tooltip title={isfavorite ? "Remove Favorite" : "Add Favorite"}>
            <Button
              danger
              type="primary"
              ghost={isfavorite}
              shape="circle"
              icon={<HeartFilled />}
              onClick={() => {
                if (!user) {
                  navigate("/log-in");
                }
                setFavorite(!isfavorite);
              }}
            />
          </Tooltip>
        </div>
        <ul className="movie-detail-list list-none p-0 my-12 mx-0">
          <li className="movie-detail-list-item">
            <span>Directors</span>
            {movie.directors}
          </li>
          <li className="movie-detail-list-item">
            <span>Writers</span>
            {movie.writers}
          </li>
          <li className="movie-detail-list-item">
            <span>Stars</span>
            {movie.stars}
          </li>
          <li className="movie-detail-list-item">
            <span>Year</span>
            {movie.year}
          </li>
          <li className="movie-detail-list-item">
            <span>Duration</span>
            {movie.duration}
          </li>
          <li className="movie-detail-list-item">
            <span>Category</span>
            {capitalize(movie.category)}
          </li>
        </ul>
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  );
}
