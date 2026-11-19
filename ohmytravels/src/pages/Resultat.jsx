// import {useLocation} from 'react-router-dom';
// import React, {useEffect, useState} from 'react';
import "../styles/Resultat.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import AffichageResultat from "../components/AffichageResultat.jsx";

const Resultat = () => {
    // const [estConnecte, definirConnecte] = useState(false);
    // const [utilisateur, definirUtilisateur] = useState({ firstname: "", lastname: "" });

    /*
    useEffect(() => {
        const utilisateurSauvegarde = localStorage.getItem("utilisateur");
        if (utilisateurSauvegarde) {
            const utilisateurParse = JSON.parse(utilisateurSauvegarde);
            definirUtilisateur(utilisateurParse);
            definirConnecte(true);

            definirData({"test": params.get("test")})
        }
    }, []);
    */

    return (
        <>
            <Header/>
            <div className={"resultat"}>
                <div className="cadrePresentation">
                    <div className={"gauche"}>
                        <h1>Résultat</h1>
                        <h3 className={"light"}>On vous révèle tout pour une escapade parfaite !</h3>
                    </div>
                </div>
                <div>
                    <AffichageResultat data={"fichier json contenant les donnees à afficher"}/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Resultat;
