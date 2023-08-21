import React, { useEffect } from 'react';
import './Searchpage.css';
import MovieCardSection from '../../components/movie-card-section/MovieCardSection';
import { useSearchParams } from 'react-router-dom';

interface IProp{
    search: string
}

function Searchpage({search} : IProp) {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        setSearchParams({search: search});
    }, [search]);
  return (
    <div className="Searchpage">
        <MovieCardSection filter="all"/>
    </div>
  );
}

export default Searchpage;
