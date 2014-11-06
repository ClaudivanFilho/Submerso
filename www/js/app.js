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
});
