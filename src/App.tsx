import React, {FunctionComponent, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

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
import ProgressPage from "./pages/ProgressPage";

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
const storage = getStorage(app);


function App<FunctionComponent>() {
    const [role, setRole] = useState<IRole>(IRole.student)
  return (
      <Router>
          <Routes>
              <Route path='/' element={<IntroducePage setRole={setRole}/>}/>
              <Route path={pathNames.login} element={<LoginPage role={role} auth={auth} db={db} storage={storage} />}/>
              <Route path={pathNames.register} element={<RegisterPage role={role} auth={auth} db={db} />}/>
              <Route path={pathNames.home} element={<Wrapper background={'#F6F8FF'} color={'#242424'}><HomePage db={db}/></Wrapper>}/>
              <Route path={pathNames.subjects} element={<Wrapper background={'#9B5DE5'}><SubjectsPage db={db} /></Wrapper>} />
              <Route path={pathNames.topics} element={<Wrapper background={'#9B5DE5'}><SubjectPage db={db} /></Wrapper>} />
              <Route path={pathNames.progress} element={<Wrapper background={'#8D5CF6'}><ProgressPage db={db} /></Wrapper>} />
              <Route path={pathNames.topic.home}>
                  <Route path={pathNames.topic.video} element={<Wrapper background={'#E5E5E5'} color={'#000000'} isTopic><VideoTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.text} element={<Wrapper background={'#E5E5E5'} color={'#000000'} isTopic><TextTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.homework} element={<Wrapper background={'#E5E5E5'} color={'#000000'} isTopic><HomeworkTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.test} element={<Wrapper background={'#9B5DE5'} isTopic><TestTopicPage db={db} /></Wrapper>} />
                  <Route path={pathNames.topic.home} element={<Navigate to={pathNames.topic.video} replace />}/>
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
