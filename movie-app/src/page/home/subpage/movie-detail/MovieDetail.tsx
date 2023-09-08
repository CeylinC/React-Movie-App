import { Button, Tooltip, Image } from 'antd';
import './MovieDetail.css';
import { HeartFilled } from '@ant-design/icons';
import { CustomIcon } from '../../../../components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovie } from '../../../../service';
import { IMovie } from '../../../../model';

export function MovieDetail() {
    const [searchParams] = useSearchParams();
    const currentParams = Object.fromEntries([...searchParams]);
    const [movie, setMovie] = useState<IMovie>({id: "", name:"", year:0, imdb:0, category:"", poster:""});

    useEffect(() => {
        const findMovie = async () => {
            const movieData = await getMovie(currentParams.id);
            if (movieData) {
                setMovie(movieData);
            }
        }
        findMovie();
    }, []);

    return (
        <div className="movie-detail" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.5)), url('https://wallpaperset.com/w/full/6/d/3/366121.jpg')" }}>
            <div className="movie-detail-aside">
                <Image src={movie.poster} width={75} />
                <h1>{movie.name}</h1>
                <div className="icons">
                    <div className='imdb'><CustomIcon icon='imdb' /><span className='imdb-score'>{movie.imdb}</span></div>
                    <Tooltip title="Add Favorite">
                        <Button danger type='primary' shape="circle" icon={<HeartFilled />} />
                    </Tooltip>
                </div>
                <ul className="movie-detail-list">
                    <li className='movie-detail-list-item'><span>Directors</span>Lorem, ipsum.</li>
                    <li className='movie-detail-list-item'><span>Writers</span>Lorem ipsum dolor sit.</li>
                    <li className='movie-detail-list-item'><span>Stars</span>Lorem, ipsum.</li>
                    <li className='movie-detail-list-item'><span>Year</span>{movie.year}</li>
                    <li className='movie-detail-list-item'><span>Duration</span>1h 23m</li>
                    <li className='movie-detail-list-item'><span>Category</span>{movie.category.charAt(0).toUpperCase() + movie.category.slice(1)}</li>
                </ul>
                <p className="movie-description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis quia consequatur repellat repellendus laudantium sit?
                </p>
            </div>
        </div>
    );
}