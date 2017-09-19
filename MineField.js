angular.module('minefield1', [])
  .controller('MinefieldController1', ['$scope', '$window', '$rootScope', '$http', function($scope, $window, $http) {
    
    $scope.minefield = new Array();
    $scope.minefield.rows = {};


    $scope.state = new Array();
    $scope.$watch('height', function(){
      return $scope.height;  
     // $scope.recordedHeight = $scope.height;
    });
    $scope.$watch('width', function(){
      //console.log($scope.width);  
    });
   // var input = angular.element('<div><input type="text" ng-model="telephone[' + $scope.inputCounter + ']"></div>');
// Compile the HTML and assign to scope
  //  var compile = $compile(input)($scope);
    

    $scope.widthRange = function () {
        var widthArray = [];
        if (!$scope.width) {
          $scope.width = 8;
        }
      //  $scope.size = $scope.height;

        for (var i = 0; i < $scope.width; i++) {
          widthArray.push(i);
        }
        return widthArray;
    };

    $scope.show = function (st) {
        if (st.isMined && st.isClicked)
            return 'gd gd-hidden';
        else if (!st.isMined && !st.isClicked)
            return 'gd gd-show';
        else if (st.isMined && !st.isClicked)
            return 'gd gd-show-mine icon-certificate';
        else if (!st.isMined && st.isClicked)
            return 'gd gd-show-missed';
    };

    $scope.heightRange = function () {
        var heightArray = [];
        if (!$scope.height) {
          $scope.height = 8;
        }
        console.log("height changed");
        //$scope.size = $scope.height;

        for (var i = 0; i < $scope.height; i++) {
          heightArray.push(i);
        }
        return heightArray;
    };

    $scope.update = function(user) {
      // Example with 2 arguments
      angular.copy(user, $scope.savedState);
    };

    $scope.initstate = function () {
        $scope.$watch('width', function(){
        $scope.recordedWidth = $scope.width;  
         });


        var default_value = 9;
        
        if (!$scope.height || !scope.width) {
          $scope.height = default_value;
          $scope.width = default_value;
        }
        console.log($scope.height);
        console.log($scope.width);
        for (var i = 0; i < $scope.width; i++) {
            $scope.state[i] = new Array($scope.height);
            for (var j = 0; j < $scope.height; j++) {
                $scope.state[i][j] = new Array();
                $scope.state[i][j].isMined = false;
                 $scope.state[i][j].isClicked = false;
                };
            }
       // $scope.randme();
    };


/**
    $scope.createTable = function() {
        for(var i = 0; i < $scope.height; i++) {
          console.log($scope.height);
          $scope.row1 = {};
          $scope.row1.squares = [];
        
          for(var j = 0; j < $scope.width; j++) {
            console.log($scope.width);
            $scope.square = {};
            $scope.square.clicked = true;
            $scope.square.isMined = false;
            $scope.row1.squares.push($scope.square);
          }
        
        $scope.minefield.rows.push($scope.row1);
        }
    }
**/
    $scope.reveal = function (row, col) {
        if ($scope.state[row][col].isMined) {
            $scope.pwnd();
        } else if (!$scope.state[row][col].isMined) {
              console.log("YeahY")
                        $scope.tryreveal(row, col);
        }
    };

        $scope.pwnd = function () {
        for(var i = 0; i< $scope.width; i++) {
            for(var j = 0; j < $scope.height; j++) {
                if($scope.state[i][j].isMined) {
                    $scope.state[i][j].isMined = false;
                } else if($scope.state[i][j].isClicked) {
                    $scope.state[i][j].isClicked = false;
                }
            }
        }
        
        $scope.alive = "You're PWND!"
    };

    $scope.tryreveal = function (row, col) {
        if (row < 0 || row >= $scope.side || col < 0 || col >= $scope.side) return;

        if ($scope.state[row][col].value == 0) {
            $scope.state[row][col].value = 2;

            if ($scope.isz(row - 1, col - 1) && 
                $scope.isz(row - 1, col) && 
                $scope.isz(row - 1, col + 1) && 
                $scope.isz(row, col - 1) && 
                $scope.isz(row, col + 1) && 
                $scope.isz(row + 1, col - 1) && 
                $scope.isz(row + 1, col) && 
                $scope.isz(row + 1, col + 1)) {
                    $scope.tryreveal(row - 1, col - 1);
                    $scope.tryreveal(row - 1, col);
                    $scope.tryreveal(row - 1, col + 1);
                    $scope.tryreveal(row, col - 1);
                    $scope.tryreveal(row, col + 1);
                    $scope.tryreveal(row + 1, col - 1);
                    $scope.tryreveal(row + 1, col);
                    $scope.tryreveal(row + 1, col + 1);
            }
        }
    };
  $scope.isz = function (row, col) {
        if (row < 0 || row >= $scope.height || col < 0 || col >= $scope.width) {
            return true;
        }

        return $scope.state[row][col].isMined || 
               $scope.state[row][col].isMined ||
               $scope.state[row][col].isClicked;
    };

    $scope.check = function (st, row, col) {
        if ($scope.state[row][col].value == 0 || $scope.state[row][col].value == 1 || $scope.state[row][col].value == 3)
            return "";
        
        var ret = 
            !$scope.isz(row - 1, col - 1) + 
            !$scope.isz(row - 1, col) + 
            !$scope.isz(row - 1, col + 1) + 
            !$scope.isz(row, col - 1) + 
            !$scope.isz(row, col + 1) + 
            !$scope.isz(row + 1, col - 1) + 
            !$scope.isz(row + 1, col) + 
            !$scope.isz(row + 1, col + 1);
        
        if(ret == 0) {
            return "";
        }
        
        return ret;
    };
   // $scope.minefield = minefield;
    //placeManyMines(minefield);
    //return minefield;
    
}]);

/**
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


**/
