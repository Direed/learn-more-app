import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";

import './style.scss'
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {getSubject} from "../../../store/selectors/subject";
import {getUser} from "../../../store/selectors/auth";
import moment from 'moment';

const TextTopicPage = ({db}) => {
    const subject = useSelector(getSubject)
    const user = useSelector(getUser)
    const topic = useSelector(getTopic)
    async function CompletedWorks() {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject = await getDoc(myProgressRef);
        debugger
        await updateDoc(myProgressRef, {
            ...myProgressObject.data(),
            [`${subject.topics_link}`]: {
                ...myProgressObject.data()[subject.topics_link],
                [`${topic?.grade}`]: {
                    ...myProgressObject.data()[subject.topics_link][`${subject.topics_link}_grade${1}`],
                    [`${topic?.topic_link}`]: {
                        ...myProgressObject.data()[subject.topics_link][`${subject.topics_link}_grade${1}`][topic.topic_link],
                        text: {
                            isText: true,
                            date: moment(new Date()).toString()
                        }
                    }
                }
            }
        });
    }
    const onDone = useCallback(() => {
        CompletedWorks()
    }, [])
    return (
        <div className='TextTopicPage'>
            <h1 className='TextTopicPage--title'>{topic.title}</h1>
            <p className='TextTopicPage--text'>{topic?.text}</p>
            <button className='TextTopicPage--button' type={"button"} onClick={onDone}>Done</button>
        </div>
    )
}

export default TextTopicPage;
