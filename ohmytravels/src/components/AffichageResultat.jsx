import React, {useEffect, useState} from "react";
import "../styles/AffichageResultat.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateRangePicker} from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Autoplay, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useNavigate} from "react-router-dom";

function AffichageResultat() {
    const [estConnecte, definirConnecte] = useState(false);
    const [utilisateur, definirUtilisateur] = useState({firstname: "", lastname: ""});

    useEffect(() => {
        const verifierConnexion = () => {
            const utilisateurSauvegarde = localStorage.getItem("utilisateur");
            if (utilisateurSauvegarde) {
                const utilisateurParse = JSON.parse(utilisateurSauvegarde);
                definirUtilisateur(utilisateurParse.data);
                definirConnecte(true);
            } else {
                definirConnecte(false);
            }
        };

        verifierConnexion();

        window.addEventListener("utilisateurConnecte", verifierConnexion);

        return () => {
            window.removeEventListener("utilisateurConnecte", verifierConnexion);
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const utilisateurSauvegarde = localStorage.getItem("utilisateur");
            if (utilisateurSauvegarde) {
                const utilisateurParse = JSON.parse(utilisateurSauvegarde);
                definirUtilisateur(utilisateurParse.data);
                definirConnecte(true);
            } else {
                definirUtilisateur({ firstname: "", lastname: "" });
                definirConnecte(false);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const data = JSON.parse(localStorage.getItem("resultatRecherche"))[0];
    console.log("data: ", data);

    const dates = [dayjs(data.start_date), dayjs(data.end_date)];
    const [photos, setPhotos] = useState([]);
    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState("");
    const [codeMeteo, setCodeMeteo] = useState(null);
    const [meteoError, setMeteoError] = useState(false);

    useEffect(() => {
        async function recupererMeteo() {
            try {
                const resMeteo = await fetch(`http://localhost:3001/api/v1/tools/meteo2/${data.city.cityName}/${data.countryName}`);
                const dataMeteo = await resMeteo.json();
                console.log(dataMeteo);
                const meteo = dataMeteo.current_weather;

                setTemperature(meteo.temperature);
                setDescription(obtenirDescriptionMeteo(meteo.weathercode));
                setCodeMeteo(meteo.weathercode);
                setMeteoError(false);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données météo :", erreur);
                setMeteoError(true);
            }
        }

        recupererMeteo();
    }, []);

    useEffect(() => {
        async function recupererPhotos() {
            try {
                const resPhotos = await fetch(`http://localhost:3001/api/v1/tools/photo/${data.city.cityName}/${data.countryName}`)
                const dataPhotos = await resPhotos.json();
                let photos_ville = dataPhotos.data.photos.map(photo => photo.src.original)

                setPhotos(photos_ville);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des images :", erreur);
            }
        }

        recupererPhotos();
    }, []);

    const navigate = useNavigate();

    const handleRetour = () => {
        navigate(-1);
    };

    const handleFavori = () => {
        if (!estConnecte) {
            alert("Vous devez être connecté pour ajouter ce voyage aux favoris.");
        } else {
            console.log("Ajouté aux favoris !");
        }
    };


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

    return (<>
        <div className="grille-ar">
            <div className="div1-re">
                <section>
                    <h1>Destination</h1>
                    <p>{data.city.cityName}, {data.countryName}</p>
                </section>
            </div>
            <div className="div2-re">
                <section>
                    <h1>Activités</h1>
                    <List className="liste">
                        {data.city.activities.map((activity) => (<ListItem
                            className="item-liste"
                            key={activity.activityName}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <InsertInvitationIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={activity.activityName}
                                secondary={activity.description}
                            />
                        </ListItem>))}
                    </List>
                </section>
            </div>
            <div className="div3-re">
                <section>
                    <h1>Dates</h1>
                    <div className="datePicker">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                            <DateRangePicker
                                localeText={{start: 'Départ', end: 'Retour'}}
                                value={dates}
                                disabled
                            />
                        </LocalizationProvider>
                    </div>
                </section>
            </div>
            <div className="div4-re">
                <section>
                    <p><strong>Prix estimé :</strong> {data.estimatedPrice} €</p>
                </section>
            </div>
            <div className="div5-re">
                <section>
                    <h1>Hôtel recommandé</h1>
                    <p><strong>Nom :</strong> {data.city.suggestedHotel.hotelName}</p>
                    <p><strong>Adresse :</strong> {data.city.suggestedHotel.hotelAddress}</p>
                </section>
            </div>
            <div className="div6-re">
                <section>
                    <h1>Images</h1>
                    <Swiper
                        key={photos.length}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                        }}
                        spaceBetween={30}
                        slidesPerView={1}
                        className="swiper-container-r"
                    >
                        {photos.map((photo) => (
                            <SwiperSlide key={photo} className="swiper-slide-r">
                                <div>
                                    <img
                                        src={photo}
                                        alt={`Vue de ${data.city.cityName}`}
                                        className="destination-image"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </div>
            <div className="div7-re">
                <section>
                    <h1>Texte de présentation</h1>
                    <p>{data.overview}</p>
                </section>
            </div>
            <div className="div8-re">
                <section>
                    <h1>Liens</h1>
                    <ul className={"liens"}>
                        {data.links.map((lien) => (
                            <li className={"lien"}>
                                <a className={"lien"} href={lien} target="_blank" rel="noopener noreferrer">{lien}</a>
                            </li>))}
                    </ul>
                </section>
            </div>
            <div className="div9-re">
                <section>
                    <IconButton
                        onClick={handleRetour} aria-label="retour" size={'large'} className="full-button"
                    >
                        <ClearIcon/>
                    </IconButton>
                </section>
            </div>
            <div className="div10-re">
                <section>
                    <IconButton
                        onClick={handleFavori} aria-label="favori" size={'large'} className="full-button"
                    >
                        <FavoriteIcon/>
                    </IconButton>
                </section>
            </div>
            <div className="div11-re">
                <section>
                    <h1>Météo</h1>
                    <div className="aCote">
                        {meteoError ? (
                            <p>Météo indisponible pour le moment</p> // Message d'erreur
                        ) : (
                            <div>
                                <p>{description}</p>
                                <p>{temperature}°C</p>
                            </div>
                        )}
                        {!meteoError && codeMeteo && (
                            <img src={obtenirIconeMeteo(codeMeteo)} alt="Icône météo" />
                        )}
                    </div>
                </section>
            </div>
        </div>
    </>);
};

export default AffichageResultat;