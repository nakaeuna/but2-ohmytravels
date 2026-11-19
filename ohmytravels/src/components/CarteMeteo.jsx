import React, { useEffect, useState } from "react";
import "../styles/CarteMeteo.css";

const CarteMeteo = () => {
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState("");
    const [codeMeteo, setCodeMeteo] = useState(null);

    useEffect(() => {
        async function recupererMeteo() {
            try {
                const resLoc = await fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`);
                const dataLoc = await resLoc.json();
                const [latitude, longitude] = dataLoc.loc.split(",");

                setVille(dataLoc.city);
                setPays(dataLoc.country);

                const resMeteo = await fetch(`http://localhost:3001/api/v1/tools/meteo/${latitude}/${longitude}`)
                const dataMeteo = await resMeteo.json();
                const meteo = dataMeteo.current_weather;

                setTemperature(meteo.temperature);
                setDescription(obtenirDescriptionMeteo(meteo.weathercode));
                setCodeMeteo(meteo.weathercode);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données météo :", erreur);
            }
        }

        recupererMeteo();
    }, []);

    const obtenirDescriptionMeteo = (code) => {
        const descriptions = {
            0: "Ensoleillé",
            1: "Principalement dégagé",
            2: "Partiellement nuageux",
            3: "Couvert",
            45: "Brouillard",
            48: "Brouillard givrant",
            51: "Bruine légère",
            53: "Bruine modérée",
            55: "Bruine dense",
            61: "Pluie légère",
            63: "Pluie modérée",
            65: "Pluie forte",
            71: "Neige légère",
            73: "Neige modérée",
            75: "Neige forte",
            80: "Averses légères",
            81: "Averses modérées",
            82: "Averses fortes",
            95: "Orage",
            96: "Orage avec grêle",
            99: "Orage violent"
        };
        return descriptions[code] || "Météo inconnue";
    };

    const obtenirIconeMeteo = (code) => {
        const mapping = {
            0: "day.svg",
            1: "day.svg",
            2: "cloudy-day-1.svg",
            3: "cloudy.svg",
            45: "fog.svg",
            48: "fog.svg",
            51: "rainy-1.svg",
            53: "rainy-2.svg",
            55: "rainy-3.svg",
            61: "rainy-4.svg",
            63: "rainy-5.svg",
            65: "rainy-6.svg",
            71: "snowy-1.svg",
            73: "snowy-4.svg",
            75: "snowy-6.svg",
            80: "rainy-4.svg",
            81: "rainy-5.svg",
            82: "rainy-6.svg",
            95: "thunder.svg",
            96: "thunder.svg",
            99: "thunder.svg"
        };
        const icone = mapping[code] || "day.svg";
        return `/assets/iconesMeteo/${icone}`;
    };

    const obtenirDateDuJour = () => {
        const date = new Date();
        const dateFormatee = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return dateFormatee
            .split(' ')
            .map(mot => mot.charAt(0).toUpperCase() + mot.slice(1))
            .join(' ');
    };

    return (
        <div style={{height:"100%"}}>
            {ville && pays ? (
                <div className="meteo" style={{backgroundImage: `url(${obtenirIconeMeteo(codeMeteo)})`}}>
                    <div>
                        <p className="light">{obtenirDateDuJour()}</p>
                        <p><strong>{ville}, {pays}</strong></p>
                    </div>
                    <div>
                        <p><strong>{temperature}°C</strong></p>
                        <p className="light">{description}</p>
                    </div>
                </div>
            ) : (
                <p>Chargement de la météo...</p>
            )}
        </div>
    );
};

export default CarteMeteo;
