import { useNavigate } from 'react-router-dom';
import React from 'react';
import "../styles/Resultat.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import AffichageResultat from "../components/AffichageResultat.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";

const ResultatSauvegarde = () => {
    const navigate = useNavigate();

    const handleRetour = () => {
        navigate(-1);
    };

    return (
        <>
            <Header />
            <div className="resultat">
                <div className="cadrePresentation">
                    <div className="gauche">
                        <h1>Idée n°X</h1>
                        <h3 className="light">On vous révèle tout pour une escapade parfaite !</h3>
                    </div>
                    <div className="droite">
                        <IconButton onClick={handleRetour} aria-label="retour" size={'large'}>
                            <ArrowBackIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                </div>
                <div className="contenuResultat">
                    <AffichageResultat data={"fichier json contenant les donnees à afficher"} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResultatSauvegarde;
