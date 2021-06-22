import PopupWithForm from "../components/PopupWithForm";
import Input from "../components/Input";
import useFormWithValidation from "../customHooks/useFormWithValidation";
import { useDispatch, useSelector } from "react-redux";
import { sendCard } from "../store/cards/slice";
import { getIsCardSending } from "../store/cards/selectors";
import { useEffect } from "react";


function AddPlacePopup({
  isOpen,
  onClose,
}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const dispatch = useDispatch();

  const isCardSending = useSelector(getIsCardSending);


  useEffect(()=>{
    if(isOpen) return;

    resetForm();
  },[resetForm, isOpen])

  function handleSubmit(evt) {

    evt.preventDefault();

    dispatch(sendCard(values))
      .then(()=>{
        onClose()
      })
  }

  return (
    <PopupWithForm
      scope='add'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isCardSending}
    >
      <Input
        id='picture-input'
        name='name'
        inputClassName='popup__field'
        type='text'
        placeholder='Название места'
        minLength='2'
        maxLength='30'
        value={values.name}
        error={errors.name}
        onChange={handleChange}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'

      />
      <Input
        id='url-input'
        name='link'
        inputClassName='popup__field'
        type='url'
        placeholder='Ссылка на картинку'
        value={values.link}
        error={errors.link}
        onChange={handleChange}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'

      />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
