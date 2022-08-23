import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popupForm = this._popup.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}