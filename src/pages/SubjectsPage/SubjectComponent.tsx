import React from 'react'
import Button, {IColor} from "../../components/StyledButton";

const SubjectComponent = ({title, description, phrase}) => {
    return (
        <div className='subjectComponent'>
            <div className='subjectComponent--wrapper'>
                <h1 className='subjectComponent--title'>{title}</h1>
                <p className='subjectComponent--description'>{description}</p>
                <p className='subjectComponent--phrase'>{phrase}</p>
            </div>
            <Button
                className={``}
                text={'Take the test'}
                color={IColor.purple}
                handleClick={() => console.log()}
            />
        </div>
    )
}

export default React.memo(SubjectComponent)
