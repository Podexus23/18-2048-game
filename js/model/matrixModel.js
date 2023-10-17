const fakeMatrix = [
  [0, 0, 0, 0],
  [2, 0, 0, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const fakeIndexes = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const state = {
  matrix: fakeMatrix,
  height: 4,
  width: 4,
  emptySpots: 8,
  isPlaying: false,
  indexes: fakeIndexes,
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

  state.indexes = newMatrix.map(() => {
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

function moveToTheRight(arr, arrIndex) {
  let res = new Array(arr.length).fill(0);
  state.indexes[arrIndex] = [...res];
  let arrCopy = [...arr];
  //previous change index, to move forward if previous box changed
  let prevInd = 0;
  let isChanged = false;

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
    state.indexes[arrIndex][i] = prevInd;
  }

  return res;
}

function moveToTheLeft(arr, arrIndex) {
  let res = new Array(arr.length).fill(0);
  let arrCopy = [...arr];
  state.indexes[arrIndex] = [...res];
  //previous change index, to move forward if previous box changed
  arrCopy = arrCopy.reverse();
  let prevInd = 0;
  let isChanged = false;

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
    state.indexes[arrIndex][i] = prevInd;
  }
  state.indexes[arrIndex].reverse();
  return res.reverse();
}

export const movedToRight = () => {
  state.matrix = state.matrix.map((arr, i) => {
    return moveToTheRight(arr, i);
  });
};
export const movedToLeft = () => {
  state.matrix = state.matrix.map((arr, i) => {
    return moveToTheLeft(arr, i);
  });
};

export const movedDown = () => {
  let arr = [];
  let newChanged = [];
  let newIndexes = [];

  state.matrix.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!arr[i]) arr.push(newBox);
      else arr[i].push(box);
    });
  });

  arr = arr.map((arr, i) => {
    return moveToTheRight(arr, i);
  });
  arr.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!newChanged[i]) newChanged.push(newBox);
      else newChanged[i].push(box);
    });
  });
  state.indexes.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!newIndexes[i]) newIndexes.push(newBox);
      else newIndexes[i].push(box);
    });
  });
  state.indexes = newIndexes;
  state.matrix = newChanged;
};

export const movedUp = () => {
  let arr = [];
  let newChanged = [];
  let newIndexes = [];

  state.matrix.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!arr[i]) arr.push(newBox);
      else arr[i].push(box);
    });
  });

  arr = arr.map((arr, i) => {
    return moveToTheLeft(arr, i);
  });
  arr.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!newChanged[i]) newChanged.push(newBox);
      else newChanged[i].push(box);
    });
  });
  state.indexes.forEach((row) => {
    row.forEach((box, i) => {
      let newBox = [box];
      if (!newIndexes[i]) newIndexes.push(newBox);
      else newIndexes[i].push(box);
    });
  });
  state.indexes = newIndexes;

  state.matrix = newChanged;
};
