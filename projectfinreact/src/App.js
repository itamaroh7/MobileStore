import logo from './logo.svg';
import './App.css';
import MainPageComp from './ProjectFin/Main/MainPage';
import LoginComp from './ProjectFin/Main/Login';
import SignupComp from './ProjectFin/Main/Signup';
import {Switch,Route} from 'react-router-dom'
import PrivateRoute from './ProjectFin/Auth/PrivateRoute';
import { AuthProvider } from './ProjectFin/Auth/AuthContext';



function App() {
  return (
    <AuthProvider>
        <Switch>
          <Route path='/Signup' component={SignupComp}/>
          <Route path='/Login' component={LoginComp}/>
          <PrivateRoute path='/' component={MainPageComp}/>
        </Switch>
      </AuthProvider>
  );
}

export default App;
