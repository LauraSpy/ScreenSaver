import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/logo/logo.svg';
import insta from '../../images/logo/social/instagram-brands-solid.svg';
import facebook from '../../images/logo/social/facebook-brands-solid.svg';
import discord from '../../images/logo/social/discord-brands-solid.svg';
import github from '../../images/logo/social/github-brands-solid.svg';
import figma from '../../images/logo/social/figma-brands-solid.svg';
import linkedin from '../../images/logo/social/linkedin-brands-solid.svg';
import spotify from '../../images/logo/social/spotify-brands-solid.svg';
import twitch from '../../images/logo/social/twitch-brands-solid.svg';
import s from './styles.module.css';

const Footer = () => {
    const navigate = useNavigate();

    const socialMedias = [
        { name: 'Instagram', icon: insta, link: 'https://www.instagram.com/' },
        { name: 'Facebook', icon: facebook, link: 'https://www.facebook.com/' },
        { name: 'Discord', icon: discord, link: 'https://discord.com/' },
        { name: 'GitHub', icon: github, link: 'https://github.com/' },
        { name: 'Figma', icon: figma, link: 'https://www.figma.com/' },
        { name: 'LinkedIn', icon: linkedin, link: 'https://www.linkedin.com/' },
        { name: 'Spotify', icon: spotify, link: 'https://www.spotify.com/' },
        { name: 'Twitch', icon: twitch, link: 'https://www.twitch.tv/' },
    ];

    return (
        <div className={s.Footer}>
            <div className={s.footerHeader}>
                <div className={s.logoFooter}>
                    <Link to="/">
                        <img src={logo} alt="logo site" />
                    </Link>
                </div>
                <div className={s.logoSocialMedia}>
                    {socialMedias.map((social, index) => (
                            <a 
                                key={index} 
                                href={social.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={s.socialIcon}
                            >
                                <img src={social.icon} alt={`${social.name} icon`} />
                            </a>
                        ))}
                </div>
            </div>
            <div className={s.footerBottom}>
                <div className={s.footerLeft}>
                    <div className={s.film}>
                    <h3>Films</h3>
                        <ul className={s.filmListMenu}>
                            <li onClick={() => navigate('/list/films/popular')}>Films populaires</li>
                            <li onClick={() => navigate('/list/films/top-rated')}>Films les mieux notés</li>
                            <li onClick={() => navigate('/list/films/now-playing')}>Films à l'affiche</li>
                        </ul>
                    </div>
                    <div className={s.series}>
                    <h3>Séries</h3>
                        <ul className={s.listSerieMenu}>
                            <li onClick={() => navigate('/list/series/current')}>Séries du moment</li>
                            <li onClick={() => navigate('/list/series/popular')}>Séries populaires</li>
                            <li onClick={() => navigate('/list/series/top-rated')}>Séries les mieux notées</li>
                        </ul>
                    </div>
                </div>
                <div className={s.footerRight}>
                    <div className={s.listBottomLeft}>
                        <h2>Ma Liste</h2>
                        <h2>Mes Favoris</h2>
                    </div>
                    <div className={s.listBottomRight}>
                        <Link to='/contact' className={s.contact}>
                            <p>Contact</p>
                        </Link>
                        <Link to='/terms' className={s.cgu}>
                            <p>CGU</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={s.identity}>© 2024 ScreenSaver</div>
        </div>
    )
}

export default Footer;