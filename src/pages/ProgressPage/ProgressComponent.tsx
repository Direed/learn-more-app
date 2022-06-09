import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setSubjectProgress} from "../../store/actions/progress";
import {useNavigate} from "react-router-dom";
import pathes from "../../routes/pathes";

const ProgressComponent = ({title, subtitles, percent, subject}: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onOpenSubjectProgress = useCallback(() => {
        dispatch(setSubjectProgress(subject))
        navigate(pathes.subjectProgress)
    }, [subject])
    return (
        <div className='progress-component'>
            <div className={'progress-bar-wrapper'}>
                <div className={'progress-bar-wrapper--outside-circle'} style={{ "--progress": `36deg`}}>
                    <div className={'progress-bar-wrapper--inside-circle'}>
                        <img src={process.env.PUBLIC_URL+'/images/britan.svg'}/>
                    </div>
                </div>
                <p>{percent}</p>
            </div>
            <div className={'information-wrapper'}>
                <h1 className='information-wrapper--title'>{title}</h1>
                <div className='information-wrapper--subtitles'>
                    <div className='subtitle-wrapper'>
                        <img/>
                        <p>{`${subtitles[0]} lessons`}</p>
                    </div>
                    <div className='subtitle-wrapper'>
                        <img/>
                        <p>{`${subtitles[1]} hours`}</p>
                    </div>
                    <div className='subtitle-wrapper'>
                        <img/>
                        <p>{`${subtitles[2]} homeworks`}</p>
                    </div>
                </div>
                <button className='information-wrapper--button' onClick={onOpenSubjectProgress}>Continue</button>
            </div>
        </div>
    )
};

export default ProgressComponent;
