import { Button, Tooltip, Image } from "antd";
import "./MovieDetail.css";
import { HeartFilled } from "@ant-design/icons";
import { CustomIcon } from "../../../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateFavoriteMovies } from "../../../../service";
import { IMovie } from "../../../../model";
import { useFindMovie, useUserControl, useUserStore } from "../../../../hook";

export function MovieDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentParams = Object.fromEntries([...searchParams]);
  const [movie, setMovie] = useState<IMovie>({
    id: "",
    name: "",
    year: 0,
    imdb: 0,
    category: "",
    poster: "",
  });
  const [isfavorite, setFavorite] = useState<boolean>();
  const { user, setUser } = useUserStore();

  useUserControl(user, setUser);
  useFindMovie(user, currentParams.id, setFavorite, setMovie);

  useEffect(() => {
    if (user) {
      if (isfavorite && !user.favoriteMovies.includes(currentParams.id)) {
        user.favoriteMovies.push(currentParams.id);
      } else if (
        !isfavorite &&
        user.favoriteMovies.includes(currentParams.id)
      ) {
        const index = user.favoriteMovies.indexOf(currentParams.id);
        user.favoriteMovies.splice(index, 1);
      }
    }
  }, [isfavorite]);

  useEffect(() => {
    const updateData = async () => {
      if (user) {
        if (user.userId !== "") {
          await updateFavoriteMovies(user);
        }
      }
    };
    updateData();
  }, [user]);

  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.5)), url('https://wallpaperset.com/w/full/6/d/3/366121.jpg')",
      }}
    >
      <div className="movie-detail-aside">
        <Image src={movie.poster} width={75} />
        <h1>{movie.name}</h1>
        <div className="icons">
          <div className="imdb">
            <CustomIcon icon="imdb" />
            <span className="imdb-score">{movie.imdb}</span>
          </div>
          <Tooltip title={isfavorite ? "Remove Favorite" : "Add Favorite"}>
            <Button
              danger
              type="primary"
              ghost={isfavorite}
              shape="circle"
              icon={<HeartFilled />}
              onClick={() => {
                if(!user){
                  navigate("/log-in");
                }
                setFavorite(!isfavorite);
              }}
            />
          </Tooltip>
        </div>
        <ul className="movie-detail-list">
          <li className="movie-detail-list-item">
            <span>Directors</span>Lorem, ipsum.
          </li>
          <li className="movie-detail-list-item">
            <span>Writers</span>Lorem ipsum dolor sit.
          </li>
          <li className="movie-detail-list-item">
            <span>Stars</span>Lorem, ipsum.
          </li>
          <li className="movie-detail-list-item">
            <span>Year</span>
            {movie.year}
          </li>
          <li className="movie-detail-list-item">
            <span>Duration</span>1h 23m
          </li>
          <li className="movie-detail-list-item">
            <span>Category</span>
            {movie.category.charAt(0).toUpperCase() + movie.category.slice(1)}
          </li>
        </ul>
        <p className="movie-description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis quia
          consequatur repellat repellendus laudantium sit?
        </p>
      </div>
    </div>
  );
}
