const canvas = document.getElementById("blackboard");

const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const save = document.getElementById("save");


canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let isDrawing = false;
let currentColor = "#000000";
let currentSize = 5;

canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});


canvas.addEventListener("pointermove", (e) => {

    if (!isDrawing) return;

    ctx.lineWidth = currentSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

canvas.addEventListener("pointerup", () => {
    isDrawing = false;
    ctx.closePath();
});
canvas.addEventListener("pointerleave", () => {
    isDrawing = false;
});

colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
});

brushSize.addEventListener("input", () => {
    currentSize = brushSize.value;
});

eraser.addEventListener("click", () => {
    currentColor = "#ffffff";
});

clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", () => {
    const link = document.createElement("a");

    link.download = "my-drawing.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
});