angular.module('minefield1', [])
  .controller('MinefieldController1', MinefieldController);

function MinefieldController($scope, $window) {
    var minefield = {};
    minefield.rows = [];
    
    userInputProcess(minefield);
    for(var i = 0; i < minefield.height; i++) {
        var row = {};
        row.squares = [];
        
        for(var j = 0; j < minefield.width; j++) {
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

function userInputProcess(minefield) {
  if (minefield.width) {
    minefield.width = minefield.width;
    minefield.height = minefield.height;
  } else {
    minefield.width = 9; 
    minefield.height = 9; 
  }
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


