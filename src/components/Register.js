import Input from "./Input";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRegisterSending } from "../store/auth/selectors";
import useFormWithValidation from "../customHooks/useFormWithValidation";
import { registerUser } from "../store/auth/slice";
import { unwrapResult } from "@reduxjs/toolkit";


function Register({ setTooltip }) {

  const dispatch = useDispatch();
  const isRegisterSending = useSelector(getRegisterSending);

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (evt) => {

    evt.preventDefault();

    dispatch(registerUser(values))
      .then(unwrapResult)
      .then(() => {

        console.log('Показываю success register попап');
        setTooltip({
          message: "Вы успешно зарегистрировались!",
          iconType: 'success',
        });
      })
      .catch((err) => {
        console.log('Показываю rejected register попап');
        setTooltip({
          message: `${err.message}. Что-то пошло не так...Попробуйте еще раз.`,
          iconType: 'error',
        });
      })
  }

  return (
    <section
      className='unauthorized'>
      <form
        className='unauthorized__form'
        noValidate
        onSubmit={handleSubmit}
      >
        <p
          className='unauthorized__title'
        >
          Регистрация
        </p>
        <Input
          id='reg-owner-email'
          name='email'
          inputClassName='unauthorized__field'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          value={values.email}
          error={errors.email}
          labelClassName='unauthorized__label'
          spanClassNameClarification='unauthorized'
        />
        <Input
          id='reg-owner-password'
          name='password'
          inputClassName='unauthorized__field'
          type='password'
          minLength='8'
          placeholder='Password'
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          labelClassName='unauthorized__label'
          spanClassNameClarification='unauthorized'
        />
        <button
          type="submit"
          className='unauthorized__submit'
          disabled={!isValid}

        >
          {isRegisterSending
            ? 'Регистрация...'
            : 'Зарегестрироваться'}
        </button>
        <p
          className='unauthorized__caption' >
          Уже зарегистрированы?
          <Link
            className='unauthorized__caption header__link'
            to='/sign-in'>
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Register;
