import * as controller from "./controller/gameController.js";

const startButton = document.querySelector(".game-start-button");
startButton.addEventListener("click", controller.startGame);

controller.init();
