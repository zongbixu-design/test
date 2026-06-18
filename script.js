const form = document.querySelector("#calculator-form");
const result = document.querySelector("#result");

const operations = {
  add: {
    symbol: "+",
    calculate: (a, b) => a + b,
  },
  subtract: {
    symbol: "-",
    calculate: (a, b) => a - b,
  },
  multiply: {
    symbol: "×",
    calculate: (a, b) => a * b,
  },
  divide: {
    symbol: "÷",
    calculate: (a, b) => a / b,
  },
};

function formatNumber(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const firstNumber = Number(formData.get("firstNumber"));
  const secondNumber = Number(formData.get("secondNumber"));
  const operation = operations[formData.get("operation")];

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    result.textContent = "유효한 숫자를 입력해 주세요.";
    return;
  }

  if (operation.symbol === "÷" && secondNumber === 0) {
    result.textContent = "0으로 나눌 수 없습니다.";
    return;
  }

  const answer = operation.calculate(firstNumber, secondNumber);
  result.textContent = `${formatNumber(firstNumber)} ${operation.symbol} ${formatNumber(secondNumber)} = ${formatNumber(answer)}`;
});
