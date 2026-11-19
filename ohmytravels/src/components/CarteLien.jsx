import React from "react";
import "../styles/CarteLien.css"

function CarteLien({ texte, lien }) {
    return (
        <section className="contenu">
            <div className="texte">
                <h2>{ texte }</h2>
            </div>
            <div className="fleche">
                <a href={lien}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <g transform="rotate(180 24 24)">
                            <path d="M12 36L36 12" stroke="white" stroke-width="4" stroke-linecap="round"/>
                            <path d="M12 16V36H32" stroke="white" stroke-width="4" stroke-linecap="round"/>
                        </g>
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default CarteLien;