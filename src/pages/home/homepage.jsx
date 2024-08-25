import React, { useState, useEffect } from 'react';
import Hero from '../../components/hero/hero';
import { getPopular, getTrending, getTrendingWithTrailers } from '../../api/api-tmdb';
import Sliders from '../../components/sliders/itemSliders/sliders';
import TrailerSliders from '../../components/sliders/trailerSliders/trailerSliders';

const Home = () => {
    // États pour stocker les différentes catégories de films et séries
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [trendingMoviesWithTrailers, setTrendingMoviesWithTrailers] = useState([]);

    // Effet pour charger les données au montage du composant
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Récupération des films populaires
                const popularMoviesData = await getPopular('movie');
                setPopularMovies(popularMoviesData.results);

                // Récupération des films tendances
                const trendingMoviesData = await getTrending('movie');
                setTrendingMovies(trendingMoviesData.results);

                // Récupération des séries populaires
                const popularTVShowsData = await getPopular('tv');
                setPopularTVShows(popularTVShowsData.results);

                // Récupération des séries tendances
                const trendingTVShowsData = await getTrending('tv');
                setTrendingTVShows(trendingTVShowsData.results);

                // Récupération des films tendances avec leurs bandes-annonces
                const trendingMoviesWithTrailersData = await getTrendingWithTrailers('movie');
                setTrendingMoviesWithTrailers(trendingMoviesWithTrailersData);
            } catch (error) {
                console.error("Erreur lors de la récupération des films:", error);
            }
        };

        fetchMovies();
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage

    return (
        <div className="homepage">
            {/* Composant Hero pour la section principale de la page d'accueil */}
            <Hero />

            {/* Sliders pour afficher les différentes catégories de films et séries */}
            <Sliders title="Tendances des films" items={trendingMovies} type="movie" />
            <Sliders title="Tendances des séries" items={trendingTVShows} type="tv" />

            {/* Slider spécial pour les bandes-annonces */}
            <TrailerSliders title="Bande-Annonce" items={trendingMoviesWithTrailers} type="movie" maxItems={10} />

            <Sliders title="Films populaires" items={popularMovies} type="movie" />
            <Sliders title="Séries populaires" items={popularTVShows} type="tv" />
        </div>
    );
};

export default Home;