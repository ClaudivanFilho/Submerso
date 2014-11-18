function Cronometro(tempoTotal) {
	this.tempoTotal = tempoTotal;
	this.tempoAtual = this.tempoTotal;
};

Cronometro.prototype.diminuiTempo = function() {
	this.tempoAtual--;
};

Cronometro.prototype.tempoEsgotado = function() {
	return this.tempoAtual == 0;
};

Cronometro.prototype.tempoRestante = function() {
	return this.tempoAtual / this.tempoTotal;
};

Cronometro.prototype.reinicia = function() {
	this.tempoAtual = this.tempoTotal;
}