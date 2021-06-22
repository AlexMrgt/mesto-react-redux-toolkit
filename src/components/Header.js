
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import logoImage from '../images/header/logo.svg';
import { getAuthData } from '../store/auth/selectors';
import { logOut } from '../store/auth/slice';

function Header() {

  const dispatch = useDispatch();



  const { email } = useSelector(getAuthData);

  function handleLogOutClick() {

    dispatch(logOut());
  }

  return (
    <>
      <header className='header'>
        <img
          src={logoImage}
          alt="Логотип сайта 'Место'"
          className='header__logo'
        />

        <ul className='header__menu'>

          <Switch>

            <Route
              path='/sign-up'>
              <li
                className='header__item'
              >
                <Link
                  className="header__link"
                  to='/sign-in'>
                  Войти
                </Link>
              </li>
            </Route>

            <Route
              path='/sign-in'>
              <li
                className='header__item'>
                <Link
                  className="header__link"
                  to='/sign-up'
                >
                  Регистрация
                </Link>
              </li>
            </Route>

            <Route path='/' exact >
              <li
                className='header__email' >
                {email}
              </li>
              <li
                className='header__item'

              >
                <Link

                  className="header__link"
                  to="/sign-in"
                  onClick={handleLogOutClick}
                >
                  Выйти
                </Link>
              </li>
            </Route>

          </Switch>

        </ul>

      </header>
    </>
  )
};

export default Header;
