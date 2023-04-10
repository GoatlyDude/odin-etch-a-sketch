const grid = document.getElementById("grid-container");
let currentPen = "black";
let rowsCols = 16;

const modal = document.querySelector("#resize-window");
const openModal = document.querySelector("#button-5");
const closeModal = document.querySelector("#close-button");

openModal.addEventListener("click", () => 
{
  modal.showModal();
});

closeModal.addEventListener("click", () =>
{
  modal.close();
});

var mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true;
};
document.body.onmouseup = function() {
  mouseDown = false;
};

//checks when mouse is over grid
document.addEventListener("mousedown", function (e)
{
  if (e.target.className === "grid-item")
        {
        drawToGrid(e)
        };
  document.addEventListener("mouseover", function held (e)
  {
    {
      
        if (e.target.className === "grid-item" || e.target.className === "grid-item grid-item-clicked")
        {
          if (mouseDown === true)
          {
            drawToGrid(e)
          }
          else
          {
            this.removeEventListener("mouseover", held);
          }
        };
    };
  });
});



function createGrid (rowsCols) 
{
  grid.style.setProperty('--grid-rows', rowsCols);
  grid.style.setProperty('--grid-cols', rowsCols);
  for (i = 0; i < (rowsCols * rowsCols); i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
  };
};

//uses selected pen
function drawToGrid (clickedDiv) {
  
  switch (currentPen)
  {
    case "black":
      clickedDiv.target.style = "background-color:var(--black)";
      break;
    case "rainbow":
      clickedDiv.target.style.backgroundColor = randomBGColor();
      break;
    case "eraser":
      {
        clickedDiv.target.style = "background-color:var(--white)";
      }
      break
  };
};

//changes active button
function activeButton (clickedID) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.classList.remove("button-active");
    btn.classList.add("button-inactive");
  });
  const button = document.getElementById(clickedID);
  button.classList.remove("button-inactive");
  button.classList.add("button-active");

  //sets the current pen 
  switch(clickedID)
  {
    case "button-1":
      currentPen = "black"
      console.log(currentPen)
      break;
    case "button-2":
      currentPen = "rainbow"
      console.log(currentPen)
      break;
    case "button-3":
      currentPen = "eraser"
      console.log(currentPen)
      break;
  };
};

function randomBGColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
};

createGrid (rowsCols);

function clearGrid ()
{
  grid.innerHTML = "";
  createGrid (rowsCols);
};

function resizeGrid ()
{
  rowsCols = document.getElementById("grid-dimensions").value;
  if(rowsCols === "")
  {
    rowsCols = 1;
  };
  createGrid (rowsCols);
  modal.close();
};
