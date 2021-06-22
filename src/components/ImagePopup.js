

import closeImage from '../images/popup/close-icon.svg';

function ImagePopup({
  card,
  onClose,
}) {

  function handleCloseClick() {

    onClose();
  }

  return (
    <div
      className={`popup popup_scope_picture ${card && 'popup_active'}`}
    >

      <div
        className='card-popup'
      >

        <button
          type="button"
          className="popup__close-popup popup__close-popup_scope_picture"
          onClick={handleCloseClick}
        >
          <img
            className="popup__close-popup-image"
            src={closeImage}
            alt="Кнопка 'Закрыть всплывающее окно'"
          />
        </button>

        <img
          src={card ? card.link : '#'}
          alt='text'
          className="card-popup__image"
        />
        <p
          className="card-popup__caption"
        >
          {card ? card.name : '#'}
        </p>

      </div>

    </div>
  )
}

export default ImagePopup;
