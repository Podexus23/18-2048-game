import * as model from "../model/matrixModel.js";
import * as fieldView from "../view/fieldView.js";
import { matrixSize, ARROWS } from "../config/config.js";

const fieldsWrapper = document.querySelector(".field-wrapper");
let pressedButton;
// Listeners
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
    console.log(model.getState().matrix);
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
  //!
  model.createMatrix(matrixSize.x, matrixSize.y);
  fieldView.createField(model.getState(), "down");
  fieldView.createField(model.getState());
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
  if (side === "right") model.movedToRight();
  if (side === "left") model.movedToLeft();
  if (side === "up") model.movedUp();
  if (side === "down") model.movedDown();
  //generate new box in matrix
  model.addNewBox();
  //render new field with occupied boxes in matrix
  fieldView.updateTopField(matrix);
};
