function getTamanhoBloco(porcentagemDaTela, dimensaoTabuleiro) {
	var largura = screen.width; 
	var altura = screen.height;
	var menorResolucao = (largura > altura) ? altura : largura;
	return menorResolucao * porcentagemDaTela / dimensaoTabuleiro;
};

function desenharBlocos(desenho, tamanho, dimensao, margem) {
	var blocos = [];
	for (var i = 0; i < dimensao; i++) {
		for (var j = 0; j < dimensao; j++) {
			//diferente do ultimo elemento
			var ultimoElemento = i == dimensao - 1 && j == dimensao - 1; 
			if (!ultimoElemento) {
				var num = i * dimensao + j + 1;
				var htmlImg = "<img src='img/" + desenho + "/parte" + num + ".gif' />";
				var htmlNumero = "<p style='position: absolute; right: 0; left: 0; margin: auto; color: rgba(255, 255, 255, 0);'>" + num + "</p>";
				var htmlDiv = "<div id='c" + num + "'>" + htmlNumero + htmlImg + "</div>";
				$("#container").append(htmlDiv);
				var elemento = $("#c" + num);
				elemento.css("left", j * (tamanho + margem) + "px");
				elemento.css("top", i * (tamanho + margem) + "px");
				elemento.css("width", tamanho + "px");
				elemento.css("height", tamanho + "px");
				elemento.css("font-size", tamanho * 0.5);
				blocos.push({elemento: elemento, tamanho: tamanho, margem: margem});
			} 
		}
		$("#container").append("<br/>");
	}
	$("#container").css("width", (tamanho + margem) * dimensao + "px");
	$("#container").css("height", (tamanho + margem) * dimensao + "px");
	return blocos;
};

function mudarDesenhoBlocos(novoDesenho, blocos) {
	for (var i = 0; i < blocos.length; i++) {
		var bloco = blocos[i];
		var num = bloco.num;
		var elemento = bloco.bloco;
		elemento.find("img").attr("src", "img/" + novoDesenho + "/parte" + num + ".gif");
	}
};