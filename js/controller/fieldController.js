import * as model from "../model/matrixModel.js";
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
    model.getMatrix();
  }
});

document.addEventListener("keyup", (e) => {
  const { code } = e;
  if (!ARROWS.includes(code)) return;
  pressedButton = "";
});

// INITIALIZATION
const init = function () {
  model.createMatrix(matrixSize.x, matrixSize.y);
  model.addNewBox(true);
};
init();
