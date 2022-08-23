// universal functions to open and close popups respectively
export function openPopup(popup){
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscPress);
  }
  
export function closePopup(popup){
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscPress);
}

// close popup after we press Escape button
function handleEscPress(evt) {
    if(evt.code === "Escape") {
      closePopup(document.querySelector(".popup_opened"));
    }
}