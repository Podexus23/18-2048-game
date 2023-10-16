import { ARROWS } from "./config/config.js";
import "./view/view.js";
import "./controller/fieldController.js";
import "./model/matrixModel.js";

console.log("hello gamer 🙋‍♂️");
const block = document.querySelector('.field-cell[data-coord="0,0"]');

const moveBlock = function () {
  block.style.transform = "translate(531px, 0px)";
};

const changeColor = function () {
  block.style.backgroundColor = "#ababab";
};
