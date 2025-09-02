//DOM Elements
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const valueEl = document.querySelector(".value");

const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentEl = document.querySelector(".percent");

const divisionEl = document.querySelector(".division");
const multiplicationEl = document.querySelector(".multiplication");
const subtractionEl = document.querySelector(".subtraction");
const additionEl = document.querySelector(".addition");
const equalEl = document.querySelector(".equal");

const decimalEl = document.querySelector(".decimal");
const number0El = document.querySelector(".number-0");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");
const numberElarray = [
  number0El,
  number1El,
  number2El,
  number3El,
  number4El,
  number5El,
  number6El,
  number7El,
  number8El,
  number9El,
];

// 🔹 Expression to build as user types
let expression = "";

// ---- Functions ----
const handleNumberClick = (numStr) => {
  expression += numStr;
  valueEl.textContent = expression;
  adjustFontSize();
};

const handleOperatorClick = (operation) => {
  let opSymbol = "";
  if (operation === "addition") opSymbol = "+";
  if (operation === "subtraction") opSymbol = "-";
  if (operation === "multiplication") opSymbol = "*";
  if (operation === "division") opSymbol = "/";

  expression += opSymbol;
  valueEl.textContent = expression;
};

// ---- Button Listeners ----
acEl.addEventListener("click", () => {
  expression = "";
  valueEl.textContent = "0";
});

pmEl.addEventListener("click", () => {
  if (expression) {
    if (expression.startsWith("-")) {
      expression = expression.substring(1);
    } else {
      expression = "-" + expression;
    }
    valueEl.textContent = expression;
  }
});

percentEl.addEventListener("click", () => {
  try {
    expression = (eval(expression) / 100).toString();
    valueEl.textContent = expression;
  } catch {
    valueEl.textContent = "Error";
    expression = "";
  }
});

additionEl.addEventListener("click", () => handleOperatorClick("addition"));
subtractionEl.addEventListener("click", () =>
  handleOperatorClick("subtraction")
);
multiplicationEl.addEventListener("click", () =>
  handleOperatorClick("multiplication")
);
divisionEl.addEventListener("click", () => handleOperatorClick("division"));

equalEl.addEventListener("click", () => {
  try {
    const result = eval(expression);
    valueEl.textContent = result;
    expression = result.toString();
  } catch {
    valueEl.textContent = "Error";
    expression = "";
    adjustFontSize();
  }
});

// ---- Numbers + Decimal ----
for (let i = 0; i < numberElarray.length; i++) {
  const numberEl = numberElarray[i];
  numberEl.addEventListener("click", () => handleNumberClick(i.toString()));
}

decimalEl.addEventListener("click", () => {
  if (!expression.includes(".")) {
    expression += ".";
    valueEl.textContent = expression;
  }
});

// ---- Clock ----
const updateTime = () => {
  const currentTime = new Date();
  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) currentHour -= 12;

  hourEl.textContent = currentHour;
  minuteEl.textContent = currentMinute.toString().padStart(2, "0");
};
setInterval(updateTime, 1000);
updateTime();

// ---- Keyboard Support ----
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) handleNumberClick(key);
  if (key === ".") handleNumberClick(".");
  if (key === "+") handleOperatorClick("addition");
  if (key === "-") handleOperatorClick("subtraction");
  if (key === "*") handleOperatorClick("multiplication");
  if (key === "/") handleOperatorClick("division");

  if (key === "Enter" || key === "=") {
    try {
      const result = eval(expression);
      valueEl.textContent = result;
      expression = result.toString();
    } catch {
      valueEl.textContent = "Error";
      expression = "";
    }
  }

  if (key === "Backspace") {
    expression = expression.slice(0, -1);
    valueEl.textContent = expression || "0";
  }

  if (key === "Escape") {
    expression = "";
    valueEl.textContent = "0";
  }
});
function adjustFontSize() {
  const maxFontSize = 130; // starting size
  const minFontSize = 40; // don’t shrink too tiny
  const containerWidth = valueEl.offsetWidth;

  // reset to max first
  valueEl.style.fontSize = maxFontSize + "px";

  // shrink until it fits
  while (
    valueEl.scrollWidth > containerWidth &&
    parseInt(valueEl.style.fontSize) > minFontSize
  ) {
    valueEl.style.fontSize = parseInt(valueEl.style.fontSize) - 2 + "px";
  }
}
