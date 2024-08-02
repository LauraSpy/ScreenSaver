import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import plus from '../../../images/icon/plus.svg';
import ItemOptions from '../../itemOptions/ItemsOptions';
import { getVideos } from '../../../api/api-tmdb';

const TrailerSliders = ({ title, items = [], type, maxItems }) => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState({});

    useEffect(() => {
        const fetchVideos = async () => {
            const videoData = {};
            for (const item of items) {
                const data = await getVideos(type, item.id);
                const trailer = data.results.find(video => video.type === 'Trailer');
                if (trailer) {
                    videoData[item.id] = trailer.key;
                }
            }
            setVideos(videoData);
        };

        fetchVideos();
    }, [items, type]);

    const handleItemClick = (itemId) => {
        navigate(`/${type}/${itemId}`);
    };

    const handleSeeMore = () => {
        navigate(`/${type}`);
    };

    const displayedItems = maxItems ? items.slice(0, maxItems) : items;

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
                                <ItemOptions 
                                    itemId={item.id}
                                    onViewDetails={handleItemClick}
                                />
                                <div className={s.itemCard}>
                                    {videos[item.id] ? (
                                        <iframe
                                            width="100%"
                                            height="200"
                                            src={`https://www.youtube.com/embed/${videos[item.id]}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={item.title || item.name}
                                        ></iframe>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                    <div className={s.itemCardBody}>
                                        <h2 className={s.itemCardBodyTitle}>{item.title || item.name}</h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun {type === 'movie' ? 'film' : 'série'} disponible.</p>
                    )}
                </div>
                {items.length > 0 && (
                    <button className={s.seeMoreButton} onClick={handleSeeMore}>
                        <img src={plus} alt="" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrailerSliders;