import React from 'react'
import Button, {IColor} from "../../components/StyledButton";

const SubjectComponent = ({title, description, phrase, handleClick, isHiden}: any) => {
    return (
        <div className={`subjectComponent ${isHiden ? 'hiden' : ''}`}>
            <div className='subjectComponent--wrapper'>
                <h1 className='subjectComponent--title'>{title}</h1>
                <p className='subjectComponent--description'>{description}</p>
                <p className='subjectComponent--phrase'>{phrase}</p>
            </div>
            <Button
                className={`subjectComponent--button`}
                text={'Вибрати'}
                color={IColor.purple}
                handleClick={handleClick}
            />
        </div>
    )
}

export default React.memo(SubjectComponent)
