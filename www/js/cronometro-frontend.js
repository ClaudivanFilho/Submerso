$(document).ready(function() {
	
	var tempoTotal = parseInt($("#tempo-total").val());
	var tempoRestante = $("#tempo-restante");
	var cronometro = new Cronometro(tempoTotal);
	
	function diminuiTempo() {
		if (cronometro.tempoEsgotado()) return;
		cronometro.diminuiTempo();
		tempoRestante.css("width", cronometro.tempoRestante() * 100 + "%");
		setTimeout(diminuiTempo, 1000);
	}
	
	diminuiTempo();
	
});