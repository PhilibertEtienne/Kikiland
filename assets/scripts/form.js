let ContactForm = document.querySelector(".contact-form");
let cbxButtons = document.querySelectorAll(".cbx-button");
let buttonsBox = document.querySelector(".contact-form__rowBox");
let currentForm;
let otherForm;
let rdvFormNoInsta = document.querySelector(".rdv-form__form");
let firstOpening = true;
let firstWrap = true;

// Form selection logic : select form to display
cbxButtons.forEach((button) => {
  let checkbox = button.querySelector("input[type='radio']");
  button.addEventListener("change", () => {
    ContactForm.classList.add("moveUp");
    if (checkbox.checked) {
      currentForm = button.id;
      button.classList.add("selected");
      button.classList.remove("unselected");
      cbxButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherForm = otherButton.id;
          if (otherForm == "rdv") {
            step2.classList.add("inactive");
            step3.classList.add("inactive");
            rdvFormNoInsta.classList.add("inactive");
          }
          otherButton.classList.add("unselected");
          otherButton.classList.remove("selected");
          otherButton.querySelector("input[type='radio']").checked = false;
        }
      });
    }
    displayForm();
  });
});

// Form components logic : form displaying logic
let coucouButton = document.querySelector("#coucou-button");
let rdvButton = document.querySelector("#rdv-button");
let coucouForm = document.querySelector(".coucou-form");
let rdvForm = document.querySelector(".rdv-form");
let step1 = document.querySelector(".rdv-step1");
let step2 = document.querySelector(".rdv-step2");
let step3 = document.querySelector(".rdv-step3");
let rdvWrapper = document.querySelector(".rdv-form__wrapper");

function displayForm() {
  let openedForm = document.querySelector(`.${currentForm}-form`);
  let closedForm = document.querySelector(`.${otherForm}-form`);
  if (firstOpening) {
    openedForm.classList.remove("inactive");
  } else {
    openedForm.classList.remove("moveUp");
    if (openedForm.id === "coucou-form") {
      openedForm.classList.remove("inactive");
      openedForm.classList.add("slideFromLeft");
    } else {
      if (!firstWrap) {
        rdvFormNoInsta.style.opacity ="1";
        rdvFormNoInsta.style.animation ="slideFromRight  1s ease-in-out";
        rdvFormNoInsta.classList.remove("inactive");
      } else {
        openedForm.classList.remove("inactive");
        openedForm.classList.add("slideFromRight");
      }
    }
  }
  closedForm.classList.add("inactive");
  firstOpening = false;
}

step1.addEventListener("click", () => {
  step2.classList.remove("inactive");
  step3.classList.remove("inactive");
});

// handle click on rdv transition animation wrapper
rdvWrapper.addEventListener("click", () => {
  let delay = 0.1;
  let duration = 1;
  let iteration = 0;

  Array.from(rdvForm.children).forEach((child) => {
    iteration += 1;
    delay += 0.2;
    duration -= 0.2;
    child.style.opacity = 1;
    if (iteration % 2 === 0) {
      child.style.animation = ` disappearLeft ${duration}s ${delay}s forwards ease-in-out`;
    } else {
      child.style.animation = ` disappearRight ${duration}s ${delay}s forwards ease-in-out`;
    }
  });
  rdvForm.addEventListener("animationend", handleAnimationEnd);
});

//handle rdv form trnaistion page animation
function handleAnimationEnd() {
  firstWrap = false;
  rdvForm.style.position = "absolute";
  rdvForm.classList.add("inactive");
  rdvFormNoInsta.classList.remove("inactive");
}
