import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "../styles/CarteRecommendation.css";
import "swiper/css";
import "swiper/css/navigation";

const DESTINATIONS = [
    { ville: "Paris", pays: "FR", lat: 48.8566, lon: 2.3522, image: "/assets/images/paris.jpg"},
    { ville: "New-York", pays: "US", lat: 40.7128, lon: -74.0060, image: "/assets/images/newyork.jpg"},
    { ville: "Tokyo", pays: "JA", lat: 35.6895, lon: 139.6917, image: "/assets/images/tokyo.jpg"},
    { ville: "Barcelone", pays: "ES", lat: 41.3851, lon: 2.1734, image: "/assets/images/barcelone.jpg"},
    { ville: "Rome", pays: "IT", lat: 41.9028, lon: 12.4964, image: "/assets/images/rome.jpg"}
];

const CarteRecommendation = () => {
    const [destinations, setDestinations] = useState([]);
    const [coordonneesOrigine, setCoordonneesOrigine] = useState((48.8566, 2.3522)); // Coordonnées de Paris par défaut
    const prixParKm = 0.12; // Coût estimé par km (en avion)

    useEffect(() => {
        obtenirLocalisation();
    }, []);

    useEffect(() => {
        const fetchDestinations = async () => {
            const data = await Promise.all(
                DESTINATIONS.map(async (destination) => {
                    const distance = calculerDistance(coordonneesOrigine.lat, coordonneesOrigine.lon, destination.lat, destination.lon);
                    const cout = (distance * prixParKm).toFixed(2);
                    return { ...destination, cout};
                })
            );
            setDestinations(data);
        };

        fetchDestinations();
    }, [coordonneesOrigine]);

    async function obtenirLocalisation() {
        const resLoc = await fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`);
        const dataLoc = await resLoc.json();
        const [lat, lon] = dataLoc.loc.split(",").map(parseFloat);
        setCoordonneesOrigine({lat, lon});
    }

    const calculerDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const deg2rad = (deg) => deg * (Math.PI / 180);

    return (
        <div>
            <Swiper
                key={destinations.length}
                navigation={true}
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 2500,
                }}
                observer={true}
                observeParents={true}
                spaceBetween={30}
                slidesPerView={1}
                className="swiper-container-a"
            >
                {destinations.map((destination, id) => (
                    <SwiperSlide key={id} className="swiper-slide-a">
                        <div>
                            <h3>{destination.ville}, {destination.pays} - {destination.cout} €</h3>
                            {destination.image ? (
                                <img
                                    src={destination.image}
                                    alt={`Vue de ${destination.ville}`}
                                    className="destination-image"
                                />
                            ) : (
                                <p>Image non disponible</p>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarteRecommendation;
