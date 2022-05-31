import React from "react";
import ProgressComponent from "./ProgressComponent";

const ProgressesComponent = ({subjects}: any) => {
    console.log(subjects, 'subjects')
    return (
        <div className='progress-page-wrapper'>
            {subjects?.map((subject: any) => <ProgressComponent
                title={subject?.title}
                subtitles={[subject?.lessons, subject?.hours, subject?.homeworks]}
                percent={'5%'}/>)}
        </div>
    )
};

export default ProgressesComponent;
