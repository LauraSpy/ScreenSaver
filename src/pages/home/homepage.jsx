import React, { useState, useEffect } from 'react';
import Hero from '../../components/hero/hero';
import { getPopular, getTrending } from '../../api/api-tmdb';
import Sliders from '../../components/sliders/sliders';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const popularMoviesData = await getPopular('movie');
                setPopularMovies(popularMoviesData.results);

                const trendingMoviesData = await getTrending('movie');
                setTrendingMovies(trendingMoviesData.results);

                const popularTVShowsData = await getPopular('tv');
                setPopularTVShows(popularTVShowsData.results);

                const trendingTVShowsData = await getTrending('tv');
                setTrendingTVShows(trendingTVShowsData.results);
            } catch (error) {
                console.error("Erreur lors de la récupération des films:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="homepage">
            <Hero />
            <Sliders title="Tendancesfilms actuelles" movies={trendingMovies} />
            <Sliders title="Films populaires" movies={popularMovies} />
            <Sliders title="Tendances séries actuelles" movies={trendingTVShows} />
            <Sliders title="Séries populaires" movies={popularTVShows} />
        </div>
    );
};

export default Home;