import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil.jsx';
import Recherche from './pages/Recherche.jsx';
import RecherchesSauvegardees from './pages/RecherchesSauvegardees.jsx';
import Resultat from './pages/Resultat.jsx';
import Introuvable from './pages/Introuvable.jsx';
import './styles/App.css';
import ResultatSauvegarde from "./pages/ResultatSauvegarde.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/accueil" element={<Accueil/>} />
                <Route path="/recherche" element={<Recherche/>} />
                <Route path="/recherches_sauvegardees" element={<RecherchesSauvegardees/>} />
                <Route path="/resultat" element={<Resultat/>} />
                <Route path="*" element={<Introuvable/>} />
                <Route path="/resultat_sauvegarde" element={<ResultatSauvegarde/>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
