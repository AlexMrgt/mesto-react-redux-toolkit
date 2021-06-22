import successIcon from '../images/auth_popup/good.png';
import errorIcon from '../images/auth_popup/bad.png';
import closeImage from '../images/popup/close-icon.svg';

function InfoTooltip({
  isOpen,
  onClose,
  popupData: { iconType, message } = {},
}) {

  const ICONS = {
    success: successIcon,
    error: errorIcon
  }

  function handleClosePopup() {
    onClose();
  }

  return (

    <div
      className={`popup ${isOpen && 'popup_active'}`}
    >
      <div
        className='authorize-popup'
      >
        <div
          className='authorize-popup__wrapper'
        >
          <img
            className='authorize-popup__image'
            src={ICONS[iconType]}
            alt='Попап авторизации'
          />
          <p
            className='authorize-popup__caption'
          >
            {message}
          </p>
        </div>

        <button
          type="button"
          className="popup__close-popup"
        >
          <img
            className="popup__close-popup-image"
            src={closeImage}
            alt="Кнопка 'Закрыть всплывающее окно'"
            onClick={handleClosePopup}
          />
        </button>

      </div>
    </div>


  )
}

export default InfoTooltip;
