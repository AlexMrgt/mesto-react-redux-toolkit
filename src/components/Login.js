import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormWithValidation from "../customHooks/useFormWithValidation";
import { getLoginSending } from "../store/auth/selectors";
import { checkAuth, loginUser } from "../store/auth/slice";

import Input from "./Input";

function Login({setTooltip}) {

  const dispatch = useDispatch();
  const isLoginSending = useSelector(getLoginSending);

  useEffect(()=>{
    dispatch(checkAuth());
  }, [dispatch])

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {

    evt.preventDefault();

    dispatch(loginUser(values))
      .then(unwrapResult)

      .catch((err) => {

        setTooltip({
          message: `${err.message}. Что-то пошло не так...Попробуйте еще раз.`,
          iconType: 'error',
        });
      })
  }

  return (
    <section className='unauthorized'>
      <form
        noValidate
        className='unauthorized__form'
        onSubmit={handleSubmit}

      >
        <p
          className='unauthorized__title'>
          Вход
        </p>
        <Input
          id='log-owner-email'
          name='email'
          inputClassName='unauthorized__field'
          type='email'
          placeholder='Email'
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          labelClassName='unauthorized__label'
          spanClassNameClarification='unauthorized'
        />
        <Input
          id='log-owner-password'
          name='password'
          inputClassName='unauthorized__field'
          type='password'
          placeholder='Password'
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          labelClassName='unauthorized__label'
          spanClassNameClarification='unauthorized'
        />
        <button
          type="submit"
          className='unauthorized__submit'
          disabled={!isValid}
        >
          {isLoginSending
            ? 'Вход...'
            : 'Войти'}
        </button>
      </form>
    </section>
  )
}

export default Login;
