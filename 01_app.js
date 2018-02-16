const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));


let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

///////////////////////////////////////////////////////////// Route /html/01_form.html
app.get('/formulaire', function (req, res) {
 console.log('la route route get / = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresse: resultat})
 }) 
})
//////////////////////////////////////////////////////////// Route /
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})
/////////////////////////////////////////////////////////// traiter_get
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };

fs.appendFile(__dirname + "/public/data/membres.txt", ',' + JSON.stringify(reponse), function (err) {
  if (err) throw err;
  console.log('Sauvegardé');
});

})
////////////////////////////////////////////////////////// Route : membres

app.get('/membres', (req, res) => {
 console.log('la route route get / = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresse: resultat})
 }) 
})

app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})

const contenu_objet_json = (o) =>{
	let info = '<table>';
	for(let element of o) {

		for (let p in element)
 		{ 
   			info += '<tr><td>' + p + '</td><td>' + element[p] + '</td></tr>';
   		}

	}
 	
	info += '</table>';
	return info;
}

