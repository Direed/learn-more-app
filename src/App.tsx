import React, {FunctionComponent, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import pathNames from './routes/pathes'

import IntroducePage from "./pages/IntroducePage";
import LoginPage, {IRole} from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Provider} from "react-redux";
import {store} from "./store";
import Wrapper from "./hoc/Wrapper";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";

const firebaseConfig = {
    apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
    authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
    projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
    storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
    messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
    appId: process.env["REACT_APP_FIREBASE_APP_ID"],
    measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID"]
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

console.log(app, 'app')


function App<FunctionComponent>() {
    const [role, setRole] = useState<IRole>(IRole.student)
  return (
      <Provider store={store}>
          <Router>
              <Routes>
                  <Route path='/' element={<IntroducePage setRole={setRole}/>}/>
                  <Route path={pathNames.login} element={<LoginPage role={role} auth={auth} />}/>
                  <Route path={pathNames.register} element={<RegisterPage role={role} auth={auth} />}/>
                  <Route path={pathNames.home} element={<Wrapper><HomePage db={db}/></Wrapper>}/>
                  <Route path={pathNames.subjects} element={<Wrapper><SubjectsPage db={db} /></Wrapper>} />
              </Routes>
          </Router>
      </Provider>
  );
}

export default App;
