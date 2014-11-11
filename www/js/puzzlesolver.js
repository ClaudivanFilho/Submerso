OBJETIVO = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

function getNumeroCorrespondente(palavra) {
	switch (palavra) {
		case 'parte1':
			return 1;
		case 'parte2':
			return 2;
		case 'parte3':
			return 3;
		case 'parte4':
			return 4;
		case 'parte5':
			return 5;
		case 'parte6':
			return 6;
		case 'parte7':
			return 7;
		case 'parte8':
			return 8;
		default:
			return 0;
	}
}
  
function converteMatrizParaNumeros(matriz) {
	var matrizConvertida = [];
	for (var i = 0; i < 3; i++) {
		matrizConvertida.push([]);
		for (var j = 0; j < 3; j++) {
			var bloco = matriz[i][j];
			matrizConvertida[i].push(getNumeroCorrespondente(bloco));
		}
	}
	return matrizConvertida;
}
  
function encontraEspacoEmBranco(matriz) {
	for(i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if (matriz[i][j] == 0) {
				return [i, j];
			}
		}
	}
}

function movimentoPossivel(matriz, direcao) {
	var posicaoEspacoEmBranco = encontraEspacoEmBranco(matriz);
	switch (direcao) {
		case 'left':
			if (posicaoEspacoEmBranco[1] < 2) {
				return true;
			}
			break;
		case 'right':
			if (posicaoEspacoEmBranco[1] > 0) {
				return true;
			}
			break;
		case 'up':
			if (posicaoEspacoEmBranco[0] < 2) {
				return true;
			}
			break;
		case 'down': 
			if (posicaoEspacoEmBranco[0] > 0) {
				return true;
			}
			break;
	}
	return false;
}

function move(matriz, direcao) {
	var posicaoEspacoEmBranco = encontraEspacoEmBranco(matriz);
	var linha = posicaoEspacoEmBranco[0];
	var coluna = posicaoEspacoEmBranco[1];
	var temp = matriz[linha][coluna];
	switch (direcao) {
		case 'left':
			matriz[linha][coluna] = matriz[linha][coluna + 1];
			matriz[linha][coluna + 1] = temp;
			break;
		case 'right':
			matriz[linha][coluna] = matriz[linha][coluna - 1];
			matriz[linha][coluna - 1] = temp;
			break;
		case 'up':
			matriz[linha][coluna] = matriz[linha + 1][coluna];
			matriz[linha + 1][coluna] = temp;
			break;
		case 'down':
			matriz[linha][coluna] = matriz[linha - 1][coluna];
			matriz[linha - 1][coluna] = temp;
			break;
	}
}

function encontraPosicaoOriginalNumero(numero) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (numero == OBJETIVO[i][j]) {
				return [i, j];
			}
		}
	}
}

function calculaDistancia(matriz) {
	var distancia = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var numero = matriz[i][j];
			if (numero != 0) {
				var posicaoOriginal = encontraPosicaoOriginalNumero(numero);
				distancia += Math.abs(i - posicaoOriginal[0]) + Math.abs(j - posicaoOriginal[1]);
			}
		}
	}
	return distancia;
}

function getDirecaoOposta(direcao) {
	switch (direcao) {
		case 'left': 
			return 'right';
		case 'right':
			return 'left';
		case 'up':
			return 'down';
		case 'down':  
			return 'up';
	}
}
  
function getDirecoesPossiveis(matriz, direcaoAnterior) {
	var direcoes = ['left', 'right', 'up', 'down'];
	var possiveis = [];
	for (var i = 0; i < direcoes.length; i++) {
		var direcao = direcoes[i];
		if (direcao == getDirecaoOposta(direcaoAnterior)) {
			continue;
		} else if (movimentoPossivel(matriz, direcao)) {
			possiveis.push(direcao);
		}
	}
	return possiveis;
}

function matrizesIguais(matriz1, matriz2) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (matriz1[i][j] != matriz2[i][j]) {
				return false;
			}
		}
	}
	return true;
}

function ehRepetido(repetidos, novaMatriz) {
	for (var i = 0; i < repetidos.length; i++) {
		var repetido = repetidos[i];
		if (matrizesIguais(repetido, novaMatriz)) {
			return true;
		}
	}
	return false;
}

function copiaArray(array) {
	return JSON.parse(JSON.stringify(array));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function resolver(matrizPassada) {
	var matrizInicial = copiaArray(converteMatrizParaNumeros(matrizPassada));
	var candidatos =  new MinHeap(null, function(a, b) {
	  var resultado = a.distancia - b.distancia;
	  if (resultado > 0) {
		return 1;
	  } else if (resultado < 0) {
		return -1;
	  }
	  return 0;
	});
	var distanciaInicial = calculaDistancia(matrizInicial);
	candidatos.push({matriz: matrizInicial, caminho: [], distancia: distanciaInicial, direcaoAnterior: null});
	var repetidos = [];
	repetidos.push(matrizInicial);
	
	while (candidatos.size() > 0) {
		var candidato = candidatos.pop();
		var matriz = copiaArray(candidato.matriz);
		var caminho = copiaArray(candidato.caminho);
		var distancia = calculaDistancia(matriz);
		if (distancia == 0) {
			return caminho;
		} 
		var direcoesPossiveis = getDirecoesPossiveis(matriz, candidato.direcaoAnterior);
		direcoesPossiveis = shuffle(direcoesPossiveis);
		for (var i = 0; i < direcoesPossiveis.length; i++) {
			var direcao = direcoesPossiveis[i];
			var novaMatriz = copiaArray(matriz);
			var novoCaminho = copiaArray(caminho);
			novoCaminho.push(direcao);
			move(novaMatriz, direcao);
			var novaDistancia = calculaDistancia(novaMatriz);
			if (novaDistancia == 0) {
				return novoCaminho;
			} else if (!ehRepetido(repetidos, novaMatriz)) {
				novaDistancia += novoCaminho.length;
				candidatos.push({matriz: novaMatriz, caminho: novoCaminho, distancia: novaDistancia, direcaoAnterior: direcao});
				repetidos.push(novaMatriz);
			}
		}
	}
	
}