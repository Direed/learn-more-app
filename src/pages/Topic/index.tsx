import React from 'react';
import {Navigate, Route, Routes,} from "react-router-dom";
import pathNames from "../../routes/pathes";
import Wrapper from "../../hoc/Wrapper";
import VideoTopicPage from "./VideoTopicPage";
import TextTopicPage from "./TextTopicPage";
import HomeworkTopicPage from "./HomeworkTopicPage";
import TestTopicPage from "./TestTopicPage";

const Topic = ({db}: any) => {
    return (
        <>
            <Route path={pathNames.topic.video} element={<Wrapper><VideoTopicPage db={db} /></Wrapper>} />
            <Route path={pathNames.topic.text} element={<Wrapper><TextTopicPage db={db} /></Wrapper>} />
            <Route path={pathNames.topic.homework} element={<Wrapper><HomeworkTopicPage db={db} /></Wrapper>} />
            <Route path={pathNames.topic.test} element={<Wrapper><TestTopicPage db={db} /></Wrapper>} />
            <Route path={pathNames.topic.home} element={<Navigate to={pathNames.topic.video} replace />}/>
        </>
    )
}

export default Topic;
