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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!inputName.value) {
    showError(inputName, 0, "Can’t be blank");
  } else {
    hideError(inputName, 0);
  }

  if (!inputMonth.value) {
    showError(inputMonth, 2, "Can’t be blank");
  } else {
    hideError(inputMonth, 2);
  }

  if (!inputYear.value) {
    showError(inputYear, 2, "Can’t be blank");
  } else {
    hideError(inputYear, 2);
  }

  if (!inputCVC.value) {
    showError(inputCVC, 3, "Can’t be blank");
  } else {
    hideError(inputCVC, 3);
  }

  if (!inputNumber.value) {
    showError(inputNumber, 1, "Can’t be blank");
  } else if (!/^\d+(\s\d+)*$/.test(inputNumber.value)) {
    return showError(inputNumber, 1, "Wrong format, numbers only");
  } else if (inputNumber.value.length < 19) {
    return showError(inputNumber, 1, "Card number must be 16 numbers");
  } else {
    hideError(inputNumber, 1);
  }

  if (
    inputName.value &&
    inputNumber.value &&
    inputMonth.value &&
    inputYear.value &&
    inputCVC.value
  ) {
    cardName.textContent = inputName.value;
    cardNumber.textContent = inputNumber.value;
    cardExpDate.textContent = inputMonth.value + "/" + inputYear.value;
    cardCVC.textContent = inputCVC.value;

    form.classList.add("d-none");
    complete.classList.add("d-block");
  }
});

inputNumber.addEventListener("input", (e) => {
  e.preventDefault();

  let formatText = e.target.value;
  formatText = formatText.substring(0, 19);
  formatText = formatText
    .replace(/\s/g, "")
    .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    .trim();

  e.target.value = formatText;

  // pattern = pattern.replace(/\s/g, '') : will remove all spaces in the text.
  // .replace(new RegExp((.{${4}}), 'g'), '$1 ') : will add a space after every 4 characters.
  // .trim(); : will remove spaces at the beginning and end of the text.
});

const maxLength = (inputName, maxLength) => {
  if (inputName.value.length > maxLength) {
    inputName.value = inputName.value.substring(0, maxLength);
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

complete.addEventListener("click", () => {
  location.reload(true);
});
