import React, {useState, useEffect} from 'react';
import "../styles/RecherchesSauvegardees.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DeleteIcon from '@mui/icons-material/Delete';

const RecherchesSauvegardees = () => {
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

    const itemsParPage = 5;
    const toutesLesIdees = [...Array(23)].map((_, id) => ({
        id, titre: `Idée n°${id + 1} - Ville, Pays`, details: "Dates / Prix / Types d'activités / Météo prévue"
    }));

    const [idees, setIdees] = useState([]);
    const [page, setPage] = useState(1);
    const nombreDePages = Math.ceil(toutesLesIdees.length / itemsParPage);

    const indexDebut = (page - 1) * itemsParPage;
    const ideesAffichees = toutesLesIdees.slice(indexDebut, indexDebut + itemsParPage);

    useEffect(() => {/* Récupérer les données des idées sauvegardées grâce à l'API et les mettre dans un UseState */
    })

    const handleDelete = (id) => {/* Supprimer avec une requête à l'api + update d'un */
    }
    const handleSuivant = () => setPage(prev => Math.min(prev + 1, nombreDePages));
    const handlePrecedent = () => setPage(prev => Math.max(prev - 1, 1));

    return (<div className="pageContainer">
        <Header/>
        <main className="mainContent">
            <div className="recherchesSauvegardees">
                <div className="cadrePresentation">
                    <div className="gauche">
                        <h1>Recherches sauvegardées</h1>
                        <h3 className="light">
                            Retrouvez toutes vos inspirations passées au même endroit.
                        </h3>
                    </div>
                </div>
                {!estConnecte ? (<>
                    <div className="cadreRecherchesSauvegardees en-bas-rs">
                        <video className="background-video" autoPlay loop muted>
                            <source src="/assets/videos/sorcier.mp4" type="video/mp4"/>
                        </video>
                        <div className={"gauche"}>
                            <h1>Connexion requise</h1>
                            <h3 className="light">
                                Vous devez être connecté pour accéder à vos recherches sauvegardées.
                            </h3>
                        </div>
                    </div>
                </>) : (<>
                    <div className="cadreRecherchesSauvegardees">
                        <List className="liste">
                            {ideesAffichees.map((idee) => (<ListItem
                                component="a"
                                href="/resultat_sauvegarde"
                                className="item-liste"
                                key={idee.id}
                                secondaryAction={<IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleDelete}
                                >
                                    <DeleteIcon/>
                                </IconButton>}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FlightTakeoffIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={idee.titre}
                                    secondary={idee.details}
                                />
                            </ListItem>))}
                        </List>
                        <div className="pagination">
                            <Button
                                onClick={handlePrecedent}
                                disabled={page === 1}
                                variant="outlined"
                            >
                                Précédent
                            </Button>
                            <span className="page-info">
                                        Page {page} / {nombreDePages}
                                    </span>
                            <Button
                                onClick={handleSuivant}
                                disabled={page === nombreDePages}
                                variant="outlined"
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </>)}
            </div>
        </main>
        <Footer/>
    </div>);
};

export default RecherchesSauvegardees;
