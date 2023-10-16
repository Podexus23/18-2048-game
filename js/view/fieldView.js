const fieldsWrapper = document.querySelector(".field-wrapper");

export const createField = function (matrix, place = "top") {
  if (place === "down") {
    const fieldDown = document.createElement("div");
    fieldDown.classList.add("field");
    fieldDown.classList.add("field__down");
    let cells = "";
    for (let i = 0; i < matrix.height * matrix.width; i += 1) {
      cells += `<div class="field-cell"></div>`;
    }
    fieldDown.insertAdjacentHTML("beforeend", cells);
    fieldsWrapper.append(fieldDown);
  }
  if (place === "top") {
    const fieldTop = document.createElement("div");
    fieldTop.classList.add("field");
    fieldTop.classList.add("field__top");
    let cells = "";
    for (let i = 0; i < matrix.width; i += 1) {
      for (let j = 0; j < matrix.height; j += 1) {
        cells += `<div class="field-cell" data-coord="${i},${j}"></div>`;
      }
    }
    fieldTop.insertAdjacentHTML("beforeend", cells);
    fieldsWrapper.append(fieldTop);
  }
};

fieldsWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("field-cell"))
    e.target.classList.add("active");
});
