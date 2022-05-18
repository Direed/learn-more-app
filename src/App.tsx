import React, {FunctionComponent, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import pathNames from './routes/pathes'

import IntroducePage from "./pages/IntroducePage";
import LoginPage, {IRole} from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Wrapper from "./hoc/Wrapper";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectPage from "./pages/SubjectPage";
import VideoTopicPage from "./pages/Topic/VideoTopicPage";
import TextTopicPage from "./pages/Topic/TextTopicPage";
import HomeworkTopicPage from "./pages/Topic/HomeworkTopicPage";
import TestTopicPage from "./pages/Topic/TestTopicPage";

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
      <Router>
          <Routes>
              <Route path='/' element={<IntroducePage setRole={setRole}/>}/>
              <Route path={pathNames.login} element={<LoginPage role={role} auth={auth} />}/>
              <Route path={pathNames.register} element={<RegisterPage role={role} auth={auth} />}/>
              <Route path={pathNames.home} element={<Wrapper><HomePage db={db}/></Wrapper>}/>
              <Route path={pathNames.subjects} element={<Wrapper><SubjectsPage db={db} /></Wrapper>} />
              <Route path={pathNames.topics} element={<Wrapper><SubjectPage db={db} /></Wrapper>} />
              <Route path={pathNames.topic.home}>
                  <Route path={pathNames.topic.video} element={<Wrapper isTopic><VideoTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.text} element={<Wrapper isTopic><TextTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.homework} element={<Wrapper isTopic><HomeworkTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.test} element={<Wrapper isTopic><TestTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.home} element={<Navigate to={pathNames.topic.video} replace />}/>
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
