import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import pathNames from './routes/pathes'

import IntroducePage from "./pages/IntroducePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App<FunctionComponent>() {

  return (
      <Router>
          <Routes>
              <Route path='/' element={<IntroducePage/>}/>
              <Route path={pathNames.login} element={<LoginPage />}/>
              <Route path={pathNames.register} element={<RegisterPage />}/>
          </Routes>
      </Router>
  );
}

export default App;
