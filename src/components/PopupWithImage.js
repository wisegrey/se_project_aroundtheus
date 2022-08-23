
import Popup from "./Popup.js";
 
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._caption = this._popup.querySelector(".popup__image-name");
    this._img = this._popup.querySelector(".popup__image-picture");
  }
  open({ link, name }) {
    this._caption.textContent = name;
    this._img.src = link;
    this._img.alt = name;
    super.open(); 
  }
}