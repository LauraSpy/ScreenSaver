import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails, getCredits, getImages, getVideos, getSimilar, getWatchProviders } from '../../api/api-tmdb';
import s from './styles.module.css'; 
import Sliders from '../../components/sliders/itemSliders/sliders';  
import { TrailerButton } from '../../components/buttons/trailer/trailer';

const DetailFilm = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [images, setImages] = useState(null);
    const [videos, setVideos] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [detailsData, creditsData, imagesData, videosData, similarData, watchProvidersData] = await Promise.all([
                    getDetails(type, id),
                    getCredits(type, id),
                    getImages(type, id),
                    getVideos(type, id),
                    getSimilar(type, id),
                    getWatchProviders(type, id)
                ]);

                setDetails(detailsData);
                setCredits(creditsData);
                setImages(imagesData);
                setVideos(videosData);
                setSimilar(similarData);
                setWatchProviders(watchProvidersData);

                console.log('Details:', detailsData);
                console.log('Credits:', creditsData);
                console.log('Images:', imagesData);
                console.log('Videos:', videosData);
                console.log('Similar:', similarData);
                console.log('Watch Providers:', watchProvidersData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchAllData();
    }, [type, id]);

    if (!details || !credits || !images || !videos || !similar || !watchProviders) return <div>Chargement...</div>;

    const director = credits.crew.find(person => person.job === "Director");
    const writer = credits.crew.find(person => person.job === "Screenplay" || person.job === "Writer");
    const composer = credits.crew.find(person => person.job === "Original Music Composer");

    return (
        <div className={s.detailPage}>
            <div className={s.banner} 
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }
                }>
            </div>
            <div className={s.posterBanner}>
                <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title || details.name} className={s.poster} />
            </div>
            <div className={s.bannerTitle}>
                <h1>{details.title || details.name}</h1>
                <p>{new Date(details.release_date || details.first_air_date).getFullYear()}</p>
            </div>
            <div className={s.mainContent}>
                <div className={s.info}>
                    <p><strong>Réalisateur:</strong> {director ? director.name : 'Non disponible'}</p>
                    <p><strong>Scénariste:</strong> {writer ? writer.name : 'Non disponible'}</p>
                    <p><strong>Genre:</strong> {details.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Musique:</strong> {composer ? composer.name : 'Non disponible'}</p>
                    <p><strong>Synopsis:</strong> {details.overview}</p>
                </div>
                <div>
                    {watchProviders.results.FR && (
                            <div>
                                <h3>Disponible en streaming:</h3>
                                {watchProviders.results.FR.flatrate && watchProviders.results.FR.flatrate.map(provider => (
                                    <img key={provider.provider_id} src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} className={s.providerLogo} />
                                ))}
                            </div>
                        )}
                </div>
                {videos.results.length > 0 && (
                    <div className={s.trailer}>
                    <h2>Bande-annonce</h2>
                        <TrailerButton trailerKey={videos.results[0].key} />
                    </div>
                )}
            </div>
            <div className={s.cast}>
                <h2>Casting</h2>
                <div className={s.castList}>
                    {credits.cast.slice(0, 10).map(actor => (
                        <div key={actor.id} className={s.castMember}>
                            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                            <p>{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.gallery}>
                <h2>Galerie</h2>
                <div className={s.imageList}>
                    {images.backdrops.slice(0, 5).map((image, index) => (
                        <img key={index} src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt={`Image ${index + 1}`} />
                    ))}
                </div>
            </div>

            <div className={s.similarList}>
                {similar && similar.results.length > 0 && (
                    <Sliders 
                        title="Films similaires"
                        items={similar.results}
                        type={type}  // 'movie' ou 'tv'
                    />
                )}
            </div>

        </div>
    );
};

export default DetailFilm;
