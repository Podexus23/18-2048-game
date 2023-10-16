const fieldsWrapper = document.querySelector(".field-wrapper");
let fieldDown, fieldTop;

export const createField = function (matrix, place = "top") {
  if (place === "down") {
    fieldDown = document.createElement("div");
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
    fieldTop = document.createElement("div");
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

export const updateTopField = function (matrix) {
  fieldTop = fieldsWrapper.querySelector(".field__top");

  const matrixState = matrix.matrix;
  let cells = "";

  for (let i = 0; i < matrix.width; i += 1) {
    for (let j = 0; j < matrix.height; j += 1) {
      const number = matrixState[i][j] === 0 ? "" : matrixState[i][j];
      cells += `<div class="field-cell${
        number ? " active" : ""
      }" data-coord="${i},${j}">${number ? number : ""}</div>`;
    }
  }

  const newDOM = document.createRange().createContextualFragment(cells);
  const newElements = Array.from(newDOM.querySelectorAll("*"));
  const curElements = Array.from(fieldTop.querySelectorAll("*"));

  newElements.forEach((newEl, i) => {
    const curEl = curElements[i];

    //update changes text
    if (
      !newEl.isEqualNode(curEl) &&
      newEl.firstChild?.nodeValue.trim() !== ""
    ) {
      curEl.textContent = newEl.textContent;
    }
    //updates changes attributes
    //update changes text
    if (!newEl.isEqualNode(curEl)) {
      Array.from(newEl.attributes).forEach((attr) =>
        curEl.setAttribute(attr.name, attr.value)
      );
    }
  });

  fieldTop.innerHTML = "";
  fieldTop.insertAdjacentHTML("beforeend", cells);

  fieldsWrapper.append(fieldTop);
};
