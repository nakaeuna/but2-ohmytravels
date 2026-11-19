import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Modale = ({ enfants, fermer }) => {
    return (
        <div className="modal-backdrop" onClick={fermer}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {enfants}
            </div>
        </div>
    );
};

const Header = () => {
    const [estConnecte, definirConnecte] = useState(false);
    const [afficherConnexion, definirAfficherConnexion] = useState(false);
    const [afficherInscription, definirAfficherInscription] = useState(false);
    const [utilisateur, definirUtilisateur] = useState({ firstname: "", lastname: "", token: "" });
    const [donneesConnexion, definirDonneesConnexion] = useState({ mail: "", password: "" });
    const [donneesInscription, definirDonneesInscription] = useState({
        firstname: "",
        lastname: "",
        mail: "",
        password: ""
    });

    useEffect(() => {
        const utilisateurSauvegarde = localStorage.getItem("utilisateur");
        if (utilisateurSauvegarde) {
            const utilisateur = JSON.parse(utilisateurSauvegarde);
            definirUtilisateur(utilisateur.data);
            definirConnecte(true);
        }
    }, []);

    const gererConnexion = async () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(donneesConnexion.mail)) {
            alert("Veuillez renseigner une adresse e-mail valide.");
            return;
        }

        if (donneesConnexion.password.length < 6) {
            alert("Veuillez renseigner un mot de passe valide.");
            return;
        }

        const url = "http://localhost:3001/api/v1/users/login"
        const result = await fetch(url, {
            method: "POST",
            body:  JSON.stringify(donneesConnexion),
            headers: {'Content-Type': 'application/json'}
        })

        if(result.status !== 200) {
            alert("Les identifiants saisis sont incorrects.");
            return
        }

        let dataUtilisateur = await result.json();

        definirUtilisateur(dataUtilisateur);

        localStorage.setItem("utilisateur", JSON.stringify({
            data: dataUtilisateur,
        }));
        window.dispatchEvent(new Event("utilisateurConnecte"));


        definirConnecte(true);
        definirAfficherConnexion(false);
    };

    const gererInscription = async () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!donneesInscription.firstname.trim() || !donneesInscription.lastname.trim()) {
            alert("Le prélastname et le lastname sont obligatoires.");
            return;
        }

        if (!regexEmail.test(donneesInscription.mail)) {
            alert("L'adresse e-mail n'est pas valide.");
            return;
        }

        if (donneesInscription.password.length < 6) {
            alert("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }


        const url = "http://localhost:3001/api/v1/users/register"
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(donneesInscription),
            headers: {'Content-Type': 'application/json'}
        })

        if(result.status !== 200) {
            alert("Les identifiants saisis sont incorrects.");
            return
        }

        let dataUtilisateur = await result.json();
        console.log(dataUtilisateur)

        definirUtilisateur(dataUtilisateur);

        localStorage.setItem("utilisateur", JSON.stringify({
            data: dataUtilisateur,
        }));
        window.dispatchEvent(new Event("utilisateurConnecte"));

        definirConnecte(true);
        definirAfficherInscription(false);
    };

    const gererDeconnexion = () => {
        definirConnecte(false);
        definirUtilisateur({ firstname: "", lastname: "", token: "" });
        localStorage.removeItem("utilisateur");
        window.dispatchEvent(new Event("utilisateurConnecte"));

    };

    return (
        <header>
            <div>
                <a href="/accueil">
                    <svg width="61" height="50" viewBox="0 0 61 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.1248 42.3676L30.2685 49.7291L35.672 44.0884L30.2685 34.6237L23.1248 42.3676Z"
                              fill="#1C60FF"/>
                        <path
                            d="M24.7779 28.5436L17.402 36.4048L10.4815 29.0229C8.15057 26.6368 6.73803 25.3386 4.83584 22.7916C3.512 20.31 3.09478 18.3402 2.92358 15.218C3.02473 12.3309 3.12711 10.4995 4.56265 7.74021C6.09169 4.96551 7.31285 3.67426 10.2083 1.8923C13.6835 0.191344 15.735 -0.213056 19.5875 0.454289C21.9298 0.832839 23.3209 1.6047 24.8689 2.94686C26.417 4.28902 30.3324 8.12369 30.3324 8.12369L35.9781 2.65925C39.0123 0.543143 40.9218 0.0714628 44.6288 0.262547C47.975 0.758128 50.5627 1.45905 53.1127 3.49911C55.3074 5.82213 56.6068 6.94084 57.4372 10.2329C58.8095 15.8831 57.9235 19.3403 54.5543 24.2295L41.4418 38.0346L41.1685 34.5833C42.0148 34.2136 42.5345 33.8164 42.7166 32.8577C42.8117 32.3569 42.8452 32.1337 42.7166 31.6115C42.2924 30.6052 41.5748 30.737 40.3491 31.1321L39.1652 25.1882L45.4484 18.2858C47.0146 15.6505 47.7962 14.1448 48.2711 11.1916C48.4886 10.197 48.0762 10.1269 47.0874 10.2329C43.184 10.5864 42.1133 11.605 39.1652 13.9717L33.9748 19.3403L28.3291 18.4819C28.4203 17.6511 29.1487 16.1811 27.2364 15.7018C27.2364 15.7018 25.3242 15.6973 24.8689 17.8064L20.0427 17.1353C20.1338 16.3045 20.0245 14.6235 18.859 14.5469C18.859 14.5469 17.2928 14.4511 16.4915 16.3683L9.75304 15.4096C8.93351 15.218 7.00304 15.333 5.83749 17.3271L24.7779 28.5436Z"
                            fill="#1C60FF"/>
                    </svg>
                </a>
            </div>

            <nav>
                <a href="/accueil">Accueil</a>
                <a href="/recherche">Recherche</a>
                <a href="/recherches_sauvegardees">Recherches sauvegardées</a>
            </nav>

            <div className="user-section">
                {estConnecte ? (
                    <>
                        <span className="user-name">{utilisateur.firstname} {utilisateur.lastname}</span>
                        <button onClick={gererDeconnexion}>Se déconnecter</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => definirAfficherConnexion(true)}>Se connecter</button>
                        <button onClick={() => definirAfficherInscription(true)}>S'inscrire</button>
                    </>
                )}
            </div>

            {afficherConnexion && (
                <Modale fermer={() => definirAfficherConnexion(false)} enfants={
                    <>
                        <h2>Connexion</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={donneesConnexion.mail}
                            onChange={(e) => definirDonneesConnexion({ ...donneesConnexion, mail: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={donneesConnexion.password}
                            onChange={(e) => definirDonneesConnexion({ ...donneesConnexion, password: e.target.value })}
                        />
                        <button onClick={gererConnexion}>Connexion</button>
                    </>
                } />
            )}

            {afficherInscription && (
                <Modale fermer={() => definirAfficherInscription(false)} enfants={
                    <>
                        <h2>Inscription</h2>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={donneesInscription.firstname}
                            onChange={(e) => definirDonneesInscription({ ...donneesInscription, firstname: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            value={donneesInscription.lastname}
                            onChange={(e) => definirDonneesInscription({ ...donneesInscription, lastname: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={donneesInscription.mail}
                            onChange={(e) => definirDonneesInscription({ ...donneesInscription, mail: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={donneesInscription.password}
                            onChange={(e) => definirDonneesInscription({ ...donneesInscription, password: e.target.value })}
                        />
                        <button onClick={gererInscription}>Créer un compte</button>
                    </>
                } />
            )}
        </header>
    );
};

export default Header;
