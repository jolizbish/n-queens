/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = (new Board({n: n})).rows();  
  //console.log('Board is: ', board);
  // var iVals = [];
  // for (var i = 0; i < n; i++) {
  //   iVals.push(i);
  // }
  // var jVals = iVals.slice();
  var jVals = _.range(0, n, 1);
  //console.log('jVals is: ', jVals);
  var iVals = _.range(0, n, 1);
  
  var generatePosition = function() {
    var iPos = Math.floor(Math.random() * iVals.length);
    var jPos = Math.floor(Math.random() * jVals.length);
    var i = iVals[iPos];
    // console.log('i is : ', i);
    // console.log('iPos is: ', iPos);
    var j = jVals[jPos];
    board[i][j] = 1;
    jVals.splice(jPos, 1);
    iVals.splice(iPos, 1);
  };
  
  for (var i = 0; i < n; i++) {
    generatePosition();
  }
  var solution = board; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var factorial = function(n) {
  //   if (n === 0) { 
  //     return 1; 
  //   } else { 
  //     return n * factorial(n - 1);
  //   }
  // };

  // var solutionCount = factorial(n); //fixme
  
  var solutionCount = 0;
  
  var board = new Board({n: n});
  
  var findSolution = function(row) {
    //base case
    if (row === n) {
      solutionCount++;
      return;
    }
    //recursive case
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
        
      }
      board.togglePiece(row, i);
    }
    
  };

  findSolution(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create array of possible positions
  var queenCounter = 0;
  var startPositions = [];
  var board;
  var setBoard = function() {
    board = (new Board({n: n})).rows();
    queenCounter = 0;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        startPositions.push([i, j]);
      }
    }
  };
  
  var generateNextPosition = function() {
  //generate a random first position
    var position = Math.floor(Math.random() * startPositions.length);
    var row = startPositions[position][0];
    var column = startPositions[position][1];
    // console.log('column is: ', column);
    // console.log('row is: ', row);
    board[row][column] = 1;
    startPositions = startPositions.filter(function(block) {
      if (block[0] !== row && block[1] !== column && block[0] + block[1] !== row + column && block[0] - block[1] !== row - column) {
        return block;
      }
    });
    queenCounter++;
  //iterate through array of possible position
    // check for same column or row
    // check for i + j
    // check for i - j
  // return newArray of possible positions
    
  };
  if (n === 0) {
    board = [];
  } else if (n === 1) {
    board = [[1]];
  } else if (n === 2) {
    board = [[], []];
  } else if (n === 3) {
    board = [[], [], []];
  }
  while (queenCounter < n && n > 3) {
    if (startPositions.length > 0) {
      generateNextPosition();
    } else {
      setBoard();
      generateNextPosition();
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));

  return board;
  
  
  //var solution = undefined; //fixme

  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var board = new Board({n: n});
  // if (n === 0 || n === 1) {
  //   return 1;
  // }
  // var solutionCount = 0;

  // // console.log('board: ', board);
  // var func = function(n, board, rowIndex = 0) {
  //   if (rowIndex > n) {
  //     return;
  //   }
  //   if (rowIndex === n) {
  //     solutionCount++;
  //     // debugger;
  //   }
  
  //   for (var i = 0; i < n; i++) {
  //     board.togglePiece(rowIndex, i);
  //     if (!(board.hasAnyQueensConflicts())) {
  //       // if (board.get(rowIndex + 1)) {
  //         // console.log('check :', board.get(rowIndex + 1));
  //         func(n, board, rowIndex + 1);
  //       // }
  //     }
  //     board.togglePiece(rowIndex, i);
  //   }
  // };
  
  // func(n, board, 0);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  
  var solutionCount = 0;
  
  var board = new Board({n: n});
  
  var findSolution = function(row) {
    //base case
    if (row === n) {
      solutionCount++;
      return;
    }
    //recursive case
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
        
      }
      board.togglePiece(row, i);
    }
    
  };

  findSolution(0);
  
  return solutionCount;
};
// console.log('Test test', JSON.stringify(findNQueensSolution(10)));























