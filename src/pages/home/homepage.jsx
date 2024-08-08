import React, { useState, useEffect } from 'react';
import Hero from '../../components/hero/hero';
import { getPopular, getTrending, getTrendingWithTrailers } from '../../api/api-tmdb';
import Sliders from '../../components/sliders/itemSliders/sliders';
import TrailerSliders from '../../components/sliders/trailerSliders/trailerSliders';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [trendingMoviesWithTrailers, setTrendingMoviesWithTrailers] = useState([]);

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

                const trendingMoviesWithTrailersData = await getTrendingWithTrailers('movie');
                setTrendingMoviesWithTrailers(trendingMoviesWithTrailersData);
            } catch (error) {
                console.error("Erreur lors de la récupération des films:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="homepage">
            <Hero />
            <Sliders title="Tendances des films" items={trendingMovies} type="movie" />
            <Sliders title="Tendances des séries" items={trendingTVShows} type="tv" />
            <TrailerSliders title="Bande-Annonce" items={trendingMoviesWithTrailers} type="movie" maxItems={10} />
            <Sliders title="Films populaires" items={popularMovies} type="movie" />
            <Sliders title="Séries populaires" items={popularTVShows} type="tv" />
        </div>
    );
};

export default Home;