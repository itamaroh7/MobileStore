import logo from './logo.svg';
import './App.css';
import MainPageComp from './ProjectFin/MainPage';
import LoginComp from './Login';
import SignupComp from './Signup';
import {Switch,Route} from 'react-router-dom'
import PrivateRoute from './ProjectFin/PrivateRoute';
import { AuthProvider } from './ProjectFin/AuthContext';



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
