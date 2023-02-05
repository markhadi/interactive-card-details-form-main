const cardCVC = document.querySelector(".cvc span");
const cardNumber = document.querySelector(".card-Number");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".exp-date");

const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC = document.querySelector("#cvc");

const infoErr = document.querySelectorAll(".info-err");
const complete = document.querySelector(".complete");

console.log(infoErr);

const showError = (input, arrInfoErr, message) => {
  input.classList.add("input-err");
  infoErr[arrInfoErr].classList.add("d-block");
  infoErr[arrInfoErr].textContent = message;
};

const hideError = (input, arrInfoErr) => {
  input.classList.remove("input-err");
  infoErr[arrInfoErr].classList.remove("d-block");
};

let inputNameValue;
let inputNumberValue;
let inputMonthValue;
let inputYearValue;
let inputCVCValue;

const validateInput = (input, arrInfoErr, length) => {
  if (!length) {
    if (!input.value) {
      showError(input, arrInfoErr, "Can’t be blank");
    } else {
      hideError(input, arrInfoErr);
      inputNameValue = input.value;
    }
  } else {
    if (!input.value) {
      showError(input, arrInfoErr, "Can’t be blank");
    } else if (!/^\d+(\s\d+)*$/.test(input.value)) {
      showError(input, arrInfoErr, "Wrong format, numbers only");
    } else if (input.value.length < length) {
      if (length > 3) {
        showError(input, arrInfoErr, "Card number must be 16 numbers");
      } else {
        showError(input, arrInfoErr, `must be ${length} numbers`);
      }
    } else {
      hideError(input, arrInfoErr);

      switch (input) {
        case inputNumber:
          inputNumberValue = input.value;
          break;
        case inputMonth:
          inputMonthValue = input.value;
          break;
        case inputYear:
          inputYearValue = input.value;
          break;
        case inputCVC:
          inputCVCValue = input.value;
          break;
      }
    }
  }
};

inputNumber.addEventListener("input", (e) => {
  e.preventDefault();

  let formatText = e.target.value;
  formatText = formatText.substring(0, 19);
  formatText = formatText
    .replace(/\s/g, "")
    .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    .trim();

  e.target.value = formatText;

  // pattern = pattern.replace(/\s/g, "") : will remove all spaces in the text.
  // .replace(new RegExp(`(.{${4}})`, "g"), "$1 ") : will add a space after every 4 characters.
  // .trim(); : will remove spaces at the beginning and end of the text.
});

const maxLength = (input, maxLength) => {
  if (input.value.length > maxLength || /\s/.test(input.value)) {
    let formatText = input.value;
    formatText = formatText.substring(0, maxLength).replace(/\s/g, "");

    input.value = formatText;
  }
};

inputMonth.addEventListener("input", () => {
  maxLength(inputMonth, 2);
});

inputYear.addEventListener("input", () => {
  maxLength(inputYear, 2);
});

inputCVC.addEventListener("input", () => {
  maxLength(inputCVC, 3);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputNameValue = "";
  inputNumberValue = "";
  inputMonthValue = "";
  inputYearValue = "";
  inputCVCValue = "";

  validateInput(inputName, 0);
  validateInput(inputNumber, 1, 19);
  validateInput(inputMonth, 2, 2);
  validateInput(inputYear, 2, 2);
  validateInput(inputCVC, 3, 3);

  if (
    inputNameValue &&
    inputNumberValue &&
    inputMonthValue &&
    inputYearValue &&
    inputCVCValue
  ) {
    cardName.textContent = inputNameValue;
    cardNumber.textContent = inputNumberValue;
    cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
    cardCVC.textContent = inputCVCValue;

    form.classList.add("d-none");
    complete.classList.add("d-block");
  }
});

complete.addEventListener("click", () => {
  location.reload(true);
});
