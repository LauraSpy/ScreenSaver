import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails, getCredits, getImages, getVideos, getSimilar, getWatchProviders } from '../../api/api-tmdb';
import s from './styles.module.css'; 
import Sliders from '../../components/sliders/itemSliders/sliders';  
import { TrailerButton } from '../../components/buttons/trailer/trailer';
import notAvailableImage from '../../images/imagesGénériques/notAvailable.png';

const DetailFilm = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [images, setImages] = useState(null);
    const [videos, setVideos] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);
    const handleImageError = (event) => {
        event.target.src = notAvailableImage;
    };

    const castListRef = useRef(null);

    const handleWheel = (e) => { //constante pour provoquer le scroll sur axe X au niveau du défilement du casting. 
        if (castListRef.current) {
            const container = castListRef.current;
            const scrollAmount = e.deltaY;
            
            container.scrollTo({
                left: container.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
            
            if (
                (container.scrollLeft === 0 && scrollAmount < 0) ||
                (container.scrollLeft + container.clientWidth === container.scrollWidth && scrollAmount > 0)
            ) {
                return; // Permet le défilement vertical de la page si on est au début ou à la fin du casting
            }
            
            e.preventDefault();
        }
    };

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
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchAllData();
    }, [type, id]);

    useEffect(() => {
        const castList = castListRef.current;
        if (castList) {
            castList.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (castList) {
                castList.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

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
                <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`} alt={details.title || details.name} className={s.poster} />
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
                <div className={s.ba}>
                    <div className={s.streaming}>
                        {watchProviders.results.FR && (
                                <div className={s.streamingContainer}>
                                    <h3>Disponible en streaming:</h3>
                                    {watchProviders.results.FR && watchProviders.results.FR.flatrate ? (
                                        watchProviders.results.FR.flatrate.map(provider => (
                                            <img 
                                                key={provider.provider_id} 
                                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                                                alt={provider.provider_name} 
                                                className={s.providerLogo} 
                                            />
                                        ))
                                    ) : (
                                        <p className={s.notAvailable}>Non disponible</p>
                                    )}
                                </div>
                            )}
                    </div>
                    <div className={s.trailer}>
                        {videos && videos.results && videos.results.length > 0 ? (
                            (() => {
                                const trailer = videos.results.find(
                                    video => video.type === "Trailer" && (video.iso_639_1 === "fr" || video.iso_639_1 === "en")
                                );
                                return trailer ? (
                                    <TrailerButton trailerKey={trailer.key} title={details.title || details.name} />
                                ) : (
                                    <p className={s.notAvailable}>Pas de Bande-Annonce disponible</p>
                                );
                            })()
                        ) : (
                            <p className={s.notAvailable}>Pas de Bande-Annonce disponible</p>
                        )}
                    </div>
                </div>
            </div>
            <div className={s.cast}>
                <div className={s.castTitle}><h2>Casting</h2></div>
                <div className={s.castList} ref={castListRef}>
                    {credits.cast.map(actor => (
                        <div key={actor.id} className={s.castMember}>
                            <div className={s.imageContainer}>
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
                                    alt={actor.name} 
                                    onError={handleImageError} />
                            </div>
                            <p className={s.castName}>{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.gallery}>
                <div className={s.galleryTitle}><h2>Galerie</h2></div>
                <div className={s.imageList}>
                    {images.backdrops.slice(0, 6).map((image, index) => (
                        <div 
                            key={index} 
                            className={s.galleryImage}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${image.file_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            aria-label={`Image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className={s.similarList}>
                {similar && similar.results && similar.results.length > 0 && (
                    <Sliders 
                        title="Titres similaires"
                        items={similar.results}
                        type={type}  // 'movie' ou 'tv'
                    />
                )}
            </div>

        </div>
    );
};

export default DetailFilm;
