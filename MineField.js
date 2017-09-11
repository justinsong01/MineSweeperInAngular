angular.module('minefield', [])
  .controller('MinefieldController', MinefieldController);

function MinefieldController($scope) {
    var minefield = {};
    minefield.rows = [];
    
    for(var i = 0; i < 9; i++) {
        var row = {};
        row.spots = [];
        
        for(var j = 0; j < 9; j++) {
            var spot = {};
            spot.clicked = true;
            spot.isMined = false;
            row.spots.push(spot);
        }
        
        minefield.rows.push(row);
    }
    $scope.minefield = minefield;
    return minefield;
}

MinefieldController.prototype.randomSpot(minefield, row, col) {
  return minefield.rows[row].spots[col];
}

function mineRandom(minefield) {
  var row = Math.round(Math.random() * 8);
  var col = Math.round(Math.random() * 8);
  var spot = randomSpot(minefield, row, col);
  spot.isMined = true;
}

function placeManyMines(minefield) {
  for (var i=0; i < 10; i++) {
    mineRandom(minefield);
  }
}



