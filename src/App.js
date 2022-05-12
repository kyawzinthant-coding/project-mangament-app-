
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import { AuthContext } from './content/AuthContext';
import { UseAuthContext } from './Hooks/useAuthContext';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';


function App() {
  const { authIsReady } = UseAuthContext();
  const { user } = UseAuthContext();
  return (
    <div className="App">
      {authIsReady && (

      <BrowserRouter>
          
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
          <Navbar/>

              </div>
            </div>
          </div>
        {/* <div className="container "> */}

          <Routes>
              <Route path = "/" element = { user ?  <Home/> : <Navigate to = "login" />  } / >
              <Route path = "/login" element = { !user ? <Login/>: <Navigate to = "/"  />  } / >
              <Route path = "/signup" element = {!user ? <SignUp/> : <Navigate  to = "/" />  } / >
          </Routes>
        {/* </div> */}
    
      </BrowserRouter>
      )}
    </div>

  );
}

export default App;
