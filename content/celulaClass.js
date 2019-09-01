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

export { Celula };