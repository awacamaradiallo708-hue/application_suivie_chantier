const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Autorise les requêtes provenant de votre GitHub Pages
app.use(express.json({ limit: '10mb' })); // Augmente la limite pour recevoir les photos en Base64

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  user: 'postgres',           // Votre utilisateur pgAdmin
  host: 'localhost',          // 'localhost' ou l'IP de votre serveur
  database: 'base_donnees_suivie_chantier',      // Le nom de votre base de données
  password: 'couna2000', // Votre mot de passe
  port: 5432,
});

// Route pour récupérer les derniers rapports (pour QGIS et l'affichage web)
app.get('/api/rapports', async (req, res) => {
  try {
    const result = await pool.query('SELECT *, ST_X(geom) as lon, ST_Y(geom) as lat FROM rapports_chantier ORDER BY date_rapport DESC LIMIT 5');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération:', err);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// Route pour recevoir les rapports
app.post('/api/rapports', async (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO rapports_chantier (
      date_rapport, responsable, localite, type_site, meteo, 
      activite_tech, points_critiques, commentaire, photo, geom
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, 
      ST_SetSRID(ST_MakePoint($10, $11), 4326)
    ) RETURNING id;
  `;

  const values = [
    data.date,
    data.responsable,
    data.localite,
    data.type_site,
    data.meteo,
    data.activite_tech,
    data.points_critiques,
    data.commentaire,
    data.photo,
    parseFloat(data.lon), // Longitude pour PostGIS
    parseFloat(data.lat)  // Latitude pour PostGIS
  ];

  try {
    const result = await pool.query(query, values);
    console.log(`Rapport inséré avec l'ID: ${result.rows[0].id}`);
    res.status(201).json({ success: true, message: 'Rapport enregistré dans PostgreSQL' });
  } catch (err) {
    console.error('Erreur SQL:', err.stack);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'insertion en base de données' });
  }
});

app.listen(port, () => {
  console.log(`Serveur API Chantier démarré sur http://localhost:${port}`);
});
