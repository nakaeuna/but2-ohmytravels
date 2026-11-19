import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarteMeteo from "../components/CarteMeteo";
import CarteLien from "../components/CarteLien.jsx";
import CarteRecommendation from "../components/CarteRecommendation";
import "../styles/Accueil.css"

function Accueil() {
    return (
        <>
            <Header/>
            <div className="grille">
                <div className="div1-a">
                    <section>
                        <h1>Oh My Travels</h1>
                        <hr/>
                        <h2>Trouvez votre idée de voyage !</h2>
                        <a href="/recherche"><button>→ Appuyez ici pour tester dès maintenant !</button></a>
                    </section>
                </div>
                <div className="div2-a">
                    <CarteLien
                        texte={"Enregistrez vos recherches pour facilement choisir parmi les meilleures idées de voyage !"} lien={"recherches_sauvegardees"}/>
                </div>
                <div className="div3-a">
                    <CarteLien
                        texte={"Un résultat qui correspond à vos critères, car vous êtes au cœur de notre attention."} lien={"recherche"}/>
                </div>
                <div className="div4-a">
                    <section>
                        <CarteRecommendation/>
                    </section>
                </div>
                <div className="div5-a">
                    <section>
                        <CarteMeteo/>
                    </section>
                </div>
                <div className="div6-a">
                    <section>
                        <h1>En collaboration avec :</h1>
                        <hr/>
                        <img src="/assets/images/collaborations.png" alt="API utilisées"/>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Accueil;
