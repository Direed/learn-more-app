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
                <div className={'progress-bar-wrapper--outside-circle'} style={{ "--progress": `${(percent * 360)/100}deg`}}>
                    <div className={'progress-bar-wrapper--inside-circle'}>
                        <img src={process.env.PUBLIC_URL+'/images/subjectIcon.svg'}/>
                    </div>
                </div>
                <p>{`${percent}%`}</p>
            </div>
            <div className={'information-wrapper'}>
                <h1 className='information-wrapper--title'>{title}</h1>
                <div className='information-wrapper--subtitles'>
                    <div className='subtitle-wrapper'>
                        <img/>
                        <p>{`${subtitles[0]} ${subject?.lessons === 1 ? 'заняття' : subject?.lessons > 1 && subject?.lessons < 5 ? 'заняття' : 'занять'}`}</p>
                    </div>
                    <div className='subtitle-wrapper'>
                        <img/>
                        <p>{`${subtitles[1]} ${subject.hours === 1 ? 'година' : subject.hours%10 > 1 && subject.hours%10 < 5 ? 'години' : 'годин'}`}</p>
                    </div>
                    <div className='subtitle-wrapper'>
                        <img/>
                        <p>{`${0} домашніх завданнь`}</p>
                    </div>
                </div>
                <button className='information-wrapper--button' onClick={onOpenSubjectProgress}>Продовжити</button>
            </div>
        </div>
    )
};

export default ProgressComponent;
