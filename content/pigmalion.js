import { Celula } from './celulaClass';
import { startInterval } from './functions';
import { pausar } from './functions';
import { deshabilitar } from './functions';
import { habilitar } from './functions';
import { JuegoVida } from './JuegoVidaClass';

$(document).ready(function(){
	let matrizAux;
	let filas;
	let columnas;
	let posVivas;
	let interval;
	let juego = new Object();

	$('#comenzar').click(function(e){
		e.preventDefault();
		let newWindow;
		if($(window).width() > 500){
			newWindow = window.open('content/pigmalion.html', '', 'width=500px,height=500px');
		} else {
			newWindow = window.open('content/pigmalion.html', '', 'width=300px');
		}
	});

	$('#generar').click(function(e){
		e.preventDefault();
		filas = $('#filas').val();
		columnas = $('#cols').val();
		posVivas = $('#alive').val().split(";");
		let elems = document.querySelectorAll('input[type="text"]');
		elems.forEach(elem => {
			deshabilitar(elem);
		});
		elems = document.querySelectorAll('input[type="number"]');
		elems.forEach(elem => {
			deshabilitar(elem);
		});
		elems = document.getElementById('pausa');
		habilitar(elems);
		let jv = new JuegoVida(parseInt(filas),parseInt(columnas),0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
	});

	$('#pausa').click(function(e){
		e.preventDefault();
		let state = $(this).attr("value");
		interval = pausar(state, juego, interval);
	});

	$('#finalizar').click(function(e){
		e.preventDefault();
		let elem = document.querySelectorAll('.inputs-variable input');
		habilitar(elem);
		elem = document.getElementById('pausa');
		deshabilitar(elem);
		clearInterval(interval);
		$('#matriz').children().remove();
		juego.setGen("");
		juego = null;
		$('#pausa').attr("value", "Empezar");
		$('input[type="text"], input[type="number"]').val("");
	});

	$('#salir').click(function(){
		if(confirm("Seguro que desea salir del juego?")){
			window.close();
		}
	});

	document.onkeydown = function(event){
		if((($('#pausa').attr("value") == "Reanudar") || ($('#pausa').attr("value") == "Empezar")) && (event.which == 39)){
			matrizAux = juego.chequearMatriz();
			juego.llenarMatriz(matrizAux);
			juego.devolverMatriz();
			juego.setGen(juego.getGen() + 1);
			$('#pausa').attr("value", "Reanudar");
		} else if (event.which == 32){
			event.preventDefault();
			let state = $('#pausa').attr("value");
			interval = pausar(state, juego, interval);
		}
	}

	$('#generarBloque').click(function(e){
		e.preventDefault();
		filas = 10;
		columnas = 10;
		posVivas = "4,4;4,5;5,4;5,5";
		posVivas = posVivas.split(";");
		let elem = document.querySelectorAll('.inputs-variable input');
		deshabilitar(elem);
		elem = document.getElementById('finalizar');
		deshabilitar(elem);
		elem = document.getElementById('pausa');
		habilitar(elem);
		$('#pausa').attr("value", "Pausar");
		let jv = new JuegoVida(filas,columnas,0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
		interval = startInterval(juego, matrizAux);
	});

	$('#generarBlinker').click(function(e){
		e.preventDefault();
		filas = 10;
		columnas = 10;
		posVivas = "4,4;4,5;4,6";
		posVivas = posVivas.split(";");
		let elem = document.querySelectorAll('.inputs-variable input');
		deshabilitar(elem);
		elem = document.getElementById('finalizar');
		deshabilitar(elem);
		elem = document.getElementById('pausa');
		habilitar(elem);
		$('#pausa').attr("value", "Pausar");
		let jv = new JuegoVida(filas,columnas,0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
		interval = startInterval(juego, matrizAux);
	});

	$('#generarToad').click(function(e){
		e.preventDefault();
		filas = 10;
		columnas = 10;
		posVivas = "4,5;4,6;4,7;5,4;5,5;5,6";
		posVivas = posVivas.split(";");
		let elem = document.querySelectorAll('.inputs-variable input');
		deshabilitar(elem);
		elem = document.getElementById('finalizar');
		deshabilitar(elem);
		elem = document.getElementById('pausa');
		habilitar(elem);
		$('#pausa').attr("value", "Pausar");
		let jv = new JuegoVida(filas,columnas,0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
		interval = startInterval(juego, matrizAux);
	});
});




	






