import React from 'react';
import {useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";

import './style.scss'

const TextTopicPage = ({db}) => {
    const topic = useSelector(getTopic)
    return (
        <div className='TextTopicPage'>
            <h1 className='TextTopicPage--title'>{topic.title}</h1>
            <p className='TextTopicPage--text'>{topic?.text}</p>
            <button className='TextTopicPage--button' type={"button"}>Done</button>
        </div>
    )
}

export default TextTopicPage;
