function Jogo(puzzle, blocos, velocidade, numEmbaralhos) {
	this.puzzle = puzzle;
	this.blocos = blocos;
	this.velocidade = velocidade;
	this.numEmbaralhos = numEmbaralhos;
};

Jogo.prototype.move = function(num) {
	var distancia = this.blocos[num-1].tamanho + this.blocos[num-1].margem;
	var bloco = this.blocos[num-1].elemento;
	var direcao = this.puzzle.move(num);
	switch (direcao) {
		case Direcao.ESQUERDA:
			bloco.animate({
				left:"-=" + distancia + "px"
			}, this.velocidade);
			break;
		case Direcao.DIREITA:
			bloco.animate({
				left:"+=" + distancia + "px"
			},  this.velocidade);
			break;
		case Direcao.CIMA:
			bloco.animate({
				top:"-=" + distancia + "px"
			}, this.velocidade);
			break;
		case Direcao.BAIXO:
			bloco.animate({
				top:"+=" + distancia + "px"
			}, this.velocidade);
			break;
	}
};

Jogo.prototype.moveAleatoriamente = function() {
	var movimentosPossiveis = this.puzzle.getMovimentosPossiveis();
	var rand;
	do {
		rand = Math.floor(Math.random() * movimentosPossiveis.length);
	} while (this.puzzle.movimentoAnterior == movimentosPossiveis[rand]);
	var bloco = movimentosPossiveis[rand];
	this.move(bloco);
	return bloco;
};

Jogo.prototype.embaralha = function(callbackFunction) {
	var that = this;
	function embaralhaComAnimacao(callbackFunction, cont) {
		if (cont <= 0) {
			if (callbackFunction) callbackFunction();
		} else {
			that.moveAleatoriamente();
			setTimeout(function() {
				embaralhaComAnimacao(callbackFunction, cont - 1);
			}, that.velocidade);
		}
	};
	embaralhaComAnimacao(callbackFunction, this.numEmbaralhos);
};

Jogo.prototype.resolve = function(callbackFunction) {
	var that = this;
	function resolveComAnimacao(caminho, callbackFunction) {
		if (caminho.length == 0) {
			if (callbackFunction) callbackFunction();
		} else {
			var bloco = caminho.shift();
			that.move(bloco);
			setTimeout(function() {
				resolveComAnimacao(caminho, callbackFunction);
			}, that.velocidade);
		}
	};
	var caminho = this.puzzle.resolve();
	resolveComAnimacao(caminho, callbackFunction);
};
