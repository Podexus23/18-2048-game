import * as model from "../model/matrixModel.js";
import * as fieldView from "../view/fieldView.js";
import { matrixSize, ARROWS, animationTime } from "../config/config.js";

const fieldsWrapper = document.querySelector(".field-wrapper");
let pressedButton;
// Listeners

const addGamePlayListeners = function () {
  document.addEventListener("keydown", (e) => {
    const { code } = e;
    //checking for use keyboard arrows, but maybe i don't need the, will see
    if (code === pressedButton || !ARROWS.includes(code)) return;
    pressedButton = code;

    if (code === "ArrowRight") {
      makeAMove("right");
    }
    if (code === "ArrowLeft") {
      makeAMove("left");
    }
    if (code === "ArrowUp") {
      makeAMove("up");
    }
    if (code === "ArrowDown") {
      makeAMove("down");
    }
  });

  document.addEventListener("keyup", (e) => {
    const { code } = e;
    if (!ARROWS.includes(code)) return;
    pressedButton = "";
  });
};

// INITIALIZATION
export const init = function () {
  // creating matrix model and render it on screen
  model.createMatrix(matrixSize.x, matrixSize.y);
  fieldView.createField(model.getState(), "down");
  fieldView.createField(model.getState());
};

const resetGame = function () {
  fieldsWrapper.innerHTML = ``;
  init();
};

//Game Start
export const startGame = () => {
  const matrix = model.getState();
  //generate new box in matrix
  if (model.getState) resetGame();
  model.addNewBox(true);
  //say to state that game started
  model.setGameState(true);
  //render new field with occupied boxes in matrix
  fieldView.updateTopField(matrix);
  addGamePlayListeners();
};

export const makeAMove = (side) => {
  const matrix = model.getState();
  if (side === "right") {
    //generate new state for matrix
    model.movedToRight();
    fieldView.moveToTheRightAnimation(matrix.indexes);
  }
  if (side === "left") {
    model.movedToLeft();
    fieldView.moveToTheLeftAnimation(matrix.indexes);
  }
  if (side === "up") {
    model.movedUp();
    fieldView.moveUpAnimation(matrix.indexes);
  }
  if (side === "down") {
    model.movedDown();
    fieldView.moveDownAnimation(matrix.indexes);
  }
  //check if there no empty boxes, don't spawn nwe ones
  let checkIndexes = matrix.indexes.flat().every((e) => e === 0);
  if (!checkIndexes) model.addNewBox();

  //check if any box can move, if not, don't generate new one
  if (!matrix.emptySpots && model.checkForGameOver()) {
    //! add ending screen
    fieldView.loadGameOverScreen();
  }

  if (model.checkForWinGame()) {
    //! add win screen
    console.log("you won");
  }
  //render new field with occupied boxes in matrix
  setTimeout(() => {
    fieldView.updateTopField(matrix);
  }, animationTime);
};
