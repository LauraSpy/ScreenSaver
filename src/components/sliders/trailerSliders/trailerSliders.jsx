import React, { useState, useEffect, useRef } from "react";
import s from './styles.module.css';
import { getVideos } from '../../../api/api-tmdb';

const TrailerSliders = ({ title, items = [], type, maxItems }) => {
    const [videos, setVideos] = useState({});
    const sliderContainerRef = useRef(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const videoData = {};
            for (const item of items) {
                try {
                    console.log(`Fetching video for ${type} with ID: ${item.id}`);
                    const trailerKey = await getVideos(type, item.id);
                    if (trailerKey) {
                        console.log(`Trailer found for ${item.id}:`, trailerKey);
                        videoData[item.id] = trailerKey;
                    } else {
                        console.log(`No trailer found for ${item.id}`);
                    }
                } catch (error) {
                    console.error(`Error fetching video for ${item.id}:`, error);
                }
            }
            console.log('All video data:', videoData);
            setVideos(videoData);
        };
    
        if (items.length > 0) {
            fetchVideos();
        } else {
            console.log('No items to fetch videos for.');
        }
    }, [items, type]);

    const handleWheel = (e) => {
        if (sliderContainerRef.current) {
            const container = sliderContainerRef.current;

            // Vérifier si on est au début ou à la fin du slider
            if (
                (container.scrollLeft === 0 && e.deltaY < 0) ||
                (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1 && e.deltaY > 0)
            ) {
                return; // Permet le défilement vertical de la page si on est au début ou à la fin du slider
            }

            e.preventDefault();
            
            const scrollAmount = e.deltaY;
            container.scrollTo({
                left: container.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const sliderContainer = sliderContainerRef.current;
        if (sliderContainer) {
            sliderContainer.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (sliderContainer) {
                sliderContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);
    
    const displayedItems = maxItems ? items.slice(0, maxItems) : items;

    console.log('Displayed items:', displayedItems);

    return (
        <div className={s.slider}>
            <div className={s.sliderTitle}>
                <h1>{title}</h1>
            </div>
            <div className={s.sliderContainer}>    
                <div className={s.sliderMap}>
                    {displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`${s.sliderItem} ${index === displayedItems.length - 1 ? s.lastItem : ''}`}
                            >   
                                <div className={s.itemCard}>
                                    {videos[item.id] ? (
                                        <iframe
                                            width="320px"
                                            height="180px"
                                            src={`https://www.youtube.com/embed/${videos[item.id]}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={item.title || item.name}
                                        ></iframe>
                                    ) : (
                                        <p>Aucune bande-annonce disponible</p>
                                    )}
                                    <div className={s.itemCardBody}>
                                        <h2 className={s.itemCardBodyTitle}>{item.title || item.name}</h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Contenu indisponible. <br /> Nous nous excusons pour la gêne occasionnée.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrailerSliders;
