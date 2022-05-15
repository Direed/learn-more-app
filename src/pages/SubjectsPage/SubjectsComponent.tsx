import React from 'react'
import SubjectComponent from './SubjectComponent'

const SubjectsComponent = ({subjects}) => {
    return (
        <>
            {subjects?.map((subject) => <SubjectComponent
                title={subject.title}
                description={subject.description}
                phrase={subject.phrase}
            />)}
        </>
    )
}

export default React.memo(SubjectsComponent)
