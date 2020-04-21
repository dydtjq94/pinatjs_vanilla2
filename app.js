//canvas는 div! canvas위에 뭔가 있으면 그것을 감지하는 기능
const canvas = document.querySelector(`#jsCanvas`);
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const reset = document.getElementById("jsReset");
const rangeNumber = document.getElementsByClassName("range__number");
const resize = document.querySelector(`.resize`);
const resizeWidth = document.getElementById(`width__control`);
const resizeHeight = document.getElementById("height__control");

const INI__COLOR = "#2c2c2c";

canvas.width = 1000;
canvas.height = 400;
console.log(canvas.offsetWidth);

ctx.strokeStyle = INI__COLOR;
ctx.fillStyle = INI__COLOR;
ctx.lineWidth = 2.5;
rangeNumber.num.innerHTML = 2.5;

let painting = false;
let filling = false;

function startPaintng() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  //   console.log(event);
  // clientX --> 화면 전체, offsetX --> 내가 설정한 canvas
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  startPaintng();
}

function onMouseUp(event) {
  stopPainting();
}

function onMouseLeave(event) {
  stopPainting();
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRightClick(event) {
  //우클릭 방지
  event.preventDefault();
}

function canvasEvent() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

function changeColor(event) {
  console.log(event.target.style.backgroundColor);
  const colors = event.target.style.backgroundColor;
  ctx.strokeStyle = colors;
  ctx.fillStyle = colors;
  Array.from(color).forEach((name) => name.classList.remove("clicked"));
  event.toElement.classList.add("clicked");
  console.dir(event.toElement);
}

function handleRangeChange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
  rangeNumber.num.innerHTML = range;
}

function handelModeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerHTML = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "paint";
  }
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "yourfirstpaint";
  link.click();
}

function handleResetClick(event) {
  init();
}

function handleResize(event) {
  console.log(resizeHeight);
  canvas.width = resizeWidth.value;
  canvas.height = resizeHeight.value;
  //   console.log(canvas.scrollWidth);
  //   console.dir(canvas);
}

function init() {
  canvasEvent();
  //Array.from() --> object로부터 array 생성
  //forEach --> array안에 있는 모든 것에 적용 // name은 그냥 element라 이해하면 됨
  Array.from(color).forEach((name) =>
    name.addEventListener("click", changeColor)
  );
  range.addEventListener("input", handleRangeChange);

  mode.addEventListener("click", handelModeChange);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  save.addEventListener("click", handleSaveClick);
  reset.addEventListener("click", handleResetClick);
  resize.addEventListener("click", handleResize);
}

init();
