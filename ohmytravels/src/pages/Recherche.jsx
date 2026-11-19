import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper/modules';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Slider from '@mui/material/Slider';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {DateRangePicker} from '@mui/x-date-pickers-pro';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import "../styles/Recherche.css"
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from 'react-router-dom';

const Recherche = () => {
    const valeursSlider = [{value: 1000, label: '1000€',}, {value: 2000, label: '2000€',},
        {value: 3000, label: '3000€',}, {value: 4000, label: '4000€',}, {value: 5000, label: '5000€',},
        {value: 6000, label: '6000€',}, {value: 7000, label: '7000€',}, {value: 8000, label: '8000€',},
        {value: 9000, label: '9000€',}];

    const listeActivites = [{activite: "Relaxant"}, {activite: "En famille"},
        {activite: "Sportif"}, {activite: "Culturel"}, {activite: "Aventure"}, {activite: "Romantique"},
        {activite: "Gastronomique"}, {activite: "Fête & vie nocturne"}, {activite: "Nature & plein air"},
        {activite: "Découverte locale"}, {activite: "Luxe"}, {activite: "Road trip"}, {activite: "Bien-être & spa"},
        {activite: "Écotourisme"},];

    const listeEnvironnements = [{environnement: "Indifférent"}, {environnement: "Montagne"},
        {environnement: "Mer"}, {environnement: "Campagne"}, {environnement: "Ville"}, {environnement: "Désert"},
        {environnement: "Forêt"},];

    const [listePays, setListePays] = useState([]);
    const [dates, setDates] = useState([dayjs(), dayjs().add(7, 'day')]);
    const [budget, setBudget] = useState(2000);
    const [activites, setActivites] = useState([]);
    const [environnement, setEnvironnement] = useState(listeEnvironnements[0].environnement);
    const [pays, setPays] = useState(listePays[0]);

    useEffect(() => {
        const obtenirPays = async () => {
            try {
                const reponse = await fetch("http://localhost:3001/api/v1/tools/pays");
                const data = (await reponse.json()).data;
                setListePays(data);

                if (data.length > 0) {
                    setPays(data[0]);  // ici tu le mets bien à jour
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des pays :", error);
            }
        };

        obtenirPays();
    }, []);

    const navigate = useNavigate();
    const click = async () => {
        if (dates.length !== 2 ) {
            return;
        }

        const start_date = dates[0]
        const end_date = dates[1]
        const url = "http://localhost:3001/api/v1/travels/travel/search"
        const json = JSON.stringify({
            "country_destination": pays,
            "start_date": start_date,
            "end_date": end_date,
            "budget": budget,
            "prefered_activites": activites,
            "prefered_environnement": environnement,
        })


        console.log("requête: ", json)
        const result = await fetch(url, {
            method: "POST",
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (result.status !== 200) {
            console.log("error:", result.status, await result.text());
            return;
        }

        let reponse = await result.json();
        console.log("réponse", reponse);

        localStorage.setItem("resultatRecherche", JSON.stringify(reponse));
        navigate('/resultat');
    }

    return (
        <>
            <Header/>
            <div className={"recherche"}>
                <div className="cadrePresentation">
                    <div className={"gauche"}>
                        <h1>Recherche</h1>
                        <h3 className={"light"}>Où partez-vous pour votre prochaine escapade ?</h3>
                    </div>
                </div>
                <div className="cadreRecherche">
                    <div className="div1-r">
                        <section>
                            <Box sx={{minWidth: 120}}>
                                <FormControl fullWidth>
                                    <h2>📍 Votre destination ?</h2>
                                    <NativeSelect
                                        value={pays}
                                        onChange={(e) => setPays(e.target.value)}
                                        inputProps={{
                                            name: 'pays',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        {listePays.map((pays) => (
                                            <option key={pays} value={pays}>{pays}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </section>
                    </div>
                    <div className="div2-r">
                        <section>
                            <h2>⛰️ Votre environnement préféré ?</h2>
                            <Swiper
                                className={"swiper-container-r"}
                                navigation={true}
                                modules={[Navigation]}
                                loop={true}
                                spaceBetween={30}
                                slidesPerView={1}
                                onSlideChange={({realIndex}) => {
                                    const env = listeEnvironnements[realIndex]?.environnement;
                                    if (env) setEnvironnement(env);
                                }}
                            >
                                {listeEnvironnements.map(({environnement}) => (
                                    <SwiperSlide key={environnement} className="swiper-slide-r">
                                        <h3>{environnement}</h3>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    </div>
                    <div className="div3-r">
                        <section>
                            <h2>💸 Votre budget ?</h2>
                            <Slider
                                aria-label="Budget"
                                value={budget}
                                onChange={(e, budget) => setBudget(budget)}
                                getAriaValueText={(value) => `${value}€`}
                                valueLabelDisplay="auto"
                                step={100}
                                min={100}
                                max={10000}
                                marks={valeursSlider}
                            />
                        </section>
                    </div>
                    <div className="div4-r">
                        <section>
                            <Box sx={{minWidth: 120}}>
                                <FormControl fullWidth>
                                    <h2>⚽ Vos types d'activités préférées ?</h2>
                                    <Select
                                        multiple
                                        value={activites}
                                        onChange={(e) => setActivites(e.target.value)}
                                        input={<OutlinedInput notched={false}/>}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Veuillez choisir des types d'activités (optionnel)</em>;
                                            }
                                            return selected.join(', ');
                                        }}
                                        displayEmpty
                                        sx={{'.MuiSelect-select': {paddingTop: '20px', paddingBottom: '20px',}}}
                                    >
                                        {listeActivites.map(({activite}) => (
                                            <MenuItem key={activite} value={activite}>
                                                <Checkbox checked={activites.indexOf(activite) > -1}/>
                                                <ListItemText primary={activite}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </section>
                    </div>
                    <div className="div5-r">
                        <section>
                            <h2>📅 Vos dates ?</h2>
                            <div className={"datePicker"}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                                    <DateRangePicker
                                        localeText={{ start: 'Départ', end: 'Retour' }}
                                        value={dates}
                                        onChange={(newValue) => setDates(newValue)}
                                        minDate={dayjs()}
                                    />
                                </LocalizationProvider>
                            </div>
                        </section>
                    </div>
                    <div className="div6-r">
                        <a onClick={click}>
                            <button>→ Appuyez ici pour lancer votre recherche !</button>
                        </a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Recherche;
