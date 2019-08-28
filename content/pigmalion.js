class JuegoVida{
	constructor(f,c, gen){
		this.gen = gen;
		this.f = new Array(f);
		for(var i=0; i<f; i++){
			this.f[i] = new Array(c);
		}
		for(var i=0; i<this.f.length;i++){
			for(var j=0; j<this.f[i].length;j++){
				//Inicializamos la matriz con espacios blancos
				this.f[i][j] = new Celula("&nbsp;");
			}
		}
	}

	armarMatriz(array){
		for(var k=0; k<array.length; k++){
			//Reemplazamos los espacios blancos por células vivas en donde lo requiera el usuario
			var pX = parseInt(array[k].substr(0,1));
			var pY = parseInt(array[k].substr(-1,1));
			this.f[pX][pY].setEstado("*");
		}
	}

	devolverMatriz(){
		$('#matriz').children().remove();
		for(var i=0; i<this.f.length;i++){
			$('#matriz').append("<div id='fila-"+i+"'>");
			$('#matriz #fila-'+i).append("<span>|</span>");
			for(var j=0; j<this.f[i].length;j++){
				$('#matriz #fila-'+i).append("<span class='elemento'>" + this.f[i][j].getEstado() + "</span>");
				$('#matriz #fila-'+i).append("<span>|</span>");
			}
			$('#matriz').append("</div>");
		}
	}

	chequearMatriz(){
		var matrizAct = []; //matriz auxiliar
		for(var i=0; i<this.f.length;i++){
			//llenamos la matriz auxiliar
			matrizAct[i] = [];
			for(var j=0; j<this.f[i].length;j++){
				matrizAct[i][j] = this.f[i][j].str;
			}
		}
		for(var i=0; i<this.f.length;i++){
			for(var j=0; j<this.f[i].length;j++){
				var cont = 0;
				var vecinos = [];
				var actual = this.f[i][j].str;
				//creamos un array con los vecinos de cada elementos, teniendo en cuenta si están en la
				//primera y/o última fila y/o columna
				if(i==0 && i!=this.f.length-1){
					if(j==0){
						vecinos.push(this.f[i][j+1].str);
						vecinos.push(this.f[i+1][j].str);
						vecinos.push(this.f[i+1][j+1].str);
					} else if (j==this.f[i].length-1){
						vecinos.push(this.f[i][j-1].str);
						vecinos.push(this.f[i+1][j-1].str);
						vecinos.push(this.f[i+1][j].str);
					} else{
						vecinos.push(this.f[i][j-1].str);
						vecinos.push(this.f[i][j+1].str);
						vecinos.push(this.f[i+1][j-1].str);
						vecinos.push(this.f[i+1][j].str);
						vecinos.push(this.f[i+1][j+1].str);
					}
				} else if(i==this.f.length-1 && i!=0){
					if(j==0){
						vecinos.push(this.f[i-1][j].str);
						vecinos.push(this.f[i-1][j+1].str);
						vecinos.push(this.f[i][j+1].str);
					} else if (j==this.f[i].length-1){
						vecinos.push(this.f[i-1][j-1].str);
						vecinos.push(this.f[i-1][j].str);
						vecinos.push(this.f[i][j-1].str);
					} else{
						vecinos.push(this.f[i-1][j-1].str);
						vecinos.push(this.f[i-1][j].str);
						vecinos.push(this.f[i-1][j+1].str);
						vecinos.push(this.f[i][j-1].str);
						vecinos.push(this.f[i][j].str);
						vecinos.push(this.f[i][j+1].str);
					}
				} else if (i!=0 && i!=this.f.length-1){
					if(j==0){
						vecinos.push(this.f[i-1][j].str);
						vecinos.push(this.f[i-1][j+1].str);
						vecinos.push(this.f[i][j+1].str);
						vecinos.push(this.f[i+1][j].str);
						vecinos.push(this.f[i+1][j+1].str);
					} else if(j==this.f[i].length-1){
						vecinos.push(this.f[i-1][j-1].str);
						vecinos.push(this.f[i-1][j].str);
						vecinos.push(this.f[i][j-1].str);
						vecinos.push(this.f[i+1][j-1].str);
						vecinos.push(this.f[i+1][j].str);
					} else{
						vecinos.push(this.f[i-1][j-1].str);
						vecinos.push(this.f[i-1][j].str);
						vecinos.push(this.f[i-1][j+1].str);
						vecinos.push(this.f[i][j-1].str);
						vecinos.push(this.f[i][j].str);
						vecinos.push(this.f[i][j+1].str);
						vecinos.push(this.f[i+1][j-1].str);
						vecinos.push(this.f[i+1][j].str);
						vecinos.push(this.f[i+1][j+1].str);
					}
				}
				for(var k=0;k<vecinos.length;k++){
					//contador para evaluar la cantidad de células vivas alrededor
					if(vecinos[k] == "*"){
						cont++;
					}
				}
				//cambiamos el estado de las células si lo requiere
				if(cont==2 && actual == "*"){
					matrizAct[i][j] = "*";
				} else if (cont==3){
					matrizAct[i][j] = "*";
				} else {
					matrizAct[i][j] = "&nbsp;";
				}
			}
		}
		return matrizAct;
	}

	llenarMatriz(matrizAct){
		for(var i=0; i<this.f.length;i++){
			for(var j=0; j<this.f[i].length;j++){
				//pasamos los elemenos de la matriz auxiliar al objeto del DOM
				this.f[i][j].setEstado(matrizAct[i][j]);
			}
		}
	}

	setGen(gen){
		this.gen = gen;
		$('#gen p span').html(this.gen);
	}

	getGen(){
		return this.gen;
	}
}

class Celula{
	constructor(str){
		this.str = str;
	}

	setEstado(estado){
		this.str = estado
	}

	getEstado(){
		return this.str;
	}
}

function startInterval(jv, matrizAux){
	//timer de 1 segundo
	var interval = setInterval(function(){
		matrizAux = jv.chequearMatriz();
		jv.llenarMatriz(matrizAux);
		jv.devolverMatriz();
		jv.setGen(jv.getGen() + 1);
	}, 1000);
	return interval;
}

function pausar(estado, juego, interval){
	switch(estado){
		case "Empezar":
			var elems = document.getElementById('finalizar');
			interval = startInterval(juego);
			$('#pausa').attr("value", "Pausar");
			deshabilitar(elems);
			return interval;
			break;
		case "Pausar":
			var elems = document.getElementById('finalizar');
			habilitar(elems);
			clearInterval(interval);
			$('#pausa').attr("value", "Reanudar");
			return interval;
			break;
		case "Reanudar":
			var elems = document.getElementById('finalizar');
			deshabilitar(elems);
			juego.devolverMatriz();
			interval = startInterval(juego);
			$('#pausa').attr("value", "Pausar");
			return interval;
			break;
	}
}

function deshabilitar(elem){
	$(elem).attr("disabled", true);
}

function habilitar(elem){
	$(elem).attr("disabled", false);
}

$(document).ready(function(){
	var matrizAux;
	var filas;
	var columnas;
	var posVivas;
	var interval;
	var juego = new Object();

	$('#comenzar').click(function(e){
		e.preventDefault();
		var newWindow;
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
		var elems = document.querySelectorAll('input[type="text"]');
		for(var i = 0; i < elems.length; i++){
			deshabilitar(elems[i]);
		}
		var elems = document.querySelectorAll('input[type="number"]');
		for(var i = 0; i < elems.length; i++){
			deshabilitar(elems[i]);
		}
		var elems = document.getElementById('pausa');
		habilitar(elems);
		var jv = new JuegoVida(parseInt(filas),parseInt(columnas),0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
	});

	$('#pausa').click(function(e){
		e.preventDefault();
		var state = $(this).attr("value");
		interval = pausar(state, juego, interval);
	});

	$('#finalizar').click(function(e){
		e.preventDefault();
		var elem = document.querySelectorAll('.inputs-variable input');
		habilitar(elem);
		var elem = document.getElementById('pausa');
		deshabilitar(elem);
		clearInterval(interval);
		$('#matriz').children().remove();
		juego.setGen("");
		delete juego;
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
			var state = $('#pausa').attr("value");
			interval = pausar(state, juego, interval);
		}
	}

	$('#generarBloque').click(function(e){
		e.preventDefault();
		filas = 2;
		columnas = 2;
		posVivas = "0,0;0,1;1,0;1,1";
		posVivas = posVivas.split(";");
		var elem = document.querySelectorAll('.inputs-variable input');
		deshabilitar(elem);
		elem = document.getElementById('finalizar');
		deshabilitar(elem);
		elem = document.getElementById('pausa');
		habilitar(elem);
		$('#pausa').attr("value", "Pausar");
		var jv = new JuegoVida(filas,columnas,0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
		interval = startInterval(juego, matrizAux);
	});

	$('#generarBlinker').click(function(e){
		e.preventDefault();
		filas = 1;
		columnas = 3;
		posVivas = "0,0;0,1;0,2";
		posVivas = posVivas.split(";");
		var elem = document.querySelectorAll('.inputs-variable input');
		deshabilitar(elem);
		elem = document.getElementById('finalizar');
		deshabilitar(elem);
		elem = document.getElementById('pausa');
		habilitar(elem);
		$('#pausa').attr("value", "Pausar");
		var jv = new JuegoVida(filas,columnas,0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
		interval = startInterval(juego, matrizAux);
	});

	$('#generarToad').click(function(e){
		e.preventDefault();
		filas = 2;
		columnas = 4;
		posVivas = "0,1;0,2;0,3;1,0;1,1;1,2";
		posVivas = posVivas.split(";");
		var elem = document.querySelectorAll('.inputs-variable input');
		deshabilitar(elem);
		elem = document.getElementById('finalizar');
		deshabilitar(elem);
		elem = document.getElementById('pausa');
		habilitar(elem);
		$('#pausa').attr("value", "Pausar");
		var jv = new JuegoVida(filas,columnas,0);
		jv.armarMatriz(posVivas);
		jv.devolverMatriz();
		juego = jv;
		interval = startInterval(juego, matrizAux);
	});
});




	






