// const fieldCoords = field.getBoundingClientRect();
// const fieldGap = getComputedStyle(field).gap;
// const blockCoords = activeBlocks.map((e) => e.getBoundingClientRect());

// setTimeout(() => {
//   console.dir(getComputedStyle(field).gap);
// }, 0);

// const leftPaddingSize = Math.abs(fieldCoords.left - blockCoords[0].left);

// const moveHorSize = Math.abs(
//   fieldCoords.width - leftPaddingSize * 2 - blockCoords[0].width
// );
// const moveVertSize = Math.abs(
//   fieldCoords.width - leftPaddingSize * 2 - blockCoords[0].width
// );

// console.log(fieldGap, "gap");
// console.log(moveVertSize, "moveSize");

// const moveHorizontallyBlock = function () {
//   activeBlocks.forEach((el) => {
//     el.style.transform = `translate(${moveHorSize}px, 0px)`;
//   });
// };
// moveHorizontallyBlock();

// const moveVerticallyBlock = function () {
//   activeBlocks.forEach((el) => {
//     el.style.transform = `translate(0px, ${moveVertSize}px)`;
//   });
// };
// moveVerticallyBlock();
