import React from "react";

const ProgressComponent = ({title, subtitles, percent, }) => {
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
                <button>Continue</button>
            </div>
        </div>
    )
};

export default ProgressComponent;
