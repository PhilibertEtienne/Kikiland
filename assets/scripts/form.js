let contactForm = document.querySelector(".contact-form");
let cbxButtons = document.querySelectorAll(".cbx-button");
let buttonsBox = document.querySelector(".contact-form__rowBox");
let currentForm;
let otherForm;
let firstOpening = true;

cbxButtons.forEach((button) => {
  let checkbox = button.querySelector("input[type='radio']");
  button.addEventListener("change", () => {
    contactForm.classList.add("moveUp");
    if (checkbox.checked) {
      currentForm = button.id;
      button.classList.add("selected");
      button.classList.remove("unselected");
      cbxButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherForm = otherButton.id;
          otherButton.classList.add("unselected");
          otherButton.classList.remove("selected");
          otherButton.querySelector("input[type='radio']").checked = false;
        }
      });
    }
    displayForm();
    firstOpening = false;
  });
});

let coucouButton = document.querySelector("#coucou-button");
let rdvButton = document.querySelector("#rdv-button");
let coucouForm = document.querySelector(".coucou-form");
let rdvForm = document.querySelector(".rdv-form");

function displayForm() {
  let openedForm = document.querySelector(`.${currentForm}-form`);
  let closedForm = document.querySelector(`.${otherForm}-form`);
  openedForm.classList.remove("inactive");
  if (!firstOpening) {
    openedForm.classList.remove("moveUp");
    if (openedForm.id === "coucou-form") {
      openedForm.classList.add("slideFromLeft");
      console.log("pizza");
    } else {
      openedForm.classList.add("slideFromRight");
    }
  }
  closedForm.classList.add("inactive");
}
