import { Celula } from './celulaClass';

class JuegoVida{
	constructor(f,c, gen){
		this.gen = gen;
		this.f = new Array(f);
		for(let i=0; i<f; i++){
			this.f[i] = new Array(c);
		}
		for(let i=0; i<this.f.length;i++){
			for(let j=0; j<this.f[i].length;j++){
				//Inicializamos la matriz con espacios blancos
				this.f[i][j] = new Celula("&nbsp;");
			}
		}
	}

	armarMatriz(array){
		for(let k=0; k<array.length; k++){
			//Reemplazamos los espacios blancos por células vivas en donde lo requiera el usuario
			let pX = parseInt(array[k].substr(0,1));
			let pY = parseInt(array[k].substr(-1,1));
			this.f[pX][pY].setEstado("*");
		}
	}

	devolverMatriz(){
		$('#matriz').children().remove();
		for(let i=0; i<this.f.length;i++){
			$('#matriz').append("<div id='fila-"+i+"'>");
			$('#matriz #fila-'+i).append("<span>|</span>");
			for(let j=0; j<this.f[i].length;j++){
				$('#matriz #fila-'+i).append("<span class='elemento'>" + this.f[i][j].getEstado() + "</span>");
				$('#matriz #fila-'+i).append("<span>|</span>");
			}
			$('#matriz').append("</div>");
		}
	}

	chequearMatriz(){
		let matrizAct = []; //matriz auxiliar
		for(let i=0; i<this.f.length;i++){
			//llenamos la matriz auxiliar
			matrizAct[i] = [];
			for(let j=0; j<this.f[i].length;j++){
				matrizAct[i][j] = this.f[i][j].str;
			}
		}
		for(let i=0; i<this.f.length;i++){
			for(let j=0; j<this.f[i].length;j++){
				let cont = 0;
				let vecinos = [];
				let actual = this.f[i][j].str;
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
						vecinos.push(this.f[i][j+1].str);
						vecinos.push(this.f[i+1][j-1].str);
						vecinos.push(this.f[i+1][j].str);
						vecinos.push(this.f[i+1][j+1].str);
					}
				}
				for(let k=0;k<vecinos.length;k++){
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
		for(let i=0; i<this.f.length;i++){
			for(let j=0; j<this.f[i].length;j++){
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

export { JuegoVida };