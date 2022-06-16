import React, {ReactElement, useCallback, useEffect} from 'react';

import './VideoTopicPage.scss'

import YouTube from 'react-youtube';
import {useDispatch, useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";
import {setMainBgColor} from "../../../store/actions/auth";
import {collectionGroup, doc, getDoc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {getUser} from "../../../store/selectors/auth";
import {getSubject} from "../../../store/selectors/subject";
import moment from "moment";

const VideoTopicPage = ({db}) => {
    const dispatch = useDispatch()
    const topic = useSelector(getTopic)
    const subject = useSelector(getSubject)
    const user = useSelector(getUser)
    useEffect(() => {
        dispatch(setMainBgColor('#E6E6E6'))
    }, [])
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    const onReady = (event: any) => {
        event.target.pauseVideo();
    }

    async function CompletedWorks() {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject: any = await getDoc(myProgressRef);
        const myProgressObjectData = myProgressObject.data()
        const progressData = myProgressObjectData ? myProgressObjectData : {};
        const subjectData = myProgressObjectData && Object.keys(myProgressObjectData).includes(subject.topics_link) ? myProgressObjectData[subject.topics_link] : {};
        const gradeData = myProgressObjectData && Object.keys(subjectData)?.includes(`${subject.topics_link}_grade${1}`) ? myProgressObjectData[subject.topics_link][`${subject.topics_link}_grade${1}`] : {};
        const topicData = myProgressObjectData && Object.keys(gradeData)?.includes(topic.topic_link) ? myProgressObjectData[subject.topics_link][`${subject.topics_link}_grade${1}`][topic.topic_link] : {};
        // if(Object.keys(myProgressObject.data()).length && Object.keys(myProgressObject.data())[0] === subject.topics_link && ) {
        //
        // }
        // const newProgressObject = {
        //     ...progressData,
        //     [`${subject.topics_link}`]: {
        //         ...subjectData,
        //         [`${topic?.grade}`]: {
        //             ...gradeData,
        //             [`${topic?.topic_link}`]: {
        //                 ...topicData,
        //                 video: {
        //                     isVideo: true,
        //                     date: moment(new Date()).toString()
        //                 }
        //             }
        //         }
        //     }
        // }
        // await updateDoc(myProgressRef, newProgressObject);
        // const objref = `${subject.topics_link}.${subject.topics_link}_grade${1}.${topic.topic_link}.video`;
        await setDoc(myProgressRef, {
                ...progressData,
                [`${subject.topics_link}`]: {
                    ...subjectData,
                    [`${topic?.grade}`]: {
                        ...gradeData,
                        [`${topic?.topic_link}`]: {
                            ...topicData,
                            video: {
                                isVideo: true,
                                date: moment(new Date()).toString()
                            }
                        }
                    }
                }
            }, {merge: true});
    }

    const onDone = useCallback(async () => {

    }, [])

    console.log('VideoTopicPage')
    return (
        <div className='VideoTopicPage'>
            <h1 className='VideoTopicPage--title'>{topic.title}</h1>
            <YouTube
                videoId={topic?.video.split('//youtu.be/')[1]}
                opts={opts}
                onReady={onReady}
                iframeClassName='VideoIframe'
                className='VideoWrapper'
            />
            <button className='VideoTopicPage--button' type={"button"} onClick={CompletedWorks}>Виконано</button>
        </div>
    )
}

export default VideoTopicPage;
