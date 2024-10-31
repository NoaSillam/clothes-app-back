// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Autorise uniquement votre frontend
  }));

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplace par ton utilisateur MySQL
  password: 'root', // Remplace par ton mot de passe MySQL
  database: 'bddshop', // Remplace par le nom de ta base de données
  port: 8889,
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route pour récupérer les vêtements
app.get('/clothing', (req, res) => {
  db.query('SELECT `idProduit`, `libelleProduit`, `prixProduit`, `image` FROM `produit`', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des vêtements:', err);
      res.status(500).json({ error: 'Erreur de récupération' });
      return;
    }
    res.json(results);
  });
});

app.get('/marque', (req, res) => {
    db.query('SELECT `idMarque`, `libelle`, `descriptionMarque`, `image` FROM `marque`', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des marques:', err);
        res.status(500).json({ error: 'Erreur de récupération' });
        return;
      }
      res.json(results);
    });
  });


  app.get('/categorie', (req, res) => {
    db.query('SELECT `idCategorie`, `libelle` FROM `categorie`', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des categories:', err);
        res.status(500).json({ error: 'Erreur de récupération' });
        return;
      }
      res.json(results);
    });
  });

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
