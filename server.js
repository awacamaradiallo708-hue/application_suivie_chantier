const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); 
app.use(express.json({ limit: '20mb' })); // Augmenté pour les photos et les formulaires détaillés

// Stockage temporaire en mémoire (puisque la connexion DB est désactivée)
let rapportsEnMemoire = [];

// Route pour consulter les derniers rapports reçus
app.get('/api/rapports', (req, res) => {
  res.json(rapportsEnMemoire.slice(-10)); // Renvoie les 10 derniers rapports
});

// Route pour recevoir les rapports
app.post('/api/rapports', (req, res) => {
  const data = req.body;

  // Création de l'objet complet conforme au formulaire Word
  const nouveauRapport = {
    id: Date.now(),
    date: data.date,
    responsable: data.responsable,
    
    // 1. LOCALISATION ET CONDITIONS
    localite: data.localite,
    type_site: data.type_site, // Alignement, Reboisement, Talus
    type_site_commentaire: data.type_site_commentaire,
    meteo: data.meteo,
    meteo_commentaire: data.meteo_commentaire,

    // 2. SUIVI DES ACTIVITÉS TECHNIQUES
    tech_vegetalisation_talus_plants: data.tech_vegetalisation_talus_plants,
    tech_vegetalisation_talus_pose: data.tech_vegetalisation_talus_pose,
    tech_plantation_alignement: data.tech_plantation_alignement,
    tech_arrosage: data.tech_arrosage,
    tech_entretien_fosses: data.tech_entretien_fosses,
    tech_protections: data.tech_protections,

    // 3. RESSOURCES ET LOGISTIQUE
    equipes: data.equipes, // Structure imbriquée : { type, ouvriers: [{nom, tel, statut}], effectif }
    ressources_main_doeuvre_comm: data.ressources_main_doeuvre_comm,
    ressources_materiel: data.ressources_materiel,
    ressources_materiel_comm: data.ressources_materiel_comm,
    ressources_approvisionnement: data.ressources_approvisionnement,
    ressources_approvisionnement_comm: data.ressources_approvisionnement_comm,

    // 4. ÉTAT PHYTOSANITAIRE ET OBSERVATIONS
    especes_concernees: data.especes_concernees,
    especes_comm: data.especes_comm,
    sante_plants: data.sante_plants,
    sante_plants_comm: data.sante_plants_comm,
    produits_traitement: data.produits_traitement,
    produits_traitement_comm: data.produits_traitement_comm,
    points_critiques: data.points_critiques,
    points_critiques_comm: data.points_critiques_comm,

    // Médias et GPS
    photo: data.photo,
    lon: data.lon,
    lat: data.lat
  };

  // Affichage dans la console du serveur pour vérifier la réception
  console.log("Rapport reçu de :", nouveauRapport.responsable, "pour la localité :", nouveauRapport.localite);
  
  // Ajout à la liste en mémoire
  rapportsEnMemoire.push(nouveauRapport);

  res.status(201).json({ success: true, message: 'Rapport bien reçu par le serveur (Stockage mémoire)' });
});

app.listen(port, () => {
  console.log(`Serveur API Chantier démarré sur http://localhost:${port}`);
});
