import * as model from "../model/matrixModel.js";
import * as fieldView from "../view/fieldView.js";
import { matrixSize, ARROWS } from "../config/config.js";

// HANDLERS
let pressedButton;
document.addEventListener("keydown", (e) => {
  const { code } = e;
  //checking for use keyboard arrows, but maybe i don't need the, will see
  if (code === pressedButton || !ARROWS.includes(code)) return;
  pressedButton = code;

  if (code === "ArrowRight") {
    model.addNewBox();
    model.getState();
  }
});

document.addEventListener("keyup", (e) => {
  const { code } = e;
  if (!ARROWS.includes(code)) return;
  pressedButton = "";
});

// INITIALIZATION
export const init = function () {
  // creating matrix model and render it on screen
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
};
