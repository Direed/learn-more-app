import React, {useEffect} from 'react';

import './VideoTopicPage.scss'

import YouTube from 'react-youtube';
import {useDispatch, useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";
import {setMainBgColor} from "../../../store/actions/auth";

const VideoTopicPage = ({db}) => {
    const dispatch = useDispatch()
    const topic = useSelector(getTopic)
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
    console.log('topic in video', topic)

    const onReady = (event) => {
        event.target.pauseVideo();
    }

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
        </div>
    )
}

export default VideoTopicPage;
