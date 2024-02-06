const resultEl = document.querySelector(".result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  uppercase: getRandomUpper,
  number: getRandomNumber,
};

clipboardEl.addEventListener("click", () => {
  const password = resultEl.innerText;
  if (!password) {
    return;
  }

  navigator.clipboard.writeText(password);
  alert("password copied");
});

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typeCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

  if (typeCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalpassword = generatedPassword.slice(0, length);

  return finalpassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
