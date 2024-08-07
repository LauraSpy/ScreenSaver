import React from 'react';
import s from './styles.module.css'; 

const TermsOfService = () => {
  return (
    <div className={s.termContainer}>
      <h1>Conditions Générales d'Utilisation</h1>
      <p>
        Bienvenue sur notre site. En accédant à ce site, vous acceptez les présentes conditions générales d'utilisation.
      </p>
      <h2>1. Acceptation des conditions</h2>
      <p>
        En utilisant ce site, vous acceptez d'être lié par les présentes conditions générales d'utilisation, toutes les lois et réglementations applicables.
      </p>
      <h2>2. Modifications des conditions</h2>
      <p>
        Nous nous réservons le droit de modifier ces conditions à tout moment. Vous êtes responsable de vérifier régulièrement ces conditions pour prendre connaissance des modifications.
      </p>
      <h2>3. Utilisation du site</h2>
      <p>
        Vous vous engagez à utiliser ce site de manière légale et respectueuse. Toute utilisation abusive ou illégale est strictement interdite.
      </p>
      <h2>4. Propriété intellectuelle</h2>
      <p>
        Tous les contenus présents sur ce site sont protégés par les droits d'auteur et autres lois sur la propriété intellectuelle.
      </p>
      <h2>5. Limitation de responsabilité</h2>
      <p>
        Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation de ce site.
      </p>
      <h2>6. Contact</h2>
      <p>
        Pour toute question concernant ces conditions générales d'utilisation, veuillez nous contacter à l'adresse suivante : contact@screensaver.ovh.
      </p>
    </div>
  );
};

export default TermsOfService;
