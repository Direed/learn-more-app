import React, {ReactElement, useCallback, useEffect} from 'react';

import './VideoTopicPage.scss'

import YouTube from 'react-youtube';
import {useDispatch, useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";
import {setMainBgColor} from "../../../store/actions/auth";
import {collectionGroup, doc, getDoc, getDocs, query, updateDoc} from "firebase/firestore";
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
        const myProgressObject = await getDoc(myProgressRef);
        await updateDoc(myProgressRef, {
            ...myProgressObject.data(),
            [`${subject.topics_link}`]: {
                ...myProgressObject.data()[subject.topics_link],
                [`${topic?.grade}`]: {
                    ...myProgressObject.data()[subject.topics_link][`${subject.topics_link}_grade${1}`],
                    [`${topic?.topic_link}`]: {
                        ...myProgressObject.data()[subject.topics_link][`${subject.topics_link}_grade${1}`][topic.topic_link],
                        video: {
                            isVideo: true,
                            date: moment(new Date()).toString()
                        }
                    }
                }
            }
        });
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
