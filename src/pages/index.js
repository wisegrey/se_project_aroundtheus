import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards} from "../utils/cards.js";

const settings = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "input-error_visible"
};


const editForm = document.querySelector("#editProfileForm");
const addForm = document.querySelector("#addCardForm");
const elementsList = document.querySelector(".elements");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__occupation");
const editPopup = document.querySelector("#popup__edit");
const addPopup = document.querySelector("#popup__add");
const enlargePopup = document.querySelector("#popup__pic");
const userInputName = document.querySelector("#name");
const userInputAbout = document.querySelector("#occupation");
const openEditPopup = document.querySelector(".profile__edit");
const openAddPopup = document.querySelector(".profile__add");



const formValidators = {};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  },
  elementsList
);

cardList.renderer();

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileAbout,
});

const imagePopup = new PopupWithImage(enlargePopup);

const userInfoPopup = new PopupWithForm(editPopup, (data) => {
  userInfo.setUserInfo(data);
  userInfoPopup.close();
});

const newCardPopup = new PopupWithForm(addPopup, (data) => {
  const cardElement = createCard({
    name: data.title,
    link: data["imageUrl"],
  });
  cardList.addItem(cardElement);
  newCardPopup.close();
});

userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

function handleEditButton() {
  userInfoPopup.open();
  const info = userInfo.getUserInfo();
  userInputName.value = info.userName;
  userInputAbout.value = info.userJob;
  formValidators[editForm.getAttribute("id")].resetValidation();
}

function handleAddButton() {
  newCardPopup.open();
  formValidators[addForm.getAttribute("id")].resetValidation();
}

openEditPopup.addEventListener("click", handleEditButton);
openAddPopup.addEventListener("click", handleAddButton);


const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("id");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

function createCard(data) {
  const card = new Card(
    data,
    () => {
      imagePopup.open(data);
    },
    "#newCardTemplate"
  );

  const cardElement = card.generateCard();
  return cardElement;
}