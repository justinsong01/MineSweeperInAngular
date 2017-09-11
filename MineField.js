angular.module('minefield', [])
  .controller('MinefieldController', MinefieldController);

function MinefieldController($scope) {
    var minefield = {};
    minefield.rows = [];

    for(var i = 0; i < 10; i++) {
        var row = {};
        row.squares = [];
        
        for(var j = 0; j < 10; j++) {
            var square = {};
            square.clicked = true;
            square.isMined = false;
            row.squares.push(square);
        }
        
        minefield.rows.push(row);
    }
   // $scope.minefield = minefield;
    placeManyMines(minefield);
    return minefield;
}

function randomSpot(minefield, row, col) {
  return minefield.rows[row].squares[col];
}

function mineRandom(minefield) {
  var row = Math.round(Math.random() * 8);
  var col = Math.round(Math.random() * 8);
  var square = randomSpot(minefield, row, col);
  square.isMined = true;
}

function placeManyMines(minefield) {
  for (var i=0; i < 10; i++) {
    mineRandom(minefield);
  }
}



