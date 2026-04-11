CREATE TABLE rapports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_chantier TEXT,
    responsable TEXT,
    localite TEXT,
    type_site TEXT,
    comm_site TEXT,
    meteo TEXT,
    comm_meteo TEXT,
    activite_tech TEXT, -- Stockage JSON des activités et quantités
    equipes TEXT, -- Stockage du JSON des équipes
    comm_ressources TEXT,
    materiel TEXT,
    comm_materiel TEXT,
    approvisionnement TEXT,
    comm_approv TEXT,
    especes TEXT,
    comm_especes TEXT,
    sante_plants TEXT,
    comm_sante TEXT,
    produits TEXT,
    comm_produits TEXT,
    points_critiques TEXT,
    comm_points_critiques TEXT,
    resultats_attendus TEXT,
    latitude TEXT,
    longitude TEXT,
    commentaire TEXT,
    photo TEXT, -- Stockage de l'image en Base64
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);