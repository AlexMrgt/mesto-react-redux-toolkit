
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getIsAuthChecking, getIsAuthorized } from '../store/auth/selectors';

function ProtectedRoute({ path, children }) {

  const isLoggedIn = useSelector(getIsAuthorized);
  const isOnAuthCheck = useSelector(getIsAuthChecking);

  return (
    <Route path={path} exact>
      {isOnAuthCheck ? (
        <main className='content'>
          Прелоадер...
        </main>
      ) : (
        isLoggedIn ? children : <Redirect to="/sign-in" />
      )}
    </Route>
  )
}

export default ProtectedRoute;
