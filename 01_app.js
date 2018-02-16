const express = require('express');
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
///////////////////////////////////////////////////////////// Route /html/01_form.html
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/Public/html/" + "01_form.html" );
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

fs.appendFile(__dirname + "/Public/data/membres.txt", ',' + JSON.stringify(reponse), function (err) {
  if (err) throw err;
  console.log('Sauvegardé');
});

})
////////////////////////////////////////////////////////// Route : membres
app.get('/membres', (req,res)=>{
	fs.readFile( __dirname + "/Public/data/" + "membres.txt", 'utf8', function (err, data) {
		if (err) throw err;
 		let objet = JSON.parse('[' + data + ']');
 		res.end(contenu_objet_json(objet));
	});
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

var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
 
console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
