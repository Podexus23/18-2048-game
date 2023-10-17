import * as model from "../model/matrixModel.js";
import * as fieldView from "../view/fieldView.js";
import { matrixSize, ARROWS } from "../config/config.js";

const fieldsWrapper = document.querySelector(".field-wrapper");
let pressedButton;
// Listeners
document.addEventListener("click", (e) => {
  console.log(e.clientX, e.clientY);
});

fieldsWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("field-cell"))
    e.target.classList.add("active");
});

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
  //! test purpose
  // const matrix = model.getState();
  // fieldView.updateTopField(matrix);
};

//Game Start
export const startGame = () => {
  const matrix = model.getState();
  //generate new box in matrix
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
  console.log(matrix);
  //generate new box in matrix
  !model.addNewBox();
  //render new field with occupied boxes in matrix
  setTimeout(() => {
    fieldView.updateTopField(matrix);
  }, 200);
};

// addGamePlayListeners();
