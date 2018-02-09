const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));

app.get('/', function (req, res) {
   fs.readFile( __dirname + "/public/data/" + "adresses.json", 
        'utf8',
        (err, data) => {
        	if (err) { return console.error(err);}
        	console.log( data );
        	let resultat = JSON.parse('[' + data + ']');           
  			res.render('gabarit.ejs', {adresses: resultat})  
  		});
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})