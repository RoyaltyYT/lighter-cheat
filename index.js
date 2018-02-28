var fs = require("fs");
var express = require('express');

var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

var latestkey;
var numbera = 0;

function NewSessionKey(){
	
	numbera++;
	
	s_key = "";
	var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var ii = 0; ii < 15; ii++) s_key += s.charAt(Math.floor(Math.random() * s.length));
	s_html = "<!DOCTYPE html><html lang='en' ><head> <meta charset='UTF-8'> <title>Lighter - Dashboard</title> <script src='https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js' type='text/javascript'></script> <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'> <link rel='stylesheet' href='css/style.css'> </head><body> <h1>      <b class='text'>" + s_key + " </b></h1><div class='progress'> <b class='progress__bar'> <span class='progress__text'> </span> </b></div><script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script> <script src='js/index.js'></script></body></html>";
	
	latestkey = s_key;
	return s_html;
	
}

setInterval(function(){
	
	fs.unlinkSync("public/index.html");
	fs.writeFile("public/index.html", NewSessionKey(), function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("New key generated: " + numbera);
	}); 
	
	fs.unlinkSync("public/sessionkey.html");
	fs.writeFile("public/sessionkey.html", latestkey, function(err) {
		if(err) {
			return console.log(err);
		}
	}); 

	
}, 20000)
