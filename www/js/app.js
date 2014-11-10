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

  $scope.move = function(direcao, linha, coluna){
        if ($scope.verificaMovimento(direcao, linha, coluna)) {
            $scope.efetivaMovimento(direcao, linha, coluna);
        }
  }

  $scope.verificaMovimento = function(direcao, linha, coluna) {
    if (linha == -1 || coluna == -1) {
        return false;
    }
    switch(direcao) {
        case 'left':
            if (coluna - 1 < 0)
                return false;
            if ($scope.matrizJogo[linha][coluna-1] == 'nada')
                return true;
            return false;
        case 'right':
            if (coluna + 1 > 2)
                return false;
            if ($scope.matrizJogo[linha][coluna+1] == 'nada')
                return true;
            return false;
        case 'up':
            if (linha - 1 < 0)
                return false;
            if ($scope.matrizJogo[linha-1][coluna] == 'nada')
                return true;
            return false;
        default: //down
            if (linha + 1 > 2)
                return false;
            if ($scope.matrizJogo[linha+1][coluna] == 'nada')
                return true;
            return false;
    }
  }
  
  // efetiva a movimentação, ou seja, muda os determinados valores na matriz
  $scope.efetivaMovimento = function(direcao, linha, coluna) {
     switch(direcao) {
        case 'left':
             var valorAtual = $scope.matrizJogo[linha][coluna]
             $scope.matrizJogo[linha][coluna-1] = valorAtual;
             $scope.matrizJogo[linha][coluna] = "nada";
             break;
        case 'right':
             var valorAtual = $scope.matrizJogo[linha][coluna]
             $scope.matrizJogo[linha][coluna+1] = valorAtual;
             $scope.matrizJogo[linha][coluna] = "nada";
             break;
        case 'up':
             var valorAtual = $scope.matrizJogo[linha][coluna]
             $scope.matrizJogo[linha-1][coluna] = valorAtual;
             $scope.matrizJogo[linha][coluna] = "nada";
             break;
        default: //down
             var valorAtual = $scope.matrizJogo[linha][coluna]
             $scope.matrizJogo[linha+1][coluna] = valorAtual;
             $scope.matrizJogo[linha][coluna] = "nada";
             break;
    }
  }
  
  // retorna a linha e a coluna onde está o espaço em branco 
  $scope.encontraEspacoEmbranco = function() {
	for(i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if ($scope.matrizJogo[i][j] == "nada") {
				return [i, j];
			}
		}
	}
  }
  
  // a partir de uma direção retorna a linha e coluna de um quadrado adjacente ao espaço em branco 
  // capaz de se mover naquela direção ou null caso não seja exista um 
  $scope.escolheQuadrado = function(direcao) {
	var posicaoEspacoEmBranco = $scope.encontraEspacoEmbranco();
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
	return [-1, -1];
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
	var movimentoEhPossivel, movimentoEhValido, direcao, quadradoASeMover;
	do {
		var movimentosPossiveis = ['left', 'right', 'up', 'down'];
		var rand = parseInt(Math.floor(Math.random() * 4)) 
		direcao = movimentosPossiveis[rand];
		quadradoASeMover = $scope.escolheQuadrado(direcao);
		movimentoEhValido = direcao != $scope.getDirecaoOposta(direcaoAnterior);
		movimentoEhPossivel = $scope.verificaMovimento(direcao, quadradoASeMover[0], quadradoASeMover[1]);
	} while (!(movimentoEhValido && movimentoEhPossivel));
	$scope.efetivaMovimento(direcao, quadradoASeMover[0], quadradoASeMover[1]);
	setTimeout(function() {
		$scope.$apply(function() {
			$scope.embaralhar(numeroVezes, cont + 1, direcao);
		});
	}, 500);
  }
  
});
