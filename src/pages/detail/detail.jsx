import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../api/api-tmdb';

const DetailFilm = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getDetails(type, id);
                setDetails(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails:", error);
            }
        };

        fetchDetails();
    }, [type, id]);

    if (!details) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{details.title || details.name}</h1>
            <p>{details.overview}</p>
            {/* Affichez d'autres détails ici */}
        </div>
    );
};

export default DetailFilm;
