function startInterval(jv, matrizAux){
	//timer de 1 segundo
	let interval = setInterval(function(){
		matrizAux = jv.chequearMatriz();
		jv.llenarMatriz(matrizAux);
		jv.devolverMatriz();
		jv.setGen(jv.getGen() + 1);
	}, 1000);
	return interval;
}

function pausar(estado, juego, interval){
	let elems = document.getElementById('finalizar');
	switch(estado){
		case "Empezar":
			interval = startInterval(juego);
			$('#pausa').attr("value", "Pausar");
			deshabilitar(elems);
			return interval;
		case "Pausar":
			habilitar(elems);
			clearInterval(interval);
			$('#pausa').attr("value", "Reanudar");
			return interval;
		case "Reanudar":
			deshabilitar(elems);
			juego.devolverMatriz();
			interval = startInterval(juego);
			$('#pausa').attr("value", "Pausar");
			return interval;
	}
}

function deshabilitar(elem){
	$(elem).attr("disabled", true);
}

function habilitar(elem){
	$(elem).attr("disabled", false);
}

export {startInterval};
export {pausar};
export {deshabilitar};
export {habilitar};