import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './Header';
import Register from './Register';
import Login from "./Login";
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { useState } from 'react';
import { getIsAuthorized } from '../store/auth/selectors';


function App() {

  const [tooltipStatus, setTooltipStatus] = useState();
  const closeInfoTooltip = () => setTooltipStatus(undefined);

  const isLoggedIn = useSelector(getIsAuthorized);

  return (
    <>
      <div className='wrapper'>

        <Header />

        <Switch>

          <ProtectedRoute path='/' exact>
            <Main />
          </ProtectedRoute>

          <Route path="/sign-in">
            {isLoggedIn && <Redirect to='/' />}
            <Login
              setTooltip={setTooltipStatus}
            />
          </Route>

          <Route path="/sign-up">
            {isLoggedIn && <Redirect to='/' />}
            <Register
              setTooltip={setTooltipStatus}
            />
          </Route>

          <Route path="*">
            {isLoggedIn
              ? <Redirect to='/' />
              : <Redirect to="/sign-in" />}
          </Route>

        </Switch>
        <Footer />

      </div>

      <InfoTooltip
        isOpen={!!tooltipStatus}
        onClose={closeInfoTooltip}
        popupData={tooltipStatus}
      />
    </>
  );
}

export default App;
