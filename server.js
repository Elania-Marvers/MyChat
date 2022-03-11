/* On appelle nos packages */
const express = require('express');
const http = require('http');
/* on rajoute le package WebSocket */
const WebSocket = require('ws');

/* on créé le serveur dont on choisi le port */
const port = 6969;
const server = http.createServer(express);
/* On donne en paramètre notre serveur à la librairie WebSocket */
const wss = new WebSocket.Server({ server });

/* on déclare un évenement "connection" qui appellera une fonction connection */
wss.on('connection', function connection(ws) {
    console.log("Hey, un nouveau client s'est connecté.")
    /* on défini un événement "message" dans connection qui appelle notre fonction incoming */
    ws.on('message', function incoming(data){
        /* On précise l'encodage de la donnée reçue */
        data = data.toString('utf-8');
	console.log("Oh, un des clients connectés a envoyé un message ")
	/* on boucle sur chacun de nos clients connectés */
	wss.clients.forEach(function each(client){
	    /* si le client est connecté (si sa socket est toujours ouverte) */
	    if (client.readyState == WebSocket.OPEN) {
		/* alors on lui envoit le contenu que nous a donné l'événement message */
		client.send(data);
	    }
	});
    });
});

/* On lance le serveur */
server.listen(port, function() {
    console.log(`Listen on port ${port}!`);
});
