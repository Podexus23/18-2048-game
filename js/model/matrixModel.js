//! Arrays for test movements
const arr = [4, 2, 2, 0];
const arr2 = [4, 2, 0, 2];
const arr3 = [8, 4, 2, 2];
const arr4 = [8, 4, 2, 4];
const arr5 = [8, 8, 8, 4];
const arr6 = [2, 2, 2, 2];

const fakeMatrix = [
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
];

const state = {
  matrix: [],
  height: 0,
  width: 0,
  emptySpots: 0,
  isPlaying: false,
};

export const getState = () => {
  return state;
};

export const setGameState = (gameState) => {
  state.isPlaying = gameState;
};

export const createMatrix = (x, y) => {
  let newMatrix = new Array(y).fill(0);

  state.width = x;
  state.height = y;
  state.emptySpots = x * y;
  state.matrix = newMatrix.map(() => {
    let xArr = new Array(x).fill(0);
    return xArr;
  });
};

export const addNewBox = (start = false) => {
  if (!state.emptySpots) {
    console.log("sorry, game over");
    return;
  }
  let x = Math.ceil(Math.random() * state.width) - 1;
  let y = Math.ceil(Math.random() * state.height) - 1;
  if (start) state.matrix[y][x] = 2;
  else if (state.matrix[y][x] !== 0) addNewBox();
  else state.matrix[y][x] = 2;

  state.emptySpots = state.matrix.flat().filter((e) => e === 0).length;
};

function moveToTheRight(arr) {
  let res = new Array(arr.length).fill(0);
  let arrCopy = [...arr];
  //previous change index, to move forward if previous box changed
  let prevInd = 0;
  let isChanged = false;

  // console.log(arr);

  for (let i = arrCopy.length - 1; i >= 0; i--) {
    if (arrCopy[i] == 0) continue;

    let newInd = 0;
    let path = res.slice(i + 1);
    path.forEach((e) => {
      if (e === 0) newInd += 1;
    });
    path = path.filter((e) => e !== 0);

    if (path && path[0] === arrCopy[i] && !isChanged) {
      newInd += 1;
      newInd = newInd >= prevInd ? newInd : prevInd;
      res[newInd + i] = arrCopy[i] + arrCopy[i];
      isChanged = true;
    } else {
      newInd = newInd >= prevInd ? newInd : prevInd;
      // console.log(arrCopy[i], i, "true index");
      res[newInd + i] = arrCopy[i];
      isChanged = false;
    }

    prevInd = newInd;
  }

  return res;
}

//! test cases to right
// console.log(moveToTheRight(arr), "Result: 0,0,4,4");
// console.log(moveToTheRight(arr2), "Result: 0,0,4,4");
// console.log(moveToTheRight(arr3), "Result: 0,8,4,4");
// console.log(moveToTheRight(arr4), "Result: 8,4,2,4");
// console.log(moveToTheRight(arr5), "Result: 0,8,16,4");
// console.log(moveToTheRight(arr6), "Result: 0,0,4,4");

function moveToTheLeft(arr) {
  let res = new Array(arr.length).fill(0);
  let arrCopy = [...arr];
  //previous change index, to move forward if previous box changed
  arrCopy = arrCopy.reverse();
  let prevInd = 0;
  let isChanged = false;

  // console.log(arr);

  for (let i = arrCopy.length - 1; i >= 0; i--) {
    if (arrCopy[i] == 0) continue;

    let newInd = 0;
    let path = res.slice(i + 1);
    path.forEach((e) => {
      if (e === 0) newInd += 1;
    });
    path = path.filter((e) => e !== 0);

    if (path && path[0] === arrCopy[i] && !isChanged) {
      newInd += 1;
      newInd = newInd >= prevInd ? newInd : prevInd;
      res[newInd + i] = arrCopy[i] + arrCopy[i];
      isChanged = true;
    } else {
      newInd = newInd >= prevInd ? newInd : prevInd;
      res[newInd + i] = arrCopy[i];
      isChanged = false;
    }

    prevInd = newInd;
  }

  return res.reverse();
}

//! test cases to left
// console.log(moveToTheLeft(arr), "Result: 4,4,0,0");
// console.log(moveToTheLeft(arr2), "Result: 4,4,0,0");
// console.log(moveToTheLeft(arr3), "Result: 8,4,4,0");
// console.log(moveToTheLeft(arr4), "Result: 8,4,2,4");
// console.log(moveToTheLeft(arr5), "Result: 16,8,4,0");
// console.log(moveToTheLeft(arr6), "Result: 4,4,0,0");

export const movedToRight = () => {
  state.matrix = state.matrix.map(moveToTheRight);
};
export const movedToLeft = () => {
  state.matrix = state.matrix.map(moveToTheLeft);
};

export const movedDown = () => {
  let arr = [];
  let newChanged = [];

  state.matrix.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!arr[i]) arr.push(newBox);
      else arr[i].push(box);
    });
  });

  arr = arr.map(moveToTheRight);
  arr.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!newChanged[i]) newChanged.push(newBox);
      else newChanged[i].push(box);
    });
  });

  state.matrix = newChanged;
};

export const movedUp = () => {
  let arr = [];
  let newChanged = [];

  state.matrix.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!arr[i]) arr.push(newBox);
      else arr[i].push(box);
    });
  });

  arr = arr.map(moveToTheLeft);
  arr.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!newChanged[i]) newChanged.push(newBox);
      else newChanged[i].push(box);
    });
  });
  state.matrix = newChanged;
};
