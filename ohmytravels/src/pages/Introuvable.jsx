import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Introuvable = () => {
    return (
        <>
            <Header/>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h1>404 - Page introuvable</h1>
                <p>La page que vous recherchez n'existe pas.</p>
            </div>
            <Footer/>
        </>
    );
};

export default Introuvable;
