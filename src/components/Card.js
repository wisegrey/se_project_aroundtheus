class Card {
    constructor(data, handleCardClick, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
      this._cardSelector = cardSelector;
      
    }
  

    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".element")
        .cloneNode(true);
  
      return cardElement;
    }
  

    _setEventListeners() {
      this._cardImage.addEventListener("click", this._handleCardClick);
      this._likeBtn.addEventListener("click", this._handleLikeButton);
      this._deleteBtn.addEventListener("click", this._handleDeleteButton);
    }
  

    _handleLikeButton = () => {
      this._likeBtn.classList.toggle("element__like-active");
    };
  

    _handleDeleteButton = () => {
      this._element.remove();
      this._element = null;
    };
  

    generateCard() {
      this._element = this._getTemplate();
      this._likeBtn = this._element.querySelector(".element__like");
      this._cardImage = this._element.querySelector(".element__image");
      this._deleteBtn = this._element.querySelector(".element__delete");
      this._text = this._element.querySelector(".element__name");
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._text.textContent = this._name;
      this._setEventListeners();
  
      return this._element;
    }
  }
  
export default Card;