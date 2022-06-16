import React, {useCallback, useMemo} from 'react';
import {useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";

import './style.scss'
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
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
        const myProgressObjectData = myProgressObject.data()
        const progressData = myProgressObjectData ? myProgressObjectData : {};
        const subjectData = myProgressObjectData && Object.keys(myProgressObjectData).includes(subject.topics_link) ? myProgressObjectData[subject.topics_link] : {};
        const gradeData = myProgressObjectData && Object.keys(subjectData)?.includes(`${subject.topics_link}_grade${1}`) ? myProgressObjectData[subject.topics_link][`${subject.topics_link}_grade${1}`] : {};
        const topicData = myProgressObjectData && Object.keys(gradeData)?.includes(topic.topic_link) ? myProgressObjectData[subject.topics_link][`${subject.topics_link}_grade${1}`][topic.topic_link] : {};
        // await updateDoc(myProgressRef, {
        //     ...myProgressObject.data(),
        //     [`${subject.topics_link}`]: {
        //         ...myProgressObject.data()[subject.topics_link],
        //         [`${topic?.grade}`]: {
        //             ...myProgressObject.data()[subject.topics_link][`${subject.topics_link}_grade${1}`],
        //             [`${topic?.topic_link}`]: {
        //                 ...myProgressObject.data()[subject.topics_link][`${subject.topics_link}_grade${1}`][topic.topic_link],
        //                 text: {
        //                     isText: true,
        //                     date: moment(new Date()).toString()
        //                 }
        //             }
        //         }
        //     }
        // });
        await setDoc(myProgressRef, {
            ...progressData,
            [`${subject.topics_link}`]: {
                ...subjectData,
                [`${topic?.grade}`]: {
                    ...gradeData,
                    [`${topic?.topic_link}`]: {
                        ...topicData,
                        text: {
                            isText: true,
                            date: moment(new Date()).toString()
                        }
                    }
                }
            }
        }, {merge: true});
    }
    const onDone = useCallback(() => {
        CompletedWorks()
    }, [])
    console.log(topic, 'topic')

    const texts = topic.text

    return (
        <div className='TextTopicPage'>
            <h1 className='TextTopicPage--title'>{topic.title}</h1>
            <div className={'TextTopicPage--content'}>
                {Array.isArray(texts) && texts?.length ? texts?.map((text: any) => {
                    if(text.type === 'image') {
                        return <img src={text.data} />
                    } else {
                        return <p className='TextTopicPage--text'>{text.data}</p>
                    }
                }) : <p className='TextTopicPage--text'>{texts}</p>}
            </div>
            {/*{texts.isArray && texts.length ? (*/}
            {/*    <div>{ topic?.text?.map((item: any) => {*/}
            {/*        let content = null;*/}
            {/*        if(item?.type === 'image') content = <img src={item?.data}/>*/}
            {/*        if(item?.type === 'text') content = <p>{item?.data}</p>*/}
            {/*        return content*/}
            {/*    })}</div>*/}
            {/*) : <p className='TextTopicPage--text'>{texts}</p>}*/}
            <button className='TextTopicPage--button' type={"button"} onClick={onDone}>Виконано</button>
        </div>
    )
}

export default TextTopicPage;
