import React, {FunctionComponent, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import pathNames from './routes/pathes'

import IntroducePage from "./pages/IntroducePage";
import LoginPage, {IRole} from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Provider} from "react-redux";
import {store} from "./store";


function App<FunctionComponent>() {
    const [role, setRole] = useState<IRole>(IRole.student)
  return (
      <Provider store={store}>
          <Router>
              <Routes>
                  <Route path='/' element={<IntroducePage setRole={setRole}/>}/>
                  <Route path={pathNames.login} element={<LoginPage role={role} />}/>
                  <Route path={pathNames.register} element={<RegisterPage role={role} />}/>
              </Routes>
          </Router>
      </Provider>
  );
}

export default App;
