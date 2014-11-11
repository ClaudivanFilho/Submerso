// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MainController', function($scope, $document){

  $scope.matrizJogo = [
        ['parte1', 'parte2', 'parte3'],
        ['parte4', 'parte5', 'parte6'],
        ['parte7', 'parte8', 'nada' ]];

  // retorna a linha e a coluna onde está o espaço em branco 
  $scope.encontraEspacoEmbranco = function(matriz) {
	for(i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if (matriz[i][j] == "nada") {
				return [i, j];
			}
		}
	}
  }
  
  // a partir de uma direção retorna a linha e coluna de um quadrado adjacente ao espaço em branco 
  // capaz de se mover naquela direção ou null caso não seja exista um 
  $scope.escolheQuadrado = function(direcao, matriz) {
	var posicaoEspacoEmBranco = $scope.encontraEspacoEmbranco(matriz);
	switch (direcao) {
		case 'left':
			if (posicaoEspacoEmBranco[1] < 2) {
				return [posicaoEspacoEmBranco[0], posicaoEspacoEmBranco[1] + 1];
			}
			break;
		case 'right':
			if (posicaoEspacoEmBranco[1] > 0) {
				return [posicaoEspacoEmBranco[0], posicaoEspacoEmBranco[1] - 1];
			}
			break;
		case 'up':
			if (posicaoEspacoEmBranco[0] < 2) {
				return [posicaoEspacoEmBranco[0] + 1, posicaoEspacoEmBranco[1]];
			}
			break;
		case 'down': 
			if (posicaoEspacoEmBranco[0] > 0) {
				return [posicaoEspacoEmBranco[0] - 1, posicaoEspacoEmBranco[1]];
			}
			break;
	}
  }
  
  $scope.move = function(direcao, linha, coluna, matriz) {
	  matriz = matriz || $scope.matrizJogo;
	  if ($scope.verificaMovimento(direcao, matriz, linha, coluna)) {
		$scope.efetivaMovimento(direcao, matriz, linha, coluna);
		return true;
	  }
	  return false;
  }

  $scope.moveAuto = function(direcao, matriz) {
	matriz = matriz || $scope.matrizJogo;
      var quadrado = $scope.escolheQuadrado(direcao, matriz);
      if (quadrado == null) {
		return false;
	}
	var linha = quadrado[0];
	var coluna = quadrado[1];
	return $scope.move(direcao, linha, coluna, matriz);
  }
  
  $scope.verificaMovimento = function(direcao, matriz, linha, coluna) {
    var matriz = matriz || $scope.matrizJogo;
    if (linha == null || coluna == null) {
	      var quadrado = $scope.escolheQuadrado(direcao, matriz);
		if (quadrado == null) {
			return false;
		}
		linha = quadrado[0];
		coluna = quadrado[1];
    }
    switch(direcao) {
        case 'left':
            if (coluna - 1 < 0)
                return false;
            if (matriz[linha][coluna-1] == 'nada')
                return true;
            return false;
        case 'right':
            if (coluna + 1 > 2)
                return false;
            if (matriz[linha][coluna+1] == 'nada')
                return true;
            return false;
        case 'up':
            if (linha - 1 < 0)
                return false;
            if (matriz[linha-1][coluna] == 'nada')
                return true;
            return false;
        default: //down
            if (linha + 1 > 2)
                return false;
            if (matriz[linha+1][coluna] == 'nada')
                return true;
            return false;
    }
  }
  
  // efetiva a movimentação, ou seja, muda os determinados valores na matriz
  $scope.efetivaMovimento = function(direcao, matriz, linha, coluna) {
     switch(direcao) {
        case 'left':
             var valorAtual = matriz[linha][coluna]
             matriz[linha][coluna-1] = valorAtual;
             matriz[linha][coluna] = "nada";
             break;
        case 'right':
             var valorAtual = matriz[linha][coluna]
             matriz[linha][coluna+1] = valorAtual;
             matriz[linha][coluna] = "nada";
             break;
        case 'up':
             var valorAtual = matriz[linha][coluna]
             matriz[linha-1][coluna] = valorAtual;
             matriz[linha][coluna] = "nada";
             break;
        default: //down
             var valorAtual = matriz[linha][coluna]
             matriz[linha+1][coluna] = valorAtual;
             matriz[linha][coluna] = "nada";
             break;
    }
  }
  
  // obtem a direção oposta de uma direção
  $scope.getDirecaoOposta = function(direcao) {
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
  
  // embaralha o tabuleiro em um determinado numero de vezes (outros parametros sao opcionais usados pela recursão)
  $scope.embaralhar = function(numeroVezes, cont, direcaoAnterior) {
	cont = cont || 0;
	if (cont >= numeroVezes) return;
	var movimentosPossiveis = ['left', 'right', 'up', 'down'];
	var direcao;
	do {
		var rand = parseInt(Math.floor(Math.random() * 4)); 
		direcao = movimentosPossiveis[rand];
	} while(!(direcao != $scope.getDirecaoOposta(direcaoAnterior) && $scope.moveAuto(direcao)));
	setTimeout(function() {
		$scope.$apply(function() {
			$scope.embaralhar(numeroVezes, cont + 1, direcao);
		});
	}, 200);
  }
  
  // resolve o quebra-cabeça.
  // essa é uma função recursiva. foi feita dessa forma para que exista uma pausa entre 
  // cada movimentação da solução.
  $scope.resolver = function(caminho) {
	caminho = caminho || resolver($scope.matrizJogo);
	// solucao não encontrada ou já foi solucionada
	if (caminho == null || caminho.length == 0) return;
	$scope.moveAuto(caminho.shift());
	setTimeout(function() {
		$scope.$apply(function() {
			$scope.resolver(caminho);
		});
	}, 200);
  }
  
});
