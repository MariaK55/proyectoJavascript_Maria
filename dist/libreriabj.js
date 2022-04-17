(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.libreriabj = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


/*import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
*/


module.exports = {baraja,cartasJugador,cartasDealer,pedirCarta,pintarCarta,plantarme,playAgain};


var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2; // resolución
canvas.height = 400 * 2;
var ctx = canvas.getContext("2d");

class Carta {
	static x = 50;
	static y = 50;

	constructor(puntos, palo) {
		this.img = new Image();
		this.puntos = puntos;
		this.palo = palo;
	}
}


var palos = ["C", "D", "T", "P"];
var baraja = [];
var posicionBaraja = 0;
var cartasJugador = [];
var cartasDealer = [];



for (i = 0; i < 4; i++) { // genero las cartas (4 palos)
	for (j = 1; j <= 13; j++) { // 13 posibles valores
		baraja.push(new Carta(j, palos[i]));
	}
}


for (i = 0; i < 208; i++) { // Barajear
	baraja.splice(Math.random() * 52, 0, baraja[0]); // inserto luego d posición random la carta de la 1a posición
	baraja.shift(); //elimino la 1a pq estaría duplicada
}

function pintarCarta(cp) {

	cp.img.onload = () => {
		ctx.drawImage(cp.img, Carta.x, Carta.y, 250, 340); //para pintar en el canvas 
		Carta.x += 300; 
	};
	cp.img.src = "imagenes/" + cp.puntos.toString() + cp.palo + ".svg"; 
}

function pedirCarta() {
	while (posicionBaraja < 2) { // Al empezar hay q asignar 2 cartas
		let c = baraja[posicionBaraja]; 
		cartasJugador.push(c);
		pintarCarta(c);
		posicionBaraja++;
		if(posicionBaraja==2){
			return;
			}
		
	}
	if (posicionBaraja < 8) { // max 8 (suficiente para sumar los 21 ptos) y limitar para q siempre le queden al dealer
		let c = baraja[posicionBaraja]; //Carta Jugada
		cartasJugador.push(c);
		pintarCarta(c);
		posicionBaraja++;
	}
}

function plantarme() {
	document.getElementById("pedir").style.visibility = "hidden";
	document.getElementById("plantar").style.visibility = "hidden";

	let puntosJugador = 0;
	let puntosDealer = 0;
	let info = document.getElementById("info");
	
	for (i in cartasJugador) { // puntos del jugador
		puntosJugador += cartasJugador[i].puntos;
	}
	
	while (puntosDealer < 17) { // Por reglas del juego cdo tenga 17 puntos no puede tomar más cartas
		cartasDealer.push(baraja[posicionBaraja]);
		puntosDealer += baraja[posicionBaraja].puntos;
		posicionBaraja++;
	}
	
	info.innerHTML = "Puntuación del jugador: " + puntosJugador + "<br>Puntuación del dealer: " + puntosDealer;
	// Se pintan las cartas del dealer
	Carta.x = 50;
	Carta.y = 410;
	for (i in cartasDealer) {
		pintarCarta(cartasDealer[i]);
	}
	if (puntosJugador == 21) {
		info.innerHTML +="<br>Enhorabuena!!! Haz ganado! 🥳🥳🥳</b>";
	} else if (puntosJugador > 21) {
		info.innerHTML +="<br>Haz perdido...</b>";
	} else if (puntosJugador == puntosDealer) {
		info.innerHTML +="<br>Ha ocurrido un empate...</b>";
	} else if ((puntosJugador > puntosDealer) ||(puntosDealer>21) ) {
		info.innerHTML +="<br>Enhorabuena!!! Haz ganado! 🥳🥳🥳</b>";
	} else {
		info.innerHTML += "<br>Haz perdido...</b>";
	}
}


function playAgain() { 
	location.reload(true);
}

},{}]},{},[1])(1)
});
